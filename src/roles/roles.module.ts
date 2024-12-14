import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ValidationsModule } from 'src/validations/validations.module';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), ValidationsModule, UsuariosModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
