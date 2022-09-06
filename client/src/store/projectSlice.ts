//  External Dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//  Internal Dependencies
import {
  ProjectState,
  GetRequestProps,
  DeleteRequestProps,
  PutRequestProps,
} from './types';
import { SERVER_URL } from '../consts';

const initialState: ProjectState = {
  isLoading: false,
  isUploading: false,
  Project: {
    _id: '',
    title: '',
    expenses: [],
  },
  Projects: [],
};

//  Download the project data
export const getProjects = createAsyncThunk(
  '/project/get',
  async ({ startPage, pageSize }: GetRequestProps) => {
    const response = await axios.get(
      `${SERVER_URL}?startPage=${startPage}&pageSize=${pageSize}`,
    );
    return response.data;
  },
);

//  Delete the specified project and Download the data
export const deleteProject = createAsyncThunk(
  '/project/delete',
  async ({ _id, startPage, pageSize }: DeleteRequestProps) => {
    await axios.delete(`${SERVER_URL}/${_id}`);
    const response = await axios.get(
      `${SERVER_URL}?startPage=${startPage}&pageSize=${pageSize}`,
    );
    return response.data;
  },
);

//  Create Project and Download the data
export const createProject = createAsyncThunk(
  '/project/create',
  async ({ data, startPage, pageSize }: PutRequestProps) => {
    const newAry = data.expenses.map((item) => {
      if (item._id.includes('created') === true) {
        return { ...item, _id: '' };
      } else {
        return item;
      }
    });
    const processedData = {
      title: data.title,
      expenses: newAry,
    };

    await axios.post(`${SERVER_URL}`, { ...processedData });
    const response = await axios.get(
      `${SERVER_URL}?startPage=${startPage}&pageSize=${pageSize}`,
    );
    return response.data;
  },
);

//  Update Project and Download the data
export const updateProject = createAsyncThunk(
  '/project/update',
  async ({ data, startPage, pageSize }: PutRequestProps) => {
    console.log(data);
    const processedData = data;
    processedData.expenses.forEach((item) => {
      if (item._id.includes('create')) {
        return { ...item, _id: '' };
      }
      return item;
    });

    await axios.put(`${SERVER_URL}`, { ...processedData });
    const response = await axios.get(
      `${SERVER_URL}?startPage=${startPage}&pageSize=${pageSize}`,
    );
    return response.data;
  },
);

//  Upload attachment
export const uploadFile = createAsyncThunk(
  '/project/upload',
  // async (file: File | undefined) => {
  async (file: File | undefined) => {
    if (file === undefined) return '';
    const formData = new FormData();
    formData.append('file', file);
    const uploadedResult = await axios.post(
      `${SERVER_URL}/uploadDocument`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return uploadedResult.data.id;
  },
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    //  Set the Project to edit
    setEditingProject: (state, { payload }) => {
      if (state.Project?._id === payload._id) {
        state.Project = {
          _id: '',
          title: '',
          expenses: [],
        };
      } else state.Project = payload;
    },

    //  Save Editing data
    setEditingContent: (state, { payload }) => {
      state.Project = payload;
    },

    //  Clear the Editing Project
    onCancelEditing: (state) => {
      state.Project = {
        _id: '',
        title: '',
        expenses: [],
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Projects = action.payload;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteProject.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Projects = action.payload;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateProject.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Project = {
        _id: '',
        title: '',
        expenses: [],
      };
      state.Projects = action.payload;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(createProject.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Project = {
        _id: '',
        title: '',
        expenses: [],
      };
      state.Projects = action.payload;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(uploadFile.pending, (state, action) => {
      state.isUploading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.isUploading = false;
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.isUploading = false;
    });
  },
});

export const { setEditingProject, setEditingContent, onCancelEditing } =
  projectSlice.actions;
