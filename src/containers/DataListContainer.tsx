import { connect } from 'react-redux';
import DataList from '../components/renderer/DataList';
import { MouseEvent } from 'react';
import { Dispatch } from 'redux';
import { storeData, log } from '../redux/reducers/wrappers';
import { loadData } from '../common/localstorage';
import { State, ZipData } from '../types/redux-types';
import { parse } from '../helpers/parser';

function mapStateToProps(state: State) {
  return {
    dataList: state.dataList
  };
}

// store currently selected key
let currentKey = '';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onClick: (e: MouseEvent, key: string) => {
      if (key == currentKey) {
        return;
      }

      currentKey = key;

      const aLoading = performance.now();
      loadData<ZipData | string>(key).then(data => {
        const bLoading = performance.now();
        log({ type: 'ok', message: `done loading: ${(bLoading - aLoading).toFixed(3)}ms` });
        let str;
        if (typeof data == 'string') {
          str = data;
        } else {
          str = new TextDecoder('utf-8').decode((data['_chat.txt'] ||
            data[data.filename]) as Uint8Array);
        }

        const { data: parsedMessage, fileinfo } = parse(str);
        if (typeof data == 'string') {
          storeData(null, data, parsedMessage, fileinfo);
        } else {
          storeData(data, '', parsedMessage, fileinfo);
        }
      });
    }
  };
}

const DataListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataList);

export default DataListContainer;
