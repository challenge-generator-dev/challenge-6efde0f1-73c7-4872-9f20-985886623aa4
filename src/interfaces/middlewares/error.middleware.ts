import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError, ProductAlreadyExistsError, ProductNotFoundError, InvalidPriceError, InvalidStockError } from '../../utils/errors';

export { ProductAlreadyExistsError, ProductNotFoundError, InvalidPriceError, InvalidStockError };

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[Error] ${err.message}`);
  console.error(err.stack);
  
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }
  
  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: 'Error de validación',
      details: err.message,
    });
    return;
  }
  
  if (err.name === 'ConflictError') {
    res.status(409).json({
      error: err.message,
    });
    return;
  }
  
  if (err.name === 'NotFoundError') {
    res.status(404).json({
      error: err.message,
    });
    return;
  }
  
  res.status(500).json({
    error: 'Error interno del servidor',
  });
};