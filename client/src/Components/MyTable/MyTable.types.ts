//  Internal Dependencies
import { ExpenseTypes } from '../Global.types';

export interface MyTableProps {
  expenses: ExpenseTypes[];
  isEditing: Boolean;
  onlyQualified: Boolean;
  onChangeExpenses: Function;
}
