import { MessageGroup, Message } from 'message-backup-parser';
import styled from 'styled-components';
import Flexbox from '../styles/Flexbox';
import React, { Component, MouseEvent } from 'react';
import { store } from '../../redux/store/store';

interface MessageCardProps {
  messageGroup: MessageGroup & { fullMessages?: Message[] };
  isSearching: boolean;
}
interface MessageCardState {
  isExpanded: boolean;
  isFullView: boolean;
}

const StyledMessageCard = styled.div`
  margin-bottom: 10px;

  background-color: #ddd;

  .header {
    padding: 8px 16px;
    background-color: #bbb;
    border-bottom: 1px solid #ddd;
  }

  .content {
    padding: 8px 16px;
  }

  .message-line {
    margin-bottom: 5px;
  }

  .sender {
    font-weight: bold;
  }

  .date-sent {
    font-size: 10px;
  }

  img,
  audio,
  video {
    max-height: 200px;
    max-width: 200px;
  }
`;

export default class MessageCard extends Component<MessageCardProps, MessageCardState> {
  constructor(props: MessageCardProps) {
    super(props);

    this.state = { isExpanded: false, isFullView: false };
  }

  toggleExpand(e: MouseEvent) {
    this.setState({ isExpanded: !this.state.isExpanded });

    if (this.state.isFullView) {
      this.setState({ isFullView: false });
    }
  }

  toggleFullView(e: MouseEvent) {
    this.setState({ isExpanded: !this.state.isExpanded });
    this.setState({ isFullView: !this.state.isFullView });
  }

  render() {
    const dateBegin = this.props.messageGroup.dateBegin;
    const messages = this.state.isFullView
      ? (this.props.messageGroup as MessageGroup & { fullMessages: Message[] }).fullMessages
      : this.props.messageGroup.messages;

    return (
      <StyledMessageCard>
        <div className='header'>
          <Flexbox justifyContent='space-between' alignContent='center'>
            <span className='card-date'>
              <b>{dateBegin}</b>
            </span>
            <span className='card-total-messages'>
              Total messages: <b>{messages.length}</b>
            </span>
            {this.props.isSearching ? (
              <button className='card-btn-fullview-toggle' onClick={this.toggleFullView.bind(this)}>
                {this.state.isFullView ? 'Close' : 'Show full messages'}
              </button>
            ) : (
              ''
            )}
            <button className='card-btn-toggle' onClick={this.toggleExpand.bind(this)}>
              {this.state.isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </Flexbox>
        </div>

        <div className='content' hidden={!this.state.isExpanded}>
          {messages.map((msg, index) => {
            let messageContentEl;
            const zipData = store.getState().zipData;
            if (msg.additionalInfo && zipData) {
              console.log(msg.additionalInfo.fileExtension);
              const buffer = zipData[msg.additionalInfo.fullFileName];
              const blob = new Blob([buffer]);
              const objectURL = URL.createObjectURL(blob);
              const { fileType, fileExtension } = msg.additionalInfo;
              if (fileType) {
                if (fileType == 'PHOTO' || fileType == 'STICKER') {
                  messageContentEl = <img src={objectURL} alt={msg.additionalInfo.fullFileName} />;
                } else if (fileType == 'VIDEO' || fileType == 'GIF') {
                  messageContentEl = (
                    <video
                      controls={fileType == 'VIDEO'}
                      width='250'
                      loop={fileType == 'GIF'}
                      autoPlay={fileType == 'GIF'}
                    >
                      <source src={objectURL} type={`video/${fileExtension}`} />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  );
                } else if (fileType == 'AUDIO') {
                  messageContentEl = <audio src={objectURL} />;
                }
              } else if (!messageContentEl) {
              }
            } else {
              messageContentEl = (
                <span
                  className='message-content'
                  dangerouslySetInnerHTML={{
                    __html: msg.messageContent.replace(/\n/g, '<br/>') + ' '
                  }}
                />
              );
            }

            return (
              <div className='message-line' key={index}>
                <span className='sender'>{msg.sender}: </span>
                {msg.additionalInfo && <br />}
                {messageContentEl}
                <span className='date-sent'>{msg.dateSent} </span>
              </div>
            );
          })}
        </div>
      </StyledMessageCard>
    );
  }
}
