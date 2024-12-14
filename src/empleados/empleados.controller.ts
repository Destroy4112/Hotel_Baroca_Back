import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { EmpleadosGuard } from './empleados.guard';
import { EmpleadosService } from './empleados.service';

@Controller('api/empleados')
@UseGuards(JwtAuthGuard)
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) { }

  @Post()
  @UseGuards(EmpleadosGuard)
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return await this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  async findAll() {
    return await this.empleadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.empleadosService.findOne(id);
  }

  @Put(':id')
  @UseGuards(EmpleadosGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  @UseGuards(EmpleadosGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.empleadosService.remove(id);
  }
}
