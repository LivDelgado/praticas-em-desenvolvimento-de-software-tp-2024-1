import { Inject, Injectable } from '@nestjs/common';
import { VeiculosDataSource } from './datasource/veiculo.datasource';

@Injectable()
export class VeiculosService {
  constructor(
    @Inject(VeiculosDataSource) private readonly veiculosDataSource: VeiculosDataSource,
  ) {}

  async findOne(montadora: string, modelo: string, ano: string) {
    var veiculo = await this.veiculosDataSource.findOne(montadora, modelo, ano);
    return veiculo;
  }

  async create({ montadora, modelo, ano, dataAquisicao, status }) {
    return this.veiculosDataSource.save({
        montadora: montadora,
        modelo: modelo,
        ano: ano,
        dataAquisicao: dataAquisicao,
        status: status
    });
  }
}
