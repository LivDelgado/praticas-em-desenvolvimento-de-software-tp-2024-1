import { Inject, Injectable } from '@nestjs/common';
import {
  GetManutencaoDto,
  ManutencaoDto,
} from '../adapters/presentation/manutencao.dto';
import { VeiculosDataSource } from 'src/veiculos/adapters/database/veiculo.datasource';
import { ManutencaoInvalidaException } from './manutencao.exceptions';
import { IManutencaoService } from './ports/inbound/IManutencaoService';
import { IManutencaoRepository } from './ports/outbound/IManutencaoRepository';

@Injectable()
export class ManutencaoService implements IManutencaoService {
  constructor(
    private readonly manutencaoDataSource: IManutencaoRepository,
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
    veiculoId: number,
    id: number,
    manutencao: ManutencaoDto,
  ): Promise<GetManutencaoDto> {
    const veiculo = await this.validateManutencao(veiculoId, manutencao, id);

    const manutencaoCriada = await this.manutencaoDataSource.update(
      id,
      ManutencaoDto.toDomain(manutencao, veiculo),
    );

    return GetManutencaoDto.fromDomain(manutencaoCriada);
  }

  async deleteById(id: number) {
    await this.manutencaoDataSource.deleteById(id);
  }

  async list(veiculoId: number): Promise<GetManutencaoDto[]> {
    const manutencoes = await this.manutencaoDataSource.findByVeiculoId(
      veiculoId,
    );
    return manutencoes.map((it) => GetManutencaoDto.fromDomain(it));
  }

  private async validateManutencao(
    veiculoId: number,
    manutencao: ManutencaoDto,
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
