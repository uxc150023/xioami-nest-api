import { Body, Controller, Get, Request, Response } from '@nestjs/common';
import { RoleService } from '../../../service/role/role.service';
import { Config } from '../../../config/config';
import { ToolsService } from '../../../service/tools/tools.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('角色')
@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: '获取角色',
  })
  async index(@Body() body, @Request() req, @Response() res) {
    const data = await this.roleService.find({}, { pageSize: 10, current: 1 });

    console.log('====================================');
    console.log(data);
    console.log('====================================');
    // data.pageData.forEach((element: any) => {
    //   element.add_time = element.add_time.getTime();
    // });
    this.toolsService.success(data, '', res);
  }
}
