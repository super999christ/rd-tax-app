//  Internal Dependencies
import { ProjectData } from '../Global.types';

interface ProjectProps {
  data: ProjectData;
  isEditing: Boolean;
  isCreating?: Boolean;
  onSave: Function;
  onCancel: Function;
  onEdit: Function;
  onDelete: Function;
  onChangeTitle: Function;
  onChangeExpenses: Function;
}

export default ProjectProps;
