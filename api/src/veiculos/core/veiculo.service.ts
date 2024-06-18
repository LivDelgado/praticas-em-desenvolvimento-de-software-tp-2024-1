import { Inject, Injectable } from '@nestjs/common';
import { VeiculosDataSource } from '../adapters/database/veiculo.datasource';
import { VeiculoDto } from '../presentation/veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(
    @Inject(VeiculosDataSource)
    private readonly veiculosDataSource: VeiculosDataSource,
  ) {}

  async findOne(montadora: string, modelo: string, ano: string) {
    const veiculo = await this.veiculosDataSource.findOne(
      montadora,
      modelo,
      ano,
    );

    if (veiculo) {
      return VeiculoDto.fromVeiculo(veiculo);
    }

    return null;
  }

  async create(veiculo: VeiculoDto): Promise<VeiculoDto> {
    const veiculoCriado = await this.veiculosDataSource.save(
      VeiculoDto.toDomain(veiculo),
    );

    return VeiculoDto.fromVeiculo(veiculoCriado);
  }
}
