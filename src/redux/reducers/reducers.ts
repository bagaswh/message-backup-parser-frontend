import uuidv1 from 'uuid/v1';
import { ActionLogData } from './../../types/redux-types.d';
import { ActionTypes } from './../actions/action-types';
import { combineReducers } from 'redux';
import {
  State,
  ZipData,
  ActionStoreZipData,
  ActionStoreTextData,
  ActionDataList,
  ActionFileInfo,
  ActionParsedMessage,
  LogData
} from '../../types/redux-types';

const initialState: State = {
  zipData: [],
  textFileData: '',
  fileInfo: null,
  dataList: [],
  parsedMessage: null,
  logs: {}
};

export function zipData(data: ZipData[] | null = initialState.zipData, action: ActionStoreZipData) {
  if (action.type == ActionTypes.STORE_ZIP_DATA) {
    return action.payload.data;
  }

  return data;
}

export function textFileData(data = initialState.textFileData, action: ActionStoreTextData) {
  if (action.type == ActionTypes.STORE_TEXT_DATA) {
    return action.payload.data;
  }

  return data;
}

export function dataList(list = initialState.dataList, action: ActionDataList) {
  if (action.type == ActionTypes.DATA_LIST) {
    return [...list].concat(action.payload.list);
  }

  return list;
}

export function fileInfo(fileinfo = initialState.fileInfo, action: ActionFileInfo) {
  if (action.type == ActionTypes.FILE_INFO) {
    return action.payload.fileInfo;
  }

  return fileinfo;
}

export function storeParsedMessage(
  parsedMessage = initialState.parsedMessage,
  action: ActionParsedMessage
) {
  if (action.type == ActionTypes.PARSED_DATA) {
    return action.payload.parsedMessage;
  }

  return parsedMessage;
}

export function logs(logsData = initialState.logs, action: ActionLogData) {
  if (action.type == ActionTypes.LOG) {
    const newLogs = {
      [uuidv1()]: (action.payload as any).logData
    };

    return { ...logsData, ...newLogs };
  } else if (action.type == ActionTypes.DELETE_LOG) {
    const logs = { ...(logsData as LogData) };
    delete logs[(action.payload as any).id];
    return logs;
  }

  return logsData;
}

export const reducers = combineReducers({
  zipData,
  textFileData,
  dataList,
  fileInfo,
  parsedMessage: storeParsedMessage,
  logs
});
