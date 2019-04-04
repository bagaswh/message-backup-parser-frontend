import React, { Component, KeyboardEvent } from 'react';
import Searchbox from './Searchbox';
import { fullHeight } from '../../helpers/ui-helpers';
import styled from 'styled-components';

interface MessageCardsProps {
  search: (e: KeyboardEvent) => void;
}

interface MessageCardsState {}

const StyledBox = styled.div`
  overflow-y: auto;
`;

export default class MessageCards extends Component<MessageCardsProps, MessageCardsState> {
  private readonly boxRef = React.createRef<HTMLDivElement>();

  constructor(props: MessageCardsProps) {
    super(props);
  }

  componentDidMount() {
    if (this.boxRef && this.boxRef.current) {
      fullHeight(this.boxRef.current);
    }
  }

  search(e: KeyboardEvent) {
    this.props.search(e);
  }

  render() {
    return (
      <StyledBox ref={this.boxRef}>
        <Searchbox onKeyPress={this.search.bind(this)} />
        {this.props.children}
      </StyledBox>
    );
  }
}
