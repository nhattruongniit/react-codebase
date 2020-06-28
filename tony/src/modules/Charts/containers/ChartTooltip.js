import { connect } from 'react-redux';
import ChartTooltip from '../components/ChartTooltip';


import { setTooltipVisibility } from '../reducers/createChartModal';

const mapStateToProps = state => ({
  isShowTooltip: state.charts.createChartModal.isShowTooltip
});

const mapDispatchToProps = dispatch => ({
  closeTooltipFnc: () => dispatch(setTooltipVisibility(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartTooltip);
