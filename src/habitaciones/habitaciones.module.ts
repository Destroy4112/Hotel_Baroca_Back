import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspaciosModule } from 'src/espacios/espacios.module';
import { ValidationsModule } from 'src/validations/validations.module';
import { Habitacione } from './entities/habitacione.entity';
import { HabitacionesController } from './habitaciones.controller';
import { HabitacionesService } from './habitaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacione]), ValidationsModule, EspaciosModule],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
  exports: [HabitacionesService]
})
export class HabitacionesModule { }
