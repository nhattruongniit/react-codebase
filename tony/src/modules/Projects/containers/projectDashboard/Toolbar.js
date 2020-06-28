import { connect } from 'react-redux';
import ProjectToolbar from 'components/common/ProjectToolbar';

import { clearSelectedProjects } from '../../reducers/selectedProjectIds';
import { showUpgradeProjectModal } from '../../reducers/upgradeProjectVersion';
import { setModalVisibility } from '../../reducers/createProjectModal';
import { duplicateSelectedProjects, requestDeleteSelectedProjects, actSortByDate } from '../../reducers/projects';
import { getAvailableUpgradeVersions } from '../../selectors/projects';

const mapStateToProps = state => ({
  selectedItemCount: state.projects.selectedProjectIds.length,
  isUpgradeable: getAvailableUpgradeVersions(state).length > 0,
  sortDirection: state.dashboardOptions.sortDirection,
});

const mapDispatchToProps = dispatch => ({
  clearSelectedItems: () => dispatch(clearSelectedProjects()),
  showUpgradeModalFn: () => dispatch(showUpgradeProjectModal()),
  createNewFn: () => dispatch(setModalVisibility(true)),
  deleteFn: () => dispatch(requestDeleteSelectedProjects()),
  duplicateFn: () => dispatch(duplicateSelectedProjects()),
  toggleSortDirection: () => dispatch(actSortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectToolbar);
