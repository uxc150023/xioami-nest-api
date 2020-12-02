import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { RoleService } from '../../../service/role/role.service';
import { Config } from '../../../config/config';
import { ToolsService } from '../../../service/tools/tools.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/domain/roleInfo';

@ApiTags('获取角色列表')
@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
  ) {}

  @Post()
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

  @Post()
  @ApiOperation({
    summary: '新增角色',
  })
  async addRole(@Body() body: Role, @Request() req, @Response() res) {
    console.log('====================================');
    console.log(body);
    console.log('====================================');
    // const data = await this.roleService.find({}, body);
    this.toolsService.success({}, '', res);
  }
}
