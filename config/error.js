export class HttpError extends Error {
  code;
  details;

  constructor(message, code = 400, details) {
    super(message);
    this.details = details;
    this.code = code;
  }
}
