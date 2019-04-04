import localforage from 'localforage';
import Cache from './cache';

/**
 * Get data list from local storage.
 */
export function getDataList() {
  return localforage.keys().then(keys => {
    return keys;
  });
}

/**
 * Proxying any request to local storage to cache.
 * Load data from local storage with specified key.
 * @param key
 */
export function loadData<T>(key: string): Promise<T> {
  if (Cache.retrieve(key)) {
    return Promise.resolve(Cache.retrieve(key));
  }

  return localforage.getItem<T>(key).then(value => {
    Cache.put(key, value);
    return value;
  });
}

/**
 * Delete data from local storage with specified key.
 * @param key
 */
export function deleteData(key: string) {
  return localforage.removeItem(key);
}
