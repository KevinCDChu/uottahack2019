import { combineReducers } from 'redux';

import * as TYPE from '../actionTypes';

const initialState = {};

export const InjectedApp = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case TYPE.EXAMPLE_ACTION_TYPE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  InjectedApp,
});
