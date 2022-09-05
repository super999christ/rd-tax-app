//  External Dependencies
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//  Internal Dependencies
import { MainContainer } from './MainContainer.styled';
import Project from '../Project/Project';
import { ProjectData, ExpenseTypes } from '../Global.types';

import { useAppDispatch, store } from '../../store/store';
import {
  deleteProject,
  getProjects,
  updateProject,
  createProject,
} from '../../store/projectSlice';
import {
  setEditingProject,
  setEditingContent,
  onCancelEditing,
} from '../../store/projectSlice';
import { selectProjectsState, selectLoadingState } from '../../store/selectors';

const PAGE_SIZE = 5;
const startPage = 0;

const Main = () => {
  const dispatch = useAppDispatch();
  const [editingData, setEditingData] = useState<ProjectData>();
  const [isCreating, setCreating] = useState(false);

  const datas = useSelector(selectProjectsState());
  const isLoading = useSelector(selectLoadingState());

  useEffect(() => {
    dispatch(getProjects({ startPage: startPage, pageSize: PAGE_SIZE }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //  When Click Confirm button on Edit or Create Project
  const onSave = async () => {
    const editingData = store.getState().project.Project;
    if (editingData.title === '') {
      alert('You must input project title');
      return;
    }
    if (isCreating) {
      await dispatch(
        createProject({
          data: editingData,
          startPage: startPage,
          pageSize: PAGE_SIZE,
        }),
      );
    } else {
      await dispatch(
        updateProject({
          data: editingData,
          startPage: startPage,
          pageSize: PAGE_SIZE,
        }),
      );
    }
    setEditingData({
      _id: '',
      title: '',
      expenses: [],
    });
    setCreating(false);
  };

  //  When Click Cancel button on Edit or Create Project
  const onCancel = async () => {
    await dispatch(onCancelEditing());
    setEditingData(store.getState().project.Project);
    setCreating(false);
  };

  //  When Click Edit button
  const onEdit = async (data: ProjectData) => {
    const project = store.getState().project.Project;
    if (project._id !== '' || isCreating) {
      if (
        window.confirm(
          `The changes for another project is in progress.\nDo you want to ignore it?`,
        )
      ) {
        setCreating(false);
        await dispatch(setEditingProject(data));
        setEditingData(store.getState().project.Project);
      }
    } else {
      setCreating(false);
      await dispatch(setEditingProject(data));
      setEditingData(store.getState().project.Project);
    }
  };

  //  When Click Create button
  const onCreate = async () => {
    setCreating(true);
    const data = {
      _id: '',
      title: '',
      expenses: [],
    };
    await dispatch(setEditingProject(data));
    setEditingData(store.getState().project.Project);
  };

  //  When Click Delete button
  const onDelete = async (_id: string) => {
    console.log('Delete: ', _id);
    if (window.confirm('Do you want to delete this project?')) {
      await dispatch(
        deleteProject({
          _id: _id,
          startPage: startPage,
          pageSize: PAGE_SIZE,
        }),
      );
    }
  };

  //  Handle the changes of title of project
  const onChangeTitle = async (data: string) => {
    console.log(data);
    const project = store.getState().project.Project;
    const newData = {
      ...project,
      title: data,
    };
    await dispatch(setEditingContent(newData));
    setEditingData(newData);
  };

  //  Handle the changes of expenses of project
  const onChangeExpenses = async (data: ExpenseTypes[]) => {
    console.log(data);
    const project = store.getState().project.Project;
    const newData = {
      ...project,
      expenses: data,
    };
    console.log(newData);
    await dispatch(setEditingContent(newData));
    setEditingData(newData);
  };

  return (
    <MainContainer>
      {isLoading ? (
        <div className="loadingPane">Loading...</div>
      ) : (
        <>
          <button
            className="btn btn-lg btn-primary"
            onClick={(e) => onCreate()}
          >
            Create Project
          </button>
          {isCreating === true ? (
            <Project
              key="creating"
              data={store.getState().project.Project}
              isEditing={true}
              isCreating={true}
              onSave={onSave}
              onCancel={onCancel}
              onEdit={onEdit}
              onDelete={onDelete}
              onChangeTitle={onChangeTitle}
              onChangeExpenses={onChangeExpenses}
            />
          ) : null}
          {datas.map((data: ProjectData) => {
            return (
              <Project
                key={data._id}
                data={
                  editingData?._id === data._id
                    ? store.getState().project.Project
                    : data
                }
                isEditing={editingData?._id === data._id}
                onSave={onSave}
                onCancel={onCancel}
                onEdit={onEdit}
                onDelete={onDelete}
                onChangeTitle={onChangeTitle}
                onChangeExpenses={onChangeExpenses}
              />
            );
          })}
        </>
      )}
    </MainContainer>
  );
};

export default Main;
