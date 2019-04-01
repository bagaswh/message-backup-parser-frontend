export interface ObjectIndexer<T> {
  [index: string]: T;
  [index: number]: T;
}
