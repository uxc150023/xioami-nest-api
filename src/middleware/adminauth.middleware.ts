import { Injectable, NestMiddleware } from '@nestjs/common';
import * as url from 'url';
import { ToolsService } from '../service/tools/tools.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  constructor(private toolsService: ToolsService) {}
  async use(req: any, res: any, next: () => void) {
    let pathname = url.parse(req.baseUrl).pathname; // 获取访问地址
    // 查看是否有token
    console.log('access-token===', req.headers['access-token']);
    if (req.headers['access-token']) {
      // 解析token 获取userid
      jwt.verify(req.headers['access-token'], 'userLogin', function(
        err,
        decode,
      ) {
        if (err) {
          //  时间失效的时候/ 伪造的token
          // res.send({ status: 0 });
        } else {
          //设置全局变量
          res.locals.userid = decode.user_id;
        }
      });
      console.log('userId===', res.locals.userid);
      // redis中获取token 判断是否过期
      const token = await this.toolsService.getRedis(
        `token_${res.locals.userid}`,
      );
      if (!token) {
        return this.toolsService.error(true, '登录token已过期', res);
      }
      next();
    } else {
      console.log('pathname===', pathname);
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
