import { Notificacao } from '../../notificacao';

export abstract class INotificacaoProvider {
  abstract agendarNotificacao(notificacao: Notificacao): Promise<void>;
}
