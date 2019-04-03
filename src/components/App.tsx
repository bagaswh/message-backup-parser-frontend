import React, { Component } from 'react';
import './App.css';
import FileInputProcessor from '../containers/FileInputProcessor';
import DataListContainer from '../containers/DataListContainer';
import LogContainer from '../containers/LogContainer';
import FileInfoContainer from '../containers/FileInfoContainer';

class App extends Component {
  render() {
    return (
      <div>
        <LogContainer />
        <DataListContainer />
        <FileInfoContainer />
        <FileInputProcessor />
      </div>
    );
  }
}

export default App;
