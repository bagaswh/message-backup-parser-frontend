/** generic interfaces */
interface ObjectIndexer<T> {
  [index: string]: T;
  [index: number]: T;
}

/** redux interfaces */
interface Data {
  name: string;
  value: Buffer;
}

interface State {
  data: Data[] | null;
}

// redux actions
interface Action<T> {
  type: string;
  payload: T;
  error?: boolean;
}

interface ActionStoreZipData {
  data: Data[];
}
