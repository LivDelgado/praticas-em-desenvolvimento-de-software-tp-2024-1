import { Manutencao } from '../../manutencao.entity';

export abstract class IManutencaoRepository {
  abstract save(manutencao: Partial<Manutencao>): Promise<Manutencao>;
  abstract update(
    id: number,
    manutencao: Partial<Manutencao>,
  ): Promise<Manutencao>;
  abstract deleteById(id: number);
  abstract findByVeiculoId(veiculoId: number): Promise<Manutencao[]>;
}
