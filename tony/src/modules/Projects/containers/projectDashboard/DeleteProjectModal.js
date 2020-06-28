import { connect } from 'react-redux';
import DeleteProjectModal from '../../components/DeleteProjectModal';
import { confirmDeleteProject, cancelDeleteProject } from '../../reducers/projects';

const mapStateToProps = state => ({
  isShowing: state.projects.projects.deleteProject.isDeleting,
});

const mapDispatchToProps = {
  confirmFn: confirmDeleteProject,
  cancelFn: cancelDeleteProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProjectModal);
