import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: '用户名',
  })
  userName: string;

  @ApiProperty({
    description: '密码',
  })
  passWord: string;

  @ApiProperty({
    description: '登录code',
  })
  loginCode: string;
}
