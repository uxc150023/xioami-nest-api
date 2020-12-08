import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { RoleService } from '../../../service/role/role.service';
import { Config } from '../../../config/config';
import { ToolsService } from '../../../service/tools/tools.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/domain/roleInfo';
import e from 'express';

@ApiTags('获取角色列表')
@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
  ) {}

  @Post('getRoles')
  @ApiOperation({
    summary: '获取角色',
  })
  async getRole(@Body() body, @Request() req, @Response() res) {
    const data = await this.roleService.find({}, body);
    data.pageData.forEach((element: any) => {
      element.add_time = element.add_time.getTime();
    });
    this.toolsService.success(data, '', res);
  }

  @Post('addRole')
  @ApiOperation({
    summary: '新增角色',
  })
  async addRole(@Body() body: Role, @Request() req, @Response() res) {
    const data = await this.roleService.add(body);
    this.toolsService.success(data, '', res);
  }

  @Post('update')
  @ApiOperation({
    summary: '编辑角色',
  })
  async update(@Body() body: Role, @Request() req, @Response() res) {
    const data = await this.roleService.update(body);
    this.toolsService.success(data, '', res);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除角色',
  })
  async delete(@Param('id') id: string, @Request() req, @Response() res) {
    const data = await this.roleService.delete(id);
    if (!data.console.errorNo) {
      this.toolsService.success(data, '', res);
    } else {
      this.toolsService.error(null, data, res);
    }
  }
}
