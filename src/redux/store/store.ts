import { reducers } from '../reducers/reducers';
import { createStore } from 'redux';

export const store = createStore(reducers);

store.subscribe(() => console.log(store.getState()));
