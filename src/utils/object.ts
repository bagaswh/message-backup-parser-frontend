export function isObjectEmpty(obj: ObjectIndexer<any>) {
  return Object.keys(obj).length > 0;
}
