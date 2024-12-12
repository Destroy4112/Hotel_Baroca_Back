import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Cliente } from "src/clientes/entities/cliente.entity";
import { Espacio } from "src/espacios/entities/espacio.entity";

export class CreatePreregistroDto {

    @IsString({ message: 'La fecha de ingreso debe ser un string' })
    @IsNotEmpty({ message: 'La fecha de ingreso es requerida' })
    fecha_ingreso: string;

    @IsString({ message: 'La fecha de salida debe ser un string' })
    @IsOptional()
    fecha_salida?: string;

    @IsString({ message: 'El tipo de habitacion debe ser un string' })
    @IsNotEmpty({ message: 'El tipo de habitacion es requerido' })
    tipo_habitacion: string;

    @IsNotEmpty({ message: 'El cliente es requerido' })
    cliente: Cliente;

    @IsNotEmpty({ message: 'El espacio es requerido' })
    espacio: Espacio;

    @IsOptional()
    @IsString({ message: 'La observacion debe ser un string' })
    observacion: string;

    @IsOptional()
    estado: string;

}
