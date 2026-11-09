import request from 'supertest';
import { Express } from 'express';
import { ProductController } from '../src/interfaces/product.controller';
import { ProductService } from '../src/application/product.service';
import { Product } from '../src/domain/product.model';
import { ProductRepository } from '../src/domain/product.repository';

describe('ProductController', () => {
  let app: Express;
  let mockService: jest.Mocked<ProductService>;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByName: jest.fn(),
    } as jest.Mocked<ProductRepository>;
    
    mockService = {
      createProduct: jest.fn(),
      getProductById: jest.fn(),
      getAllProducts: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as jest.Mocked<ProductService>;

    const controller = new ProductController(mockService);
    
    const express = require('express');
    app = express();
    app.use(express.json());
    
    app.post('/products', (req: any, res: any) => controller.createProduct(req, res));
    app.get('/products/:productId', (req: any, res: any) => controller.getProductById(req, res));
    app.get('/products', (req: any, res: any) => controller.getAllProducts(req, res));
    app.put('/products/:productId', (req: any, res: any) => controller.updateProduct(req, res));
    app.delete('/products/:productId', (req: any, res: any) => controller.deleteProduct(req, res));
  });

  describe('POST /products', () => {
    it('debería crear un producto y retornar 201', async () => {
      const product = new Product('1', 'Test Product', 100, 10);
      mockService.createProduct.mockResolvedValue(product);

      const response = await request(app)
        .post('/products')
        .send({ name: 'Test Product', price: 100, stock: 10 });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('name', 'Test Product');
    });

    it('debería retornar 400 cuando hay error de validación', async () => {
      mockService.createProduct.mockRejectedValue(new Error('Price must be a positive number'));

      const response = await request(app)
        .post('/products')
        .send({ name: 'Test Product', price: -10, stock: 10 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('debería retornar 409 cuando el nombre está duplicado', async () => {
      mockService.createProduct.mockRejectedValue(new Error('Product with this name already exists'));

      const response = await request(app)
        .post('/products')
        .send({ name: 'Existing Product', price: 100, stock: 10 });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /products/:productId', () => {
    it('debería retornar el producto cuando existe', async () => {
      const product = new Product('1', 'Test Product', 100, 10);
      mockService.getProductById.mockResolvedValue(product);

      const response = await request(app).get('/products/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
    });

    it('debería retornar 404 cuando el producto no existe', async () => {
      mockService.getProductById.mockRejectedValue(new Error('Product not found'));

      const response = await request(app).get('/products/999');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /products', () => {
    it('debería retornar todos los productos', async () => {
      const products = [
        new Product('1', 'Product 1', 100, 10),
        new Product('2', 'Product 2', 50, 0),
      ];
      mockService.getAllProducts.mockResolvedValue(products);

      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });

    it('debería aplicar paginación con limit y offset', async () => {
      const products = [new Product('2', 'Product 2', 50, 5)];
      mockService.getAllProducts.mockResolvedValue(products);

      const response = await request(app).get('/products?limit=1&offset=1');

      expect(response.status).toBe(200);
      expect(mockService.getAllProducts).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('PUT /products/:productId', () => {
    it('debería actualizar el producto y retornar 200', async () => {
      const product = new Product('1', 'Updated Product', 150, 10);
      mockService.updateProduct.mockResolvedValue(product);

      const response = await request(app)
        .put('/products/1')
        .send({ name: 'Updated Product', price: 150 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Updated Product');
    });

    it('debería retornar 400 cuando el precio es negativo', async () => {
      mockService.updateProduct.mockRejectedValue(new Error('Price must be a positive number'));

      const response = await request(app)
        .put('/products/1')
        .send({ price: -50 });

      expect(response.status).toBe(400);
    });

    it('debería retornar 404 cuando el producto no existe', async () => {
      mockService.updateProduct.mockRejectedValue(new Error('Product not found'));

      const response = await request(app)
        .put('/products/999')
        .send({ name: 'Test' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /products/:productId', () => {
    it('debería eliminar el producto y retornar 204', async () => {
      mockService.deleteProduct.mockResolvedValue();

      const response = await request(app).delete('/products/1');

      expect(response.status).toBe(204);
    });

    it('debería retornar 404 cuando el producto no existe', async () => {
      mockService.deleteProduct.mockRejectedValue(new Error('Product not found'));

      const response = await request(app).delete('/products/999');

      expect(response.status).toBe(404);
    });
  });
});