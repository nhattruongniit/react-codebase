import { combineReducers } from 'redux';

import simulationResults from './simulationResult';
import selectedSimulatorsId from './selectedSimulatorsId';
import simulatorPagination from './simulatorPagination'
import createNewModal from './createNewModal';
import sendViewModal from './sendViewModal';
import viewLogModal from './viewLogModal';

export default combineReducers({
  simulationResults,
  selectedSimulatorsId,
  simulatorPagination,
  createNewModal,
  sendViewModal,
  viewLogModal,
});
