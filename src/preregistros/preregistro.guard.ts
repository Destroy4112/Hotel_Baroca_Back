import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationsService } from 'src/validations/validations.service';
import { Repository } from 'typeorm';
import { CreatePreregistroDto } from './dto/create-preregistro.dto';
import { Preregistro } from './entities/preregistro.entity';
import { ClientesService } from 'src/clientes/clientes.service';
import { EspaciosService } from 'src/espacios/espacios.service';

@Injectable()
export class PreregistrosGuard implements CanActivate {
    constructor(
        @InjectRepository(Preregistro) private readonly repository: Repository<Preregistro>,
        private readonly validationService: ValidationsService,
        private readonly clientesService: ClientesService,
        private readonly espaciosService: EspaciosService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body } = request;
        
        if (method === 'POST') {
            const { cliente, espacio, fecha_ingreso } = body;
            await this.validationService.validateDto(CreatePreregistroDto, body);
            
            const espacioExist = await this.espaciosService.findById(espacio);
            if (!espacioExist) {
                throw new HttpException(
                    { status: false, errors: 'Espacio no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
            
            const clienteExist = await this.clientesService.findById(cliente);
            if (!clienteExist) {
                throw new HttpException(
                    { status: false, errors: 'Cliente no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const exist = await this.repository.findOne({ where: { cliente, fecha_ingreso } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un preregistro con estos datos.'] },
                    HttpStatus.OK,
                );
            }
        }

        return true;
    }
}
