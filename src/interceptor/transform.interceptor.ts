import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, timestamp } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    // 解析ExecutionContext的数据内容获取到请求体
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    // 实现数据的遍历与转变
    console.log('进入全局响应拦截器:', request);
    return next.handle().pipe(
      map(data => {
        console.log('全局响应拦截器方法返回内容:', data);
        return {
          statusCode: 0,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: '请求成功',
          data,
        };
      }),
    );
  }
}
