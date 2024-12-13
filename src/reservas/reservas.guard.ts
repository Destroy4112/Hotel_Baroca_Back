import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitacionesService } from 'src/habitaciones/habitaciones.service';
import { PreregistrosService } from 'src/preregistros/preregistros.service';
import { ValidationsService } from 'src/validations/validations.service';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasGuard implements CanActivate {
    constructor(
        @InjectRepository(Reserva) private readonly repository: Repository<Reserva>,
        private readonly validationService: ValidationsService,
        private readonly habitacionesService: HabitacionesService,
        private readonly preregistrosService: PreregistrosService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body } = request;

        if (method === 'POST') {
            const { preregistro, habitacion } = body;
            await this.validationService.validateDto(CreateReservaDto, body);

            const habitacionExist = await this.habitacionesService.findById(habitacion);
            if (!habitacionExist) {
                throw new HttpException(
                    { status: false, errors: 'habitacion no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const preregistroExist = await this.preregistrosService.findById(preregistro);
            if (!preregistroExist) {
                throw new HttpException(
                    { status: false, errors: 'preregistro no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
        }

        return true;
    }
}
