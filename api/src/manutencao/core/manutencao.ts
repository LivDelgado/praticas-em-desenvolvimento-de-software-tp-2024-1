import { Veiculo } from 'src/veiculos/core/veiculo';

export class Manutencao {
  id: number | undefined;
  dataInicio: Date;
  dataFim: Date;
  veiculo: Veiculo;
}
