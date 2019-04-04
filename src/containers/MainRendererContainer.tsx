import { State } from '../types/redux-types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainRenderer from '../components/renderer/MainRenderer';
import { ParsedMessage } from 'message-backup-parser';
import { fileInfo } from '../redux/reducers/reducers';

function mapStateToProps(state: State) {
  return {
    parsedMessage: state.parsedMessage as ParsedMessage,
    fileInfo: state.fileInfo
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

const MainRendererContainer = connect(
  mapStateToProps,
  null
)(MainRenderer);
export default MainRendererContainer;
