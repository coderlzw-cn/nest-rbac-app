import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/entites/role.entity';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  findUsersWithRoles() {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async createUser(createUserDto: CreateUserDto) {
    // 检查角色是否存在
    const roleIds = createUserDto.roles.map(({ id }) => id);
    const rolesCount = await this.rolesService.checkRolesExist(roleIds);
    if (rolesCount === 0) throw new NotFoundException('角色不存在');
    const userEntity = new User({
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
    });
    userEntity.roles = createUserDto.roles.map(({ id }) => new Role({ id }));
    return await this.userRepository.save(userEntity);
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }
}
