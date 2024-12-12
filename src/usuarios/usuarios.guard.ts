import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class usuariosGuard implements CanActivate {
    constructor(@InjectRepository(Usuario) private readonly repository: Repository<Usuario>) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { documento } = body;

            const exist = await this.repository.findOne({ where: { documento } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un usuario con este documento.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { documento } = body;

            const roleToUpdate = await this.repository.findOne({ where: { id } });
            if (!roleToUpdate) {
                throw new HttpException(
                    { status: false, errors: 'Usuario no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const exist = await this.repository.findOne({ where: { documento, id: Not(id) } });
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un usuario con este documento.'] },
                    HttpStatus.OK,
                );
            }
        }

        return true;
    }
}
