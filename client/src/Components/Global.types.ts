export interface ExpenseTypes {
  _id: string;
  amount: string;
  createdAt?: string;
  isQualified: boolean;
  attachment: string;
}

export interface ProjectData {
  _id: string;
  title: string;
  expenses: ExpenseTypes[];
}
