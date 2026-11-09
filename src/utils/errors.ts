export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ProductAlreadyExistsError extends AppError {
  constructor(message: string = 'Product already exists') {
    super(message, 409, 'PRODUCT_ALREADY_EXISTS');
  }
}

export class ProductNotFoundError extends AppError {
  constructor(message: string = 'Product not found') {
    super(message, 404, 'PRODUCT_NOT_FOUND');
  }
}

export class InvalidPriceError extends AppError {
  constructor(message: string = 'Invalid price') {
    super(message, 400, 'INVALID_PRICE');
  }
}

export class InvalidStockError extends AppError {
  constructor(message: string = 'Invalid stock') {
    super(message, 400, 'INVALID_STOCK');
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR');
  }
}