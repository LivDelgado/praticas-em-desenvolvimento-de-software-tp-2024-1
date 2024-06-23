import { Injectable } from '@nestjs/common';
import { Veiculo } from './veiculo';
import { IVeiculoService } from './ports/inbound/IVeiculoService';
import { IVeiculoRepository } from './ports/outbound/IVeiculoRepository';

@Injectable()
export class VeiculosService implements IVeiculoService {
  constructor(private readonly veiculoRepository: IVeiculoRepository) {}

  async findOne(
    montadora: string,
    modelo: string,
    ano: string,
  ): Promise<Veiculo> {
    return this.veiculoRepository.findOne(montadora, modelo, ano);
  }

  async create(veiculo: Veiculo): Promise<Veiculo> {
    return await this.veiculoRepository.save(veiculo);
  }

  async update(id: number, veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoRepository.update(id, veiculo);
  }

  async list(): Promise<Veiculo[]> {
    return this.veiculoRepository.findAll();
  }

  async getById(id: number): Promise<Veiculo> {
    return this.veiculoRepository.findById(id, false);
  }

  async deleteById(id: number): Promise<void> {
    await this.veiculoRepository.deleteById(id);
  }
}
