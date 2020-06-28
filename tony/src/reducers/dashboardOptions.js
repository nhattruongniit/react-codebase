import { SORT_DIRECTION, DASHBOARD_LAYOUT_TYPE, DASHBOARD_TABLE_ROW_HEIGHT } from 'appConstants';

const SET_TILE_SIZE = 'PROJECTS/DOCUMENTS/SET_TILE_SIZE';
const SET_LAYOUT_TYPE = 'PROJECTS/DOCUMENTS/SET_LAYOUT_TYPE';
const SET_TABLE_ROW_HEIGHT = 'PROJECTS/DOCUMENTS/SET_TABLE_ROW_HEIGHT';
const SET_SORT_DIRECTION = 'PROJECTS/PROJECTS/SET_SORT_DIRECTION';

export const setTileSize = tileSize => ({
  type: SET_TILE_SIZE,
  payload: { tileSize },
});

export const setTableRowHeight = rowHeight => ({
  type: SET_TABLE_ROW_HEIGHT,
  payload: { rowHeight },
});

export const setLayoutType = layoutType => ({
  type: SET_LAYOUT_TYPE,
  payload: { layoutType },
});

export const toggleSortDirection = () => (dispatch, getState) => {
  let sortDirection = getState().dashboardOptions.sortDirection;
  if (sortDirection === SORT_DIRECTION.ASC) {
    sortDirection = SORT_DIRECTION.DESC;
  } else {
    sortDirection = SORT_DIRECTION.ASC;
  }
  dispatch({
    type: SET_SORT_DIRECTION,
    payload: { sortDirection },
  });
}

export default function reducer(state = {
  layoutType: DASHBOARD_LAYOUT_TYPE.GRID,
  tileSize: 3,
  rowHeight: DASHBOARD_TABLE_ROW_HEIGHT.TALL,
  sortDirection: SORT_DIRECTION.DESC,
}, action) {
  switch (action.type) {
    case SET_TILE_SIZE: {
      return {
        ...state,
        tileSize: action.payload.tileSize,
      };
    }

    case SET_LAYOUT_TYPE: {
      return {
        ...state,
        layoutType: action.payload.layoutType,
      };
    }

    case SET_TABLE_ROW_HEIGHT: {
      return {
        ...state,
        rowHeight: action.payload.rowHeight,
      };
    }

    case SET_SORT_DIRECTION: {
      return {
        ...state,
        sortDirection: action.payload.sortDirection,
      };
    }

    default: {
      return state;
    }
  }
}