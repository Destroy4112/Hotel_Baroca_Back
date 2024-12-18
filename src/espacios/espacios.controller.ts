import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { EspaciosGuard } from './espacios.guard';
import { EspaciosService } from './espacios.service';

@Controller('api/espacios')
export class EspaciosController {
  constructor(private readonly espaciosService: EspaciosService) { }

  @Post()
  @UseGuards(JwtAuthGuard, EspaciosGuard)
  async create(@Body() createEspacioDto: CreateEspacioDto) {
    return await this.espaciosService.create(createEspacioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.espaciosService.findAll();
  }

  @Get(':tipo')
  async findByType(@Param('tipo') tipo: string) {
    return await this.espaciosService.findByType(tipo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, EspaciosGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEspacioDto: UpdateEspacioDto) {
    return await this.espaciosService.update(id, updateEspacioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, EspaciosGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.espaciosService.remove(id);
  }
}
