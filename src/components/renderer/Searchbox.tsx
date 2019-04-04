import React, { Component, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

interface SearchboxProps {
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const StyledSearchbox = styled.div`
  width: 100%;

  input {
    padding: 5px 8px;
    width: 100%;
  }
`;

export default class Searchbox extends Component<SearchboxProps> {
  render() {
    return (
      <StyledSearchbox>
        <input onKeyPress={this.props.onKeyPress} placeholder='Search...' />
      </StyledSearchbox>
    );
  }
}
