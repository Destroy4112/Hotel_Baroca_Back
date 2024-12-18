import { IsOptional } from "class-validator";

export class CreateNotificacioneDto {

    @IsOptional()
    notificacion?: string;
    
}
