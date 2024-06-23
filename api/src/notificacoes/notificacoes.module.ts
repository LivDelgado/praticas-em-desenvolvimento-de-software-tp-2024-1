import { Module } from '@nestjs/common';
import { INotificacaoProvider } from './core/ports/outbound/INotificacaoProvider';
import { NotificacaoEmailClient } from './adapters/email/NotificacaoEmailClient';
import { INotificacaoService } from './core/ports/inbound/INotificacaoService';
import { NotificacaoService } from './core/notificacao.service';

@Module({
  providers: [
    {
      provide: INotificacaoProvider,
      useClass: NotificacaoEmailClient,
    },
    { provide: INotificacaoService, useClass: NotificacaoService },
  ],
  exports: [INotificacaoService],
})
export class NotificacoesModule {}
