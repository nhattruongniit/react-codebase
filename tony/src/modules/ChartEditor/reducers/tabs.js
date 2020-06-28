import _ from 'lodash';
import { fetchVariables } from './variables';

const ADD_TAB = 'CHART_EDITOR/TABS/ADD_TAB';
const REMOVE_TAB = 'CHART_EDITOR/TABS/REMOVE_TAB';
const SET_ACTIVE_TAB = 'CHART_EDITOR/TABS/SET_ACTIVE_TAB';
const SET_TAB_OPTION = 'CHART_EDITOR/TABS/SET_TAB_OPTION';

export const LOAD_INITIAL_STATE = 'CHART_EDITOR/TABS/LOAD_INITIAL_STATE';
export const RESTORE_STATE = 'CHART_EDITOR/TABS/RESTORE_STATE';
export const SAVE_STATE_DATA = 'CHART_EDITOR/TABS/SAVE_STATE_DATA';

export function loadInitialState() {
  return {
    type: LOAD_INITIAL_STATE
  }
}

export function setTabOption(tabId, optionName, value) {
  return {
    type: SET_TAB_OPTION,
    payload: { tabId, optionName, value }
  };
}

export function addTab() {
  return function(dispatch, getState) {
    const currentTabId = getState().chartEditor.tabs.activeTabId;
    const simulationId = getState().chartEditor.variables.simulationId;
    const saveState = { ...getState().chartEditor };
    delete saveState.tabs;

    dispatch({
      type: SAVE_STATE_DATA,
      payload: {
        tabId: currentTabId,
        saveState
      }
    });

    dispatch({
      type: ADD_TAB
    });

    dispatch({
      type: LOAD_INITIAL_STATE
    });

    dispatch(fetchVariables(simulationId));
  };
}

export function closeTab(tabId) {
  return function(dispatch, getState) {
    const tabIndex = getState().chartEditor.tabs.tabArray.indexOf(tabId);
    let nextActiveTabId = null;
    if (tabIndex > 0) {
      nextActiveTabId = getState().chartEditor.tabs.tabArray[tabIndex - 1];
    }

    if (!nextActiveTabId) return;

    const nextTab = getState().chartEditor.tabs.tabById[nextActiveTabId];

    dispatch({
      type: REMOVE_TAB,
      payload: { tabId }
    });

    dispatch({
      type: SET_ACTIVE_TAB,
      payload: { tabId: nextActiveTabId }
    });

    dispatch({
      type: RESTORE_STATE,
      payload: nextTab.state
    });
  };
}

export function switchTab(tabId) {
  return function(dispatch, getState) {
    const tab = getState().chartEditor.tabs.tabById[tabId];
    const currentTabId = getState().chartEditor.tabs.activeTabId;
    if (currentTabId === tabId) return;

    const saveState = { ...getState().chartEditor };
    delete saveState.tabs;

    if (!tab) return;

    dispatch({
      type: SET_ACTIVE_TAB,
      payload: { tabId }
    });

    dispatch({
      type: SAVE_STATE_DATA,
      payload: {
        tabId: currentTabId,
        saveState: getState().chartEditor
      }
    });

    dispatch({
      type: RESTORE_STATE,
      payload: tab.state
    });
  };
}

const INITIAL_STATE = {
  tabArray: [999],
  tabById: {
    999: {
      id: 999,
      name: 'Tab 1',
      state: {},
      options: {
        grid: true,
        legend: true,
        tooltip: true
      }
    }
  },
  activeTabId: 999
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TAB: {
      const id = _.uniqueId();
      const name = `Tab ${state.tabArray.length + 1}`;
      return {
        ...state,
        activeTabId: id,
        tabArray: [...state.tabArray, id],
        tabById: {
          ...state.tabById,
          [id]: {
            id,
            name: name,
            options: {
              grid: true,
              legend: true,
              tooltip: true
            }
          }
        }
      };
    }

    case REMOVE_TAB: {
      const { tabId } = action.payload;
      delete state.tabById[tabId];
      return {
        ...state,
        tabArray: state.tabArray.filter(id => id !== tabId),
        tabById: { ...state.tabById }
      };
    }

    case SET_ACTIVE_TAB: {
      const { tabId } = action.payload;
      return {
        ...state,
        activeTabId: tabId
      };
    }

    case SAVE_STATE_DATA: {
      const { tabId, saveState } = action.payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            state: saveState
          }
        }
      };
    }

    case SET_TAB_OPTION: {
      const { tabId, optionName, value } = action.payload;
      return {
        ...state,
        tabById: {
          ...state.tabById,
          [tabId]: {
            ...state.tabById[tabId],
            options: {
              ...state.tabById[tabId].options,
              [optionName]: value
            }
          }
        }
      };
    }

    default:
      return state;
  }
}
