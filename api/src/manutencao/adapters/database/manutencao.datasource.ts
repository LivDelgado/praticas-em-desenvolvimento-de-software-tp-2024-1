import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Manutencao } from 'src/manutencao/core/manutencao.entity';
import { Repository } from 'typeorm';

@Injectable()
@Dependencies(getRepositoryToken(Manutencao))
export class ManutencaoDataSource {
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
}
