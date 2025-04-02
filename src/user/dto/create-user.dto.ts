import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsString, ValidateNested } from 'class-validator';

export class RoleDto {
  @ApiProperty({ description: '角色 ID', type: Number })
  id: number;
}

export class CreateUserDto {
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: '用户名', example: 'john_doe' })
  @IsString({ message: '用户名必须为字符串' })
  username: string;

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString({ message: '密码必须为字符串' })
  password: string;

  @ApiProperty({ description: '邮箱', example: 'john.doe@example.com' })
  @IsEmail({}, { message: '电子邮件格式无效' })
  email: string;

  @ApiProperty({ description: '与用户关联的角色', type: [RoleDto] })
  @IsArray({ message: '角色必须是一个数组' })
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: RoleDto[];
}
