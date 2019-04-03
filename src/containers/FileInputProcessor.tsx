import { SyntheticEvent } from 'react';
import { readFile } from '../file-reader/file-reader';
import { extname } from '../utils/file';
import { parseZip, validateZip, storeZipToLocalStorage, extractZip } from '../file-reader/zip';
import FileInput from '../components/FileInput';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { storeData, log } from '../redux/reducers/wrappers';
import { Parser } from 'message-backup-parser';
import { indexOfFilter } from '../helpers/utils-object';
import { parse } from '../helpers/parser';

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
            const aParsing = performance.now();
            parseZip(result as ArrayBuffer).then(data => {
              const bParsing = performance.now();
              log({ type: 'ok', message: `done parsing:  ${bParsing - aParsing}` });

              const aValidating = performance.now();
              validateZip(data.files, filename).then(isValid => {
                const bValidating = performance.now();
                log({ type: 'ok', message: `done validating:  ${bValidating - aValidating}` });

                if (isValid) {
                  let textFileName = filename;
                  if (!data.files[textFileName]) {
                    textFileName = '_chat.txt';
                  }

                  const aExtracting = performance.now();
                  extractZip(data.instance, data.files).then(zipData => {
                    const bExtracting = performance.now();
                    log({ type: 'ok', message: `done extracting:  ${bExtracting - aExtracting}` });

                    const aIndexing = performance.now();
                    const index = indexOfFilter(zipData, { name: textFileName });
                    const bIndexing = performance.now();
                    log({ type: 'ok', message: `done indexing:  ${bIndexing - aIndexing}` });

                    // @ts-ignore
                    const str = new TextDecoder('utf-8').decode(zipData[index].value as Uint8Array);
                    const { data: parsedMessage, fileinfo } = parse(str);

                    if (parse) {
                      storeZipToLocalStorage(data.instance, zipData, `backup_file_${filename}`);
                      storeData(zipData, '', parsedMessage, fileinfo);
                    }
                  });
                }
              });
            });
          } else {
            const { data: parsedMessage, fileinfo } = parse(result as string);

            if (parsedMessage && fileinfo) {
              storeData(null, result as string, parsedMessage, fileinfo);
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
