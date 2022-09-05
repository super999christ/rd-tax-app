//  Internal Dependencies
import { RootState } from './store';

export const selectLoadingState = () => (state: RootState) =>
  state.project.isLoading;
export const selectProjectState = () => (state: RootState) =>
  state.project.Project;
export const selectProjectsState = () => (state: RootState) =>
  state.project.Projects;
