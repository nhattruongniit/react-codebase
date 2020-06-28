import { combineReducers } from 'redux';
import projects from './projects';
import selectedProjectIds from './selectedProjectIds';
import projectPagination from './projectPagination';
import upgradeProjectVersion from './upgradeProjectVersion';
import documents from './documents';
import documentPagination from './documentPagination';
import selectedDocumentIds from './selectedDocumentIds';
import createProjectModal from './createProjectModal';
import createDocumentModal from './createDocumentModal';
import upgradeDocumentVersion from './upgradeDocumentVersion';

export default combineReducers({
  projects,
  selectedProjectIds,
  projectPagination,
  upgradeProjectVersion,
  documents,
  documentPagination,
  selectedDocumentIds,
  createProjectModal,
  createDocumentModal,
  upgradeDocumentVersion,
});
