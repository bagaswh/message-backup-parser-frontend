import { fileInfo } from '../redux/reducers/reducers';
import { State } from '../types/redux-types';
import { connect } from 'react-redux';
import FileInfoComponent from '../components/renderer/FileInfo';
import { FileInfo, ParsedMessage } from 'message-backup-parser';

function mapStateToProps(state: State) {
  return {
    fileInfo: { ...(state.fileInfo as FileInfo), ...(state.parsedMessage as ParsedMessage) }
  };
}

const FileInfoContainer = connect(mapStateToProps)(FileInfoComponent);
export default FileInfoContainer;
