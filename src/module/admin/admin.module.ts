import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { AdminService } from '../../service/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../entity/admin/admin.entity';

@Module({
  controllers: [MainController, LoginController, ManagerController],
  providers: [ToolsService, AdminService],
  imports: [TypeOrmModule.forFeature([Admin])],
})
export class AdminModule {}
