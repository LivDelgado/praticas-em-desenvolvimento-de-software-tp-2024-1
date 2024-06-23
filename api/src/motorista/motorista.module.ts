import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoristaEntity } from './adapters/database/motorista.entity';
import { IMotoristaRepository } from './core/ports/outbound/IMotoristaRepository';
import { MotoristaDataSource } from './adapters/database/motorista.datasource';
import { IMotoristaService } from './core/ports/inbound/IMotoristaService';
import { MotoristaService } from './core/motorista.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([MotoristaEntity])],
  providers: [
    {
      provide: IMotoristaRepository,
      useClass: MotoristaDataSource,
    },
    {
      provide: IMotoristaService,
      useClass: MotoristaService,
    },
  ],
  exports: [IMotoristaService, IMotoristaRepository, TypeOrmModule],
})
export class MotoristaModule {}
