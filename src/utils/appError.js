//
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";

    this.isOperational = true; // other unexcepted errors can be avoided as they wont have isOperational property

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
