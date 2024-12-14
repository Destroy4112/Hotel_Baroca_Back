import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {

  constructor(
    @InjectRepository(Empleado) private readonly repository: Repository<Empleado>,
    private readonly usuariosService: UsuariosService
  ) { }

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const user = {
      documento: createEmpleadoDto.documento, password: createEmpleadoDto.documento, role: createEmpleadoDto.rol_id
    }
    const usuario = await this.usuariosService.create(user);
    const res = await this.repository.save({ ...createEmpleadoDto, usuario_id: usuario });
    return {
      status: true,
      message: 'Empleado creado correctamente.',
      data: res
    };
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id }, relations: ['usuario_id'] });
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const empleado = await this.repository.findOne({ where: { id }, relations: ['usuario_id'] });
    if (empleado.documento !== updateEmpleadoDto.documento) {
      this.usuariosService.update(empleado.usuario_id.id, { documento: updateEmpleadoDto.documento, password: updateEmpleadoDto.documento });
    }
    Object.assign(empleado, updateEmpleadoDto);
    const result = await this.repository.save(empleado);
    return {
      status: true,
      message: 'Empleado actualizado correctamente.',
      data: result
    };
  }

  async remove(id: number) {
    const usuario = await this.repository.findOne({ where: { id }, relations: ['usuario_id'] });
    await this.usuariosService.remove(usuario.usuario_id.id);
    await this.repository.remove(usuario);
    return { status: true, message: 'Empleado eliminado correctamente.' };
  }
}
