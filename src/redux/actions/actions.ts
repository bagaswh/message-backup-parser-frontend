import { FileInfo, ParsedMessage } from 'message-backup-parser';
import { ActionFileInfo, ActionParsedMessage } from './../../types/redux-types.d';
import { ActionTypes } from './action-types';
import {
  ZipData,
  Action,
  ActionStoreZipData,
  ActionStoreTextData,
  ActionDataList
} from '../../types/redux-types';

export function storeZipData(data: ZipData[]): Action<ActionStoreZipData> {
  return {
    type: ActionTypes.STORE_ZIP_DATA,
    payload: { data }
  };
}

export function storeTextData(data: string): Action<ActionStoreTextData> {
  return {
    type: ActionTypes.STORE_TEXT_DATA,
    payload: { data }
  };
}

export function populateDataList(list: string[]): Action<ActionDataList> {
  return {
    type: ActionTypes.DATA_LIST,
    payload: { list }
  };
}

export function storeFileInfo(fileinfo: FileInfo): Action<ActionFileInfo> {
  return {
    type: ActionTypes.FILE_INFO,
    payload: { fileinfo }
  };
}

export function storeParsedMessage(parsedMessage: ParsedMessage): Action<ActionParsedMessage> {
  return {
    type: ActionTypes.PARSED_DATA,
    payload: { parsedMessage }
  };
}
