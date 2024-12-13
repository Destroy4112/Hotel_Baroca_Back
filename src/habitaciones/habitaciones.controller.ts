import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateHabitacioneDto } from './dto/create-habitacione.dto';
import { UpdateHabitacioneDto } from './dto/update-habitacione.dto';
import { HabitacionesGuard } from './habitaciones.guard';
import { HabitacionesService } from './habitaciones.service';

@Controller('api/habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) { }

  @Post()
  @UseGuards(HabitacionesGuard)
  async create(@Body() createHabitacioneDto: CreateHabitacioneDto) {
    return await this.habitacionesService.create(createHabitacioneDto);
  }

  @Get()
  async findAll() {
    return await this.habitacionesService.findAll();
  }

  @Get('hotel/:id')
  async findByHotel(@Param('id', ParseIntPipe) id: number) {
    return await this.habitacionesService.findByHotel(id);
  }

  @Get('tipo/:tipo/hotel/:hotel')
  async findByTipoYHotel(@Param('tipo') tipo: string, @Param('hotel') hotel: number) {
    return await this.habitacionesService.findByTipoYHotel(tipo, hotel);
  }

  @Put(':id')
  @UseGuards(HabitacionesGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateHabitacioneDto: UpdateHabitacioneDto) {
    return await this.habitacionesService.update(id, updateHabitacioneDto);
  }

  @Delete(':id')
  @UseGuards(HabitacionesGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.habitacionesService.remove(id);
  }
}
