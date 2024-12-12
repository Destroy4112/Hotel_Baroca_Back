import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ValidationsService } from 'src/validations/validations.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
    private readonly jwtService: JwtService,
    private readonly validationService: ValidationsService,
  ) { }

  async login(createAuthDto: CreateAuthDto) {
    await this.validationService.validateDto(CreateAuthDto, createAuthDto);
    const { documento, password } = createAuthDto;
    const user = await this.repository.findOne({ where: { documento: documento }, relations: ['role', 'empleado'] });
    if (!user) return { status: false, message: 'El documento no existe' };
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) return { status: false, message: 'La contraseña es incorrecta' };
    const payload = { id: user.id, documento: user.documento };
    const token = this.jwtService.sign(payload);
    const credenciales = { id: user.id, documento: user.documento, rol: user.role, };
    const usuario = user.empleado ? user.empleado : null;
    return {
      status: true,
      credenciales,
      usuario,
      token
    }
  }

}
