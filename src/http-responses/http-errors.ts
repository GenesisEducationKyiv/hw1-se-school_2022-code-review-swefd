class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message || "Unauthorized");
  }
}

class ConflictError extends HttpError {
  constructor(message: string) {
    super(409, message || "Conflict");
  }
}

class TeapotError extends HttpError {
  constructor(message: string) {
    super(418, message || " I'm a teapot");
  }
}

class ServiceUnavailableError extends HttpError {
  constructor(message: string) {
    super(503, message || "Service Unavailable");
  }
}

export default {
  HttpError: HttpError,
  UnauthorizedError: UnauthorizedError,
  ConflictError: ConflictError,
  TeapotError: TeapotError,
  ServiceUnavailableError: ServiceUnavailableError,
};
