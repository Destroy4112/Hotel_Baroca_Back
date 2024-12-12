import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @IsNotEmpty({ message: 'La descripción es requerida' })
    @IsString({ message: 'La descripción debe ser un string' })
    descripcion: string;

}
