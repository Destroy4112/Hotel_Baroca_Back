import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { EspaciosModule } from './espacios/espacios.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { PreregistrosModule } from './preregistros/preregistros.module';
import { ReservasModule } from './reservas/reservas.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ValidationsModule } from './validations/validations.module';
import { ValidationsService } from './validations/validations.service';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
    }),
    RolesModule,
    UsuariosModule,
    EmpleadosModule,
    ValidationsModule,
    AuthModule,
    ClientesModule,
    EspaciosModule,
    PreregistrosModule,
    HabitacionesModule,
    ReservasModule,
    NotificacionesModule
  ],
  controllers: [AppController],
  providers: [AppService, ValidationsService],
})
export class AppModule { }
