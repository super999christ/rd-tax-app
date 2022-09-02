//  External Dependencies
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//  Internal Dependencies
import { MainContainer } from "./MainContainer.styled";
import Project from "../Project/Project";
import { ProjectData } from "../Global.types";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} from "../../store/projectSlice";

const Main = () => {
  const dispatch = useDispatch();
  const fakeDatas: ProjectData[] = [
    {
      projectId: "project_id_1",
      title: "project_title_1",
      isEditing: false,
      expenses: [
        {
          expenseId: "expense_1_1",
          amount: 11,
          created_at: new Date(Date.now()),
          is_qualified: false,
          attachment: undefined,
        },
        {
          expenseId: "expense_1_2",
          amount: 12,
          created_at: new Date(Date.now()),
          is_qualified: false,
          attachment: undefined,
        },
        {
          expenseId: "expense_1_3",
          amount: 13,
          created_at: new Date(Date.now()),
          is_qualified: false,
          attachment: undefined,
        },
      ],
    },
    {
      projectId: "project_id_2",
      title: "project_title_2",
      isEditing: true,
      expenses: [
        {
          expenseId: "expense_2_1",
          amount: 21,
          created_at: new Date(Date.now()),
          is_qualified: false,
          attachment: undefined,
        },
        {
          expenseId: "expense_2_2",
          amount: 22,
          created_at: new Date(Date.now()),
          is_qualified: false,
          attachment: undefined,
        },
        {
          expenseId: "expense_2_3",
          amount: 23,
          created_at: new Date(Date.now()),
          is_qualified: false,
          attachment: undefined,
        },
      ],
    },
  ];
  const [isUpdated, setUpdated] = useState(false);

  const onSave = (data: ProjectData) => {
    console.log("Save: " + data.projectId);
  };

  const onCancel = (data: ProjectData) => {
    console.log("Cancel: " + data.projectId);
  };

  const onEdit = (data: ProjectData) => {
    console.log("Edit: " + data.projectId);
  };

  const onDelete = (data: ProjectData) => {
    console.log("Delete: ", data.projectId);
    dispatch(deleteProject(data));
  };

  return (
    <MainContainer>
      {fakeDatas.map((fakeData) => {
        return (
          <Project
            key={fakeData.projectId}
            data={fakeData}
            onSave={onSave}
            onCancel={onCancel}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </MainContainer>
  );
};

export default Main;
