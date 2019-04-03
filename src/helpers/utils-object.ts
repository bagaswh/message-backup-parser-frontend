/**
 * BEWARE! QUADRATIC TIME COMPLEXITY! XD
 */
export function compareArraySome(arr1: any[], arr2: any[]) {
  for (let item1 of arr1) {
    for (let item2 of arr2) {
      if (item1 == item2) {
        return true;
      }
    }
  }

  return false;
}

/**
 * search through array of objects, return the index if filter matches the object structure
 * @param objects array of objects
 * @param filter filter to match
 */
export function indexOfFilter(
  objects: ObjectIndexer<any>[],
  filter: ObjectIndexer<any> | string[]
) {
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    if (typeof filter == 'object' && !Array.isArray(filter)) {
      for (let objKey in obj) {
        for (let filterKey in filter) {
          if (filterKey == objKey && filter[filterKey] == obj[objKey]) {
            return i;
          }
        }
      }
    } else if (Array.isArray(filter)) {
      if (compareArraySome(Object.keys(obj), filter)) {
        return i;
      }
    }
  }

  return -1;
}
