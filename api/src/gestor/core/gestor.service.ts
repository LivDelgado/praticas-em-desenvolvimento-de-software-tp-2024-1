import { Injectable } from '@nestjs/common';
import { Gestor } from './gestor';
import { IGestorService } from './ports/inbound/IGestorService';
import { IGestorRepository } from './ports/outbound/IGestorRepository';

@Injectable()
export class GestorService implements IGestorService {
  constructor(private readonly gestorsDataSource: IGestorRepository) {}

  async findOne(email: string): Promise<Gestor> {
    return this.gestorsDataSource.findOne(email);
  }

  async create(gestor: Gestor): Promise<Gestor> {
    return await this.gestorsDataSource.save(gestor);
  }

  async update(id: number, gestor: Gestor): Promise<Gestor> {
    return this.gestorsDataSource.update(id, gestor);
  }

  async list(): Promise<Gestor[]> {
    return this.gestorsDataSource.findAll();
  }

  async getById(id: number): Promise<Gestor> {
    return this.gestorsDataSource.findById(id);
  }

  async deleteById(id: number) {
    await this.gestorsDataSource.deleteById(id);
  }
}
