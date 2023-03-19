export class InvalidNanoidError extends Error {
  constructor(message?: string) {
    super(message || 'ID must be a valid NANOID');
    this.name = 'InvalidNanoidError';
  }
}
