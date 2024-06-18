import { Inject, Injectable } from '@nestjs/common';
import { VeiculosDataSource } from '../adapters/database/veiculo.datasource';
import { GetVeiculoDto, VeiculoDto } from '../presentation/veiculo.dto';

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
      return GetVeiculoDto.fromVeiculo(veiculo);
    }

    return null;
  }

  async create(veiculo: VeiculoDto): Promise<GetVeiculoDto> {
    const veiculoCriado = await this.veiculosDataSource.save(
      VeiculoDto.toDomain(veiculo),
    );

    return GetVeiculoDto.fromVeiculo(veiculoCriado);
  }

  async list(): Promise<GetVeiculoDto[]> {
    const veiculos = await this.veiculosDataSource.findAll();
    return veiculos.map((it) => GetVeiculoDto.fromVeiculo(it));
  }

  async getById(id: number): Promise<GetVeiculoDto> {
    const veiculo = await this.veiculosDataSource.findById(id);
    return GetVeiculoDto.fromVeiculo(veiculo);
  }

  async deleteById(id: number) {
    await this.veiculosDataSource.deleteById(id);
  }
}
