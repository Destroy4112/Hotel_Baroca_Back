import { IsNotEmpty } from "class-validator";

export class CreateNotificacioneDto {

    @IsNotEmpty({ message: 'La notificacion es requerida' })
    notificacion: string;

    @IsNotEmpty({ message: 'El usuario es requerido' })
    usuario: string;

}
