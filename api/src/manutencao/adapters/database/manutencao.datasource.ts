import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Manutencao } from 'src/manutencao/core/manutencao.entity';
import { IManutencaoRepository } from 'src/manutencao/core/ports/outbound/IManutencaoRepository';
import { Repository } from 'typeorm';

@Injectable()
@Dependencies(getRepositoryToken(Manutencao))
export class ManutencaoDataSource implements IManutencaoRepository {
  constructor(
    @InjectRepository(Manutencao)
    private readonly ManutencaoRepository: Repository<Manutencao>,
  ) {}

  async save(manutencao: Partial<Manutencao>): Promise<Manutencao> {
    const newManutencao = this.ManutencaoRepository.create(manutencao);
    return await this.ManutencaoRepository.save(newManutencao);
  }

  async update(
    id: number,
    manutencao: Partial<Manutencao>,
  ): Promise<Manutencao> {
    return await this.ManutencaoRepository.save({
      id: id,
      ...manutencao,
    });
  }

  async deleteById(id: number) {
    this.ManutencaoRepository.delete({ id: id });
  }

  async findByVeiculoId(veiculoId: number): Promise<Manutencao[]> {
    const manutencoes = await this.ManutencaoRepository.find({
      where: { veiculo: { id: veiculoId } },
    });

    return manutencoes;
  }
}
