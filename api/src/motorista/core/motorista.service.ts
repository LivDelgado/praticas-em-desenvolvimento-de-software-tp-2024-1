import { Injectable } from '@nestjs/common';
import { Motorista } from './motorista';
import { IMotoristaService } from './ports/inbound/IMotoristaService';
import { IMotoristaRepository } from './ports/outbound/IMotoristaRepository';

@Injectable()
export class MotoristaService implements IMotoristaService {
  constructor(private readonly MotoristaRepository: IMotoristaRepository) {}
  async create(motorista: Motorista): Promise<Motorista> {
    return await this.MotoristaRepository.save(motorista);
  }
}
