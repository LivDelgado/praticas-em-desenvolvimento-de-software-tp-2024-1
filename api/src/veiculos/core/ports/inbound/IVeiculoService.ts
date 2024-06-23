import { Veiculo } from '../../veiculo';

export abstract class IVeiculoService {
  abstract findOne(
    montadora: string,
    modelo: string,
    ano: string,
  ): Promise<Veiculo>;
  abstract create(veiculo: Veiculo): Promise<Veiculo>;
  abstract update(id: number, veiculo: Veiculo): Promise<Veiculo>;
  abstract list(): Promise<Veiculo[]>;
  abstract getById(id: number): Promise<Veiculo>;
  abstract deleteById(id: number): Promise<void>;
}
