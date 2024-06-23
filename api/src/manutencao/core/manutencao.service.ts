import { Injectable } from '@nestjs/common';
import { ManutencaoInvalidaException } from './manutencao.exceptions';
import { IManutencaoService } from './ports/inbound/IManutencaoService';
import { IManutencaoRepository } from './ports/outbound/IManutencaoRepository';
import { Manutencao } from './manutencao';
import { IVeiculoRepository } from 'src/veiculos/core/ports/outbound/IVeiculoRepository';
import { IGestorRepository } from 'src/gestor/core/ports/outbound/IGestorRepository';
import { INotificacaoService } from 'src/notificacoes/core/ports/inbound/INotificacaoService';
import { NotificacaoManutencaoAgendada } from './notificacaoManutencaoAgendada';

@Injectable()
export class ManutencaoService implements IManutencaoService {
  constructor(
    private readonly manutencaoRepository: IManutencaoRepository,
    private readonly veiculoRepository: IVeiculoRepository,
    private readonly gestorRepository: IGestorRepository,
    private readonly notificacaoService: INotificacaoService,
  ) {}

  async create(veiculoId: number, manutencao: Manutencao): Promise<Manutencao> {
    const veiculo = await this.validateManutencao(veiculoId, manutencao);
    manutencao.veiculo = veiculo;

    const created = await this.manutencaoRepository.save(manutencao);

    if (created) await this.notificarGestores(manutencao);

    return created;
  }

  async update(
    veiculoId: number,
    id: number,
    manutencao: Manutencao,
  ): Promise<Manutencao> {
    const veiculo = await this.validateManutencao(veiculoId, manutencao, id);
    manutencao.veiculo = veiculo;

    const updated = await this.manutencaoRepository.update(id, manutencao);

    if (updated) await this.notificarGestores(manutencao);

    return updated;
  }

  async deleteById(id: number): Promise<void> {
    await this.manutencaoRepository.deleteById(id);
  }

  async list(veiculoId: number): Promise<Manutencao[]> {
    return this.manutencaoRepository.findByVeiculoId(veiculoId);
  }

  private async notificarGestores(manutencao: Manutencao) {
    const gestores = await this.gestorRepository.findAll();

    if (!gestores.length) return;

    this.notificacaoService.agendarNotificacao(
      new NotificacaoManutencaoAgendada(manutencao, gestores),
    );
  }

  private async validateManutencao(
    veiculoId: number,
    manutencao: Manutencao,
    manutencaoId: number | undefined = undefined,
  ) {
    const veiculo = await this.veiculoRepository.findById(veiculoId, true);
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
