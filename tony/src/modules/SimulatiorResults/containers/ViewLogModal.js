import { connect } from 'react-redux';
import ViewLogModal from '../components/ViewLogModal';

import { setModalViewLog } from '../reducers/viewLogModal';

const mapStateToProps = state => ({
  isShowing: state.simulatorResults.viewLogModal.isShowing,
  dataFile: state.simulatorResults.viewLogModal.dataFile
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(setModalViewLog(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewLogModal);
