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

  async update(id: number, veiculo: Partial<Veiculo>): Promise<Veiculo> {
    return await this.VeiculoRepository.save({
      id: id,
      ...veiculo,
    });
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

  async findById(id: number, returnManutencao = false): Promise<Veiculo> {
    const veiculos = await this.VeiculoRepository.find({
      where: { id: id },
      relations: {
        manutencoes: returnManutencao,
      },
    });

    if (veiculos) return veiculos[0];
    return null;
  }

  async findAll(): Promise<Veiculo[]> {
    const date = new Date();
    return this.VeiculoRepository.createQueryBuilder('veiculo')
      .leftJoinAndSelect('veiculo.manutencoes', 'manutencao')
      .where('manutencao.id is null')
      .orWhere(
        'manutencao.dataInicio <= :date AND manutencao.dataFim >= :date',
        {
          date: date,
        },
      )
      .orWhere('manutencao.dataInicio >= :date', { date: date })
      .orderBy('manutencao.dataInicio', 'ASC')
      .getMany();
  }

  async deleteById(id: number) {
    this.VeiculoRepository.delete({ id: id });
  }
}
