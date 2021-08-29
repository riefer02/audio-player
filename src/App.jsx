import React, { useState } from 'react';
import AudioPlayer from './components/AudioPlayer'
import FileLoader from './components/FileLoader';
import './App.css';

function App() {


  return (
    <div className="App">
      <FileLoader />
      <AudioPlayer />
    </div>
  );
}

export default App;
