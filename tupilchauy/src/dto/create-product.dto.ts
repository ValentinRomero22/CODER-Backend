import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isAlternative: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly isTeam: boolean;
}
