import { Inject, Injectable } from '@nestjs/common';
import { ManutencaoDataSource } from '../adapters/database/manutencao.datasource';

@Injectable()
export class ManutencaoService {
  constructor(
    @Inject(ManutencaoDataSource)
    private readonly manutencaoDataSource: ManutencaoDataSource,
  ) {}

  // async create(veiculo: VeiculoDto): Promise<GetVeiculoDto> {
  //   const veiculoCriado = await this.manutencaoDataSource.save(
  //     VeiculoDto.toDomain(veiculo),
  //   );

  //   return GetVeiculoDto.fromVeiculo(veiculoCriado);
  // }

  // async update(id: number, veiculo: VeiculoDto): Promise<GetVeiculoDto> {
  //   const veiculoCriado = await this.manutencaoDataSource.update(
  //     id,
  //     VeiculoDto.toDomain(veiculo),
  //   );

  //   return GetVeiculoDto.fromVeiculo(veiculoCriado);
  // }

  async deleteById(id: number) {
    await this.manutencaoDataSource.deleteById(id);
  }
}
