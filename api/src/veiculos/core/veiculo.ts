import { Manutencao } from 'src/manutencao/core/manutencao';
import { Motorista } from 'src/motorista/core/motorista';

export class Veiculo {
  id: number | undefined;
  montadora: string;
  modelo: string;
  ano: string;
  dataAquisicao: Date;

  manutencoes: Manutencao[] | undefined;

  motorista: Motorista | undefined;

  getStatus(): StatusVeiculo {
    if (
      this.manutencoes?.length &&
      new Date(this.manutencoes[0].dataInicio) <= new Date()
    ) {
      return StatusVeiculo.EM_MANUTENCAO;
    }

    if (this.motorista) {
      return StatusVeiculo.ALOCADO;
    }

    return StatusVeiculo.DISPONIVEL;
  }

  getNextManutencaoDate() {
    if (this.manutencoes?.length) {
      const today = new Date();

      const nextManutencao = this.manutencoes.filter(
        (manutencao) => new Date(manutencao.dataInicio) >= today,
      )[0];

      if (nextManutencao) return new Date(nextManutencao.dataInicio);

      return null;
    }
  }

  getNomeMotorista() {
    return this.motorista
      ? this.motorista.nome + ' ' + this.motorista.sobrenome
      : null;
  }
}

export enum StatusVeiculo {
  DISPONIVEL = 'DISPONÍVEL',
  EM_MANUTENCAO = 'EM MANUTENÇÃO',
  ALOCADO = 'ALOCADO',
}
