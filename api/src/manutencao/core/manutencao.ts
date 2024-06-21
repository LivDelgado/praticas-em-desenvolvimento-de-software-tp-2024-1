import { Veiculo } from 'src/veiculos/core/veiculo.entity';

export class Manutencao {
  id: number | undefined;
  dataInicio: Date;
  dataFim: Date;
  veiculo: Veiculo;
}
