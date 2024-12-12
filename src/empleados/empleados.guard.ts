import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ValidationsService } from 'src/validations/validations.service';
import { Not, Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosGuard implements CanActivate {
    constructor(
        @InjectRepository(Empleado) private readonly repository: Repository<Empleado>,
        private readonly userService: UsuariosService,
        private readonly validationService: ValidationsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { documento } = body;
            await this.validationService.validateDto(CreateEmpleadoDto, body);
            const exist = await this.userService.findByDocumento(documento);

            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un Empleado con este documento.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { documento } = body;
            await this.validationService.validateDto(UpdateEmpleadoDto, body);

            const roleToUpdate = await this.repository.findOne({ where: { id } });
            if (!roleToUpdate) {
                throw new HttpException(
                    { status: false, errors: 'Empleado no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const exist = await this.repository.findOne({ where: { documento, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un Empleado con este documento.'] },
                    HttpStatus.OK,
                );
            }
        }

        return true;
    }
}
