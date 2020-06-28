import { SET_VERSIONS } from "appConstants";

export default function reducer(state = {
    list: [],
  }, action) {
    switch (action.type) {
      case SET_VERSIONS: {
        return {
          ...state,
          list: action.payload
        };
      }
      default:
        return state;
    }
  }