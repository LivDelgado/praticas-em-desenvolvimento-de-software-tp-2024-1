import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../http-exception.filter';
import { VeiculosService } from '../core/veiculo.service';
import { GetVeiculoDto, VeiculoDto } from './veiculo.dto';

@Controller('veiculos')
@UseFilters(new HttpExceptionFilter())
export class VeiculoController {
  constructor(private veiculoService: VeiculosService) {}

  @Post()
  async post(@Body() veiculo: VeiculoDto): Promise<GetVeiculoDto> {
    return this.veiculoService.create(veiculo);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async list(): Promise<GetVeiculoDto[]> {
    return this.veiculoService.list();
  }

  @Get('/:veiculoId')
  @UseFilters(new HttpExceptionFilter())
  async get(
    @Param('veiculoId', new ParseIntPipe()) veiculoId,
  ): Promise<GetVeiculoDto> {
    return this.veiculoService.getById(veiculoId);
  }
}
