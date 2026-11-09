import 'reflect-metadata';
import express from 'express';
import { ProductController } from './interfaces/product.controller';
import { errorMiddleware } from './interfaces/middlewares/error.middleware';
import { validationMiddleware } from './interfaces/middlewares/validation.middleware';
import { ProductService } from './application/product.service';
import { DynamoDBProductRepository } from './infrastructure/repositories/product.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
});
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

const productRepository = new DynamoDBProductRepository(
  docClient,
  process.env.DYNAMODB_TABLE || 'products'
);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

app.post('/products', validationMiddleware, productController.createProduct.bind(productController));
app.get('/products/:productId', productController.getProductById.bind(productController));
app.get('/products', productController.getAllProducts.bind(productController));
app.put('/products/:productId', validationMiddleware, productController.updateProduct.bind(productController));
app.delete('/products/:productId', productController.deleteProduct.bind(productController));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };