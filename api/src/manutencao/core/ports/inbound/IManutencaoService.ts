import { Manutencao } from '../../manutencao';

export abstract class IManutencaoService {
  abstract create(
    veiculoId: number,
    manutencao: Manutencao,
  ): Promise<Manutencao>;
  abstract update(
    veiculoId: number,
    id: number,
    manutencao: Manutencao,
  ): Promise<Manutencao>;
  abstract deleteById(id: number);
  abstract list(veiculoId: number): Promise<Manutencao[]>;
}
