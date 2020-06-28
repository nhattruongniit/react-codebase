import { START_FETCHING_CLASS_LIST } from './classList';

const SET_PAGE_NUMBER = 'IDF_EDITOR/IDF_OBJECTS_SET_PAGE_NUMBER';
const SET_ITEMS_PER_PAGE = 'IDF_EDITOR/IDF_OBJECTS_SET_ITEMS_PER_PAGE';

export const setPageNumber = pageNumber => ({
  type: SET_PAGE_NUMBER,
  payload: { pageNumber }
});

export const setItemsPerPage = itemsPerPage => ({
  type: SET_ITEMS_PER_PAGE,
  payload: { itemsPerPage }
});

const INITIAL_STATE = {
  pageNumber: 0,
  itemsPerPage: 10,
  totalItems: 0
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
  }
}
