import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { ValidationsService } from 'src/validations/validations.service';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private readonly validationService: ValidationsService
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.validationService.validateDto(CreateUsuarioDto, createUsuarioDto);
    const { password } = createUsuarioDto;
    const hashedPassword = await hash(password, 10);
    createUsuarioDto = { ...createUsuarioDto, password: hashedPassword };
    return await this.usuarioRepository.save(createUsuarioDto);
  }

  async findByDocumento(documento: string) {
    return await this.usuarioRepository.findOne({ where: { documento } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.validationService.validateDto(UpdateUsuarioDto, updateUsuarioDto);
    const user = await this.usuarioRepository.findOne({ where: { id } });
    updateUsuarioDto.password = await hash(updateUsuarioDto.password, 10);
    Object.assign(user, updateUsuarioDto);
    return this.usuarioRepository.save(user);
  }

  async remove(id: number) {
    const exist = await this.usuarioRepository.findOne({ where: { id } });
    if (!exist)
      throw new HttpException({ status: false, errors: ['Rol no encontrado.'] }, HttpStatus.NOT_FOUND,
      );
    await this.usuarioRepository.remove(exist);
    return {
      status: true,
      message: 'Usuario eliminado correctamente.',
    };
  }
}
