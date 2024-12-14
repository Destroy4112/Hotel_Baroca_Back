import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitacionesService } from 'src/habitaciones/habitaciones.service';
import { PreregistrosService } from 'src/preregistros/preregistros.service';
import { DataSource, Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {

  constructor(
    @InjectRepository(Reserva) private readonly repository: Repository<Reserva>,
    private readonly preregistrosService: PreregistrosService,
    private readonly habitacionesService: HabitacionesService,
    private readonly dataSource: DataSource,
  ) { }

  async create(createReservaDto: CreateReservaDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { habitacion, preregistro } = createReservaDto;
      const preregistroUpdated = await this.preregistrosService.updateEstado(preregistro, 'Reservado');
      const habitacionUpdated = await this.habitacionesService.updateEstado(habitacion, 'No disponible');
      const newReserva = { ...createReservaDto, preregistro: preregistroUpdated, habitacion: habitacionUpdated };
      const reserva = this.repository.create(newReserva);
      const response = await queryRunner.manager.save(Reserva, reserva);
      await queryRunner.commitTransaction();
      return {
        status: true,
        message: 'Reserva creada exitosamente',
        data: response,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.repository.find({ relations: ['preregistro.cliente', 'preregistro.espacio', 'habitacion'] });
  }

}
