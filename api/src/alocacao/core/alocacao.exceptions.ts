export class AlocacaoInvalidaException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
