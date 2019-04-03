import { FileInfo, ParsedMessage } from 'message-backup-parser';

/** redux interfaces */
export interface ZipData {
  name: string;
  value: Uint8Array;
}

export interface State {
  zipData: Data[];
  textFileData: string | null;
  fileInfo: FileInfo | null;
  dataList: string[];
  parsedMessage: ParsedMessage | null;
}

// redux actions
export interface Action<T> {
  type: string;
  payload: T;
  error?: boolean;
}

export interface ActionStoreZipData {
  data: Data[];
}

export interface ActionStoreTextData {
  data: string;
}

export interface ActionDataList {
  list: string[];
}

export interface ActionFileInfo {
  fileinfo: FileInfo;
}

export interface ActionParsedMessage {
  parsedMessage: ParsedMessage;
}
