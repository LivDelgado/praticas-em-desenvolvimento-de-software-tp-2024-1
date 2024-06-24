import { Module } from '@nestjs/common';
import { VeiculosModule } from '../veiculos/veiculo.module';
import { MotoristaModule } from 'src/motorista/motorista.module';
import { IAlocacaoService } from './core/ports/inbound/IAlocacaoService';
import { AlocacaoService } from './core/alocacao.service';

@Module({
  imports: [VeiculosModule, MotoristaModule],
  providers: [
    {
      provide: IAlocacaoService,
      useClass: AlocacaoService,
    },
  ],
  exports: [IAlocacaoService],
})
export class AlocacaoModule {}
