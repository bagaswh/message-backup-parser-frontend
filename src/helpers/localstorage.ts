import localforage from 'localforage';

export function getDataList() {
  return localforage.keys().then(keys => {
    return keys;
  });
}

export function loadData<T>(key: string): Promise<T> {
  return localforage.getItem<T>(key).then(value => {
    return value;
  });
}

export function deleteData(key: string) {
  return localforage.removeItem(key);
}
