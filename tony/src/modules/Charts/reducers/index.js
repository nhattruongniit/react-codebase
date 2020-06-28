import { combineReducers } from 'redux';

import charts from './charts';
import selectedChartIds from './selectedChartId';
import chartPagination from './chartPagination';
import createChartModal from './createChartModal';
import addRemoveModal from './addRemoveModal';

export default combineReducers({
  charts,
  selectedChartIds,
  chartPagination,
  createChartModal,
  addRemoveModal
});
