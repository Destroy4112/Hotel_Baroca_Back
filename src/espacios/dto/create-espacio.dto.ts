import { IsNotEmpty, IsString } from "class-validator";

export class CreateEspacioDto {

    @IsString({ message: 'La descripcion debe ser un string' })
    @IsNotEmpty({ message: 'La descripcion es requerida' })
    descripcion: string;

    @IsString({ message: 'El tipo de espacio debe ser un string' })
    @IsNotEmpty({ message: 'El tipo de espacio es requerido' })
    tipo_espacio: string;

}
