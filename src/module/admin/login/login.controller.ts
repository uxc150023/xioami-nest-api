import {
  Body,
  Controller,
  Get,
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

@ApiTags('登录')
@Controller('admin/login')
export class LoginController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
  ) {}

  @Get()
  // @Render('admin/login')
  index() {
    return {};
  }

  @Get('code')
  @ApiOperation({
    summary: '登录code',
  })
  async getCode(@Body() body, @Request() req, @Response() res) {
    var svgCaptcha = await this.toolsService.getCaptcha();
    // req.session.code = svgCaptcha.text;
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
        console.log(loginCode);
        let code = await this.toolsService.getRedis('loginCode');
        if (loginCode === code) {
          password = this.toolsService.getMd5(body.password);
          console.log(password);
          let userResult = await this.adminService.find({
            username: username,
            password: password,
          });
          console.log(userResult);
        } else {
          console.log('验证码不正确');
          return {
            message: 222,
          };
        }
      }
    } catch (error) {
      res.send(2222222222222);
      return {
        status: 0,
        message: 'xxx',
        code: 200,
      };
    }
  }
}
