import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from '../entity/veiculo.entity';

@Injectable()
@Dependencies(getRepositoryToken(Veiculo))
export class VeiculosDataSource {
  constructor(
    @InjectRepository(Veiculo)
    private readonly VeiculoRepository: Repository<Veiculo>,
  ) {}

  async save({
    montadora,
    modelo,
    ano,
    dataAquisicao,
    status,
  }): Promise<Veiculo> {
    const newVeiculo = this.VeiculoRepository.create({
      montadora: montadora,
      modelo: modelo,
      ano: ano,
      dataAquisicao: dataAquisicao,
      status: status,
    });
    return await this.VeiculoRepository.save(newVeiculo);
  }

  async findOne(
    montadora: string,
    modelo: string,
    ano: string,
  ): Promise<Veiculo> {
    return this.VeiculoRepository.findOneBy({
      montadora: montadora,
      modelo: modelo,
      ano: ano,
    });
  }

  async findById(id: number): Promise<Veiculo> {
    return this.VeiculoRepository.findOneBy({ id });
  }
}
