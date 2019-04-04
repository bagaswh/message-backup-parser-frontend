import React, { Component } from 'react';
import styled from 'styled-components';
import { FileInfo, ParsedMessage } from 'message-backup-parser';

interface FileInfoProps {
  fileInfo: (FileInfo & ParsedMessage) | null;
}

interface FileInfoState {
  isExpanded: boolean;
}

const StyledFileInfo = styled.div`
  border: 1px solid #ddd;

  h4 {
    padding-bottom: 5px;
    margin: 0;
  }

  .group {
    margin-bottom: 20px;
  }
  .group:last-child {
    margin-bottom: 0;
  }

  .file-info {
    display: block;
  }
`;

export default class FileInfoComponent extends Component<FileInfoProps, FileInfoState> {
  constructor(props: FileInfoProps) {
    super(props);

    this.state = { isExpanded: false };
  }

  onButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    let appType, osType, chatName, chatParticipants, totalMessages, groups;
    if (this.props.fileInfo) {
      ({
        appType,
        osType,
        chatName,
        chatParticipants,
        totalMessages,
        groups
      } = this.props.fileInfo);
    }

    return (
      <StyledFileInfo>
        <div>
          <button className='btn-toggle-expand' onClick={this.onButtonClick.bind(this)}>
            {this.state.isExpanded ? 'Collapse' : 'Expand file info'}
          </button>
        </div>

        <div hidden={!this.state.isExpanded}>
          <div className='group'>
            <h4>Metadata</h4>
            <span className='file-info app-type'>
              <b>App type: </b>
              {appType}
            </span>

            <span className='file-info os-type'>
              <b>OS: </b>
              {osType}
            </span>
          </div>

          <div className='group'>
            <h4>Chat info</h4>
            <span className='file-info chat-name'>
              <b>Chat name: </b>
              {chatName}
            </span>

            <span className='file-info chat-parties'>
              <b>Chat participants: </b>
              {chatParticipants &&
                chatParticipants.map((party, index) => {
                  return (
                    <span key={index}>
                      {party}
                      {index == chatParticipants.length - 1 ? '' : ', '}
                    </span>
                  );
                })}
            </span>

            <span className='file-info chat-name'>
              <b>Total messages: </b>
              {totalMessages}
            </span>

            <span className='file-info chat-name'>
              <b>Date started: </b>
              {groups && groups[0].dateBegin}
            </span>

            <span className='file-info chat-name'>
              <b>Last message: </b>
              {groups && groups[groups.length - 1].dateBegin}
            </span>
          </div>
        </div>
      </StyledFileInfo>
    );
  }
}
