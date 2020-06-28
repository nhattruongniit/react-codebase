import { connect } from 'react-redux';
import ViewToolbar from '../components/ViewToolbar';

import { clearSelectedViews } from '../reducers/selectedViewId';
import { setModalVisibility } from '../reducers/createViewModal';
import { requestDeleteSelectedViews, duplicateView } from '../reducers/views';
import { toggleSortDirection } from 'reducers/dashboardOptions';

const mapStateToProps = state => ({
  selectedItem: state.views.selectedViewIds,
  sortDirection: state.dashboardOptions.sortDirection,
});

const mapDispatchToProps = dispatch => ({
  clearSelectedItems: () => dispatch(clearSelectedViews()),
  createNewFn: () => dispatch(setModalVisibility(true)),
  deleteFn: () => dispatch(requestDeleteSelectedViews()),
  toggleSortDirection: () => dispatch(toggleSortDirection()),
  duplicateViewFn: viewId => dispatch(duplicateView(viewId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewToolbar);
