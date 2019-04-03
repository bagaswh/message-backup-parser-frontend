import { reducers } from '../reducers/reducers';
import { createStore } from 'redux';
import { pushLog } from '../actions/actions';

export const store = createStore(reducers);

// store.subscribe(() => console.log(store.getState()));
