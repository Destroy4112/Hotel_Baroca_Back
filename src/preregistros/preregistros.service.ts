import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePreregistroDto } from './dto/create-preregistro.dto';
import { Preregistro } from './entities/preregistro.entity';

@Injectable()
export class PreregistrosService {

  constructor(
    @InjectRepository(Preregistro) private repository: Repository<Preregistro>,
  ) { }

  async create(createPreregistroDto: CreatePreregistroDto) {
    const preregistro = await this.repository.save(createPreregistroDto);
    return {
      status: true,
      message: 'Preregistro creado exitosamente',
      data: preregistro
    };
  }

  async findPendientes() {
    return await this.repository.find({ where: { estado: 'En proceso' }, relations: ['espacio', 'cliente'] });
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async updateEstado(id: number, estado: string) {
    const preregistro = await this.repository.findOne({ where: { id } });
    if (!preregistro) throw new HttpException({ status: false, errors: 'Preregistro no encontrado.' }, HttpStatus.NOT_FOUND);
    preregistro.estado = estado;
    return await this.repository.save(preregistro);
  }

}