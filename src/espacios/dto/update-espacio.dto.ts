import { PartialType } from '@nestjs/mapped-types';
import { CreateEspacioDto } from './create-espacio.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEspacioDto extends PartialType(CreateEspacioDto) {

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un string' })
    descripcion?: string;

    @IsOptional()
    @IsString({ message: 'El tipo de espacio debe ser un string' })
    tipo_espacio?: string;
}
