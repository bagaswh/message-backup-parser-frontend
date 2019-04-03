import JSZip from 'jszip';
import { extname } from '../utils/file';
import localforage from 'localforage';
import { saveAs } from 'file-saver';
import { ZipData } from '../types/redux-types';

/**
 * parse contents inside zip file
 * @param fileBuffer file buffer
 */
export function parseZip(
  fileBuffer: ArrayBuffer
): Promise<{ instance: JSZip; files: ObjectIndexer<JSZip.JSZipObject> }> {
  const jsZip = new JSZip();
  return new Promise((resolve, reject) => {
    jsZip.loadAsync(fileBuffer).then(
      zip => {
        resolve({ instance: jsZip, files: zip.files });
      },
      error => {
        reject(error);
      }
    );
  });
}

/**
 * validate if the contents inside zip file is a good candidate of a 'valid' zip file
 * meaning the zip file contains the text file to be parsed
 * @param files files inside zip
 * @param filename name of the zip file
 */
export function validateZip(files: ObjectIndexer<JSZip.JSZipObject>, filename: string) {
  return new Promise(resolve => {
    const filenames = Object.keys(files);
    const filenamesNoExtensions = filenames.map(name => {
      return name.replace(`.${extname(name)}`, '');
    });

    // text file inside zip file should be named the same as the zip file itself,
    // or be named "_chat.txt" to be considered valid zip file
    const isValid =
      filenamesNoExtensions.indexOf(filename) > -1 || filenamesNoExtensions.indexOf('_chat') > -1;

    if (isValid) {
      resolve(isValid);
    }
  });
}

/**
 * extract files inside zip
 * @param jsZip JSZip instance
 * @param files files inside zip file
 */
export function extractZip(jsZip: JSZip, files: ObjectIndexer<JSZip.JSZipObject>) {
  const filenames = Object.keys(files);

  const promises = filenames.map(filename => {
    return jsZip
      .file(filename)
      .async('uint8array')
      .then(value => {
        return { name: filename, value };
      });
  });

  return Promise.all(promises).then(value => {
    return value;
  });
}

/**
 * store zip contents (extracting) into local storage
 * @param jsZip instance of JSZip (required to do the extracting process)
 * @param files files inside zip file
 */
export function storeZipToLocalStorage(jsZip: JSZip, data: ZipData[], filename: string) {
  localforage.getItem(filename).then(item => {
    if (!item) {
      localforage.setItem(filename, data);
    }
  });

  return data;
}

/**
 * generate zip file from buffers and download
 * @param filename the filename to be stored
 * @param descriptors array of name and buffer of the file
 */
export function getZipFromBuffers(filename: string, descriptors: ZipData[]) {
  const jsZip = new JSZip();
  descriptors.forEach(desc => {
    jsZip.file(desc.name, desc.value);
  });
  jsZip.generateAsync({ type: 'blob' }).then(blob => {
    saveAs(blob, filename);
  });
}
