import { connect } from 'react-redux';
import ProjectToolbar from 'components/common/ProjectToolbar';

import { clearSelectedDocuments } from '../../reducers/selectedDocumentIds';
import { showUpgradeDocumentModal } from '../../reducers/upgradeDocumentVersion';
import { showCreateIdfDocumentModal } from '../../reducers/createDocumentModal';
import { duplicateSelectedDocuments, requestDeleteSelectedDocuments } from '../../reducers/documents';
import { toggleSortDirection } from 'reducers/dashboardOptions';
import { getAvailableUpgradeVersions } from '../../selectors/documents';

const mapStateToProps = state => ({
  selectedItemCount: state.projects.selectedDocumentIds.length,
  isUpgradeable: getAvailableUpgradeVersions(state).length > 0,
  sortDirection: state.dashboardOptions.sortDirection,
  title: "New IDF"
});

const mapDispatchToProps = {
  clearSelectedItems: clearSelectedDocuments,
  showUpgradeModalFn: showUpgradeDocumentModal,
  createNewFn: showCreateIdfDocumentModal,
  deleteFn: requestDeleteSelectedDocuments,
  duplicateFn: duplicateSelectedDocuments,
  toggleSortDirection,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectToolbar);
