import _ from 'lodash';
import * as classListApi from '../services/classListApi';
import * as classListActions from './classList';
import { downloadCsv } from '../helpers/csv';
import json2csv from 'json2csv';

export const SET_OBJECTS = 'IDF_EDITOR/SET_OBJECTS';
export const ADD_OBJECTS = 'IDF_EDITOR/ADD_OBJECTS';
export const SELECT_OBJECT = 'IDF_EDITOR/SELECT_OBJECTS';
export const DESELECT_OBJECT = 'IDF_EDITOR/DESELECT_OBJECTS';
export const CLEAR_SELECTED_OBJECTS = 'IDF_EDITOR/CLEAR_SELECTED_OBJECTS';
export const UPDATE_IDF_OBJECT = 'IDF_EDITOR/UPDATE_IDF_OBJECT';
export const ADD_NEW_IDF_OBJECT = 'IDF_EDITOR/ADD_NEW_IDF_OBJECT';
export const REMOVE_IDF_OBJECT = 'IDF_EDITOR/REMOVE_IDF_OBJECT';

const SET_PAGE_NUMBER = 'IDF_EDITOR/IDF_OBJECTS_SET_PAGE_NUMBER';
const SET_ITEMS_PER_PAGE = 'IDF_EDITOR/IDF_OBJECTS_SET_ITEMS_PER_PAGE';
const SET_TOTAL_ITEMS = 'IDF_EDITOR/SET_TOTAL_ITEMS';
const SET_FILTER_FIELDNAME = 'IDF_EDITOR/SET_FILTER_FIELDNAME';
const SET_IS_NEW_OBJECT = 'IDF_EDITOR/SET_IS_NEW_OBJECT';

export const setAddNewObject = isNew => ({
  type: SET_IS_NEW_OBJECT,
  payload: isNew
});

export const setObjects = objects => ({
  type: SET_OBJECTS,
  payload: objects
});

export const setPageNumber = pageNumber => ({
  type: SET_PAGE_NUMBER,
  payload: { pageNumber }
});

export const setItemsPerPage = itemsPerPage => ({
  type: SET_ITEMS_PER_PAGE,
  payload: { itemsPerPage }
});

export const setTotalItems = totalItems => ({
  type: SET_TOTAL_ITEMS,
  payload: { totalItems }
});

export const setFilterFieldName = text => ({
  type: SET_FILTER_FIELDNAME,
  payload: { text }
});

export const selectPage = (pageNumber, isAddNew) => async (
  dispatch,
  getState
) => {
  const { itemsPerPage } = getState().idfObjects;
  const projectId = getState().projectId;
  const className = getState().classItem.class_name;
  const class_id = getState().classItem.class_id;
  const response = await classListApi.fetctIdfObjectList(
    projectId,
    className,
    pageNumber,
    itemsPerPage
  );
  const objects = response.data.data;
  const count = response.data.found_rows;
  dispatch(setPageNumber(pageNumber));
  dispatch(classListActions.updateClassItemObjectCount(class_id, count));
  dispatch(setTotalItems(count));
  dispatch(setObjects(objects));
  if (isAddNew) {
    dispatch(setAddNewObject(true));
  } else {
    dispatch(setAddNewObject(false));
  }
};

export const toggleSelectObject = objectId => (dispatch, getState) => {
  const selectedObjects = getState().idfObjects.selectedObjects;
  if (selectedObjects.indexOf(objectId) === -1) {
    dispatch({
      type: SELECT_OBJECT,
      payload: { objectId }
    });
  } else {
    dispatch({
      type: DESELECT_OBJECT,
      payload: { objectId }
    });
  }
};

export const clearSelectedObjects = () => ({
  type: CLEAR_SELECTED_OBJECTS
});

export const addObject = () => async (dispatch, getState) => {
  const { class_name, class_id } = getState().classItem;
  const { totalItems, itemsPerPage } = getState().idfObjects;
  const projectId = getState().projectId;
  const newObj = {
    class_id,
    class_name,
    fields: {},
    extended: [],
    category: null,
    from_template: 1
  };
  await classListApi.createIdfObject(projectId, class_name, newObj);
  const lastPage = Math.ceil((totalItems + 1) / itemsPerPage);
  dispatch(selectPage(lastPage, true));
};

