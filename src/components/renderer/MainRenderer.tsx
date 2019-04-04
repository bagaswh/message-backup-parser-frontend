import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { ParsedMessage, FileInfo, MessageGroup, Message } from 'message-backup-parser';
import MessageCard from './MessageCard';
import DateList from './DateList';
import Flexbox from '../styles/Flexbox';
import Search from '../../common/Search';
import FileInfoContainer from '../../containers/FileInfoContainer';
import MessageCards from './MessageCards';
import styled from 'styled-components';

interface MainRendererProps {
  parsedMessage: ParsedMessage | null;
  fileInfo: FileInfo | null;

  searchResult?: MessageGroup & { fullMessages: Message[] };
}

interface MainRendererState {
  isSearching: boolean;
}

const StyledMain = styled.div``;

export default class MainRenderer extends Component<MainRendererProps, MainRendererState> {
  private searchResult: (MessageGroup & { fullMessages: Message[] })[] = [];

  constructor(props: MainRendererProps) {
    super(props);

    this.state = { isSearching: false };
  }

  search(e: KeyboardEvent) {
    if (e.key != 'Enter') {
      return;
    }

    const target = e.target as HTMLInputElement;
    const str = target.value;
    if (!str) {
      this.setState({ isSearching: false });
      this.searchResult = [];
      return;
    }

    this.setState({ isSearching: true });
    this.searchResult = Search.search(str, (this.props.parsedMessage as ParsedMessage).groups);
  }

  render() {
    if (!this.props.parsedMessage) {
      return <div />;
    }

    const dateList: string[] = [];
    const messageCards = (this.state.isSearching
      ? this.searchResult
      : this.props.parsedMessage.groups
    ).map((val, index) => {
      dateList.push(val.dateBegin);
      return <MessageCard key={index} isSearching={this.state.isSearching} messageGroup={val} />;
    });

    return (
      <Flexbox>
        <div className='col-3' style={{ marginRight: '20px' }}>
          <DateList dateList={dateList} onItemClick={e => console.log(e)} />
        </div>
        <div className='col-9'>
          <FileInfoContainer />
          <MessageCards search={this.search.bind(this)}>{messageCards}</MessageCards>
        </div>
      </Flexbox>
    );
  }
}
