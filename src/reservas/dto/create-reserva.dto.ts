import { IsNotEmpty, IsString } from "class-validator";
import { Habitacione } from "src/habitaciones/entities/habitacione.entity";
import { Preregistro } from "src/preregistros/entities/preregistro.entity";

export class CreateReservaDto {
    @IsString({ message: 'La ciudad de procedencia debe ser un string' })
    @IsNotEmpty({ message: 'La ciudad de procedencia es requerido' })
    ciudad_procedencia: string;

    @IsString({ message: 'La ciudad de destino debe ser un string' })
    @IsNotEmpty({ message: 'La ciudad de destino es requerido' })
    ciudad_destino: string;

    @IsString({ message: 'El transporte debe ser un string' })
    @IsNotEmpty({ message: 'El transporte es requerido' })
    transporte: string;

    @IsString({ message: 'El motivo del viaje debe ser un string' })
    @IsNotEmpty({ message: 'El motivo del viaje es requerido' })
    motivo_viaje: string;

    @IsNotEmpty({ message: 'La habitacion es requerido' })
    habitacion: Habitacione;

    @IsNotEmpty({ message: 'El preregistro es requerido' })
    preregistro: Preregistro;

    @IsNotEmpty({ message: 'El numero de noches es requerido' })
    noches: number;
}
