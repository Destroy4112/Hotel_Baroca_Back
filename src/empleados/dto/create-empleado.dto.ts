import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/roles/entities/role.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export class CreateEmpleadoDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un string' })
    nombres: string;

    @IsNotEmpty({ message: 'El apellido es requerido' })
    @IsString({ message: 'El apellido debe ser un string' })
    apellidos: string;

    @IsNotEmpty({ message: 'El documento es requerido' })
    @IsString({ message: 'El documento debe ser un string' })
    documento: string;

    @IsNotEmpty({ message: 'El genero es requerido' })
    @IsString({ message: 'El genero debe ser un string' })
    genero: string;

    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    @IsString({ message: 'La fecha de nacimiento debe ser un string' })
    fecha_nacimiento: string;

    @IsNotEmpty({ message: 'El rol es requerido' })
    rol_id: Role;
}
