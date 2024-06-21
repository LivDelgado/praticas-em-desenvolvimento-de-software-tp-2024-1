import { Module } from '@nestjs/common';
import { ManutencaoService } from './core/manutencao.service';
import { IManutencaoService } from './core/ports/inbound/IManutencaoService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manutencao } from './core/manutencao.entity';
import { ManutencaoDataSource } from './adapters/database/manutencao.datasource';
import { VeiculosModule } from '../veiculos/veiculo.module';
import { VeiculosDataSource } from '../veiculos/adapters/database/veiculo.datasource';
import { IManutencaoRepository } from './core/ports/outbound/IManutencaoRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Manutencao]), VeiculosModule],
  providers: [
    {
      provide: IManutencaoRepository,
      useClass: ManutencaoDataSource,
    },
    VeiculosDataSource,
    {
      provide: IManutencaoService,
      useClass: ManutencaoService,
    },
  ],
  exports: [IManutencaoService, TypeOrmModule],
})
export class ManutencaoModule {}
