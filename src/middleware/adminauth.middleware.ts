import { Injectable, NestMiddleware } from '@nestjs/common';
import * as url from 'url';
import { ToolsService } from '../service/tools/tools.service';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  constructor(private toolsService: ToolsService) {}
  use(req: any, res: any, next: () => void) {
    // 1. 获取session 中保存的用户信息
    let pathname = url.parse(req.baseUrl).pathname; // 获取访问地址
    // 查看是否有token
    console.log(req.headers['access-token']);
    if (req.headers['access-token']) {
      //设置全局变量
      next();
    } else {
      if (
        pathname == '/admin/login' ||
        pathname == '/admin/login/code' ||
        pathname == '/admin/login/doLogin'
      ) {
        next();
      } else {
        this.toolsService.error(true, '无权限，跳转到登录页loading.....', res);
      }
    }
  }
}
