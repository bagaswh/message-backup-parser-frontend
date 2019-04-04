import React, { Component } from 'react';
import FileInputProcessor from '../containers/FileInputProcessor';
import DataListContainer from '../containers/DataListContainer';
import LogContainer from '../containers/LogContainer';
import FileInfoContainer from '../containers/FileInfoContainer';
import MainRenderer from './renderer/MainRenderer';
import MainRendererContainer from '../containers/MainRendererContainer';
import Flexbox from './styles/Flexbox';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 960px;
  max-width: 960px;
  margin: auto;
`;

class App extends Component {
  render() {
    return (
      <StyledContainer>
        <header>
          <h1>Message backup parser</h1>
          <p>A tiny tool to view message backup file from various chat applications.</p>
        </header>

        <Flexbox>
          <div className='col-6'>
            <DataListContainer />
          </div>

          <div className='col-6'>
            <Flexbox
              justifyContent='center'
              alignContent='center'
              additionalStyles={{ width: '100%', height: '100%' }}
            >
              <FileInputProcessor />
            </Flexbox>
          </div>
        </Flexbox>

        <div style={{ marginTop: '20px' }}>
          <MainRendererContainer />
        </div>
      </StyledContainer>
    );
  }
}

export default App;
