import { Module } from '@nestjs/common';
import { ManutencaoService } from './core/manutencao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manutencao } from './core/manutencao.entity';
import { ManutencaoDataSource } from './adapters/database/manutencao.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([Manutencao])],
  providers: [ManutencaoService, ManutencaoDataSource],
  exports: [ManutencaoService, TypeOrmModule],
})
export class ManutencaoModule {}
