import React, { SyntheticEvent, MouseEvent } from 'react';

interface DataListProps {
  dataList: string[];
  onClick: (event: MouseEvent, key: string) => void;
}

export default function DataList(props: DataListProps) {
  const list = props.dataList.map(item => {
    return (
      <li key={item} onClick={e => props.onClick(e, item)}>
        {item}
      </li>
    );
  });

  return <ul>{list}</ul>;
}
