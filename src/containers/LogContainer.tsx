import { State } from '../types/redux-types';
import { Dispatch } from 'redux';
import { MouseEvent } from 'react';
import { store } from '../redux/store/store';
import { deleteLog } from '../redux/actions/actions';
import { logs } from '../redux/reducers/reducers';
import { connect } from 'react-redux';
import Log from '../components/Log';

function mapStateToProps(state: State) {
  return {
    logs: state.logs
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onDeleteClick(e: MouseEvent, id: string) {
      store.dispatch(deleteLog(id));
    }
  };
}

const LogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Log);
export default LogContainer;
