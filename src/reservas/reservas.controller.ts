import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservasGuard } from './reservas.guard';
import { ReservasService } from './reservas.service';

@Controller('api/reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) { }

  @Post()
  @UseGuards(ReservasGuard)
  async create(@Body() createReservaDto: CreateReservaDto) {
    return await this.reservasService.create(createReservaDto);
  }

  @Get()
  async findAll() {
    return await this.reservasService.findAll();
  }

}
