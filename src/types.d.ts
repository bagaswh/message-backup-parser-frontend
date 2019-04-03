/** generic interfaces */
interface ObjectIndexer<T> {
  [index: string]: T;
  [index: number]: T;
}
