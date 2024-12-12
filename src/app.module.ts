import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ValidationsService } from './validations/validations.service';
import { ValidationsModule } from './validations/validations.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { EspaciosModule } from './espacios/espacios.module';
import { PreregistrosModule } from './preregistros/preregistros.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RolesModule,
    UsuariosModule,
    EmpleadosModule,
    ValidationsModule,
    AuthModule,
    ClientesModule,
    EspaciosModule,
    PreregistrosModule
  ],
  controllers: [AppController],
  providers: [AppService, ValidationsService],
})
export class AppModule { }
