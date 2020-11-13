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

@ApiTags('登录')
@Controller('admin/login')
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
    summary: '登录doLogin',
  })
  async doLogin(@Body() body, @Request() req, @Response() res) {
    try {
      let loginCode: string = body.loginCode;
      let password: string = body.password;
      let username: string = body.username;
      if (username === '' || password.length < 6) {
        console.log('用户名或密码不合法');
      } else {
        let code = await this.toolsService.getRedis('loginCode');
        if (!code) {
          return this.toolsService.error(null, '请重新获取验证码', res);
        }
        if (!loginCode) {
          return this.toolsService.error(null, '请输入验证码', res);
        }

        if (loginCode.toUpperCase() !== code.toUpperCase()) {
          password = this.toolsService.getMd5(body.password);
          console.log(password);
          let userResult = await this.adminService.find({
            username: username,
            password: password,
          });

          if (!userResult.length) {
            return this.toolsService.error(null, '', res);
          }
          console.log(123123123123123);
          // 生成success_token
          console.log(userResult[0].user_id);
          const token = jwt.sign(
            {
              user_id: userResult[0].user_id,
            },
            'userLogin',
          );
          console.log('token===', token);
          const data = { ...userResult, token: token };
          return this.toolsService.success(data, '', res);
        } else {
          return this.toolsService.error(null, '验证码错误', res);
        }
      }
    } catch (error) {
      this.toolsService.error(null, error, res);
    }
  }
}
