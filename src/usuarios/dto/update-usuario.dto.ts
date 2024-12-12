import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsOptional()
    usuario?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    role?: Role;

}
