import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionesModule } from 'src/habitaciones/habitaciones.module';
import { PreregistrosModule } from 'src/preregistros/preregistros.module';
import { ValidationsModule } from 'src/validations/validations.module';
import { Reserva } from './entities/reserva.entity';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva]), ValidationsModule, PreregistrosModule, HabitacionesModule],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule { }
