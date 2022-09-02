//  External Dependencies
import React from "react";

//  Internal Dependencies
import { MyTableProps } from "./MyTable.types";
import { MyTableContainer } from "./MyTableContainer.styled";
import MyInput from "../MyInput/MyInput";

import { Edit, Trash } from "../../assets/svgs";

function MyTable({ expenses, isEditing }: MyTableProps) {
  const editingStatus = new Array(expenses.length).fill(false);

  const content = expenses.map((item, index) => {
    return (
      <tr key={item.expenseId}>
        <td>{index + 1}</td>
        <td>{item.created_at.getDate()}</td>
        <td>{editingStatus[index] ? "changing" : item.amount}</td>
        <td>{item.is_qualified === true ? "Qualified" : "Not Qualified"}</td>
        {isEditing ? (
          <td className="buttonPad">
            <button
              className="btn btn-sm btn-primary"
              // onClick={(e) => onEdit(index)}
            >
              <img src={Edit} alt="" />
            </button>
            <button
              className="btn btn-sm btn-danger"
              // onClick={(e) => onDelete(index)}
            >
              <img src={Trash} alt="" />
            </button>
          </td>
        ) : null}
      </tr>
    );
  });
  return (
    <MyTableContainer>
      <thead>
        <tr>
          <th>No</th>
          <th>Created Date</th>
          <th>Amount</th>
          <th>Status</th>
          {isEditing ? <th></th> : null}
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </MyTableContainer>
  );
}

export default MyTable;
