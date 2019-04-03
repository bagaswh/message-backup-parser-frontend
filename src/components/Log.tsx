import React, { Component, MouseEvent } from 'react';
import styled from 'styled-components';
import { LogData } from '../types/redux-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

library.add(faWindowClose);

const StyledLogContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  /* height: 100px; */
  max-height: 200px;

  .btn-close {
    font-size: 20px;
    text-align: right;
  }
`;

const StyledLog = styled.div`
  width: 100%;
  height: 200px;
  max-height: 200px;

  background-color: #222f3e;
  color: #fff;

  font-family: 'consolas', 'monospace';

  overflow-y: auto;

  ul {
    list-style-type: none;
  }

  li::before {
    content: '●';
    width: 10px;
    font-size: 10px;
  }

  li.ok::before {
    color: #27ae60;
  }

  .timestamp {
    background-color: rgba(20, 20, 20, 1);
    color: #fff;
  }
`;

const StyledLogTable = styled.table`
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  height: 100%;
  width: 100%;

  letter-spacing: 1px;
  font-size: 0.8rem;

  tr {
    width: 100px;
  }

  td,
  th {
    border: 1px solid rgb(190, 190, 190);
    padding: 10px;
    text-align: left;
  }

  tr span.ok {
    color: #2ecc71;
  }
  tr span.warning {
    color: #e67e22;
  }
  tr span.danger {
    color: #e74c3c;
  }
`;

interface LogProps {
  logs: LogData;
  onDeleteClick: (e: MouseEvent, id: string) => void;
}

interface LogState {
  isVisible: boolean;
}

export default class Log extends Component<LogProps, LogState> {
  constructor(props: LogProps) {
    super(props);

    this.state = { isVisible: false };
  }

  onClick(e: MouseEvent) {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    const logs = [];
    for (let key in this.props.logs) {
      const { id, type, message, date } = this.props.logs[key];
      const tr = (
        <tr
          key={id}
          className={type}
          onClick={e => {
            this.props.onDeleteClick(e, id);
          }}
        >
          <td>
            <span className={type}>{type}</span>
          </td>
          <td>
            <span className='timestamp'>[{new Date(date).toLocaleString()}]</span>
          </td>
          <td>{message}</td>
        </tr>
      );
      logs.push(tr);
    }

    return (
      <StyledLogContainer>
        <span className='btn-close' onClick={this.onClick.bind(this)}>
          {this.state.isVisible ? <FontAwesomeIcon icon='window-close' /> : 'Open log'}
        </span>

        {this.state.isVisible ? (
          <StyledLog>
            {logs.length ? (
              <StyledLogTable>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Message</th>
                  </tr>
                </thead>

                <tbody>{logs}</tbody>
              </StyledLogTable>
            ) : (
              'Log empty'
            )}
          </StyledLog>
        ) : (
          ''
        )}
      </StyledLogContainer>
    );
  }
}
