import FilterBar from 'components/common/FilterBar';
import { setFilterKeyword } from '../../reducers/documents';
import { setTileSize, setLayoutType, setTableRowHeight } from 'reducers/dashboardOptions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  tileSize: state.dashboardOptions.tileSize,
  layoutType: state.dashboardOptions.layoutType,
  rowHeight: state.dashboardOptions.rowHeight,
  filterKeyword: state.projects.documents.filterKeyword,
});

const mapDispatchToProps = {
  setFilterKeyword,
  setTileSize,
  setLayoutType,
  setRowHeight: setTableRowHeight,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