export const duplicateObjects = () => async (dispatch, getState) => {
  const objects = getSelectedObjects(getState());
  const projectId = getState().projectId;
  const { class_name } = getState().classItem;
  const pms = objects.map(obj => {
    const newObj = { ...obj };
    delete newObj.id;
    return classListApi.createIdfObject(projectId, class_name, newObj);
  });
  await Promise.all(pms);
  dispatch(clearSelectedObjects());

  const totalItems = getState().idfObjects.totalItems;
  const itemsPerPage = getState().idfObjects.itemsPerPage;
  const lastPage = Math.ceil((totalItems + objects.length) / itemsPerPage);
  dispatch(selectPage(lastPage, true));
};

export const deleteObjects = () => async (dispatch, getState) => {
  const objects = getSelectedObjects(getState());
  const projectId = getState().projectId;
  const { class_name } = getState().classItem;
  const pms = objects.map(obj => {
    return classListApi.deleteIdfObject(projectId, class_name, obj.id);
  });
  await Promise.all(pms);
  dispatch(clearSelectedObjects());
  const pageNumber = getState().idfObjects.pageNumber;
  const totalItems = getState().idfObjects.totalItems;
  const itemsPerPage = getState().idfObjects.itemsPerPage;
  const lastPage = Math.ceil((totalItems - objects.length) / itemsPerPage);
  dispatch(selectPage(lastPage < pageNumber ? lastPage : pageNumber));
};

export const exportObjects = () => (dispatch, getState) => {
  const objects = getSelectedObjects(getState());
  const csvData = [];
  let headers = null;
  objects.map((object, index) => {
    if (index === 0) {
      headers = Object.keys(object.fields);
      csvData.push(headers);
    }
    const values = _.values(object.fields);
    csvData.push(values);
  });
  const csv = json2csv.parse(csvData, { headers });
  downloadCsv(csv, 'objects.csv');
};

function getSelectedObjects(state) {
  const selectedObjectIds = state.idfObjects.selectedObjects;
  const objects = state.idfObjects.objects.filter(
    obj => selectedObjectIds.indexOf(obj.id) !== -1
  );
  return objects;
}

export const saveIdfObjectFieldChange = (objectId, fieldName, value, extensibleName, extensibleIndex) => async (
  dispatch,
  getState
) => {
  const object = getState().idfObjects.objects.find(
    item => item.id === objectId
  );
  if (!extensibleName) {
    object.fields[fieldName] = value;
  } else {
    object.extensions[extensibleName][extensibleIndex][fieldName] = value;
  }

  const projectId = getState().projectId;
  const className = getState().classItem.class_name;
  const response = await classListApi.updateIdfObject(
    projectId,
    className,
    objectId,
    object
  );
  const newObject = response.data.data;
  dispatch({
    type: UPDATE_IDF_OBJECT,
    payload: {
      objectId,
      object: newObject
    }
  });
};

const INITIAL_STATE = {
  objects: [],
  selectedObjects: [],
  totalItems: 0,
  itemsPerPage: 20,
  pageNumber: 1,
  objectsByPageNumber: {},
  fieldname: '',
  isAddNewObject: false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case classListActions.START_FETCHING_CLASS_LIST:
      return INITIAL_STATE;

    case SET_PAGE_NUMBER: {
      return {
        ...state,
        pageNumber: action.payload.pageNumber
      };
    }

    case SET_ITEMS_PER_PAGE: {
      return {
        ...state,
        itemsPerPage: action.payload.itemsPerPage
      };
    }

    case SET_TOTAL_ITEMS: {
      return {
        ...state,
        totalItems: action.payload.totalItems
      };
    }

    case SET_OBJECTS: {
      return {
        ...state,
        objects: action.payload
      };
    }

    case SELECT_OBJECT: {
      return {
        ...state,
        selectedObjects: [...state.selectedObjects, action.payload.objectId]
      };
    }

    case SET_FILTER_FIELDNAME: {
      return {
        ...state,
        fieldname: action.payload.text
      };
    }

    case DESELECT_OBJECT: {
      const selectedObjects = state.selectedObjects.filter(
        item => item !== action.payload.objectId
      );
      return {
        ...state,
        selectedObjects
      };
    }

    case CLEAR_SELECTED_OBJECTS: {
      return {
        ...state,
        selectedObjects: []
      };
    }

    case UPDATE_IDF_OBJECT: {
      const { objectId, object } = action.payload;
      return {
        ...state,
        objects: state.objects.map(item => {
          if (item.id === objectId) {
            return object;
          }
          return item;
        })
      };
    }

    case SET_IS_NEW_OBJECT: {
      if (state.isAddNewObject > 0) {
        return {
          ...state,
          isAddNewObject: action.payload ? state.isAddNewObject + 1 : 0
        };
      } else {
        return {
          ...state,
          isAddNewObject: action.payload ? 10000 : 0
        };
      }
    }

    default:
      return state;
  }
}
