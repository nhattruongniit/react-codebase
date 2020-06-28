import { combineReducers } from 'redux';

import views from './views';
import selectedViewIds from './selectedViewId';
import viewPagination from './viewPagination'
import createViewModal from './createViewModal';

export default combineReducers({
  views,
  selectedViewIds,
  viewPagination,
  createViewModal
});
