import { Veiculo } from 'src/veiculos/core/veiculo';
import { Gestor } from 'src/gestor/core/gestor';

export class Manutencao {
  id: number | undefined;
  dataInicio: Date;
  dataFim: Date;
  veiculo: Veiculo;
}
