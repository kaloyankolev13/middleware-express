class AppError extends Error {
  constructor(messege, status) {
    super();
    this.messege = messege;
    this.status = status;
  }
}

module.exports = AppError;
