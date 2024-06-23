export class DestinatarioNotificacao {
  nome: string;
  email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }
}

export class Notificacao {
  destinatarios: DestinatarioNotificacao[];
  assunto: string;
  conteudo: string;
}
