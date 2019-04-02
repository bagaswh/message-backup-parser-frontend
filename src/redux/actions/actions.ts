import { ActionTypes } from './action-types';

export function storeData(data: Data[]): Action<ActionStoreZipData> {
  return {
    type: ActionTypes.STORE_DATA,
    payload: { data }
  };
}
