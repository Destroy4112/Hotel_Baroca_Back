import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Habitacione } from 'src/habitaciones/entities/habitacione.entity';
import { Preregistro } from 'src/preregistros/entities/preregistro.entity';
import { CreateReservaDto } from './create-reserva.dto';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {

    @IsString({ message: 'La ciudad de procedencia debe ser un string' })
    @IsOptional()
    ciudad_procedencia?: string;

    @IsString({ message: 'La ciudad de destino debe ser un string' })
    @IsOptional()
    ciudad_destino?: string;

    @IsString({ message: 'El transporte debe ser un string' })
    @IsOptional()
    transporte?: string;

    @IsString({ message: 'El motivo del viaje debe ser un string' })
    @IsOptional()
    motivo_viaje?: string;

    @IsOptional()
    habitacion?: Habitacione;

    @IsOptional()
    preregistro?: Preregistro;

    @IsOptional()
    @IsNumber()
    noches?: number;
}
