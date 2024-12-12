import { IsNotEmpty } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUsuarioDto {

    @IsNotEmpty({ message: 'El documento es requerido' })
    documento: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;

    @IsNotEmpty({ message: 'El rol es requerido' })
    role: Role;

}
