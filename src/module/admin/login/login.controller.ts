import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Render,
  Request,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/domain/userLogin';
import { Config } from '../../../config/config';

@ApiTags('登录')
@Controller(`${Config.adminPath}'/login'`)
export class LoginController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
  ) {}

  @Get()
  index() {
    return {};
  }

  @Get('code')
  @ApiOperation({
    summary: '登录code',
  })
  async getCode(@Body() body, @Request() req, @Response() res) {
    var svgCaptcha = await this.toolsService.getCaptcha();
    this.toolsService.setRedis('loginCode', svgCaptcha.text, 5 * 60);
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

  @Post('doLogin')
  @ApiOperation({
    summary: '登录',
  })
  async doLogin(@Body() body: User, @Request() req, @Response() res) {
    try {
      let loginCode: string = body.loginCode;
      let password: string = body.passWord;
      let username: string = body.userName;
      if (username === '' || password.length < 6) {
        return this.toolsService.error(null, '用户名或密码不合法', res);
      } else {
        let code = await this.toolsService.getRedis('loginCode');

        if (!code) {
          return this.toolsService.error(null, '请重新获取验证码', res);
        }
        if (!loginCode) {
          return this.toolsService.error(null, '请输入验证码', res);
        }

        if (loginCode.toUpperCase() !== code.toUpperCase()) {
          password = this.toolsService.getMd5(password);
          let userResult = await this.adminService.find({
            username,
            password,
          });

          if (!userResult.length) {
            return this.toolsService.error(null, '用户名或密码不存在', res);
          }
          // 生成success_token
          const token = jwt.sign(
            {
              user_id: userResult[0].user_id,
              // userinfo: userResult[0],
            },
            'userLogin',
          );
          const data = { ...userResult[0], accessToken: token };

          // 将userId对应的session 存入redis
          this.toolsService.setRedis(
            'token_' + userResult[0].user_id,
            token,
            5 * 60,
          );
          return this.toolsService.success(data, '', res);
        } else {
          return this.toolsService.error(null, '验证码错误', res);
        }
      }
    } catch (error) {
      this.toolsService.error(null, error, res);
    }
  }

  @Post('logOut')
  @ApiOperation({
    summary: '退出登录',
  })
  async logOut(@Body() body, @Request() req, @Response() res) {
    try {
      // 删除redis中缓存的user_id token
      this.toolsService.delRedis(`token_${body.userId}`);
      this.toolsService.success(true, '', res);
    } catch (error) {
      this.toolsService.error(null, error, res);
    }
  }
}
