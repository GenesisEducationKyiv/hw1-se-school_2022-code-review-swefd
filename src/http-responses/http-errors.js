class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(401, message);
  }
}

class ConflictError extends HttpError {
  constructor(message) {
    super(409, message);
  }
}

class TeapotError extends HttpError {
  constructor(message) {
    super(418, message);
  }
}

class ServiceUnavailableError extends HttpError {
  constructor(message) {
    super(503, message);
  }
}

module.exports = {
  HttpError: HttpError,
  UnauthorizedError: UnauthorizedError,
  ConflictError: ConflictError,
  TeapotError: TeapotError,
  ServiceUnavailableError: ServiceUnavailableError,
};
