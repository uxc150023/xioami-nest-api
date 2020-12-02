import { ApiProperty } from '@nestjs/swagger';

export class Role {
  @ApiProperty({
    description: '角色名称',
  })
  title: string;

  @ApiProperty({
    description: '角色描述',
  })
  description: string;

  @ApiProperty({
    description: '状态',
  })
  status: Number;
}
