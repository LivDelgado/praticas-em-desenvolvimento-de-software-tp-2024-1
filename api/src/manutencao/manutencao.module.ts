import { Module } from '@nestjs/common';
import { ManutencaoService } from './core/manutencao.service';
import { IManutencaoService } from './core/ports/inbound/IManutencaoService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencaoEntity } from './adapters/database/manutencao.entity';
import { ManutencaoDataSource } from './adapters/database/manutencao.datasource';
import { GestorsModule } from 'src/gestor/gestor.module';
import { GestorDataSource } from 'src/gestor/adapters/database/gestor.datasource';
import { VeiculosModule } from '../veiculos/veiculo.module';
import { VeiculosDataSource } from '../veiculos/adapters/database/veiculo.datasource';
import { IManutencaoRepository } from './core/ports/outbound/IManutencaoRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ManutencaoEntity]), VeiculosModule, GestorsModule],
  providers: [
    {
      provide: IManutencaoRepository,
      useClass: ManutencaoDataSource,
    },
    VeiculosDataSource,
    GestorDataSource,
    {
      provide: IManutencaoService,
      useClass: ManutencaoService,
    },
  ],
  exports: [IManutencaoService, TypeOrmModule],
})
export class ManutencaoModule {}
