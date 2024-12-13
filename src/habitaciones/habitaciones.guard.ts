import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EspaciosService } from 'src/espacios/espacios.service';
import { ValidationsService } from 'src/validations/validations.service';
import { Not, Repository } from 'typeorm';
import { CreateHabitacioneDto } from './dto/create-habitacione.dto';
import { UpdateHabitacioneDto } from './dto/update-habitacione.dto';
import { Habitacione } from './entities/habitacione.entity';

@Injectable()
export class HabitacionesGuard implements CanActivate {
    constructor(
        @InjectRepository(Habitacione) private readonly repository: Repository<Habitacione>,
        private readonly validationService: ValidationsService,
        private readonly espaciosService: EspaciosService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { nombre_habitacion, espacio } = body;
            await this.validationService.validateDto(CreateHabitacioneDto, body);
            const habitacionExist = await this.espaciosService.findById(espacio);
            if (!habitacionExist) {
                throw new HttpException(
                    { status: false, errors: 'Espacio no encontrado.' },
                    HttpStatus.NOT_FOUND,
                )
            }
            const exist = await this.repository.findOne({ where: { nombre_habitacion, espacio: { id: espacio } } });

            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un espacio con esta descripción.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { nombre_habitacion, espacio } = body;
            await this.validationService.validateDto(UpdateHabitacioneDto, body);

            const habitacionExist = await this.repository.findOne({ where: { id } });
            if (!habitacionExist) {
                throw new HttpException(
                    { status: false, errors: 'Espacio no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const exist = await this.repository.findOne({ where: { nombre_habitacion, espacio: { id: espacio }, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un espacio con esta descripción.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const espacio = await this.repository.findOne({ where: { id } });
            if (!espacio) {
                throw new HttpException(
                    { status: false, errors: 'Espacio no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
        }

        return true;
    }
}
