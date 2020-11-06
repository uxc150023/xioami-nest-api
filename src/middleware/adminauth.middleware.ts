import { Injectable, NestMiddleware } from '@nestjs/common';
import * as url from 'url';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 1. 获取session 中保存的用户信息
    let pathname = url.parse(req.baseUrl).pathname; // 获取访问地址
    console.log('pathname===', pathname);
    if (req.session.userinfo) {
      next();
    } else {
      if (
        pathname == '/admin/login' ||
        pathname == '/admin/login/code' ||
        pathname == '/admin/login/doLogin'
      ) {
        next();
      } else {
        // res.redirect('/admin/login');
        res.send('无权限，跳转到登录页loading.....');
      }
    }
    // next();
  }
}
