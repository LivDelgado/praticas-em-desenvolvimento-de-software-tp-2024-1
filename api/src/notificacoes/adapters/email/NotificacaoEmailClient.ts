import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { Notificacao } from 'src/notificacoes/core/notificacao';
import { INotificacaoProvider } from 'src/notificacoes/core/ports/outbound/INotificacaoProvider';

@Injectable()
export class NotificacaoEmailClient implements INotificacaoProvider {
  private EmailSender = 'MS_QHUGsW@trial-jpzkmgqy16nl059v.mlsender.net';
  private EmailName = 'Palantir';

  private mailerSend: MailerSend;
  private sender: Sender;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.API_KEY,
    });

    this.sender = new Sender(this.EmailSender, this.EmailName);
  }

  async agendarNotificacao(notificacao: Notificacao) {
    const recipients = notificacao.destinatarios.map(
      (it) => new Recipient(it.email, it.nome),
    );
    const emailParams = new EmailParams()
      .setFrom(this.sender)
      .setTo(recipients)
      .setReplyTo(this.sender)
      .setSubject(notificacao.assunto)
      .setHtml(notificacao.conteudo);

    try {
      const response = await this.mailerSend.email.send(emailParams);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
