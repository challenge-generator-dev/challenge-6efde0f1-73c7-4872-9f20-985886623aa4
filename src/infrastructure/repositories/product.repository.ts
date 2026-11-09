import { Product } from '../../domain/product.model';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(productId: string): Promise<Product | null>;
  findAll(limit?: number, offset?: number): Promise<Product[]>;
  update(productId: string, updateData: Partial<Product>): Promise<Product>;
  delete(productId: string): Promise<void>;
  findByName(name: string): Promise<Product | null>;
}

export class DynamoDBProductRepository implements ProductRepository {
  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(client: DynamoDBDocumentClient, tableName: string = 'products') {
    this.client = client;
    this.tableName = tableName;
  }

  async create(product: Product): Promise<Product> {
    const item = {
      id: (product as any).id,
      name: (product as any).name,
      price: (product as any).price,
      stock: (product as any).stock,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.client.put({
      TableName: this.tableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(id)',
    });

    return product;
  }

  async findById(productId: string): Promise<Product | null> {
    const result = await this.client.get({
      TableName: this.tableName,
      Key: { id: productId },
    });

    if (!result.Item) {
      return null;
    }

    return this.mapToProduct(result.Item);
  }

  async findAll(limit?: number, offset?: number): Promise<Product[]> {
    const params: any = {
      TableName: this.tableName,
    };

    if (limit) {
      params.Limit = limit;
    }

    const result = await this.client.scan(params);
    const items = result.Items || [];

    let products = items.map(item => this.mapToProduct(item));

    if (offset) {
      products = products.slice(offset);
    }

    if (limit) {
      products = products.slice(0, limit);
    }

    return products;
  }

  async update(productId: string, updateData: Partial<Product>): Promise<Product> {
    const updateExpressions: string[] = [];
    const expressionAttributeValues: any = {};
    const expressionAttributeNames: any = {};

    const data = updateData as any;

    if (data.name !== undefined) {
      updateExpressions.push('#name = :name');
      expressionAttributeValues[':name'] = data.name;
      expressionAttributeNames['#name'] = 'name';
    }

    if (data.price !== undefined) {
      updateExpressions.push('#price = :price');
      expressionAttributeValues[':price'] = data.price;
      expressionAttributeNames['#price'] = 'price';
    }

    if (data.stock !== undefined) {
      updateExpressions.push('#stock = :stock');
      expressionAttributeValues[':stock'] = data.stock;
      expressionAttributeNames['#stock'] = 'stock';
    }

    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    await this.client.update({
      TableName: this.tableName,
      Key: { id: productId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW',
    });

    const updatedProduct = await this.findById(productId);
    if (!updatedProduct) {
      throw new Error('Failed to update product');
    }

    return updatedProduct;
  }

  async delete(productId: string): Promise<void> {
    await this.client.delete({
      TableName: this.tableName,
      Key: { id: productId },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    const result = await this.client.scan({
      TableName: this.tableName,
      FilterExpression: '#name = :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': name,
      },
    });

    if (!result.Items || result.Items.length === 0) {
      return null;
    }

    return this.mapToProduct(result.Items[0]);
  }

  private mapToProduct(item: any): Product {
    return new Product(
      item.id,
      item.name,
      item.price,
      item.stock
    );
  }
}