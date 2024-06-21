import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { ManutencaoEntity } from './manutencao.entity';
import { IManutencaoRepository } from 'src/manutencao/core/ports/outbound/IManutencaoRepository';
import { Repository } from 'typeorm';
import { Manutencao } from 'src/manutencao/core/manutencao';

@Injectable()
@Dependencies(getRepositoryToken(ManutencaoEntity))
export class ManutencaoDataSource implements IManutencaoRepository {
  constructor(
    @InjectRepository(ManutencaoEntity)
    private readonly ManutencaoRepository: Repository<ManutencaoEntity>,
  ) {}

  async save(manutencao: Manutencao): Promise<Manutencao> {
    const newManutencao = this.ManutencaoRepository.create(
      ManutencaoEntity.toEntity(manutencao),
    );
    const created = await this.ManutencaoRepository.save(newManutencao);
    return created.toDomain();
  }

  async update(id: number, manutencao: Manutencao): Promise<Manutencao> {
    manutencao.id = id;
    const updated = await this.ManutencaoRepository.save({
      ...ManutencaoEntity.toEntity(manutencao),
    });
    return updated.toDomain();
  }

  async deleteById(id: number) {
    this.ManutencaoRepository.delete({ id: id });
  }

  async findByVeiculoId(veiculoId: number): Promise<Manutencao[]> {
    const manutencoes = await this.ManutencaoRepository.find({
      where: { veiculo: { id: veiculoId } },
    });

    return manutencoes.map((manutencao) => manutencao.toDomain());
  }
}
