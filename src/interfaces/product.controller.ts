import { Request, Response } from 'express';
import { inject } from 'inversify';
import { ProductService } from '../application/product.service';
import { CreateProductDto, UpdateProductDto } from '../domain/product.model';
import 'reflect-metadata';

export class ProductController {
  constructor(
    @inject(ProductService) private readonly productService: ProductService
  ) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const createProductDto = req.body as CreateProductDto;
      const product = await this.productService.createProduct(createProductDto);
      res.status(201).json(product);
    } catch (error) {
      if (error.message.includes('already exists')) {
        res.status(409).json({ error: error.message });
      } else if (error.message.includes('validation')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      const product = await this.productService.getProductById(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(200).json({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        isOutOfStock: product.isOutOfStock
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
      const products = await this.productService.getAllProducts(limit, offset);
      res.status(200).json(products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        isOutOfStock: product.isOutOfStock
      })));
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      const updateProductDto = req.body as UpdateProductDto;
      const product = await this.productService.updateProduct(productId, updateProductDto);
      res.status(200).json({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock
      });
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('already exists') || error.message.includes('validation')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      await this.productService.deleteProduct(productId);
      res.status(204).send();
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}