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
    private readonly MotoristaRepository: Repository<MotoristaEntity>,
  ) {}
  async save(motorista: Motorista): Promise<Motorista> {
    const newMotorista = this.MotoristaRepository.create(
      MotoristaEntity.fromDomain(motorista),
    );

    const created = await this.MotoristaRepository.save(newMotorista);

    return created.toDomain();
  }
}
