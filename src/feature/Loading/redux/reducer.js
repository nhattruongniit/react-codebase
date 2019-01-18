export const SHOW_LOADING = 'KYC/LOADING/SHOW';
export const HIDE_LOADING = 'KYC/LOADING/HIDE';

const initialState = {
  status: false,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case SHOW_LOADING:
      return {
        ...state,
        status: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
};

export default reducer;
