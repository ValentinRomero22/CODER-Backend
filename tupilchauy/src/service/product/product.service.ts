import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'src/interface/product.interface';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    const newProduct = await new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      productId,
      updateProductDto,
      { new: true },
    );

    if (!existingProduct) {
      throw new NotFoundException(
        `No se encontró el producto con el id: ${productId}`,
      );
    }

    return existingProduct;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const products = await this.productModel.find();

    if (!products || products.length == 0) {
      throw new NotFoundException('Producto no encontrado');
    }

    return products;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const product = await this.productModel.findById(productId).exec();

    if (!product) {
      throw new NotFoundException(
        `No se encontró el producto con el id: ${productId}`,
      );
    }

    return product;
  }

  async deleteProduct(productId: string): Promise<IProduct> {
    const productToDelete = await this.productModel.findByIdAndDelete(
      productId,
    );

    if (!productToDelete) {
      throw new NotFoundException(
        `No se encontró el producto con el id: ${productId}`,
      );
    }

    return productToDelete;
  }
}
