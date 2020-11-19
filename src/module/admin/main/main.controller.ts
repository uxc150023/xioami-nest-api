import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from '../../../service/admin/admin.service';
import { Config } from '../../../config/config';

@Controller(Config.adminPath)
export class MainController {
  constructor(private adminService: AdminService) {}
  // @Get()
  // @Render('admin/main/index')
  // index() {
  //   return {};
  // }
  @Get('getList')
  async getList() {
    return await this.adminService.findAll();
  }
}
