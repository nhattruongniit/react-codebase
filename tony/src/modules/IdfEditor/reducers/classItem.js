import _ from 'lodash';
import * as classListApi from '../services/classListApi';
import * as idfObjectActions from './idfObjects';
import * as referencesActions from './references';
import { START_FETCHING_CLASS_LIST } from './classList';

export const SET_CLASS_ITEM_DATA = 'IDF_EDITOR/SET_CLASS_ITEM_DATA';

export const setClassItemData = data => ({
  type: SET_CLASS_ITEM_DATA,
  payload: { data },
});

export const fetchClassItemData = className => async(dispatch, getState) => {
  const projectId = getState().projectId;
  dispatch(idfObjectActions.setObjects([]));
  const response = await classListApi.fetchClassData(projectId, className);
  const itemData = response.data.data;
  dispatch(setClassItemData(itemData));
  dispatch(idfObjectActions.selectPage(1));
  fetchAllReferencesFromClassItem(itemData, dispatch);
}

const fetchAllReferencesFromClassItem = (itemData, dispatch) => {
  let references = [];
  itemData.fields
    .filter(field => field.options.type === 'object-list')
    .forEach(field => {
      references = references.concat(field.options['object-list']);
    });
  references = _.uniq(references);
  const pms = references.map(item => dispatch(referencesActions.fetchReference(item)));
  Promise.all(pms);
}

const INITIAL_STATE = {
  data: {},
  objects: [],
  selectedObjects: [],
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CLASS_ITEM_DATA:
      return action.payload.data;

    case START_FETCHING_CLASS_LIST:
      return INITIAL_STATE;

    default:
      return state;
  }
}