import { Product } from '../domain/product.model';
import { CreateProductDto, UpdateProductDto } from '../domain/product.model';
import { ProductRepository } from '../infrastructure/repositories/product.repository';
import { ProductAlreadyExistsError } from '../interfaces/middlewares/error.middleware';
import { ProductNotFoundError } from '../interfaces/middlewares/error.middleware';
import { InvalidPriceError } from '../interfaces/middlewares/error.middleware';
import { InvalidStockError } from '../interfaces/middlewares/error.middleware';

export class ProductService {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    if (data.price < 0) {
      throw new InvalidPriceError('Price cannot be negative');
    }
    if (data.stock < 0) {
      throw new InvalidStockError('Stock cannot be negative');
    }

    const existingProduct = await this.productRepository.findByName(data.name);
    if (existingProduct) {
      throw new ProductAlreadyExistsError(`Product with name '${data.name}' already exists`);
    }

    const product = new Product(
      this.generateId(),
      data.name,
      data.price,
      data.stock
    );

    return await this.productRepository.create(product);
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new ProductNotFoundError(`Product with id '${productId}' not found`);
    }
    return product;
  }

  async getAllProducts(limit?: number, offset?: number): Promise<Product[]> {
    return await this.productRepository.findAll(limit, offset);
  }

  async updateProduct(productId: string, data: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findById(productId);
    if (!existingProduct) {
      throw new ProductNotFoundError(`Product with id '${productId}' not found`);
    }

    if (data.price !== undefined && data.price < 0) {
      throw new InvalidPriceError('Price cannot be negative');
    }
    if (data.stock !== undefined && data.stock < 0) {
      throw new InvalidStockError('Stock cannot be negative');
    }

    if (data.name && data.name !== existingProduct.name) {
      const productWithSameName = await this.productRepository.findByName(data.name);
      if (productWithSameName) {
        throw new ProductAlreadyExistsError(`Product with name '${data.name}' already exists`);
      }
    }

    const updateData: Partial<Product> = {};
    if (data.name !== undefined) {
      (updateData as any).name = data.name;
    }
    if (data.price !== undefined) {
      (updateData as any).price = data.price;
    }
    if (data.stock !== undefined) {
      (updateData as any).stock = data.stock;
    }

    return await this.productRepository.update(productId, updateData);
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new ProductNotFoundError(`Product with id '${productId}' not found`);
    }
    await this.productRepository.delete(productId);
  }

  private generateId(): string {
    return `prod_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}