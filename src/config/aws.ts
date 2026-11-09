import { DynamoDBClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ProductService } from '../application/product.service';
import {
  AppError,
  ProductAlreadyExistsError,
  ProductNotFoundError,
  InvalidPriceError,
  InvalidStockError,
  ValidationError,
  DatabaseError,
} from '../utils/errors';

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || defaultValue!;
}

const region = getEnvVar('AWS_REGION', 'us-east-1');
const accessKeyId = getEnvVar('AWS_ACCESS_KEY_ID');
const secretAccessKey = getEnvVar('AWS_SECRET_ACCESS_KEY');
const endpoint = process.env.AWS_ENDPOINT;

const clientConfig: DynamoDBClientConfig = {
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
};

if (endpoint) {
  clientConfig.endpoint = endpoint;
}

const client = new DynamoDBClient(clientConfig);

export const dynamoDBDocumentClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});

export const TABLE_NAME = getEnvVar('DYNAMODB_TABLE_NAME', 'products');

interface DynamoDBClientConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  endpoint?: string;
}

export { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand };
export { ProductService };
export { AppError, ProductAlreadyExistsError, ProductNotFoundError, InvalidPriceError, InvalidStockError, ValidationError, DatabaseError };