import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
interface Response<T> {
  data: T;
}

@Injectable()
// export class TransformInterceptor<T>
//   implements NestInterceptor<T, Response<T>> {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<T>,
//   ): Observable<Response<T>> {
//     return next.handle().pipe(
//       map(data => {
//         return {
//           data,
//           code: 0,
//           message: '请求成功333333333333333',
//         };
//       }),
//     );
//   }
// }
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
