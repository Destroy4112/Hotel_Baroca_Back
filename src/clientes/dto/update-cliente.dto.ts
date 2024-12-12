import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un string' })
    nombres?: string;

    @IsOptional()
    @IsString({ message: 'El apellido debe ser un string' })
    apellidos?: string;

    @IsOptional()
    @IsString({ message: 'El tipo de documento debe ser un string' })
    tipo_documento?: string;

    @IsOptional()
    @IsString({ message: 'El documento debe ser un string' })
    documento?: string;

    @IsOptional()
    @IsString({ message: 'El pais debe ser un string' })
    pais?: string;

    @IsOptional()
    @IsString({ message: 'El departamento debe ser un string' })
    departamento?: string;

    @IsOptional()
    @IsString({ message: 'La ciudad debe ser un string' })
    ciudad?: string;

    @IsOptional()
    @IsString({ message: 'La direccion debe ser un string' })
    direccion?: string;

    @IsOptional()
    @IsString({ message: 'El telefono debe ser un string' })
    telefono?: string;

    @IsOptional()
    @IsString({ message: 'El email debe ser un string' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'La fecha de nacimiento debe ser un string' })
    fecha_nacimiento?: string;
}
