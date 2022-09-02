import { ProjectData } from "../Global.types";

interface ProjectProps {
  data: ProjectData;
  onSave: Function;
  onCancel: Function;
  onEdit: Function;
  onDelete: Function;
}

export default ProjectProps;
