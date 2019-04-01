export function readFile(file: File, as: 'zip' | 'text') {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    if (as == 'zip') {
      fileReader.readAsArrayBuffer(file);
    } else {
      fileReader.readAsText(file);
    }

    fileReader.onload = (event: ProgressEvent) => {
      const target = event.target as FileReader;
      const result = target.result as ArrayBuffer | string;
      resolve(result);
    };

    fileReader.onerror = (event: ProgressEvent) => {
      reject();
    };
  });
}
