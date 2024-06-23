import { Injectable } from '@nestjs/common';
import { Notificacao } from './notificacao';
import { INotificacaoService } from './ports/inbound/INotificacaoService';
import { INotificacaoProvider } from './ports/outbound/INotificacaoProvider';

@Injectable()
export class NotificacaoService implements INotificacaoService {
  constructor(private readonly notificacaoProvider: INotificacaoProvider) {}

  async agendarNotificacao(notificacao: Notificacao): Promise<void> {
    await this.notificacaoProvider.agendarNotificacao(notificacao);
  }
}
