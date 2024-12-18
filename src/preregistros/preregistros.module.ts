import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from 'src/clientes/clientes.module';
import { EspaciosModule } from 'src/espacios/espacios.module';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';
import { ValidationsModule } from 'src/validations/validations.module';
import { Preregistro } from './entities/preregistro.entity';
import { PreregistrosController } from './preregistros.controller';
import { PreregistrosService } from './preregistros.service';

@Module({
  imports: [TypeOrmModule.forFeature([Preregistro]), ValidationsModule, ClientesModule, EspaciosModule, NotificacionesModule],
  controllers: [PreregistrosController],
  providers: [PreregistrosService],
  exports: [PreregistrosService]
})
export class PreregistrosModule { }
