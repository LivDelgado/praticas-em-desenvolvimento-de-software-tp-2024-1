import { Notificacao } from '../../notificacao';

export abstract class INotificacaoService {
  abstract agendarNotificacao(notificacao: Notificacao);
}
