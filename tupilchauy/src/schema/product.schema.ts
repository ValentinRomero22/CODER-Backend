import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  code: string;
  @Prop()
  image: string;
  @Prop()
  price: number;
  @Prop()
  stock: number;
  @Prop()
  isAlternative: boolean;
  @Prop()
  isTeam: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
