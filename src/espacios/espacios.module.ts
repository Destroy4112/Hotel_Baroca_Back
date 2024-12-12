import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationsModule } from 'src/validations/validations.module';
import { Espacio } from './entities/espacio.entity';
import { EspaciosController } from './espacios.controller';
import { EspaciosService } from './espacios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Espacio]), ValidationsModule],
  controllers: [EspaciosController],
  providers: [EspaciosService],
  exports: [EspaciosService]
})
export class EspaciosModule { }
