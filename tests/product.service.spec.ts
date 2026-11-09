import { ProductService } from '../src/application/product.service';
import { Product } from '../src/domain/product.model';
import { ProductRepository } from '../src/domain/product.repository';

describe('ProductService', () => {
  let service: ProductService;
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
    
    service = new ProductService(mockRepository);
  });

  describe('createProduct', () => {
    it('debería crear un producto cuando el nombre no está duplicado', async () => {
      const createDto = { name: 'Test Product', price: 100, stock: 10 };
      const expectedProduct = new Product('1', 'Test Product', 100, 10);
      
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(expectedProduct);

      const result = await service.createProduct(createDto);

      expect(result).toEqual(expectedProduct);
      expect(mockRepository.findByName).toHaveBeenCalledWith('Test Product');
      expect(mockRepository.create).toHaveBeenCalled();
    });

    it('debería lanzar error cuando el nombre está duplicado', async () => {
      const createDto = { name: 'Existing Product', price: 100, stock: 10 };
      const existingProduct = new Product('1', 'Existing Product', 50, 5);
      
      mockRepository.findByName.mockResolvedValue(existingProduct);

      await expect(service.createProduct(createDto)).rejects.toThrow('Product with this name already exists');
    });

    it('debería lanzar error cuando el precio es negativo', async () => {
      const createDto = { name: 'Test Product', price: -10, stock: 10 };

      await expect(service.createProduct(createDto)).rejects.toThrow('Price must be a positive number');
    });
  });

  describe('getProductById', () => {
    it('debería retornar el producto cuando existe', async () => {
      const product = new Product('1', 'Test Product', 100, 10);
      mockRepository.findById.mockResolvedValue(product);

      const result = await service.getProductById('1');

      expect(result).toEqual(product);
    });

    it('debería lanzar error cuando el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getProductById('999')).rejects.toThrow('Product not found');
    });
  });

  describe('getAllProducts', () => {
    it('debería retornar todos los productos con indicador de stock', async () => {
      const products = [
        new Product('1', 'Product 1', 100, 10),
        new Product('2', 'Product 2', 50, 0),
      ];
      mockRepository.findAll.mockResolvedValue(products);

      const result = await service.getAllProducts();

      expect(result).toHaveLength(2);
      expect(result[1].isOutOfStock).toBe(true);
    });
  });

  describe('updateProduct', () => {
    it('debería actualizar el producto cuando existe y nombre no duplicado', async () => {
      const updateDto = { name: 'Updated Product', price: 150 };
      const existingProduct = new Product('1', 'Old Product', 100, 10);
      const updatedProduct = new Product('1', 'Updated Product', 150, 10);
      
      mockRepository.findById.mockResolvedValue(existingProduct);
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue(updatedProduct);

      const result = await service.updateProduct('1', updateDto);

      expect(result).toEqual(updatedProduct);
    });

    it('debería lanzar error cuando el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.updateProduct('999', { name: 'Test' })).rejects.toThrow('Product not found');
    });

    it('debería lanzar error cuando el precio es negativo', async () => {
      const product = new Product('1', 'Test Product', 100, 10);
      mockRepository.findById.mockResolvedValue(product);

      await expect(service.updateProduct('1', { price: -50 })).rejects.toThrow('Price must be a positive number');
    });
  });

  describe('deleteProduct', () => {
    it('debería eliminar el producto cuando existe', async () => {
      const product = new Product('1', 'Test Product', 100, 10);
      mockRepository.findById.mockResolvedValue(product);
      mockRepository.delete.mockResolvedValue();

      await service.deleteProduct('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('debería lanzar error cuando el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.deleteProduct('999')).rejects.toThrow('Product not found');
    });
  });
});