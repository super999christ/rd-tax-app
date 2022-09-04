import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

export class Expense {
  @Prop({ required: true })
  isQualified: boolean;

  @Prop({ required: true })
  amount: number;

  @Prop()
  docId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}
