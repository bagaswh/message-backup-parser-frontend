import React, { Component } from 'react';
import { readFile } from '../file-reader/file-reader';
import { extname } from '../utils/file';
import { parseZip, validateZip, storeZipToLocalStorage } from '../file-reader/zip';

export default class FileInput extends Component {
  readFile(e: React.FormEvent) {
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

        if (extension == 'zip') {
          parseZip(result as ArrayBuffer).then(data => {
            validateZip(data.files, filename).then(isValid => {
              if (isValid) {
                storeZipToLocalStorage(data.instance, data.files, filename);
              }
            });
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <label>
          {' '}
          Input your file here
          <input type='file' onChange={this.readFile.bind(this)} />
        </label>
      </div>
    );
  }
}
