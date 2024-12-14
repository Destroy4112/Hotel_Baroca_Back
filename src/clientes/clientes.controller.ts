import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth.guard';
import { ClientesGuard } from './clientes.guard';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('api/clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    const cliente = await this.clientesService.findByDocumento(createClienteDto.documento);
    if (cliente) {
      return await this.clientesService.update(createClienteDto);
    } else {
      return await this.clientesService.create(createClienteDto);
    }
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findByDocumento(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ClientesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.remove(id);
  }
}
