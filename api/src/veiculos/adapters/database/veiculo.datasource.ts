import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VeiculoEntity } from './veiculo.entity';
import { IVeiculoRepository } from 'src/veiculos/core/ports/outbound/IVeiculoRepository';
import { Veiculo } from 'src/veiculos/core/veiculo';

@Injectable()
@Dependencies(getRepositoryToken(VeiculoEntity))
export class VeiculosDataSource implements IVeiculoRepository {
  constructor(
    @InjectRepository(VeiculoEntity)
    private readonly veiculoRepository: Repository<VeiculoEntity>,
  ) {}

  async save(veiculo: Veiculo): Promise<Veiculo> {
    const newVeiculo = this.veiculoRepository.create(
      VeiculoEntity.fromDomain(veiculo),
    );
    const created = await this.veiculoRepository.save(newVeiculo);
    return created.toDomain();
  }

  async update(id: number, veiculo: Veiculo): Promise<Veiculo> {
    veiculo.id = id;
    const updated = await this.veiculoRepository.save(
      VeiculoEntity.fromDomain(veiculo),
    );
    return updated.toDomain();
  }

  async findOne(
    montadora: string,
    modelo: string,
    ano: string,
  ): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOneBy({
      montadora: montadora,
      modelo: modelo,
      ano: ano,
    });

    return veiculo.toDomain();
  }

  async findById(id: number, returnManutencao = false): Promise<Veiculo> {
    const veiculos = await this.veiculoRepository.find({
      where: { id: id },
      relations: {
        manutencoes: returnManutencao,
      },
    });

    if (veiculos) return veiculos[0].toDomain();
    return null;
  }

  async findAll(): Promise<Veiculo[]> {
    const date = new Date();
    const veiculos = await this.veiculoRepository
      .createQueryBuilder('VeiculoEntity')
      .leftJoinAndSelect('VeiculoEntity.manutencoes', 'manutencao')
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

    return veiculos.map((it) => it.toDomain());
  }

  async deleteById(id: number) {
    this.veiculoRepository.delete({ id: id });
  }
}
