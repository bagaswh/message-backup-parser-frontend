import { ActionTypes } from './../actions/action-types';
import { combineReducers } from 'redux';

const initialState: State = {
  data: null
};

export function data(data = initialState.data, action: Action<ActionStoreZipData>) {
  if (action.type == ActionTypes.STORE_DATA) {
    return action.payload.data;
  }

  return data;
}

export const reducers = combineReducers({ data });
