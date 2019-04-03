import { FileInfo, ParsedMessage } from 'message-backup-parser';
import {
  ActionFileInfo,
  ActionParsedMessage,
  ActionLogData,
  LogType
} from './../../types/redux-types.d';
import { ActionTypes } from './action-types';
import {
  ZipData,
  ActionStoreZipData,
  ActionStoreTextData,
  ActionDataList
} from '../../types/redux-types';

import uuidv1 from 'uuid/v1';

export function storeZipData(data: ZipData[]): ActionStoreZipData {
  return {
    type: ActionTypes.STORE_ZIP_DATA,
    payload: { data }
  };
}

export function storeTextData(data: string): ActionStoreTextData {
  return {
    type: ActionTypes.STORE_TEXT_DATA,
    payload: { data }
  };
}

export function populateDataList(list: string[]): ActionDataList {
  return {
    type: ActionTypes.DATA_LIST,
    payload: { list }
  };
}

export function storeFileInfo(fileInfo: FileInfo): ActionFileInfo {
  return {
    type: ActionTypes.FILE_INFO,
    payload: { fileInfo }
  };
}

export function storeParsedMessage(parsedMessage: ParsedMessage): ActionParsedMessage {
  return {
    type: ActionTypes.PARSED_DATA,
    payload: { parsedMessage }
  };
}

/** log */
export function pushLog(logData: { type: LogType; message: string }): ActionLogData {
  const timestamp = Date.now();
  const _logData = { ...logData, date: timestamp, id: uuidv1() };
  return {
    type: ActionTypes.LOG,
    payload: { logData: _logData }
  };
}

export function deleteLog(id: string): ActionLogData {
  return {
    type: ActionTypes.DELETE_LOG,
    payload: { id }
  };
}
