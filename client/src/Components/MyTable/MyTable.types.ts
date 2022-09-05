//  Internal Dependencies
import { ExpenseTypes } from '../Global.types';

export interface MyTableProps {
  expenses: ExpenseTypes[];
  isEditing: Boolean;
  onChangeExpenses: Function;
}
