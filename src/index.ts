import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import { ProductController } from './interfaces/product.controller';
import { validationMiddleware } from './interfaces/middlewares/validation.middleware';
import { errorMiddleware } from './interfaces/middlewares/error.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productController = new ProductController();

app.post(
  '/products',
  validationMiddleware,
  (req: Request, res: Response, next: NextFunction) => productController.createProduct(req, res, next)
);

app.get(
  '/products',
  (req: Request, res: Response, next: NextFunction) => productController.getAllProducts(req, res, next)
);

app.get(
  '/products/:productId',
  (req: Request, res: Response, next: NextFunction) => productController.getProductById(req, res, next)
);

app.put(
  '/products/:productId',
  validationMiddleware,
  (req: Request, res: Response, next: NextFunction) => productController.updateProduct(req, res, next)
);

app.delete(
  '/products/:productId',
  (req: Request, res: Response, next: NextFunction) => productController.deleteProduct(req, res, next)
);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

export default app;