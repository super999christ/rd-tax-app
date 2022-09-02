import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { ProjectData } from "../Components/Global.types";

export interface ProjectState {
  isLoading: Boolean;
  Project: ProjectData | null;
  Projects: ProjectData[];
}

const initialState: ProjectState = {
  isLoading: false,
  Project: null,
  Projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    createProject: (state, payload: PayloadAction<ProjectData>) => {
      console.log(payload);
    },
    updateProject: (state, payload: PayloadAction<ProjectData>) => {
      console.log(payload);
    },
    getProjects: async (state, payload: PayloadAction<number>) => {
      console.log(payload);
      state.isLoading = true;
    },
    deleteProject: async (state, payload: PayloadAction<ProjectData>) => {
      console.log(payload);
    },
  },
});

export const { createProject, updateProject, getProjects, deleteProject } =
  projectSlice.actions;

export default projectSlice.reducer;
