export class ApplicationError extends Error {
  constructor(...arg) {
    super(...arg);
  }
}

export class ValidationError extends ApplicationError {
  constructor(errors) {
    super();
    this.errors = errors;
    this.name = 'ValidationError';
  }

  toString() {
    return JSON.stringify(this.errors);
  }
}
