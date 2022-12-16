import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly name: string;
  readonly description: string;
  readonly code: string;
  readonly image: string;
  readonly price: number;
  readonly stock: number;
  readonly isAlternative: boolean;
  readonly isTeam: boolean;
}
