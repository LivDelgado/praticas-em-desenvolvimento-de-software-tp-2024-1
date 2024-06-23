import {
  DestinatarioNotificacao,
  Notificacao,
} from 'src/notificacoes/core/notificacao';
import { Manutencao } from './manutencao';
import { Gestor } from 'src/gestor/core/gestor';

export class NotificacaoManutencaoAgendada extends Notificacao {
  constructor(manutencao: Manutencao, gestores: Gestor[]) {
    super();
    this.destinatarios = gestores.map(
      (it) =>
        new DestinatarioNotificacao(it.nome + ' ' + it.sobrenome, it.email),
    );
    this.assunto = 'Nova manutenção agendada';
    this.conteudo =
      'Manutenção agendada de ' +
      manutencao.dataInicio +
      ' a ' +
      manutencao.dataFim +
      ' para o veículo ' +
      manutencao.veiculo.id;
  }
}
