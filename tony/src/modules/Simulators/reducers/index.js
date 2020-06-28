import { combineReducers } from 'redux';

import simulators from './simulators';
import selectedSimulatorsId from './selectedSimulatorsId';
import simulatorPagination from './simulatorPagination'
import convertProjectModal from './convertProjectModal';
import viewLogModal from './viewLogModal';

export default combineReducers({
  simulators,
  selectedSimulatorsId,
  simulatorPagination,
  convertProjectModal,
  viewLogModal,
});
