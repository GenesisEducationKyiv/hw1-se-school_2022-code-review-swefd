class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(401, message || "Unauthorized");
  }
}

class ConflictError extends HttpError {
  constructor(message) {
    super(409, message || "Conflict");
  }
}

class TeapotError extends HttpError {
  constructor(message) {
    super(418, message || " I'm a teapot");
  }
}

class ServiceUnavailableError extends HttpError {
  constructor(message) {
    super(503, message || "Service Unavailable");
  }
}

module.exports = {
  HttpError: HttpError,
  UnauthorizedError: UnauthorizedError,
  ConflictError: ConflictError,
  TeapotError: TeapotError,
  ServiceUnavailableError: ServiceUnavailableError,
};
