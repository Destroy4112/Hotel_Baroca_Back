import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateEmpleadoDto } from './create-empleado.dto';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un string' })
    nombres?: string;

    @IsOptional()
    @IsString({ message: 'El apellido debe ser un string' })
    apellidos?: string;

    @IsOptional()
    @IsString({ message: 'El documento debe ser un string' })
    documento?: string;

    @IsOptional()
    usuario?: Usuario;

    @IsOptional()
    @IsString({ message: 'El genero debe ser un string' })
    genero?: string;

    @IsOptional()
    @IsString({ message: 'La fecha de nacimiento debe ser un string' })
    fecha_nacimiento?: string;
}
