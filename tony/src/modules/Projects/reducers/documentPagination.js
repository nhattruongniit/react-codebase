import { RESET_DOCUMENT_PAGE_STATE } from "./documents";

const SET_PAGE_NUMBER = 'PROJECT/DOCUMENT_PAGINATION/DOCUMENT_SET_PAGE_NUMBER';
const SET_ITEMS_PER_PAGE = 'PROJECT/DOCUMENT_PAGINATION/DOCUMENT_SET_ITEMS_PER_PAGE';

export const setPageNumber = (pageNumber) => ({
  type: SET_PAGE_NUMBER,
  payload: { pageNumber },
});

export const setItemsPerPage = itemsPerPage => ({
  type: SET_ITEMS_PER_PAGE,
  payload: { itemsPerPage },
});

const initialState = {
  pageNumber: 1,
  itemsPerPage: 10,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE_NUMBER: {
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
      };
    }

    case SET_ITEMS_PER_PAGE: {
      return {
        ...state,
        itemsPerPage: action.payload.itemsPerPage
      };
    }

    case RESET_DOCUMENT_PAGE_STATE: {
      return initialState;
    }

    default:
      return state;
  }
}