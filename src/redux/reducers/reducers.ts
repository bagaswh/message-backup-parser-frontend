import { ActionTypes } from './../actions/action-types';
import { combineReducers } from 'redux';
import {
  State,
  ZipData,
  ActionStoreZipData,
  ActionStoreTextData,
  ActionDataList,
  Action,
  ActionFileInfo,
  ActionParsedMessage
} from '../../types/redux-types';
import { store } from '../store/store';

const initialState: State = {
  zipData: [],
  textFileData: '',
  fileInfo: null,
  dataList: [],
  parsedMessage: null
};

export function zipData(
  data: ZipData[] | null = initialState.zipData,
  action: Action<ActionStoreZipData>
) {
  if (action.type == ActionTypes.STORE_ZIP_DATA) {
    return action.payload.data;
  }

  return data;
}

export function textFileData(
  data = initialState.textFileData,
  action: Action<ActionStoreTextData>
) {
  if (action.type == ActionTypes.STORE_TEXT_DATA) {
    return action.payload.data;
  }

  return data;
}

export function dataList(list = initialState.dataList, action: Action<ActionDataList>) {
  if (action.type == ActionTypes.DATA_LIST) {
    return action.payload.list;
  }

  return list;
}

export function fileInfo(fileinfo = initialState.fileInfo, action: Action<ActionFileInfo>) {
  if (action.type == ActionTypes.FILE_INFO) {
    return action.payload.fileinfo;
  }

  return fileinfo;
}

export function storeParsedMessage(
  parsedMessage = initialState.parsedMessage,
  action: Action<ActionParsedMessage>
) {
  if (action.type == ActionTypes.PARSED_DATA) {
    return action.payload.parsedMessage;
  }

  return parsedMessage;
}

export const reducers = combineReducers({
  zipData,
  textFileData,
  dataList,
  fileInfo,
  parsedMessage: storeParsedMessage
});
