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
    const veiculo = await this.validateManutencao(veiculoId, manutencao);

    const manutencaoCriada = await this.manutencaoDataSource.save(
      ManutencaoDto.toDomain(manutencao, veiculo),
    );

    return GetManutencaoDto.fromDomain(manutencaoCriada);
  }

  async update(
    id: number,
    manutencao: ManutencaoDto,
  ): Promise<GetManutencaoDto> {
    const veiculo = await this.validateManutencao(id, manutencao);

    const manutencaoCriada = await this.manutencaoDataSource.update(
      id,
      ManutencaoDto.toDomain(manutencao, veiculo),
    );

    return GetManutencaoDto.fromDomain(manutencaoCriada);
  }

  async deleteById(id: number) {
    await this.manutencaoDataSource.deleteById(id);
  }

  private async validateManutencao(
    veiculoId: number,
    manutencao: ManutencaoDto,
  ) {
    const veiculo = await this.veiculosDataSource.findById(veiculoId, true);
    if (!veiculo) {
      throw new ManutencaoInvalidaException(
        'Não é possível inserir uma manutenção para um veículo inexistente.',
      );
    }

    const manutencoes = veiculo?.manutencoes;
    if (manutencao.dataFim <= manutencao.dataInicio) {
      throw new ManutencaoInvalidaException('Intervalo inválido');
    }

    if (
      manutencoes.some(
        (it) =>
          !(
            new Date(manutencao.dataInicio) > new Date(it.dataFim) ||
            new Date(manutencao.dataFim) < new Date(it.dataInicio)
          ),
      )
    ) {
      throw new ManutencaoInvalidaException(
        'Não é possível inserir uma manutenção que conflite com uma já existente.',
      );
    }

    return veiculo;
  }
}
