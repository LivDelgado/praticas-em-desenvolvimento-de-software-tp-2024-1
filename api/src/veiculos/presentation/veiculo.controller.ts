import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../http-exception.filter';
import { VeiculosService } from '../core/veiculo.service';
import { VeiculoDto } from './veiculo.dto';

@Controller('veiculos')
@UseFilters(new HttpExceptionFilter())
export class VeiculoController {
  constructor(private veiculoService: VeiculosService) {}

  @Post()
  async post(@Body() veiculo: VeiculoDto): Promise<VeiculoDto> {
    return this.veiculoService.create(veiculo);
  }
}
