import { maxBy } from 'lodash';

export function getAvailableUpgradeVersions(state) {
  const projects = state.projects.selectedProjectIds.map(id => state.projects.projects.projectItems.find(item => item.id === id));
  if (projects.length > 0) {
    const maxVersion = maxBy(projects, item => item && parseFloat(item.version_id)).version_id;
    const availableVersions = state.version.list.filter(version => version.id > maxVersion);
    return availableVersions;
  }
  return [];
}

export function getMaxVersionId(state) {
  return state.version.list.length > 0 && maxBy(state.version.list, version => version.id).id;
}