import JSZip from 'jszip';
import { extname } from '../utils/file';
import { ObjectIndexer } from '../types';
import localforage from 'localforage';
import { saveAs } from 'file-saver';

/**
 * parse contents inside zip file
 * @param buffer file buffer
 */
export function parseZip(
  fileBuffer: ArrayBuffer
): Promise<{ instance: JSZip; files: ObjectIndexer<JSZip.JSZipObject> }> {
  const jszip = new JSZip();
  return new Promise((resolve, reject) => {
    jszip.loadAsync(fileBuffer).then(
      zip => {
        resolve({ instance: jszip, files: zip.files });
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
 * store zip contents (extracting) into local storage
 * @param jszipInstance instance of JSZip (required to do the extracting process)
 * @param files files inside zip file
 */
export function storeZipToLocalStorage(
  jszipInstance: JSZip,
  files: ObjectIndexer<JSZip.JSZipObject>,
  filename: string
) {
  const filenames = Object.keys(files);
  const promises = filenames.map(filename => {
    return jszipInstance
      .file(filename)
      .async('nodebuffer')
      .then(value => {
        return { name: filename, value };
      });
  });

  Promise.all(promises).then(value => {
    if (!localforage.getItem(filename)) {
      localforage.setItem(filename, value);
    }
  });
}

export function getZipFromBuffers(
  filename: string,
  descriptors: { name: string; data: Uint8Array }[]
) {
  const jszip = new JSZip();
  descriptors.forEach(desc => {
    jszip.file(desc.name, desc.data);
  });
  jszip.generateAsync({ type: 'blob' }).then(blob => {
    saveAs(blob, filename);
  });
}