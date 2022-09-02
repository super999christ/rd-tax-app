export interface ExpenseTypes {
  expenseId: string;
  amount: number;
  created_at: Date;
  is_qualified: Boolean;
  attachment: undefined;
}

export interface ProjectData {
  projectId: string;
  title: string;
  expenses: ExpenseTypes[];
  isEditing: Boolean;
}
