import { connect } from 'react-redux';
import { setModalVisibility, addChartsToView, fetchTreeViewData, selectChart } from '../reducers/createViewModal';
import CreateViewModal from '../components/CreateViewModal'

const mapStateToProps = state => ({
  ...state.views.createViewModal,
  project: state.project,
  treeViewData: state.views.createViewModal.treeViewData,
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(setModalVisibility(false)),
  addChartsToViewFn: (viewName, projectId, charts) => dispatch(addChartsToView(viewName, projectId, charts)),
  fetchTreeViewData: item => dispatch(fetchTreeViewData(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateViewModal);
