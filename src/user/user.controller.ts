import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../decorator/permissions.decorator';
import { Roles } from '../decorator/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('user')
@Roles('admin', 'create') // 同时需要满足 admin 和 create 两个角色
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findUsersWithRoles() {
    console.log("get");
    return this.userService.findUsersWithRoles();
  }

  @ApiOperation({ summary: '创建用户' })
  @Post()
  createUserWithRoles(@Body() createUserDto: any) {
    console.log("post");
    return this.userService.createUser(createUserDto);
  }
}
