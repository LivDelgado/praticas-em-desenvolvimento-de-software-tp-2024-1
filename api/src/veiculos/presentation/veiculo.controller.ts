import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../http-exception.filter';
import { VeiculosService } from '../core/veiculo.service';
import { VeiculoDto } from './veiculo.dto';
import { Veiculo } from '../core/veiculo.entity';

@Controller('veiculos')
@UseFilters(new HttpExceptionFilter())
export class VeiculoController {
  constructor(private veiculoService: VeiculosService) {}

  @Post()
  async post(@Body() veiculo: VeiculoDto): Promise<Veiculo> {
    return this.veiculoService.create({
      montadora: veiculo.montadora,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      dataAquisicao: veiculo.dataAquisicao,
      status: veiculo.status,
    });
  }
}
