import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { Notificacione } from './entities/notificacione.entity';

@Injectable()
export class NotificacionesService {

  constructor(
    @InjectRepository(Notificacione) private readonly repository: Repository<Notificacione>,
  ) { }

  create(createNotificacioneDto: CreateNotificacioneDto) {
    const notificacione = this.repository.create(createNotificacioneDto);
    return this.repository.save(notificacione);
  }

  findAll() {
    const notificaciones = this.repository.find();
    return notificaciones;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
  }
}
