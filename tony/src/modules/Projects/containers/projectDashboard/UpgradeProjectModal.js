import { connect } from 'react-redux';
import UpgradeProjectModal from '../../components/UpgradeProjectModal';
import { showUpgradeProjectModal, upgradeProjects, } from '../../reducers/upgradeProjectVersion';
import { getAvailableUpgradeVersions } from '../../selectors/projects';

const mapStateToProps = state => ({
  ...state.projects.upgradeProjectVersion,
  versions: getAvailableUpgradeVersions(state),
  projects: Object.keys(state.projects.upgradeProjectVersion.statusByProjectId)
    .map(projectId => {
      const project = state.projects.projects.projectItems.find(item => item.id === Number.parseInt(projectId, 10));
      if (project) {
        return {
          ...state.projects.upgradeProjectVersion.statusByProjectId[projectId],
          id: projectId,
          name: project.project_name,
        };
      }
      return null;
    })
    .filter(item => !!item),
});

const mapDispatchToProps = dispatch => ({
  upgradeFn: (version) => dispatch(upgradeProjects(version)),
  cancelFn: () => dispatch(showUpgradeProjectModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeProjectModal);
