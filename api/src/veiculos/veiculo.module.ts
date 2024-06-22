import { Module } from '@nestjs/common';
import { VeiculosService } from './core/veiculo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculosDataSource } from './adapters/database/veiculo.datasource';
import { VeiculoEntity } from './adapters/database/veiculo.entity';
import { IVeiculoService } from './core/ports/inbound/IVeiculoService';
import { IVeiculoRepository } from './core/ports/outbound/IVeiculoRepository';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoEntity])],
  providers: [
    {
      provide: IVeiculoRepository,
      useClass: VeiculosDataSource,
    },
    { provide: IVeiculoService, useClass: VeiculosService },
  ],
  exports: [IVeiculoService, IVeiculoRepository, TypeOrmModule],
})
export class VeiculosModule {}
