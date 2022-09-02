//  External Dependencies
import React from "react";

//  Internal Dependencies
import { MyTableProps } from "./MyTable.types";
import { MyTableContainer } from "./MyTableContainer.styled";

function MyTable({ expenses }: MyTableProps) {
  const content = expenses.map((item, index) => {
    return (
      <tr key={item.expenseId}>
        <td>{index + 1}</td>
        <td>{item.created_at.getDate()}</td>
        <td>{item.amount}</td>
        <td>{item.is_qualified === true ? "Qualified" : "Not Qualified"}</td>
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
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </MyTableContainer>
  );
}

export default MyTable;
