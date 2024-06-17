import { Inject, Injectable } from '@nestjs/common';
import { VeiculosDataSource } from '../adapters/database/veiculo.datasource';

@Injectable()
export class VeiculosService {
  constructor(
    @Inject(VeiculosDataSource)
    private readonly veiculosDataSource: VeiculosDataSource,
  ) {}

  async findOne(montadora: string, modelo: string, ano: string) {
    return await this.veiculosDataSource.findOne(montadora, modelo, ano);
  }

  async create({ montadora, modelo, ano, dataAquisicao, status }) {
    return this.veiculosDataSource.save({
      montadora: montadora,
      modelo: modelo,
      ano: ano,
      dataAquisicao: dataAquisicao,
      status: status,
    });
  }
}
