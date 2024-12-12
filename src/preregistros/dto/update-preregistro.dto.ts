import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Espacio } from 'src/espacios/entities/espacio.entity';
import { CreatePreregistroDto } from './create-preregistro.dto';

export class UpdatePreregistroDto extends PartialType(CreatePreregistroDto) {

    @IsOptional()
    @IsString({ message: 'La fecha de ingreso debe ser un string' })
    fecha_ingreso?: string;

    @IsOptional()
    @IsString({ message: 'La fecha de salida debe ser un string' })
    fecha_salida?: string;

    @IsOptional()
    @IsString({ message: 'El tipo de habitacion debe ser un string' })
    tipo_habitacion?: string;

    @IsOptional()
    cliente?: Cliente;

    @IsOptional()
    espacio?: Espacio;

    @IsOptional()
    @IsString({ message: 'La observacion debe ser un string' })
    observacion?: string;

    @IsOptional()
    @IsString({ message: 'El estado debe ser un string' })
    estado?: string;
}
