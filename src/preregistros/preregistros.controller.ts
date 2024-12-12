import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreatePreregistroDto } from './dto/create-preregistro.dto';
import { PreregistrosGuard } from './preregistro.guard';
import { PreregistrosService } from './preregistros.service';

@Controller('api/preregistros')
export class PreregistrosController {
  constructor(private readonly preregistrosService: PreregistrosService) { }

  @Post()
  @UseGuards(PreregistrosGuard)
  async create(@Body() createPreregistroDto: CreatePreregistroDto) {
    return await this.preregistrosService.create(createPreregistroDto);
  }

  @Get()
  async findPendientes() {
    return await this.preregistrosService.findPendientes();
  }

}
