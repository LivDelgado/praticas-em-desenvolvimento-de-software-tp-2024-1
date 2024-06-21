export class ManutencaoInvalidaException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
