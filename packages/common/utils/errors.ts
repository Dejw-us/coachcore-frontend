export type DtoValidationErrorType = {
  field: string;
  errorMessages: string[];
};

export class AuthorizationError extends Error {
  constructor(message = "You are not authorized") {
    super(message);
  }
}

export class DtoValidationError extends Error {
  errors: DtoValidationErrorType[];

  constructor(errors: DtoValidationErrorType[], message = "Validation error") {
    super(message);
    this.errors = errors;
  }
}

export class AuthenticationError extends Error {
  constructor(message = "You are not authorized") {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}
