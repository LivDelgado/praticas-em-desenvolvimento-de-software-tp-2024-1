import { Module } from '@nestjs/common';
import { ManutencaoService } from './core/manutencao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manutencao } from './core/manutencao.entity';
import { ManutencaoDataSource } from './adapters/database/manutencao.datasource';
import { VeiculosModule } from '../veiculos/veiculo.module';
import { VeiculosDataSource } from '../veiculos/adapters/database/veiculo.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([Manutencao]), VeiculosModule],
  providers: [ManutencaoService, ManutencaoDataSource, VeiculosDataSource],
  exports: [ManutencaoService, TypeOrmModule],
})
export class ManutencaoModule {}
