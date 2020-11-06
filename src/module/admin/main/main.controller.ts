import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from '../../../service/admin/admin.service';

@Controller('admin')
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
