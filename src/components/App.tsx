import React, { Component } from 'react';
import './App.css';
import FileInputProcessor from '../containers/FileInputProcessor';
import DataListContainer from '../containers/DataListContainer';
import LogContainer from '../containers/LogContainer';

class App extends Component {
  render() {
    return (
      <div>
        <LogContainer />
        <DataListContainer />
        <FileInputProcessor />
      </div>
    );
  }
}

export default App;
