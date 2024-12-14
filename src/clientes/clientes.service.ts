import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationsService } from 'src/validations/validations.service';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
    private readonly validationService: ValidationsService
  ) { }

  async create(createClienteDto: CreateClienteDto) {
    await this.validationService.validateDto(CreateClienteDto, createClienteDto);
    const result = await this.repository.save(createClienteDto);
    return {
      status: true,
      message: 'Cliente creado correctamente.',
      data: result
    };
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findByDocumento(documento: string) {
    return await this.repository.findOne({ where: { documento } });
  }

  async update(updateClienteDto: UpdateClienteDto) {
    await this.validationService.validateDto(CreateClienteDto, updateClienteDto);
    const cliente = await this.repository.findOne({ where: { documento: updateClienteDto.documento } });
    Object.assign(cliente, updateClienteDto);
    const result = await this.repository.save(cliente);
    return {
      status: true,
      message: 'Cliente actualizado correctamente.',
      data: result
    };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return {
      status: true,
      message: 'Cliente eliminado correctamente.',
    };
  }
}
