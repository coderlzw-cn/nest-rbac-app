import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ description: '权限 ID', type: Number })
  id: number;
}

export class CreateRoleDto {
  @ApiProperty({ description: '角色名' })
  name: string;

  @ApiProperty({ description: '角色描述' })
  description: string;

  @ApiProperty({ description: '角色备注' })
  remark: string;

  @ApiProperty({ description: '权限', type: [RoleDto] })
  permissions: Array<{ id: number }>;
}
