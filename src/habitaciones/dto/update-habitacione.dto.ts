import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateHabitacioneDto } from './create-habitacione.dto';

export class UpdateHabitacioneDto extends PartialType(CreateHabitacioneDto) {

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un string' })
    nombre_habitacion?: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un string' })
    descripcion_habitacion?: string;

    @IsOptional()
    @IsNumber()
    numero_habitacion?: number;

    @IsOptional()
    @IsNumber()
    capacidad_habitacion?: number;

    @IsOptional()
    @IsString({ message: 'El precio debe ser un string' })
    precio_habitacion?: string;

    @IsOptional()
    @IsString({ message: 'El tipo debe ser un string' })
    tipo_habitacion?: string;

    @IsOptional()
    @IsNumber()
    piso?: number;

    @IsOptional()
    @IsString({ message: 'La disponibilidad debe ser un string' })
    disponibilidad?: string;

    @IsOptional()
    @IsString({ message: 'El espacio debe ser un string' })
    espacio_id?: string;

    @IsOptional()
    @IsString({ message: 'El estado debe ser un string' })
    estado?: string;

    @IsOptional()
    @IsString({ message: 'La ventana debe ser un string' })
    ventana?: string;

}
