import { IMotoristaRepository } from 'src/motorista/core/ports/outbound/IMotoristaRepository';
import { MotoristaEntity } from './motorista.entity';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dependencies, Injectable } from '@nestjs/common';
import { Motorista } from 'src/motorista/core/motorista';

@Injectable()
@Dependencies(getRepositoryToken(MotoristaEntity))
export class MotoristaDataSource implements IMotoristaRepository {
  constructor(
    @InjectRepository(MotoristaEntity)
    private readonly motoristaRepository: Repository<MotoristaEntity>,
  ) {}

  async save(motorista: Motorista): Promise<Motorista> {
    const newMotorista = this.motoristaRepository.create(
      MotoristaEntity.fromDomain(motorista),
    );

    const created = await this.motoristaRepository.save(newMotorista);

    return created?.toDomain();
  }

  async update(id: number, motorista: Motorista): Promise<Motorista> {
    motorista.id = id;
    const updated = await this.motoristaRepository.create(
      MotoristaEntity.fromDomain(motorista),
    );

    return updated?.toDomain();
  }

  async deleteById(id: number): Promise<void> {
    this.motoristaRepository.delete({ id: id });
  }

  async findAll(): Promise<Motorista[]> {
    const motoristas = await this.motoristaRepository.find({
      relations: {
        veiculo: true,
      },
    });
    return motoristas.map((motorista) => motorista.toDomain());
  }

  async findById(id: number): Promise<Motorista> {
    const motoristas = await this.motoristaRepository.find({
      where: { id: id },
      relations: {
        veiculo: true,
      },
    });

    if (motoristas.length) return motoristas[0].toDomain();
    return null;
  }
}
