import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/manager')
export class ManagerController {
  @Get()
  @Render('admin/manager/index')
  index() {
    return {};
  }

  @Get('add')
  @Render('admin/manager/add')
  add() {
    return { title: '添加商品' };
  }

  @Get('edit')
  @Render('admin/manager/edit')
  edit() {
    return { title: '编辑商品' };
  }
}
