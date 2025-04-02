import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Permission } from '../permission/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entites/role.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async roles() {
    return this.roleRepository.find({
      relations: ['children', 'parents', 'permissions'],
    });
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const role = new Role({ name: createRoleDto.name, remark: createRoleDto.remark, description: createRoleDto.description });
      role.permissions = createRoleDto.permissions.map(({ id }) => new Permission({ id }));
      await queryRunner.manager.save(role);
      await queryRunner.commitTransaction();
    } catch (error: unknown) {
      this.logger.error((error as Error).message);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 根据一组 id 检查角色是否存在
   * @param ids
   */
  checkRolesExist(ids: number[]) {
    return this.roleRepository.count({ where: { id: In(ids) } });
  }

  async getUserRoles(id: number) {
    return this.roleRepository.find({
      where: {
        users: { id },
      },
    });
  }
}
