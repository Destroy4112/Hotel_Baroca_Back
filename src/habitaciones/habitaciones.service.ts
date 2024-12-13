import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHabitacioneDto } from './dto/create-habitacione.dto';
import { UpdateHabitacioneDto } from './dto/update-habitacione.dto';
import { Habitacione } from './entities/habitacione.entity';

@Injectable()
export class HabitacionesService {

  constructor(@InjectRepository(Habitacione) private readonly repository: Repository<Habitacione>) { }

  async create(createHabitacioneDto: CreateHabitacioneDto) {
    const habitacion = await this.repository.save(createHabitacioneDto);
    return {
      status: true,
      message: 'Habitacion creada exitosamente',
      data: habitacion
    };
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id }, order: { piso: 'ASC', nombre_habitacion: 'ASC' } });
  }

  async findByHotel(espacio: number) {
    return await this.repository.find({ where: { espacio: { id: espacio } }, order: { piso: 'ASC', nombre_habitacion: 'ASC' } });
  }

  async findByTipoYHotel(tipo: string, espacio: number) {
    return await this.repository.find({ where: { espacio: { id: espacio }, tipo_habitacion: tipo }, order: { piso: 'ASC', nombre_habitacion: 'ASC' } });
  }

  async update(id: number, updateHabitacioneDto: UpdateHabitacioneDto) {
    const habitacion = await this.repository.findOne({ where: { id } });
    Object.assign(habitacion, updateHabitacioneDto);
    const response = await this.repository.save(habitacion);
    return {
      status: true,
      message: 'Habitacion actualizada exitosamente',
      data: response
    };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return {
      status: true,
      message: 'Habitacion eliminada exitosamente'
    }
  }
}
