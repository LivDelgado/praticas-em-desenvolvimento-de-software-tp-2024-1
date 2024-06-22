import { Module } from '@nestjs/common';
import { GestorService } from './core/gestor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorDataSource } from './adapters/database/gestor.datasource';
import { GestorEntity } from './adapters/database/gestor.entity';
import { IGestorService } from './core/ports/inbound/IGestorService';
import { IGestorRepository } from './core/ports/outbound/IGestorRepository';

@Module({
  imports: [TypeOrmModule.forFeature([GestorEntity])],
  providers: [
    {
      provide: IGestorRepository,
      useClass: GestorDataSource,
    },
    { provide: IGestorService, useClass: GestorService },
  ],
  exports: [IGestorService, IGestorRepository, TypeOrmModule],
})
export class GestorsModule {}
