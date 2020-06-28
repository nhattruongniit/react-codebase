import FilterBar from "components/common/FilterBar";
import { setFilterKeyword } from "../reducers/simulationResult";
import {
  setTileSize,
  setLayoutType,
  setTableRowHeight,
} from "reducers/dashboardOptions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  tileSize: state.dashboardOptions.tileSize,
  layoutType: state.dashboardOptions.layoutType,
  rowHeight: state.dashboardOptions.rowHeight,
  filterKeyword: state.simulators.simulators.filterKeyword,
  disableSearch: true,
});

const mapDispatchToProps = {
  setFilterKeyword,
  setTileSize,
  setLayoutType,
  setRowHeight: setTableRowHeight
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
