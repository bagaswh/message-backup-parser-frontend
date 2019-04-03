/**
 * Check wheter an object is empty or not.
 * Object is empty if it has no any single property, not including properties on higher delegation chain.
 * @param obj object to be tested
 */
export function isObjectEmpty(obj: ObjectIndexer<any>) {
  return Object.keys(obj).length > 0;
}
