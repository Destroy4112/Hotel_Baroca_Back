import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { Espacio } from './entities/espacio.entity';

@Injectable()
export class EspaciosService {

  constructor(
    @InjectRepository(Espacio) private readonly repository: Repository<Espacio>,
  ) { }

  async create(createEspacioDto: CreateEspacioDto) {
    const result = await this.repository.save(createEspacioDto);
    return {
      status: true,
      message: 'Espacio creado exitosamente',
      data: result
    };
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findByType(tipo: string) {
    const espacio = await this.repository.find({ where: { tipo_espacio: tipo } });
    if (!espacio) return new HttpException({ status: false, errors: 'Espacio no encontrado.' }, HttpStatus.NOT_FOUND);
    return espacio;
  }

  async update(id: number, updateEspacioDto: UpdateEspacioDto) {
    const espacio = await this.repository.findOne({ where: { id } });
    Object.assign(espacio, updateEspacioDto);
    const result = await this.repository.save(espacio);
    return {
      status: true,
      message: 'Espacio actualizado exitosamente',
      data: result
    }
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return {
      status: true,
      message: 'Espacio eliminado exitosamente'
    };
  }
}
