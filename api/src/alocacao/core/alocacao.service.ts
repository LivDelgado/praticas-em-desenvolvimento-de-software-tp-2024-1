import { Injectable } from '@nestjs/common';
import { IAlocacaoService } from './ports/inbound/IAlocacaoService';
import { Motorista } from 'src/motorista/core/motorista';
import { IVeiculoRepository } from 'src/veiculos/core/ports/outbound/IVeiculoRepository';
import { IMotoristaRepository } from 'src/motorista/core/ports/outbound/IMotoristaRepository';
import { AlocacaoInvalidaException } from './alocacao.exceptions';
import { StatusVeiculo } from 'src/veiculos/core/veiculo';

@Injectable()
export class AlocacaoService implements IAlocacaoService {
  constructor(
    private readonly motoristaRepository: IMotoristaRepository,
    private readonly veiculoRepository: IVeiculoRepository,
  ) {}

  async listarMotoristasDisponiveis(): Promise<Motorista[]> {
    const todosMotoristas = await this.motoristaRepository.findAll();

    const motoristasDisponiveis = todosMotoristas.filter((it) =>
      it.estaDisponivel(),
    );

    return motoristasDisponiveis;
  }

  async alocarMotorista(
    motoristaId: number,
    veiculoId: number,
  ): Promise<Motorista> {
    const motorista = await this.motoristaRepository.findById(motoristaId);
    if (!motorista)
      throw new AlocacaoInvalidaException('Motorista não encontrado');

    const veiculo = await this.veiculoRepository.findById(veiculoId, false);
    if (!veiculo) throw new AlocacaoInvalidaException('Veículo não encontrado');
    if (veiculo.emManutencao()) {
      throw new AlocacaoInvalidaException(
        'Veículo não pode ser alocado pois está em manutenção',
      );
    }

    motorista.veiculo = veiculo;
    return await this.motoristaRepository.save(motorista);
  }

  async liberarMotorista(motoristaId: number): Promise<Motorista> {
    const motorista = await this.motoristaRepository.findById(motoristaId);
    if (!motorista)
      throw new AlocacaoInvalidaException('Motorista não encontrado');

    motorista.veiculo = null;
    return await this.motoristaRepository.save(motorista);
  }
}
