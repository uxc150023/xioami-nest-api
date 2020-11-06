import { Injectable } from '@nestjs/common';

// 引入验证码库
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  async getCaptcha() {
    let captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 50,
      background: 'transparent',
    });
    return captcha;
  }
}
