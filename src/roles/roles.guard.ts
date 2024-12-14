import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ValidationsService } from 'src/validations/validations.service';
import { Not, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        private readonly validationService: ValidationsService,
        private readonly usuariosService: UsuariosService
    ) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { descripcion } = body;
            await this.validationService.validateDto(CreateRoleDto, body);

            const existingRole = await this.roleRepository.findOne({ where: { descripcion } });
            if (existingRole) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un rol con esa descripción.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {

            const { id } = params;
            const { descripcion } = body;
            await this.validationService.validateDto(UpdateRoleDto, body);

            const roleToUpdate = await this.roleRepository.findOne({ where: { id } });
            if (!roleToUpdate) {
                throw new HttpException(
                    { status: false, errors: 'Rol no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const existingRole = await this.roleRepository.findOne({ where: { descripcion, id: Not(id) } });
            if (existingRole) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un rol con esa descripción.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const roleToDelete = await this.roleRepository.findOne({ where: { id } });
            if (!roleToDelete) {
                throw new HttpException(
                    { status: false, errors: 'Rol no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }
            const rol = await this.usuariosService.findByRole(id);
            if (rol.length > 0)
                throw new HttpException(
                    { status: false, errors: ['Rol no puede ser eliminado por que tiene usuarios.'] },
                    HttpStatus.ACCEPTED,
                );
        }

        return true;
    }
}
