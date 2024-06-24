import { Veiculo } from 'src/veiculos/core/veiculo';

export class Motorista {
  id: number | undefined;
  nome: string;
  sobrenome: string;
  email: string;
  imagemAvatar: string;

  veiculo: Veiculo | undefined;

  estaDisponivel(): boolean {
    return Boolean(this.veiculo);
  }

  getNomeVeiculo(): string {
    return this.veiculo
      ? this.veiculo.montadora +
          ' ' +
          this.veiculo.modelo +
          ' ' +
          this.veiculo.ano
      : null;
  }
}
