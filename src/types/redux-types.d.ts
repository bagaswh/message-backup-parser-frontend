import { FileInfo, ParsedMessage } from 'message-backup-parser';

/** redux interfaces */
export interface ZipData extends ObjectIndexer<Uint8Array | string> {
  filename: string;
}

export interface State {
  zipData: ZipData;
  textFileData: string | null;
  fileInfo: FileInfo | null;
  dataList: string[];
  parsedMessage: ParsedMessage | null;
  logs: LogData;
}

// redux actions
export interface Action {
  type: string;
  payload?: T;
  error?: boolean;
}

export interface ActionStoreZipData extends Action {
  payload: { data: ZipData };
}

export interface ActionStoreTextData extends Action {
  payload: { data: string };
}

export interface ActionDataList extends Action {
  payload: { list: string[] };
}

export interface ActionFileInfo extends Action {
  payload: { fileInfo: FileInfo };
}

export interface ActionParsedMessage extends Action {
  payload: { parsedMessage: ParsedMessage };
}

// log
export interface ActionLogData extends Action {
  payload: { logData: LogDataStatic } | { id: string };
}

export type LogType = 'ok' | 'warning' | 'danger';
export interface LogDataStatic {
  id: string;
  type: LogType;
  date: number;
  message: string;
}

export interface LogData extends ObjectIndexer<LogDataStatic> {}
