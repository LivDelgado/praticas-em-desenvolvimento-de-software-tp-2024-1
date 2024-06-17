import { Module } from '@nestjs/common';
import { VeiculosService } from './veiculo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './entity/veiculo.entity';
import { VeiculosDataSource } from './datasource/veiculo.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])],
  providers: [VeiculosService, VeiculosDataSource],
  exports: [VeiculosService, TypeOrmModule],
})
export class VeiculosModule {}
