import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Espacio } from "src/espacios/entities/espacio.entity";

export class CreateHabitacioneDto {

    @IsNotEmpty({ message: 'El nombre de la habitacion es requerido' })
    @IsString({ message: 'El nombre de la habitacion debe ser un string' })
    nombre_habitacion: string;

    @IsNotEmpty({ message: 'La descripcion de la habitacion es requerida' })
    @IsString({ message: 'La descripcion de la habitacion debe ser un string' })
    descripcion_habitacion: string;

    @IsNotEmpty({ message: 'El numero de habitacion es requerido' })
    @IsNumber({}, { message: 'El numero de habitacion debe ser un numero' })
    numero_habitacion: number;

    @IsNotEmpty({ message: 'La capacidad de la habitacion es requerida' })
    @IsNumber({}, { message: 'La capacidad de la habitacion debe ser un numero' })
    capacidad_habitacion: number;

    @IsNotEmpty({ message: 'El precio de la habitacion es requerido' })
    @IsString({ message: 'El precio de la habitacion debe ser un string' })
    precio_habitacion: string;

    @IsNotEmpty({ message: 'El tipo de habitacion es requerido' })
    @IsString({ message: 'El tipo de habitacion debe ser un string' })
    tipo_habitacion: string;

    @IsNotEmpty({ message: 'El piso de la habitacion es requerido' })
    @IsNumber({}, { message: 'El piso de la habitacion debe ser un numero' })
    piso: number;

    @IsNotEmpty({ message: 'El espacio es requerido' })
    espacio: Espacio;


    @IsNotEmpty({ message: 'La ventana es requerida' })
    @IsString({ message: 'La ventana debe ser un string' })
    ventana: string;
}
