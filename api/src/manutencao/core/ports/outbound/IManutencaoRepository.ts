import { Manutencao } from '../../manutencao';

export abstract class IManutencaoRepository {
  abstract save(manutencao: Manutencao): Promise<Manutencao>;
  abstract update(id: number, manutencao: Manutencao): Promise<Manutencao>;
  abstract deleteById(id: number);
  abstract findByVeiculoId(veiculoId: number): Promise<Manutencao[]>;
}
