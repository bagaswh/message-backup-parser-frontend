import React, { Component, MouseEvent } from 'react';
import { fullHeight } from '../../helpers/ui-helpers';
import styled from 'styled-components';
import { StyledHeader } from './DataList';

interface DateListProps {
  dateList: string[];
  onItemClick: (e: MouseEvent, item: string) => void;
}

const StyledDateList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;

  border: 1px solid #ddd;

  overflow-y: auto;
  list-style-type: none;

  li {
    padding: 10px;
    cursor: pointer;
  }

  li:hover {
    background-color: #ddd;
  }
`;

export default class DateList extends Component<DateListProps> {
  private ulRef = React.createRef<HTMLUListElement>();

  constructor(props: DateListProps) {
    super(props);

    this.ulRef = React.createRef();
  }

  componentDidMount() {
    if (this.ulRef) {
      fullHeight(this.ulRef.current as HTMLUListElement);
    }
  }
  render() {
    const items = this.props.dateList.map(item => {
      return (
        <li key={item} onClick={e => this.props.onItemClick(e, item)}>
          {item}
        </li>
      );
    });

    return (
      <StyledDateList ref={this.ulRef}>
        <StyledHeader>
          <h4>Date list</h4>
        </StyledHeader>
        {items}
      </StyledDateList>
    );
  }
}
