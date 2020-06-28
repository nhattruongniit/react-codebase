const SET_PAGE_NUMBER = 'SIMULATORS/PAGING/SET_PAGE_NUMBER';
const SET_ITEMS_PER_PAGE = 'SIMULATORS/PAGING/SET_ITEMS_PER_PAGE';

export const setPageNumber = (pageNumber) => ({
  type: SET_PAGE_NUMBER,
  payload: { pageNumber },
});

export const setItemsPerPage = itemsPerPage => ({
  type: SET_ITEMS_PER_PAGE,
  payload: { itemsPerPage },
});

export default function reducer(state = {
  pageNumber: 1,
  itemsPerPage: 10,
}, action) {
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

    default:
      return state;
  }
}