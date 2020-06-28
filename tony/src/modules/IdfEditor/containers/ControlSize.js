import { connect } from 'react-redux';
import ControlSize from '../components/ControlSize';

import { setControlSize } from '../reducers/controlSize';

const mapStateToProps = (state) => {
  return {
    type: state.controlSize.type,
    height: state.controlSize.height,
    fontSize: state.controlSize.fontSize
  };
}

const mapDispatchToProps = dispatch => ({
  setControlSizeFn: (type, height, fontSize) => dispatch(setControlSize(type, height, fontSize))
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlSize);
