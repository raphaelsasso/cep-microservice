class AppError {
  constructor({ message, code = 403 }) {
    this.message = message;
    this.code = code;
  }
}

module.exports = AppError;
