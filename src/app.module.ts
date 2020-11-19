import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
import { ToolsService } from './service/tools/tools.service';
import { AdminauthMiddleware } from './middleware/adminauth.middleware';
import { InitMiddleware } from './middleware/init.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/config';
@Module({
  imports: [
    AdminModule,
    DefaultModule,
    ApiModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'xiaomi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [ToolsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes(`${Config.adminPath}/*`)
      .apply(InitMiddleware)
      .forRoutes('*');
  }
}
