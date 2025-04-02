import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../roles/entites/role.entity';

@Entity('users')
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名', uniqueItems: true })
  @Column({ type: 'varchar', length: 255, unique: true, comment: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ type: 'varchar', length: 255, comment: '密码' })
  password: string;

  @ApiProperty({ description: '邮箱', uniqueItems: true })
  @Column({ type: 'varchar', length: 255, unique: true, comment: '邮箱' })
  email: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
