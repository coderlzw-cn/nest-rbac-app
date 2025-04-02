import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ description: '权限名' })
  name: string;

  @ApiProperty({ description: '权限描述' })
  description: string;

  @ApiProperty({ description: '权限标识' })
  identifier: string;
}
