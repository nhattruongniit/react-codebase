import { connect } from 'react-redux';
import UpgradeDocumentModal from '../../components/UpgradeDocumentModal';
import { upgradeDocuments, hideUpgradeDocumentModal } from '../../reducers/upgradeDocumentVersion';
import { getAvailableUpgradeVersions } from '../../selectors/documents';

const mapStateToProps = state => {
  const availableVersions = getAvailableUpgradeVersions(state);
  return {
    ...state.projects.upgradeDocumentVersion,
    versions: availableVersions,
    projects: state.project && state.projects.projects.projectItems.filter(item => item.id !== state.project.id),
    documentStatuses: Object.keys(state.projects.upgradeDocumentVersion.statusByDocumentId)
      .map(documentId => {
        const document = state.projects.documents.documentItems.find(item => item.id === Number.parseInt(documentId, 10));
        if (document) {
          return {
            ...state.projects.upgradeDocumentVersion.statusByDocumentId[documentId],
            id: documentId,
            name: document.document_name,
          };
        }
        return null;
      })
      .filter(item => !!item),
  }
};

const mapDispatchToProps = {
  upgradeFn: upgradeDocuments,
  cancelFn: hideUpgradeDocumentModal
};

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeDocumentModal);
