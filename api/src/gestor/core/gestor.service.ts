import { Injectable } from '@nestjs/common';
import { Gestor } from './gestor';
import { IGestorService } from './ports/inbound/IGestorService';
import { IGestorRepository } from './ports/outbound/IGestorRepository';

@Injectable()
export class GestorService implements IGestorService {
  constructor(private readonly gestorRepository: IGestorRepository) {}

  async findOne(email: string): Promise<Gestor> {
    return this.gestorRepository.findOne(email);
  }

  async create(gestor: Gestor): Promise<Gestor> {
    return await this.gestorRepository.save(gestor);
  }

  async update(id: number, gestor: Gestor): Promise<Gestor> {
    return this.gestorRepository.update(id, gestor);
  }

  async list(): Promise<Gestor[]> {
    return this.gestorRepository.findAll();
  }

  async getById(id: number): Promise<Gestor> {
    return this.gestorRepository.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.gestorRepository.deleteById(id);
  }
}
