# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/product.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/product.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/product.repository.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:productId`
  - `GET /products`
  - `PUT /products/:productId`
  - `DELETE /products/:productId`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

## Como saber que terminaste

```bash
npm install && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest (corrida e2e 20261109074436524), Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: CRUD de productos con Express y DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Creación de productos — objetivo: Permitir la creación de nuevos productos en el inventario. — entregable (NO resolver): API REST que permite crear productos con validación de precio y nombre.
- Fase 2: Consulta de productos — objetivo: Permitir la consulta de productos por identificador y lista completa. — entregable (NO resolver): API REST que permite consultar productos por identificador y obtener la lista completa de productos, marcando aquellos con stock cero como agotados.
- Fase 3: Actualización y eliminación de productos — objetivo: Permitir la actualización y eliminación de productos. — entregable (NO resolver): API REST que permite actualizar y eliminar productos, con validaciones de precio y nombre en la actualización.
- Fase 4: Pruebas unitarias — objetivo: Cubrir las funcionalidades implementadas con pruebas unitarias. — entregable (NO resolver): Conjunto de pruebas unitarias que cubren todas las funcionalidades implementadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: package.json ===
{
  "name": "product-crud-api",
  "version": "1.0.0",
  "description": "API for product CRUD operations with Express and DynamoDB",
  "main": "src/main.ts",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.658.1",
    "@aws-sdk/lib-dynamodb": "3.658.1",
    "class-transformer": "^0.5.1",
    "class-validator": "0.14.1",
    "express": "4.21.0",
    "reflect-metadata": "0.2.2",
    "inversify": "6.0.2"
  },
  "devDependencies": {
    "@types/express": "5.0.0",
    "@types/jest": "29.5.14",
    "@types/supertest": "6.0.2",
    "jest": "29.7.0",
    "supertest": "7.0.0",
    "ts-jest": "29.2.5",
    "ts-node": "10.9.2",
    "typescript": "^5.7.3"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}


// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}

// === ARCHIVO: src/domain/product.model.ts ===
import { IsNumber, IsPositive, IsString, Min, Max } from 'class-validator';

export class Product {
  id: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  price: number;

  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  get isOutOfStock(): boolean {
    return this.stock === 0;
  }

  constructor(id: string, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

export class CreateProductDto {
  @IsString({ message: 'El nombre es obligatorio' })
  name: string;

  @IsNumber({}, { message: 'El precio es obligatorio' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  price: number;

  @IsNumber({}, { message: 'El stock es obligatorio' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;
}

export class UpdateProductDto {
  @IsString({ message: 'El nombre debe ser un texto', each: false })
  name?: string;

  @IsNumber({}, { message: 'El precio debe ser un número', each: false })
  @IsPositive({ message: 'El precio debe ser positivo', each: false })
  price?: number;

  @IsNumber({}, { message: 'El stock debe ser un número', each: false })
  @Min(0, { message: 'El stock no puede ser negativo', each: false })
  stock?: number;
}

// === ARCHIVO: src/infrastructure/product.repository.ts ===
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

// === ARCHIVO: src/interfaces/product.controller.ts ===
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

// === ARCHIVO: src/index.ts ===
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

// === ARCHIVO: src/interfaces/middlewares/validation.middleware.ts ===
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from '../../domain/product.model';
import { UpdateProductDto } from '../../domain/product.model';

export async function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const path = req.path;
  
  let dtoClass: typeof CreateProductDto | typeof UpdateProductDto;
  
  if (path === '/products' && req.method === 'POST') {
    dtoClass = CreateProductDto;
  } else if (path.match(/^\/products\/.+$/) && req.method === 'PUT') {
    dtoClass = UpdateProductDto;
  } else {
    next();
    return;
  }
  
  const dtoInstance = plainToInstance(dtoClass, req.body);
  
  const errors = await validate(dtoInstance as object, {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });
  
  if (errors.length > 0) {
    const errorMessages = errors.map((error) => {
      return `${error.property}: ${Object.values(error.constraints || {}).join(', ')}`;
    });
    
    res.status(400).json({
      error: 'Validación fallida',
      details: errorMessages,
    });
    return;
  }
  
  req.body = dtoInstance;
  next();
}

// === ARCHIVO: src/interfaces/middlewares/error.middleware.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError, ProductAlreadyExistsError, ProductNotFoundError, InvalidPriceError, InvalidStockError } from '../../utils/errors';

export { ProductAlreadyExistsError, ProductNotFoundError, InvalidPriceError, InvalidStockError };

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[Error] ${err.message}`);
  console.error(err.stack);
  
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }
  
  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: 'Error de validación',
      details: err.message,
    });
    return;
  }
  
  if (err.name === 'ConflictError') {
    res.status(409).json({
      error: err.message,
    });
    return;
  }
  
  if (err.name === 'NotFoundError') {
    res.status(404).json({
      error: err.message,
    });
    return;
  }
  
  res.status(500).json({
    error: 'Error interno del servidor',
  });
};

// === ARCHIVO: src/config/aws.ts ===
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

// === ARCHIVO: tests/product.service.spec.ts ===
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

// === ARCHIVO: tests/product.controller.spec.ts ===
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

// === ARCHIVO: tests/product.repository.spec.ts ===
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

// === ARCHIVO: src/utils/errors.ts ===
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ProductAlreadyExistsError extends AppError {
  constructor(message: string = 'Product already exists') {
    super(message, 409, 'PRODUCT_ALREADY_EXISTS');
  }
}

export class ProductNotFoundError extends AppError {
  constructor(message: string = 'Product not found') {
    super(message, 404, 'PRODUCT_NOT_FOUND');
  }
}

export class InvalidPriceError extends AppError {
  constructor(message: string = 'Invalid price') {
    super(message, 400, 'INVALID_PRICE');
  }
}

export class InvalidStockError extends AppError {
  constructor(message: string = 'Invalid stock') {
    super(message, 400, 'INVALID_STOCK');
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR');
  }
}

// === ARCHIVO: src/application/product.service.ts ===
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

// === ARCHIVO: src/infrastructure/repositories/product.repository.ts ===
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

// === ARCHIVO: src/domain/product.repository.ts ===
export type { ProductRepository } from '../infrastructure/repositories/product.repository';

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
