import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {

  constructor(@InjectRepository(Reserva) private readonly repository: Repository<Reserva>,) { }

  async create(createReservaDto: CreateReservaDto) {
    const { } = createReservaDto;
    const response = await this.repository.save(createReservaDto);
    return {
      status: true,
      message: 'Reserva creada exitosamente',
      data: response
    };
  }

  async findAll() {
    return await this.repository.find();
  }

}
