import { Motorista } from 'src/motorista/core/motorista';

export abstract class IAlocacaoService {
  abstract listarMotoristasDisponiveis(): Promise<Motorista[]>;
  abstract alocarMotorista(
    motoristaId: number,
    veiculoId: number,
  ): Promise<Motorista>;
  abstract liberarMotorista(motoristaId: number): Promise<Motorista>;
}
