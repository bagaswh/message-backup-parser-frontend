import { connect } from 'react-redux';
import DataList from '../components/DataList';
import { MouseEvent } from 'react';
import { Dispatch } from 'redux';
import { storeData, log } from '../redux/reducers/wrappers';
import { loadData } from '../helpers/localstorage';
import { State, ZipData } from '../types/redux-types';
import { parse } from '../helpers/parser';
import { indexOfFilter } from '../helpers/utils-object';

function mapStateToProps(state: State) {
  return {
    dataList: state.dataList
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onClick: (e: MouseEvent, key: string) => {
      loadData<ZipData[] | string>(key).then(data => {
        let str;
        if (typeof data == 'string') {
          str = data;
        } else {
          const lookupKey = key.replace('backup_file_', '');
          console.log(data);
          const aLookup = performance.now();
          let index = indexOfFilter(data, { name: lookupKey });
          if (index < 0) {
            index = indexOfFilter(data, { name: '_chat.txt' });
          }
          const bLookup = performance.now();
          log({ type: 'ok', message: `done look up: ${bLookup - aLookup}` });
          str = new TextDecoder('utf-8').decode(data[index].value);
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
