//  External Dependencies
import { useState } from "react";

//  Internal Dependencies
import { Cancel, Collapse, Confirm, Edit, Trash } from "../../assets/svgs";
import MyTable from "../MyTable/MyTable";
import MyInput from "../MyInput/MyInput";

import ProjectProps from "./Project.types";
import { ProjectContainer } from "./ProjectContainer.styled";

const Project = ({
  data,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: ProjectProps) => {
  const [isShowing, setShowing] = useState(false);
  const { projectId, title, expenses, isEditing } = data;

  const onShowing = () => {
    setShowing(!isShowing);
  };

  const showButton = !isEditing ? (
    <button className="btn btn-sm btn-primary" onClick={(e) => onShowing()}>
      <img src={Collapse} alt="" />
      Show
    </button>
  ) : null;

  console.log(title);

  return (
    <ProjectContainer>
      <div className="project_header">
        <div className="titlePad">{title}</div>
        <div className="buttonPad">
          {showButton}
          <button
            className="btn btn-sm btn-primary"
            onClick={(e) => onEdit(data)}
          >
            <img src={Edit} alt="" />
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={(e) => onDelete(data)}
          >
            <img src={Trash} alt="" />
            Delete
          </button>
        </div>
      </div>
      <hr className={isShowing || isEditing ? "" : "hidden_pad"} />
      <div
        className={
          "project_content" + (isShowing || isEditing ? "" : " hidden_pad")
        }
      >
        <MyTable expenses={expenses} isEditing={isEditing} />
      </div>
      <hr className={!isEditing ? " hidden_pad" : ""} />
      <div className={"project_actions" + (!isEditing ? " hidden_pad" : "")}>
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => onSave(data)}
        >
          <img src={Confirm} alt="" />
          Confirm
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={(e) => onCancel(data)}
        >
          <img src={Cancel} alt="" />
          Cancel
        </button>
      </div>
    </ProjectContainer>
  );
};

export default Project;
