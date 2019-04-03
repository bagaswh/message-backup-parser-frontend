import React, { Component } from 'react';
import styled from 'styled-components';
import { FileInfo, ParsedMessage } from 'message-backup-parser';

interface FileInfoProps {
  fileInfo: (FileInfo & ParsedMessage) | null;
}

const StyledFileInfo = styled.div`
  .file-info {
    display: block;
  }
`;

export default function FileInfoComponent(props: FileInfoProps) {
  let appType, osType, chatName, chatParticipants, totalMessages, groups;
  if (props.fileInfo) {
    ({ appType, osType, chatName, chatParticipants, totalMessages, groups } = props.fileInfo);
  }

  return (
    <StyledFileInfo>
      <h2>Metadata</h2>
      <span className='file-info app-type'>
        <b>App type:</b>
        {appType}
      </span>

      <span className='file-info os-type'>
        <b>OS:</b>
        {osType}
      </span>

      <h2>Chat info</h2>
      <span className='file-info chat-name'>
        <b>Chat name:</b>
        {chatName}
      </span>

      <span className='file-info chat-parties'>
        <b>Chat participants:</b>
        {chatParticipants &&
          chatParticipants.map((party, index) => {
            return (
              <span>
                {party} {index == chatParticipants.length - 1 ? '.' : ','}
              </span>
            );
          })}
      </span>

      <span className='file-info chat-name'>
        <b>Total messages:</b>
        {totalMessages}
      </span>

      <span className='file-info chat-name'>
        <b>Date started:</b>
        {groups && groups[0].dateBegin}
      </span>

      <span className='file-info chat-name'>
        <b>Last message:</b>
        {groups && groups[groups.length - 1].dateBegin}
      </span>
    </StyledFileInfo>
  );
}
