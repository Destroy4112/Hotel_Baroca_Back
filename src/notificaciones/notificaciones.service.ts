import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { Notificacione } from './entities/notificacione.entity';
import { NotificacionesGateway } from './notificaciones.gateway';

@Injectable()
export class NotificacionesService {

  constructor(
    @InjectRepository(Notificacione) private readonly repository: Repository<Notificacione>,
    private readonly notificationsGateway: NotificacionesGateway,
  ) { }

  async create(createNotificacioneDto: CreateNotificacioneDto) {
    try {
      const notificacione = this.repository.create(createNotificacioneDto);
      const savedNotificacione = await this.repository.save(notificacione);
      this.notificationsGateway.sendNotification(savedNotificacione);
      return savedNotificacione;
    } catch (error) {
      throw new Error(`Error al crear la notificación: ${error.message}`);
    }
  }

  async findAll() {
    return await this.repository.find({ order: { fechaCreacion: 'DESC' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  async markAsRead(notificationIds: number[]) {
    try {
      await this.repository.update(
        { id: In(notificationIds), leido: false },
        { leido: true },
      );
      return 'Notificaciones marcadas como leídas exitosamente.';
    } catch (error) {
      throw new Error(`Error al marcar notificaciones como leídas: ${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
  }
}
