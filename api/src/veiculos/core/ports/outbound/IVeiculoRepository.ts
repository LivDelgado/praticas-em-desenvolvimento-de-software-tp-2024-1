import { Veiculo } from '../../veiculo';

export abstract class IVeiculoRepository {
  abstract save(veiculo: Veiculo): Promise<Veiculo>;
  abstract update(id: number, VeiculoEntity: Veiculo): Promise<Veiculo>;
  abstract findOne(
    montadora: string,
    modelo: string,
    ano: string,
  ): Promise<Veiculo>;
  abstract findById(id: number, returnManutencao: boolean): Promise<Veiculo>;
  abstract findAll(): Promise<Veiculo[]>;
  abstract deleteById(id: number);
}
