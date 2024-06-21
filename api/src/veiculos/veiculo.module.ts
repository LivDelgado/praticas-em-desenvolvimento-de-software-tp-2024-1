import { Module } from '@nestjs/common';
import { VeiculosService } from './core/veiculo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './core/veiculo.entity';
import { VeiculosDataSource } from './adapters/database/veiculo.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])],
  providers: [VeiculosService, VeiculosDataSource],
  exports: [VeiculosService, VeiculosDataSource, TypeOrmModule],
})
export class VeiculosModule {}
