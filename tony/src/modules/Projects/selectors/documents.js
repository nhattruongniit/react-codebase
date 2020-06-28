import { maxBy } from 'lodash';

export function getAvailableUpgradeVersions(state) {
  const documents = state.projects.selectedDocumentIds.map(id => state.projects.documents.documentItems.find(item => item.id === id));
  const maxVersionItem = maxBy(documents, item => item && item.version_id);
  if (maxVersionItem) {
    const availableVersions = state.version.list.filter(version => version.id > maxVersionItem.version_id);
    return availableVersions;
  }
  return state.version.list;

}