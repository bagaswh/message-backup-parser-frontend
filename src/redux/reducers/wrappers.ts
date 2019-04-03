import { FileInfo, ParsedMessage } from 'message-backup-parser';
import { store } from '../store/store';
import { storeTextData, storeZipData, storeFileInfo, storeParsedMessage } from '../actions/actions';
import { ZipData } from '../../types/redux-types';

export function storeData(
  zipData: ZipData[] | null,
  textData: string,
  parsedMessage: ParsedMessage,
  fileinfo: FileInfo
) {
  store.dispatch(storeZipData(zipData || []));
  store.dispatch(storeTextData(textData || ''));

  store.dispatch(storeParsedMessage(parsedMessage));
  store.dispatch(storeFileInfo(fileinfo));
}
