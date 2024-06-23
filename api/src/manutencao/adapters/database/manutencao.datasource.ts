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
    private readonly manutencaoRepository: Repository<ManutencaoEntity>,
  ) {}

  async save(manutencao: Manutencao): Promise<Manutencao> {
    const newManutencao = this.manutencaoRepository.create(
      ManutencaoEntity.fromDomain(manutencao),
    );
    const created = await this.manutencaoRepository.save(newManutencao);
    return created?.toDomain();
  }

  async update(id: number, manutencao: Manutencao): Promise<Manutencao> {
    manutencao.id = id;
    const updated = await this.manutencaoRepository.save(
      ManutencaoEntity.fromDomain(manutencao),
    );
    return updated?.toDomain();
  }

  async deleteById(id: number): Promise<void> {
    this.manutencaoRepository.delete({ id: id });
  }

  async findByVeiculoId(veiculoId: number): Promise<Manutencao[]> {
    const manutencoes = await this.manutencaoRepository.find({
      where: { veiculo: { id: veiculoId } },
    });

    return manutencoes.map((manutencao) => manutencao.toDomain());
  }
}
