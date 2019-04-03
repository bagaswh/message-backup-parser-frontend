import React from 'react';
import { SyntheticEvent } from 'react';

interface FileInputProps {
  onClick: (e: SyntheticEvent) => void;
}

export default function FileInput(props: FileInputProps) {
  return (
    <div>
      <label>
        {' '}
        Input your file here
        <input type='file' onChange={props.onClick} />
      </label>
    </div>
  );
}
