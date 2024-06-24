import { Injectable } from '@nestjs/common';
import { Motorista } from './motorista';
import { IMotoristaService } from './ports/inbound/IMotoristaService';
import { IMotoristaRepository } from './ports/outbound/IMotoristaRepository';

@Injectable()
export class MotoristaService implements IMotoristaService {
  constructor(private readonly motoristaRepository: IMotoristaRepository) {}
  async create(motorista: Motorista): Promise<Motorista> {
    return await this.motoristaRepository.save(motorista);
  }
  async update(id: number, motorista: Motorista): Promise<Motorista> {
    return await this.motoristaRepository.update(id, motorista);
  }
}
