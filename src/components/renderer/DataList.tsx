import React, { SyntheticEvent, MouseEvent } from 'react';
import styled from 'styled-components';

interface DataListProps {
  dataList: string[];
  onClick: (event: MouseEvent, key: string) => void;
}

const StyledDataList = styled.ul`
  padding: 0;
  margin: 0;
  min-height: 150px;
  max-height: 150px;
  border: 1px solid #ddd;

  list-style-type: none;
  overflow-y: auto;

  li {
    padding: 10px;
    cursor: pointer;
  }

  li:hover {
    background-color: #ddd;
  }
`;

export const StyledHeader = styled.header`
  width: 100%;

  h4 {
    padding: 10px;
    margin: 0;
    border-bottom: 1px solid #ddd;
  }
`;

export default function DataList(props: DataListProps) {
  const list = props.dataList.map(item => {
    return (
      <li key={item} onClick={e => props.onClick(e, item)}>
        {item.replace('backup_file_', '')}
      </li>
    );
  });

  return (
    <StyledDataList>
      <StyledHeader>
        <h4>Data list</h4>
      </StyledHeader>
      {list}
    </StyledDataList>
  );
}
