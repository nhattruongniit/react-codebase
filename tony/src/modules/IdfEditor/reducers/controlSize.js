const CONTROL_SIZE = 'IDF_EDITOR/CONTROL_SIZE';

export const setControlSize = (type, height, fontSize) => dispatch => {
  dispatch({
    type: CONTROL_SIZE,
    payload: {
      type,
      height,
      fontSize
    }
  })
}

const intialState = {
  type: 'tall',
  height: 58,
  fontSize: 14
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case CONTROL_SIZE: 
      return {
        ...state,
        type: action.payload.type,
        height: action.payload.height,
        fontSize: action.payload.fontSize
      }
    default:
      return state;
  }
}
