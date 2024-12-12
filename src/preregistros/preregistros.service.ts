import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePreregistroDto } from './dto/create-preregistro.dto';
import { UpdatePreregistroDto } from './dto/update-preregistro.dto';
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
    return await this.repository.find({ where: { estado: 'En proceso' }, relations: ['espacio, cliente'] }); 
  }

  findOne(id: number) {
    return `This action returns a #${id} preregistro`;
  }

  update(id: number, updatePreregistroDto: UpdatePreregistroDto) {
    return `This action updates a #${id} preregistro`;
  }

  remove(id: number) {
    return `This action removes a #${id} preregistro`;
  }
}
