import { SyntheticEvent } from 'react';
import { readFile } from '../file-reader/file-reader';
import { extname } from '../utils/file';
import { parseZip, validateZip, storeZipToLocalStorage, extractZip } from '../file-reader/zip';
import FileInput from '../components/FileInput';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { storeData, log } from '../redux/reducers/wrappers';
import { parse } from '../helpers/parser';
import { store } from '../redux/store/store';
import { populateDataList } from '../redux/actions/actions';
import localforage from 'localforage';

function generateRandomColor(chatParticipants: string[]) {
  let colors: { [index: string]: string } = {};
  for (let participant of chatParticipants) {
    let rgb = [];
    for (let i = 0; i < 3; i++) {
      let hexChars = '1234567890abcdef'.split('');
      let colorComponent = new Array(2)
        .fill('')
        .map(char => {
          let pickedChar = hexChars[~~(Math.random() * hexChars.length)];
          return pickedChar;
        })
        .join('');
      rgb.push(colorComponent);
    }
    colors[participant] = '#' + rgb.join('');
  }
  return colors;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onClick: (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length) {
        const { name } = files[0];
        const extension = extname(name);

        let readFileAs: 'zip' | 'text' = 'text';
        if (extension == 'zip') {
          readFileAs = 'zip';
        } else if (extension == 'txt') {
          readFileAs = 'text';
        } else {
          alert('You gave unsupported file type!');
          return;
        }

        const file = files[0];
        readFile(file, readFileAs).then(result => {
          const filename = file.name.replace(`.${extname(file.name)}`, '');

          if (readFileAs == 'zip') {
            parseZip(result as ArrayBuffer).then(data => {
              validateZip(data.files, filename).then(isValid => {
                if (isValid) {
                  let textFileName = filename;
                  if (!data.files[textFileName]) {
                    textFileName = '_chat.txt';
                  }

                  extractZip(data.instance, filename, data.files).then(zipData => {
                    const str = new TextDecoder('utf-8').decode((zipData[filename] ||
                      zipData['_chat.txt']) as Uint8Array);
                    const { data: parsedMessage, fileinfo } = parse(str);

                    if (parse) {
                      zipData.filename = filename;

                      storeZipToLocalStorage(
                        data.instance,
                        zipData,
                        `backup_file_${filename}`
                      ).then(data => {
                        if (!null) {
                          store.dispatch(populateDataList([`backup_file_${filename}`]));
                        }
                      });
                      storeData(zipData, '', parsedMessage, fileinfo);
                    }
                  });
                }
              });
            });
          } else {
            const { data: parsedMessage, fileinfo } = parse(result as string);

            if (parsedMessage && fileinfo) {
              localforage.setItem(`backup_file_${filename}`, result);
              storeData(null, result as string, parsedMessage, fileinfo);
              store.dispatch(populateDataList([`backup_file_${filename}`]));
            }
          }
        });
      }
    }
  };
}

const FileInputProcessor = connect(
  null,
  mapDispatchToProps
)(FileInput);
export default FileInputProcessor;
