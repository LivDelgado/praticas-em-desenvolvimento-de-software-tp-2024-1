import { Inject, Injectable } from '@nestjs/common';
import { ManutencaoDataSource } from '../adapters/database/manutencao.datasource';
import {
  GetManutencaoDto,
  ManutencaoDto,
} from '../presentation/manutencao.dto';
import { VeiculosDataSource } from 'src/veiculos/adapters/database/veiculo.datasource';
import { ManutencaoInvalidaException } from './manutencao.exceptions';

@Injectable()
export class ManutencaoService {
  constructor(
    @Inject(ManutencaoDataSource)
    private readonly manutencaoDataSource: ManutencaoDataSource,
    @Inject(VeiculosDataSource)
    private readonly veiculosDataSource: VeiculosDataSource,
  ) {}

  async create(veiculoId: number, manutencao: ManutencaoDto) {
    const veiculo = await this.veiculosDataSource.findById(veiculoId, true);
    if (!veiculo) {
      throw new ManutencaoInvalidaException(
        'Não é possível inserir uma manutenção para um veículo inexistente.',
      );
    }

    const manutencoes = veiculo?.manutencoes;
    if (
      manutencoes.some(
        (it) =>
          (it.dataInicio <= manutencao.dataFim &&
            manutencao.dataFim <= it.dataFim) ||
          (it.dataInicio <= manutencao.dataInicio &&
            manutencao.dataInicio <= it.dataFim) ||
          (it.dataInicio >= manutencao.dataInicio &&
            manutencao.dataFim >= it.dataFim),
      )
    ) {
      throw new ManutencaoInvalidaException(
        'Não é possível inserir uma manutenção que conflite com uma já existente.',
      );
    }

    const manutencaoCriada = await this.manutencaoDataSource.save(
      ManutencaoDto.toDomain(manutencao, veiculo),
    );

    return GetManutencaoDto.fromDomain(manutencaoCriada);
  }

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
