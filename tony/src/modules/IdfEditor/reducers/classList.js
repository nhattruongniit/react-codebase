import _ from 'lodash';
import * as classListApi from '../services/classListApi';
import history from '../../../config/history';
import * as classItemActions from './classItem';
import * as idfObjectActions from './idfObjects';

const SET_CLASS_LIST_DATA = 'IDF_EDITOR/SET_CLASS_LIST_DATA';
const SET_ACTIVE_CLASS_ID = 'IDF_EDITOR/SET_ACTIVE_CLASS_ID';
const SET_ACITVE_GROUP_ID = 'IDF_EDITOR/SET_ACITVE_GROUP_ID';
const SET_TOGGLE_CLASS_LIST = 'IDF_EDITOR/SET_TOGGLE_CLASS_LIST';
const UPDATE_CLASS_ITEM = 'IDF_EDITOR/UPDATE_CLASS_ITEM';
const UPDATE_GROUP = 'IDF_EDITOR/UPDATE_GROUP';
export const START_FETCHING_CLASS_LIST = 'IDF_EDITOR/START_FETCHING_CLASS_LIST';

export const updateClassItem = (classId, classItemdata) => ({
  type: UPDATE_CLASS_ITEM,
  payload: {
    classId,
    classItem: classItemdata
  }
});

export const updateGroup = (groupId, data) => ({
  type: UPDATE_GROUP,
  payload: {
    groupId,
    group: data
  }
});

export const updateClassItemObjectCount = (classId, count) => (
  dispatch,
  getState
) => {
  const item = getClassItemById(getState(), classId);
  const group = getState().classList.groups.find(
    group => group.group_id === item.group_id
  );
  const diff = count - item.objects;
  const newItem = {
    ...item,
    objects: count
  };
  const newGroup = {
    ...group,
    objects: group.objects + diff
  };
  dispatch(updateClassItem(classId, newItem));
  dispatch(updateGroup(group.group_id, newGroup));
};

export const setClassListData = (groups, items) => ({
  type: SET_CLASS_LIST_DATA,
  payload: { groups, items }
});

export const setActiveClassId = classId => ({
  type: SET_ACTIVE_CLASS_ID,
  payload: { classId }
});

export const setActiveGroupId = groupId => ({
  type: SET_ACITVE_GROUP_ID,
  payload: { groupId }
});

export const setToggleClassList = () => ({
  type: SET_TOGGLE_CLASS_LIST
});

export const selectClass = (classId, className) => (dispatch, getState) => {
  const pathname = history.location.pathname;
  const pathnameArray = pathname.split('/');
  let url;
  if (_.last(pathnameArray) === 'idf-editor') {
    url = pathnameArray.concat(className).join('/');
  } else {
    url = _.take(pathnameArray, pathnameArray.length - 1)
      .concat(className)
      .join('/');
  }
  dispatch(setActiveClassId(classId));
  history.push(url);
  dispatch(classItemActions.fetchClassItemData(className));
  dispatch(idfObjectActions.clearSelectedObjects());
};

export const setActiveClassByClassName = className => (dispatch, getState) => {
  const classItem = getState().classList.items.find(
    item => item.class_name === className
  );
  dispatch(setActiveClassId(classItem.class_id));
  dispatch(setActiveGroupId(classItem.group_id));
  dispatch(classItemActions.fetchClassItemData(classItem.class_name));
  dispatch(idfObjectActions.clearSelectedObjects());
};

export const selectGroup = groupId => (dispatch, getState) => {
  if (!groupId) {
    dispatch(setActiveGroupId(null));
    return;
  }
  const { groups } = getState().classList;
  if (!groups) return;
  const group = groups.find(item => item.group_id === groupId);
  if (!group) return;
  dispatch(setActiveGroupId(groupId));
  const { activeClassId } = getState().classList;
  if (!activeClassId) {
    const item = getClassItemById(getState(), group.items[0]);
    if (item) {
      dispatch(selectClass(item.class_id, item.class_name));
    }
  }
};

export const fetchClassList = documentId => async (dispatch, getState) => {
  dispatch({
    type: START_FETCHING_CLASS_LIST
  });
  const objectCountResponse = await classListApi.fetchObjectCount(documentId);
  const response = await classListApi.fetchClassList(documentId);
  let classItems = response.data.data;
  objectCountResponse.data.data.map(objCountItem => {
    const classItem = classItems.find(
      classItem => classItem.class_id === objCountItem.class_id
    );
    classItem.objects = objCountItem.objects;
  });
  const groups = formatClassListResponse(classItems);
  dispatch(setClassListData(groups, classItems));
};

const formatClassListResponse = classItems => {
  const groups = [];
  classItems.forEach(item => {
    let group = groups.find(groupItem => groupItem.group_id === item.group_id);
    if (!group) {
      group = {
        group_id: item.group_id,
        group_name: item.group_name,
        items: [],
        objects: 0
      };
      groups.push(group);
    }
    if (item.objects) {
      group.objects += item.objects;
    }
    group.items.push(item.class_id);
  });
  return groups;
};

export function getClassItemById(state, classId) {
  return state.classList.items.find(item => item.class_id === classId);
}

const INITIAL_STATE = {
  groups: [],
  activeClassId: null,
  isShowed: true,
  items: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_FETCHING_CLASS_LIST:
      return INITIAL_STATE;

    case SET_CLASS_LIST_DATA: {
      const { groups, items } = action.payload;
      return {
        ...state,
        groups,
        items
      };
    }

    case UPDATE_CLASS_ITEM: {
      const { classId, classItem } = action.payload;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.class_id === classId) {
            return classItem;
          }
          return item;
        })
      };
    }

    case UPDATE_GROUP: {
      const { groupId, group: newGroup } = action.payload;
      return {
        ...state,
        groups: state.groups.map(group => {
          if (group.group_id === groupId) {
            return newGroup;
          }
          return group;
        })
      };
    }

    case SET_ACTIVE_CLASS_ID: {
      const { classId } = action.payload;
      return {
        ...state,
        activeClassId: classId
      };
    }

    case SET_ACITVE_GROUP_ID: {
      const { groupId } = action.payload;
      return {
        ...state,
        activeGroupId: groupId
      };
    }

    case SET_TOGGLE_CLASS_LIST: {
      return {
        ...state,
        isShowed: !state.isShowed
      };
    }

    default:
      return state;
  }
}
