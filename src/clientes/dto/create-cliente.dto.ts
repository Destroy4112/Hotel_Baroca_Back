import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un string' })
    nombres: string;

    @IsNotEmpty({ message: 'El apellido es requerido' })
    @IsString({ message: 'El apellido debe ser un string' })
    apellidos: string;

    @IsNotEmpty({ message: 'El tipo de documento es requerido' })
    @IsString({ message: 'El tipo de documento debe ser un string' })
    tipo_documento: string;

    @IsNotEmpty({ message: 'El documento es requerido' })
    @IsString({ message: 'El documento debe ser un string' })
    documento: string;

    @IsNotEmpty({ message: 'El pais es requerido' })
    @IsString({ message: 'El pais debe ser un string' })
    pais: string;

    @IsNotEmpty({ message: 'El departamento es requerido' })
    @IsString({ message: 'El departamento debe ser un string' })
    departamento: string;

    @IsNotEmpty({ message: 'La ciudad es requerida' })
    @IsString({ message: 'La ciudad debe ser un string' })
    ciudad: string;

    @IsNotEmpty({ message: 'La direccion es requerida' })
    @IsString({ message: 'La direccion debe ser un string' })
    direccion: string;

    @IsNotEmpty({ message: 'El telefono es requerido' })
    @IsString({ message: 'El telefono debe ser un string' })
    telefono: string;

    @IsNotEmpty({ message: 'El email es requerido' })
    @IsString({ message: 'El email debe ser un string' })
    email: string;

    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    @IsString({ message: 'La fecha de nacimiento debe ser un string' })
    fecha_nacimiento: string;

}
