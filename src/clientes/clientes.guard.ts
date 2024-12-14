import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationsService } from 'src/validations/validations.service';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesGuard implements CanActivate {
    constructor(
        @InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
        private readonly validationService: ValidationsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { documento } = body;
            await this.validationService.validateDto(CreateClienteDto, body);
            const exist = await this.repository.findOne({ where: { documento } });

            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un Empleado con este documento.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const cliente = await this.repository.findOne({ where: { id } });
            if (!cliente) {
                throw new HttpException({ status: false, errors: 'Cliente no encontrado' }, HttpStatus.NOT_FOUND)
            };
        }

        return true;
    }
}
