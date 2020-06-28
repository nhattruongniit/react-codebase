import { connect } from 'react-redux';
import DeleteChartModal from '../components/DeleteChartModal';
import { confirmDeleteChart, cancelDeleteChart } from '../reducers/charts';

const mapStateToProps = state => ({
  isShowing: state.charts.charts.deleteChart.isDeleting,
});

const mapDispatchToProps = {
  confirmFn: confirmDeleteChart,
  cancelFn: cancelDeleteChart,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteChartModal);
