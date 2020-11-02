import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
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
  constructor(private toolsService: ToolsService) {}

  @Get()
  @Render('admin/login')
  index() {
    return {};
  }

  @Get('code') // 123123123
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
