import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import * as expressJwt from 'express-jwt';

// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
  const options = new DocumentBuilder()
    .setTitle('nest入门接口标题')
    .setDescription('使用nest书写的常用性接口') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .addTag('用户,安全') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
    // .setBasePath('http://localhost:5000')
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options);
  // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/api', app, document);

  // 处理跨域
  app.enableCors();

  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  //配置模板引擎
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  //配置 cookie 中间件
  app.use(cookieParser('this signed cookies'));

  //配置 session 的中间件
  app.use(
    session({
      secret: 'ssssssss',
      resave: false,
      saveUninitialized: false,
      cookie: { path: '/', maxAge: 219000, httpOnly: true },
      rolling: true,
    }),
  );

  // token校验
  app.use(
    expressJwt({
      secret: 'userLogin', // 签名的密钥
      algorithms: ['HS256'], // 设置算法（官方文档上没有写这个，但是不配置的话会报错）
    }).unless({
      path: ['/login', '/register/create', '/register/upload'], // 不经过 Token 解析的路径
    }),
  );

  app.use((req, res, next) => {
    // 由于express-jwt需要配合前台发送的cookie使用，所以要把Access-Control-Allow-Credentials设置为true
    // 设置Access-Control-Allow-Credentials为true后，Access-Control-Allow-Origin不能使用通配符，所以我改成req.get("origin")
    // 允许的请求主机名及端口号 也可以用通配符*， 表示允许所有主机请求
    res.setHeader('Access-Control-Allow-Origin', req.get('origin'));
    // 允许请求携带cookie
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 允许的请求方式
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    // 允许的请求头 express-jwt的cookie是使用Authorization所以需要允许Authorization通过
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type,Authorization',
    );
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    next();
  });

  // 注册过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局拦截器
  // app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
