import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from '../../domain/product.model';
import { UpdateProductDto } from '../../domain/product.model';

export async function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const path = req.path;
  
  let dtoClass: typeof CreateProductDto | typeof UpdateProductDto;
  
  if (path === '/products' && req.method === 'POST') {
    dtoClass = CreateProductDto;
  } else if (path.match(/^\/products\/.+$/) && req.method === 'PUT') {
    dtoClass = UpdateProductDto;
  } else {
    next();
    return;
  }
  
  const dtoInstance = plainToInstance(dtoClass, req.body);
  
  const errors = await validate(dtoInstance as object, {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });
  
  if (errors.length > 0) {
    const errorMessages = errors.map((error) => {
      return `${error.property}: ${Object.values(error.constraints || {}).join(', ')}`;
    });
    
    res.status(400).json({
      error: 'Validación fallida',
      details: errorMessages,
    });
    return;
  }
  
  req.body = dtoInstance;
  next();
}