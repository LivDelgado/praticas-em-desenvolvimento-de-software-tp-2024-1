import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Veiculo } from 'src/veiculos/core/veiculo.entity';
import { Repository } from 'typeorm';

@Injectable()
@Dependencies(getRepositoryToken(Veiculo))
export class VeiculosDataSource {
  constructor(
    @InjectRepository(Veiculo)
    private readonly VeiculoRepository: Repository<Veiculo>,
  ) {}

  async save(veiculo: Partial<Veiculo>): Promise<Veiculo> {
    const newVeiculo = this.VeiculoRepository.create(veiculo);
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

  async findAll(): Promise<Veiculo[]> {
    return this.VeiculoRepository.find();
  }

  async deleteById(id: number) {
    this.VeiculoRepository.delete({ id: id });
  }
}
