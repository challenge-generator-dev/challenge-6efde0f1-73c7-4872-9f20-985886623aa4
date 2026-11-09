import { DynamoDBProductRepository } from '../src/infrastructure/product.repository';
import { Product } from '../src/domain/product.model';
import { dynamoDBDocumentClient as DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '../src/config/aws';

jest.mock('../src/config/aws', () => ({
  DynamoDBDocumentClient: {
    send: jest.fn(),
  },
  PutCommand: jest.fn(),
  GetCommand: jest.fn(),
  ScanCommand: jest.fn(),
  UpdateCommand: jest.fn(),
  DeleteCommand: jest.fn(),
}));

describe('DynamoDBProductRepository', () => {
  let repository: DynamoDBProductRepository;
  let mockSend: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSend = DynamoDBDocumentClient.send as jest.Mock;
    repository = new DynamoDBProductRepository();
  });

  describe('create', () => {
    it('debería crear un producto en DynamoDB', async () => {
      // Arrange
      const product = new Product('1', 'Test Product', 100, 10);
      mockSend.mockResolvedValue({});

      // Act
      const result = await repository.create(product);

      // Assert
      expect(mockSend).toHaveBeenCalled();
      expect(result).toEqual(product);
    });

    it('debería manejar error al crear producto', async () => {
      // Arrange
      const product = new Product('1', 'Test Product', 100, 10);
      mockSend.mockRejectedValue(new Error('DynamoDB error'));

      // Act & Assert
      await expect(repository.create(product)).rejects.toThrow('DynamoDB error');
    });
  });

  describe('findById', () => {
    it('debería retornar el producto cuando existe', async () => {
      // Arrange
      const productData = { id: '1', name: 'Test Product', price: 100, stock: 10 };
      mockSend.mockResolvedValue({ Item: productData });

      // Act
      const result = await repository.findById('1');

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result?.id).toBe('1');
    });

    it('debería retornar null cuando el producto no existe', async () => {
      // Arrange
      mockSend.mockResolvedValue({});

      // Act
      const result = await repository.findById('999');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los productos', async () => {
      // Arrange
      const productsData = [
        { id: '1', name: 'Product 1', price: 100, stock: 10 },
        { id: '2', name: 'Product 2', price: 50, stock: 5 },
      ];
      mockSend.mockResolvedValue({ Items: productsData });

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Product);
      expect(result[1]).toBeInstanceOf(Product);
    });

    it('debería aplicar límite y offset para paginación', async () => {
      // Arrange
      mockSend.mockResolvedValue({ Items: [] });

      // Act
      await repository.findAll(10, 5);

      // Assert
      expect(mockSend).toHaveBeenCalled();
    });

    it('debería retornar array vacío cuando no hay productos', async () => {
      // Arrange
      mockSend.mockResolvedValue({});

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('debería actualizar el producto existente', async () => {
      // Arrange
      const updatedData = { id: '1', name: 'Updated Product', price: 150, stock: 20 };
      const productData = { id: '1', name: 'Test Product', price: 100, stock: 10 };
      
      mockSend
        .mockResolvedValueOnce({ Item: productData })
        .mockResolvedValueOnce({ Attributes: updatedData });

      // Act
      const result = await repository.update('1', { name: 'Updated Product', price: 150, stock: 20 });

      // Assert
      expect(result).toBeInstanceOf(Product);
    });

    it('debería lanzar error cuando el producto no existe', async () => {
      // Arrange
      mockSend.mockResolvedValue({});

      // Act & Assert
      await expect(repository.update('999', { name: 'Test' })).rejects.toThrow('Product not found');
    });
  });

  describe('delete', () => {
    it('debería eliminar el producto existente', async () => {
      // Arrange
      const productData = { id: '1', name: 'Test Product', price: 100, stock: 10 };
      mockSend.mockResolvedValueOnce({ Item: productData }).mockResolvedValueOnce({});

      // Act
      await repository.delete('1');

      // Assert
      expect(mockSend).toHaveBeenCalledTimes(2);
    });

    it('debería lanzar error cuando el producto no existe', async () => {
      // Arrange
      mockSend.mockResolvedValue({});

      // Act & Assert
      await expect(repository.delete('999')).rejects.toThrow('Product not found');
    });
  });

  describe('findByName', () => {
    it('debería retornar el producto cuando el nombre existe', async () => {
      // Arrange
      const productData = { id: '1', name: 'Test Product', price: 100, stock: 10 };
      mockSend.mockResolvedValue({ Item: productData });

      // Act
      const result = await repository.findByName('Test Product');

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result?.name).toBe('Test Product');
    });

    it('debería retornar null cuando el nombre no existe', async () => {
      // Arrange
      mockSend.mockResolvedValue({});

      // Act
      const result = await repository.findByName('Non-existent');

      // Assert
      expect(result).toBeNull();
    });
  });
});