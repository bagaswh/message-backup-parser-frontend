import { store } from '../store/store';
import { storeData } from '../actions/actions';

export function wStoreData(data: Data[]) {
  store.dispatch(storeData(data));
}
