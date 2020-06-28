import { connect } from 'react-redux';
import moment from 'moment';

import DocumentLayout from 'modules/Projects/components/DocumentLayout';
import { toggleSelectDocuments, toggleSelectAllDocuments } from '../../reducers/selectedDocumentIds';
import { setPageNumber, setItemsPerPage } from '../../reducers/documentPagination';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
import { setDocumentName, duplicateDocument, requestDeleteDocument } from '../../reducers/documents';
import { getMaxVersionId } from '../../selectors/projects';
import { selectDocumentAndShowUpgradeDialog } from '../../reducers/upgradeDocumentVersion';
import { SORT_DIRECTION } from 'appConstants';

import DocumentTableRow from 'modules/Projects/components/DocumentTableRow';
import DocumentItem from 'modules/Projects/components/DocumentGridItem';

const formatDate = dateString => moment(dateString).fromNow();

const tableHeaders = [
  {
    key: 'document_name',
    header: 'Name',
  },
  { 
    key: ' applications',
    header: 'Applications'
  },
  {
    key: 'simulations',
    header: 'Simulations',
  },
  {
    key: 'graphs',
    header: 'Graphs',
  },
  {
    key: 'updated_at',
    header: 'Last modified',
    renderer: ({ updatedAt }) => formatDate(updatedAt),
  },
];

const mapStateToProps = state => {
  const { pageNumber, itemsPerPage } = state.projects.documentPagination;
  const { tileSize, layoutType, sortDirection } = state.dashboardOptions;
  const selectedDocumentIds = state.projects.selectedDocumentIds;
  let documents = state.projects.documents.documentItems;
  const keyword = state.projects.documents.filterKeyword && state.projects.documents.filterKeyword.toLowerCase();
  const isSelectAll = documents.length === selectedDocumentIds.length;
  const isIndeterminateSelectAll = selectedDocumentIds.length > 0 && !isSelectAll;
  const project = state.project;

  if (keyword) {
    documents = documents.filter(item => item.document_name.toLowerCase().indexOf(keyword) !== -1);
  }

  documents = [...documents.sort((p1, p2) => {
    const d1 = moment(p1.updated_at).toDate();
    const d2 = moment(p2.updated_at).toDate();
    if (sortDirection === SORT_DIRECTION.DESC) {
      return d1 - d2;
    } else {
      return d2 - d1;
    }
  })];

  const gridProps = {
    items: documents,
    tileSize,
    selectedIds: selectedDocumentIds,
    layoutType,
    isSelectAll,
    isIndeterminateSelectAll,
    gridItemComponent: DocumentItem,
    maxIdfVersion: getMaxVersionId(state),
    projectId: project && project.id,
  }

  if (layoutType === DASHBOARD_LAYOUT_TYPE.GRID) {
    return gridProps;
  }

  const totalItems = state.projects.documents.documentItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const rowHeight = state.dashboardOptions.rowHeight;

  return {
    ...gridProps,
    items: documents,
    pageNumber,
    itemsPerPage,
    totalItems,
    totalPages,
    rowHeight,
    headers: tableHeaders,
    tableRowComponent: DocumentTableRow,
  };
};

const mapDispatchToProps = {
  selectItem: toggleSelectDocuments,
  toggleSelectAll: toggleSelectAllDocuments,
  selectPage: setPageNumber,
  setItemsPerPage,
  setItemName: setDocumentName,
  deleteFn: requestDeleteDocument,
  duplicateFn: duplicateDocument,
  upgradeFn: selectDocumentAndShowUpgradeDialog,
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentLayout);