import { Manutencao } from 'src/manutencao/core/manutencao';

export class Veiculo {
  id: number | undefined;
  montadora: string;
  modelo: string;
  ano: string;
  dataAquisicao: Date;

  manutencoes: Manutencao[] | undefined;

  getStatus(): StatusVeiculo {
    if (
      this.manutencoes?.length &&
      new Date(this.manutencoes[0].dataInicio) <= new Date()
    ) {
      return StatusVeiculo.EM_MANUTENCAO;
    }
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
}

export enum StatusVeiculo {
  DISPONIVEL = 'DISPONÍVEL',
  EM_MANUTENCAO = 'EM MANUTENÇÃO',
  ALOCADO = 'ALOCADO',
}
