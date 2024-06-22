import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../../http-exception.filter';
import { GetVeiculoDto, VeiculoDto } from './veiculo.dto';
import { IVeiculoService } from 'src/veiculos/core/ports/inbound/IVeiculoService';

@Controller('veiculos')
@UseFilters(new HttpExceptionFilter())
export class VeiculoController {
  constructor(private veiculoService: IVeiculoService) {}

  @Put('/:veiculoId')
  async put(
    @Param('veiculoId', new ParseIntPipe()) veiculoId,
    @Body() veiculo: VeiculoDto,
  ): Promise<GetVeiculoDto> {
    const updated = await this.veiculoService.update(
      veiculoId,
      VeiculoDto.toDomain(veiculo),
    );
    return GetVeiculoDto.fromDomain(updated);
  }

  @Get('/:veiculoId')
  @UseFilters(new HttpExceptionFilter())
  async get(
    @Param('veiculoId', new ParseIntPipe()) veiculoId,
  ): Promise<GetVeiculoDto> {
    const veiculo = await this.veiculoService.getById(veiculoId);
    return GetVeiculoDto.fromDomain(veiculo);
  }

  @Delete('/:veiculoId')
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('veiculoId', new ParseIntPipe()) veiculoId) {
    await this.veiculoService.deleteById(veiculoId);
  }

  @Post()
  async post(@Body() veiculo: VeiculoDto): Promise<GetVeiculoDto> {
    const created = await this.veiculoService.create(
      VeiculoDto.toDomain(veiculo),
    );
    return GetVeiculoDto.fromDomain(created);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async list(): Promise<GetVeiculoDto[]> {
    const veiculos = await this.veiculoService.list();
    return veiculos.map((it) => GetVeiculoDto.fromDomain(it));
  }
}
