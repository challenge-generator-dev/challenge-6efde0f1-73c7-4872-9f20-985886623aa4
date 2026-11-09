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