import { connect } from 'react-redux';
import IdfObjectToolbar from '../../components/Toolbar/IdfObjectToolbar';
import { clearSelectedObjects, duplicateObjects, deleteObjects, exportObjects } from '../../reducers/idfObjects';

const mapStateToProps = state => ({
  selectedObjectCount: state.idfObjects.selectedObjects.length,
});

const mapDispatchToProps = {
  cancel: clearSelectedObjects,
  duplicateFn: duplicateObjects,
  deleteFn: deleteObjects,
  exportFn: exportObjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(IdfObjectToolbar);
