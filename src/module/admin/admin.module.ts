import { Module, UseInterceptors } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { AdminService } from '../../service/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../entity/admin/admin.entity';
import { Role } from '../../entity/admin/role.entity';
import { RedisModule } from 'nestjs-redis';
import { RoleService } from '../../service/role/role.service';
import { RoleController } from './role/role.controller';

@Module({
  controllers: [MainController, LoginController, ManagerController, RoleController],
  providers: [ToolsService, AdminService, RoleService],
  imports: [
    TypeOrmModule.forFeature([Admin, Role]),
    RedisModule.register({
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    }),
  ],
})
export class AdminModule {}
