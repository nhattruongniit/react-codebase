import * as classListApi from '../services/classListApi';
import * as idfObjectsActions from './idfObjects';
import { START_FETCHING_CLASS_LIST } from './classList';

export const SET_OBJECTS = 'IDF_EDITOR/IMPORT/SET_OBJECTS';
export const SELECT_OBJECT = 'IDF_EDITOR/IMPORT/SELECT_OBJECTS';
export const DESELECT_OBJECT = 'IDF_EDITOR/IMPORT/DESELECT_OBJECTS';
export const CLEAR_SELECTED_OBJECTS =
  'IDF_EDITOR/IMPORT/CLEAR_SELECTED_OBJECTS';
export const UPDATE_IDF_OBJECT = 'IDF_EDITOR/IMPORT/UPDATE_IDF_OBJECT';
export const ADD_NEW_IDF_OBJECT = 'IDF_EDITOR/IMPORT/ADD_NEW_IDF_OBJECT';

const SET_CATEGORY = 'IDF_EDITOR/IMPORT/SET_CATEGORY';
const SET_PAGE_NUMBER = 'IDF_EDITOR/IMPORT/IDF_OBJECTS_SET_PAGE_NUMBER';
const SET_ITEMS_PER_PAGE = 'IDF_EDITOR/IMPORT/IDF_OBJECTS_SET_ITEMS_PER_PAGE';
const SET_TOTAL_ITEMS = 'IDF_EDITOR/IMPORT/SET_TOTAL_ITEMS';
const SET_FILTER_FIELDNAME = 'IDF_EDITOR/IMPORT/SET_FILTER_FIELDNAME';

const { SET_CLASS_ITEM_DATA } = './classItem';

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

export const setCategory = ({ id, name }) => ({
  type: SET_CATEGORY,
  payload: { id, name }
});

export const setObjects = objects => ({
  type: SET_OBJECTS,
  payload: objects
});

export const selectPage = pageNumber => async (dispatch, getState) => {
  const { itemsPerPage } = getState().importObjects;
  const projectId = getState().projectId;
  const className = getState().classItem.class_name;
  const { id } = getState().importObjects.category;
  const response = await classListApi.fetctIdfObjectListByCategory(
    projectId,
    className,
    id,
    pageNumber,
    itemsPerPage
  );
  const objects = response.data.data;
  const count = response.data.found_rows;
  dispatch(setPageNumber(pageNumber));
  dispatch(setTotalItems(count));
  dispatch(setObjects(objects));
};

export const selectItemsPerPage = itemsPerPage => async (
  dispatch,
  getState
) => {
  dispatch(setItemsPerPage(itemsPerPage));
  dispatch(selectPage(1));
};

export const addObjects = () => async (dispatch, getState) => {
  const objects = getSelectedObjects(getState());
  const projectId = getState().projectId;
  const { class_name } = getState().classItem;
  const pms = objects.map(obj => {
    const { id, document_id, ...newObj } = obj;
    return classListApi.createIdfObject(projectId, class_name, newObj);
  });
  const results = await Promise.all(pms);
  results.forEach(responseItem => {
    const object = responseItem.data.data;
    dispatch({
      type: ADD_NEW_IDF_OBJECT,
      payload: {
        object
      }
    });
  });
  dispatch(clearSelectedObjects());
  const totalItems = getState().idfObjects.totalItems;
  const itemsPerPage = getState().idfObjects.itemsPerPage;
  const lastPage = Math.ceil((totalItems + objects.length) / itemsPerPage);
  dispatch(idfObjectsActions.selectPage(lastPage, true));
};

function getSelectedObjects(state) {
  const selectedObjectIds = state.importObjects.selectedObjects;
  const objects = state.importObjects.objects.filter(
    obj => selectedObjectIds.indexOf(obj.id) !== -1
  );
  return objects;
}

export const toggleSelectObject = objectId => (dispatch, getState) => {
  const selectedObjects = getState().importObjects.selectedObjects;
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

export const saveIdfObjectFieldChange = (objectId, fieldName, value) => async (
  dispatch,
  getState
) => {
  const object = getState().importObjects.objects.find(
    item => item.id === objectId
  );
  object.fields[fieldName] = value;
  dispatch({
    type: UPDATE_IDF_OBJECT,
    payload: {
      objectId,
      object: object
    }
  });
};

export const clearSelectedObjects = () => ({
  type: CLEAR_SELECTED_OBJECTS
});

const INITIAL_STATE = {
  objects: [],
  selectedObjects: [],
  totalItems: null,
  itemsPerPage: 20,
  pageNumber: 1,
  fieldname: ''
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_FETCHING_CLASS_LIST:
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

    case SET_CLASS_ITEM_DATA: {
      return {
        ...state,
        category:
          action.payload & action.payload.data.categories
            ? action.payload.data.categories[0]
            : null
      };
    }

    case SET_CATEGORY: {
      return {
        ...state,
        category: action.payload
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

    default:
      return state;
  }
}
