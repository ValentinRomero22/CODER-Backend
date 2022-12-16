import {
  Controller,
  Body,
  Delete,
  Get,
  Post,
  Put,
  Param,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { ProductService } from 'src/service/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const newProduct = await this.productService.createProduct(
        createProductDto,
      );

      return response.status(HttpStatus.CREATED).json({
        statusCode: 201,
        message: 'Producto creado correctamente',
        data: newProduct,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error, no se agregó el producto',
        data: error,
      });
    }
  }

  @Put('/:id')
  async updateProduct(
    @Res() response,
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const productUpdated = await this.productService.updateProduct(
        productId,
        updateProductDto,
      );

      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Producto modificado correctamente',
        data: productUpdated,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get()
  async getAllProducts(@Res() response) {
    try {
      const productsFound = await this.productService.getAllProducts();

      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Productos encontrados',
        data: productsFound,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:id')
  async getProduct(@Res() response, @Param('id') productId: string) {
    try {
      const productFound = await this.productService.getProduct(productId);

      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Producto encontrado',
        data: productFound,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Res() response, @Param('id') productId: string) {
    try {
      const productDeleted = await this.productService.deleteProduct(productId);

      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Producto eliminado correctamente',
        data: productDeleted,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
