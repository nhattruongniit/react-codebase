
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs';
import { setChartValues } from './chartValues';
import { toast } from 'react-toastify';
import { saveChart } from './chart';
import fetchValuesForSingleChart from '../helpers/fetchValuesForSingleChart';
import fetchValuesForGroupChart from '../helpers/fetchValuesForGroupChart';
import fetchValuesForPieChart from '../helpers/fetchValuesForPieChart';
import { SET_SIMULATION } from '../../../reducers/simulation';

const SET_VALUE = 'CHART_EDITOR/CHART_FORM/SET_VALUE';
const CLEAR_FORM = 'CHART_EDITOR/CHART_FORM/CLEAR_FORM';
const SUBMIT_FORM_START = 'CHART_EDITOR/CHART_FORM/SUBMIT_FORM_START';
const SUBMIT_FORM_SUCCESS = 'CHART_EDITOR/CHART_FORM/SUBMIT_FORM_SUCCESS';
const SUBMIT_FORM_ERROR = 'CHART_EDITOR/CHART_FORM/SUBMIT_FORM_ERROR';

export const CHART_FORM_STEPS = ['daily', 'weekly', 'monthly'];
export const BAR_CHART_TYPES = [
  {
    value: 'single',
    label: 'Range',
  },
  {
    value: 'group',
    label: 'Single value'
  }
];
export const PIE_CHART_TYPES = [
  {
    value: 'single',
    label: 'Simple',
  },
  {
    value: 'group',
    label: 'Two Value'
  }
]


export function setValue(fieldName, value) {
  return {
    type: SET_VALUE,
    payload: {
      fieldName,
      value
    }
  };
}

export function clearForm() {
  return {
    type: CLEAR_FORM
  };
}

export function submitForm() {
  return async function(dispatch, getState) {
    const { plottedType } = getState().chartEditor.plottedVariables;
    const chartType = getState().chartEditor.chart.type;
    let fetchValuesFn;
    if (chartType === 'pie') {
      fetchValuesFn = fetchValuesForPieChart;
    } else if (plottedType === 'single') {
      fetchValuesFn = fetchValuesForSingleChart;
    } else {
      fetchValuesFn = fetchValuesForGroupChart;
    }

    try {
      const { chartValues, labels } = await fetchValuesFn(getState);
      dispatch(setChartValues(chartValues, labels));
      dispatch(saveChart());
    } catch (e) {
      toast(e.message);
      dispatch({
        type: SUBMIT_FORM_ERROR,
        payload: {
          message: e.message,
        }
      });
    }
  };
}

const INITIAL_STATE = {
  values: {
    startDate: new Date(2001, 1, 1),
    endDate: new Date(2002, 2, 2),
    maximumDatePoints: 0,
    steps: CHART_FORM_STEPS[0],
  },
  isSubmitting: false,
  error: ''
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_VALUE:
      const { fieldName, value } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [fieldName]: value
        }
      };

    case SET_SIMULATION: {
      const { simulation: { timeframe } } = action.payload;
      console.log(timeframe);
      if (timeframe && timeframe.length > 0) {
        return {
          ...state,
          values: {
            ...state.values,
            startDate: timeframe[0].start,
            endDate: timeframe[0].end,
          }
        }
      }
      return state;
    }

    case CLEAR_FORM:
      return {
        ...state,
        values: {}
      };

    case SUBMIT_FORM_START: {
      return {
        ...state,
        isSubmitting: true,
        error: ''
      };
    }

    case SUBMIT_FORM_SUCCESS: {
      return {
        ...state,
        isSubmitting: false
      };
    }

    case SUBMIT_FORM_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        error: action.payload.message
      };
    }

    case LOAD_INITIAL_STATE: {
      return INITIAL_STATE;
    }

    case RESTORE_STATE: {
      if (action.payload.chartForm) {
        return action.payload.chartForm;
      }
      return state;
    }

    default:
      return state;
  }
}
