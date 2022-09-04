import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExpenseDocument } from './expense.schema';

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  expenses: Array<ExpenseDocument>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
