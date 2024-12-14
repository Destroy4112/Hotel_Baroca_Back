import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    const result = await this.roleRepository.save(role);
    return {
      status: true,
      message: 'Rol creado correctamente.',
      data: result
    };
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async countAll() {
    return await this.roleRepository.count();
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    Object.assign(role, updateRoleDto);
    const result = await this.roleRepository.save(role);
    return {
      status: true,
      message: 'Rol actualizado correctamente.',
      data: result
    };
  }

  async remove(id: number) {
    await this.roleRepository.delete(id);
    return {
      status: true,
      message: 'Rol eliminado correctamente.',
    };
  }
}
