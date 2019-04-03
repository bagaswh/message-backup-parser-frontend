import localforage from 'localforage';

/**
 * Get data list from local storage.
 */
export function getDataList() {
  return localforage.keys().then(keys => {
    return keys;
  });
}

/**
 * Load data from local storage with specified key.
 * @param key
 */
export function loadData<T>(key: string): Promise<T> {
  return localforage.getItem<T>(key).then(value => {
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
