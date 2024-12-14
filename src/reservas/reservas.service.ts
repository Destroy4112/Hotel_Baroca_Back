import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitacionesService } from 'src/habitaciones/habitaciones.service';
import { PreregistrosService } from 'src/preregistros/preregistros.service';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {

  constructor(
    @InjectRepository(Reserva) private readonly repository: Repository<Reserva>,
    private readonly preregistrosService: PreregistrosService,
    private readonly habitacionesService: HabitacionesService
  ) { }

  async create(createReservaDto: CreateReservaDto) {
    const { habitacion, preregistro } = createReservaDto;
    await this.preregistrosService.updateEstado(preregistro.id, 'Reservado');
    await this.habitacionesService.updateEstado(habitacion.id, 'No disponible');
    const response = await this.repository.save(createReservaDto);
    return {
      status: true,
      message: 'Reserva creada exitosamente',
      data: response
    };
  }

  async findAll() {
    return await this.repository.find({ relations: ['preregistro.cliente', 'preregistro.espacio', 'habitacion'] });
  }

}
