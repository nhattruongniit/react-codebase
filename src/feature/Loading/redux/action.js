import {
  SHOW_LOADING,
  HIDE_LOADING,
} from './reducer';

export const showLoading = () => ({ type: SHOW_LOADING });
export const hideLoading = () => ({ type: HIDE_LOADING });

export const loadingAction = callback => async (dispatch) => {
  try {
    dispatch(showLoading());
    const response = await callback();
    dispatch(hideLoading());
    return response;
  } catch (error) {
    dispatch(hideLoading());
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
