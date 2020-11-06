import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Response,
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

  @Post('doLogin')
  async doLogin(@Body() body) {
    console.log('loginFrom:', body);

    console.log(await this.adminService.findAll());
    return {};
  }

  @Get('code')
  @ApiOperation({
    summary: '登录code',
  })
  async getCode(@Request() req, @Response() res) {
    let svgCaptcha = await this.toolsService.getCaptcha();

    // 设置session
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }
}
