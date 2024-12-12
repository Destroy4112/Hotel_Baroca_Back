import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {

    @IsNotEmpty({ message: 'La descripción no puede estar vacia' })
    @IsString({ message: 'La descripción debe ser un string' })
    descripcion: string
}
