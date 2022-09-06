//  External Dependencies
import { useState } from 'react';

//  Internal Dependencies
import { Cancel, Collapse, Confirm, Edit, Trash } from '../../assets/svgs';
import MyTable from '../MyTable/MyTable';
import MyInput from '../MyInput/MyInput';
import ProjectProps from './Project.types';
import { ProjectContainer } from './ProjectContainer.styled';

const Project = ({
  data,
  isEditing,
  isCreating = false,
  onlyQualified,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  onChangeTitle,
  onChangeExpenses,
}: ProjectProps) => {
  const [isShowing, setShowing] = useState(false);
  const { title, expenses } = data;

  const onShowing = () => {
    setShowing(!isShowing);
  };

  let totalAmount = 0;
  expenses.forEach((expense) => {
    totalAmount +=
      (onlyQualified && expense.isQualified) || !onlyQualified
        ? Number(expense.amount)
        : 0;
    return totalAmount;
  });

  const showButton = !isEditing ? (
    <button className="btn btn-sm btn-primary" onClick={(e) => onShowing()}>
      <img className="image-mr-2" src={Collapse} alt="" />
      <span className="responsive">Show</span>
    </button>
  ) : null;

  const editButton = !isEditing ? (
    <button className="btn btn-sm btn-primary" onClick={(e) => onEdit(data)}>
      <img className="image-mr-2" src={Edit} alt="" />
      <span className="responsive">Edit</span>
    </button>
  ) : null;

  const deleteButton = !isCreating ? (
    <button
      className="btn btn-sm btn-danger"
      onClick={(e) => onDelete(data._id)}
    >
      <img className="image-mr-2" src={Trash} alt="" />
      <span className="responsive">Delete</span>
    </button>
  ) : null;

  return (
    <ProjectContainer>
      <div className="project_header">
        <div className="titlePad">
          {isEditing ? (
            <MyInput
              type="text"
              value={title}
              placeholder="Input Project Title"
              onChange={onChangeTitle}
            />
          ) : (
            `${title} - $${totalAmount}`
          )}
        </div>
        <div className="buttonPad">
          {showButton}
          {editButton}
          {deleteButton}
        </div>
      </div>
      <hr className={isShowing || isEditing ? '' : 'hidden_pad'} />
      <div
        className={
          'project_content' + (isShowing || isEditing ? '' : ' hidden_pad')
        }
      >
        <MyTable
          expenses={expenses}
          isEditing={isEditing}
          onlyQualified={onlyQualified}
          onChangeExpenses={onChangeExpenses}
        />
      </div>
      <hr className={!isEditing ? ' hidden_pad' : ''} />
      <div className={'project_actions' + (!isEditing ? ' hidden_pad' : '')}>
        <button className="btn btn-sm btn-primary" onClick={(e) => onSave()}>
          <img className="image-mr-2" src={Confirm} alt="" />
          Confirm
        </button>
        <button className="btn btn-sm btn-danger" onClick={(e) => onCancel()}>
          <img className="image-mr-2" src={Cancel} alt="" />
          Cancel
        </button>
      </div>
    </ProjectContainer>
  );
};

export default Project;
