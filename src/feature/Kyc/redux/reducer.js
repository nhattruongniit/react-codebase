export const KYC_FORM_LOADED = 'KYC/FORM/LOADED';
export const KYC_FORM_RESET = 'KYC/FORM/RESET';

const initialState = {
  forms: [],
  activeStep: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case KYC_FORM_LOADED:
      return {
        ...state,
        forms: payload,
      };
    case KYC_FORM_RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
