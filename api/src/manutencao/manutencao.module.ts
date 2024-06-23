import { Module } from '@nestjs/common';
import { ManutencaoService } from './core/manutencao.service';
import { IManutencaoService } from './core/ports/inbound/IManutencaoService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencaoEntity } from './adapters/database/manutencao.entity';
import { ManutencaoDataSource } from './adapters/database/manutencao.datasource';
import { GestorsModule } from 'src/gestor/gestor.module';
import { VeiculosModule } from '../veiculos/veiculo.module';
import { IManutencaoRepository } from './core/ports/outbound/IManutencaoRepository';
import { NotificacoesModule } from 'src/notificacoes/notificacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManutencaoEntity]),
    VeiculosModule,
    GestorsModule,
    NotificacoesModule,
  ],
  providers: [
    {
      provide: IManutencaoRepository,
      useClass: ManutencaoDataSource,
    },
    {
      provide: IManutencaoService,
      useClass: ManutencaoService,
    },
  ],
  exports: [IManutencaoService, TypeOrmModule],
})
export class ManutencaoModule {}
