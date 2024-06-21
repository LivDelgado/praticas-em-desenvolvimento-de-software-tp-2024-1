import { Inject, Injectable } from '@nestjs/common';
import { VeiculosDataSource } from 'src/veiculos/adapters/database/veiculo.datasource';
import { ManutencaoInvalidaException } from './manutencao.exceptions';
import { IManutencaoService } from './ports/inbound/IManutencaoService';
import { IManutencaoRepository } from './ports/outbound/IManutencaoRepository';
import { Manutencao } from './manutencao';

@Injectable()
export class ManutencaoService implements IManutencaoService {
  constructor(
    private readonly manutencaoDataSource: IManutencaoRepository,
    @Inject(VeiculosDataSource)
    private readonly veiculosDataSource: VeiculosDataSource,
  ) {}

  async create(veiculoId: number, manutencao: Manutencao): Promise<Manutencao> {
    const veiculo = await this.validateManutencao(veiculoId, manutencao);

    manutencao.veiculo = veiculo;
    const manutencaoCriada = await this.manutencaoDataSource.save(manutencao);

    return manutencaoCriada;
  }

  async update(
    veiculoId: number,
    id: number,
    manutencao: Manutencao,
  ): Promise<Manutencao> {
    const veiculo = await this.validateManutencao(veiculoId, manutencao, id);

    manutencao.veiculo = veiculo;
    const manutencaoCriada = await this.manutencaoDataSource.update(
      id,
      manutencao,
    );

    return manutencaoCriada;
  }

  async deleteById(id: number) {
    await this.manutencaoDataSource.deleteById(id);
  }

  async list(veiculoId: number): Promise<Manutencao[]> {
    const manutencoes = await this.manutencaoDataSource.findByVeiculoId(
      veiculoId,
    );
    return manutencoes;
  }

  private async validateManutencao(
    veiculoId: number,
    manutencao: Manutencao,
    manutencaoId: number | undefined = undefined,
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
          it.id != manutencaoId &&
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
