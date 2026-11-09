import { DynamoDBClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Product } from '../domain/product.model';
import { dynamoDBDocumentClient, TABLE_NAME } from '../config/aws';

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

  constructor() {
    this.client = dynamoDBDocumentClient;
    this.tableName = TABLE_NAME;
  }

  async create(product: Product): Promise<Product> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
      },
      ConditionExpression: 'attribute_not_exists(id)',
    });

    try {
      await this.client.send(command);
      return product;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ConditionalCheckFailedException') {
        throw new Error('Product with this ID already exists');
      }
      throw error;
    }
  }

  async findById(productId: string): Promise<Product | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id: productId },
    });

    const response = await this.client.send(command);
    if (!response.Item) {
      return null;
    }

    return new Product(
      response.Item.id as string,
      response.Item.name as string,
      response.Item.price as number,
      response.Item.stock as number
    );
  }

  async findAll(limit?: number, offset?: number): Promise<Product[]> {
    const params: Record<string, unknown> = {
      TableName: this.tableName,
    };

    if (limit) {
      params.Limit = limit;
    }

    if (offset) {
      params.ExclusiveStartKey = { id: offset.toString() };
    }

    const command = new ScanCommand(params);
    const response = await this.client.send(command);

    return response.Items?.map((item) => new Product(
      item.id as string,
      item.name as string,
      item.price as number,
      item.stock as number
    )) || [];
  }

  async update(productId: string, updateData: Partial<Product>): Promise<Product> {
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, unknown> = {};
    const expressionAttributeNames: Record<string, string> = {};

    if (updateData.name !== undefined) {
      updateExpressions.push('#name = :name');
      expressionAttributeNames['#name'] = 'name';
      expressionAttributeValues[':name'] = updateData.name;
    }

    if (updateData.price !== undefined) {
      updateExpressions.push('price = :price');
      expressionAttributeValues[':price'] = updateData.price;
    }

    if (updateData.stock !== undefined) {
      updateExpressions.push('stock = :stock');
      expressionAttributeValues[':stock'] = updateData.stock;
    }

    if (updateExpressions.length === 0) {
      throw new Error('No update data provided');
    }

    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id: productId },
      UpdateExpression: 'SET ' + updateExpressions.join(', '),
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ReturnValues: 'ALL_NEW',
    });

    try {
      const response = await this.client.send(command);
      if (!response.Attributes) {
        throw new Error('Product not found');
      }

      return new Product(
        response.Attributes.id as string,
        response.Attributes.name as string,
        response.Attributes.price as number,
        response.Attributes.stock as number
      );
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ConditionalCheckFailedException') {
        throw new Error('Product not found');
      }
      throw error;
    }
  }

  async delete(productId: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id: productId },
    });

    try {
      await this.client.send(command);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ConditionalCheckFailedException') {
        throw new Error('Product not found');
      }
      throw error;
    }
  }

  async findByName(name: string): Promise<Product | null> {
    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: 'name = :name',
      ExpressionAttributeValues: {
        ':name': name,
      },
      Limit: 1,
    });

    const response = await this.client.send(command);
    if (!response.Items || response.Items.length === 0) {
      return null;
    }

    const item = response.Items[0];
    return new Product(
      item.id as string,
      item.name as string,
      item.price as number,
      item.stock as number
    );
  }
}

export { ProductRepository };