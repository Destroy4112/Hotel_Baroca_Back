import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacione } from './entities/notificacione.entity';
import { NotificacionesController } from './notificaciones.controller';
import { NotificacionesService } from './notificaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacione])],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  exports: [NotificacionesService]
})
export class NotificacionesModule { }
