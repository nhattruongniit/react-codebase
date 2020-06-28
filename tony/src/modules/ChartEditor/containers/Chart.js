import { connect } from 'react-redux';
import { setActivePage } from '../reducers/chartValues';
import Chart from '../components/Chart';

const mapStateToProps = state => {
  const { chartValues, activePage, labels } = state.chartEditor.chartValues;
  const { activeTabId, tabById } = state.chartEditor.tabs;
  const { plottedType } = state.chartEditor.plottedVariables;
  const chartOptions =
    activeTabId && tabById[activeTabId] && tabById[activeTabId].options;

  return {
    data: chartValues && chartValues[activePage],
    pageNumber: activePage,
    pageLabel:
      chartValues && chartValues[activePage] && chartValues[activePage].name,
    totalPages: chartValues.length,
    labels,
    chartOptions,
    chart: state.chartEditor.chart,
    plottedType,
  };
};

const mapDispatchToProps = {
  selectPage: setActivePage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
