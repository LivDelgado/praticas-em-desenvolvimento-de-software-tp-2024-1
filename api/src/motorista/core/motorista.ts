import { Veiculo } from 'src/veiculos/core/veiculo';

export class Motorista {
  id: number | undefined;
  nome: string;
  sobrenome: string;
  email: string;
  imagemAvatar: string;

  veiculo: Veiculo | undefined;
}
