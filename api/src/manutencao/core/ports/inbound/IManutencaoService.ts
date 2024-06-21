import {
  GetManutencaoDto,
  ManutencaoDto,
} from 'src/manutencao/adapters/presentation/manutencao.dto';

export abstract class IManutencaoService {
  abstract create(
    veiculoId: number,
    manutencao: ManutencaoDto,
  ): Promise<GetManutencaoDto>;
  abstract update(
    veiculoId: number,
    id: number,
    manutencao: ManutencaoDto,
  ): Promise<GetManutencaoDto>;
  abstract deleteById(id: number);
  abstract list(veiculoId: number): Promise<GetManutencaoDto[]>;
}
