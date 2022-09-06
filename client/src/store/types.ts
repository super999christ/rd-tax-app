//  Internal Dependencies
import { ProjectData } from '../Components/Global.types';

export interface ProjectState {
  isLoading: Boolean;
  isUploading: Boolean;
  Project: ProjectData;
  Projects: ProjectData[];
}

export interface GetRequestProps {
  startPage: number;
  pageSize: number;
}

export interface DeleteRequestProps {
  _id: string;
  startPage: number;
  pageSize: number;
}

export interface PutRequestProps {
  data: ProjectData;
  startPage: number;
  pageSize: number;
}
