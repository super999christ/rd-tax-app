import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Expense, ExpenseDocument } from "./expense.schema";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true })
    title: string;

    @Prop()
    expenses: Array<ExpenseDocument>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);