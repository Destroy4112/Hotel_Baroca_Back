import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationsService } from 'src/validations/validations.service';
import { Not, Repository } from 'typeorm';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { Espacio } from './entities/espacio.entity';

@Injectable()
export class EspaciosGuard implements CanActivate {
    constructor(
        @InjectRepository(Espacio) private readonly repository: Repository<Espacio>,
        private readonly validationService: ValidationsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { descripcion } = body;
            await this.validationService.validateDto(CreateEspacioDto, body);
            const exist = await this.repository.findOne({ where: { descripcion } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un espacio con esta descripción.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { descripcion } = body;
            await this.validationService.validateDto(UpdateEspacioDto, body);

            const espacio = await this.repository.findOne({ where: { id } });
            if (!espacio) {
                throw new HttpException(
                    { status: false, errors: 'Espacio no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const exist = await this.repository.findOne({ where: { descripcion, id: Not(id) } });
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
                throw new HttpException({ status: false, errors: 'Espacio no encontrado' }, HttpStatus.NOT_FOUND)
            };
        }

        return true;
    }
}
