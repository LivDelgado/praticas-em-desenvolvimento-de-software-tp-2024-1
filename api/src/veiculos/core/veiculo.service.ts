import { Injectable } from '@nestjs/common';
import { Veiculo } from './veiculo';
import { IVeiculoService } from './ports/inbound/IVeiculoService';
import { IVeiculoRepository } from './ports/outbound/IVeiculoRepository';

@Injectable()
export class VeiculosService implements IVeiculoService {
  constructor(private readonly veiculosDataSource: IVeiculoRepository) {}

  async findOne(
    montadora: string,
    modelo: string,
    ano: string,
  ): Promise<Veiculo> {
    return this.veiculosDataSource.findOne(montadora, modelo, ano);
  }

  async create(veiculo: Veiculo): Promise<Veiculo> {
    return await this.veiculosDataSource.save(veiculo);
  }

  async update(id: number, veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculosDataSource.update(id, veiculo);
  }

  async list(): Promise<Veiculo[]> {
    return this.veiculosDataSource.findAll();
  }

  async getById(id: number): Promise<Veiculo> {
    return this.veiculosDataSource.findById(id, false);
  }

  async deleteById(id: number) {
    await this.veiculosDataSource.deleteById(id);
  }
}
