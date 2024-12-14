import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @IsNumber({}, { message: 'La habitacion debe ser un numero' })
    habitacion: number;

    @IsNotEmpty({ message: 'El preregistro es requerido' })
    @IsNumber({}, { message: 'El preregistro debe ser un numero' })
    preregistro: number;

    @IsNotEmpty({ message: 'El numero de noches es requerido' })
    noches: number; 
}
