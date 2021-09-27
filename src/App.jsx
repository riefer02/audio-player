import React from 'react';
import AudioPlayer from './components/AudioPlayer'
import FileLoader from './components/FileLoader';
import PlayList from './components/PlayList';
import FileReader from './components/FileReader';
import Layout from './components/Layout';
import './assets/styles/app.css';

function App() {

  return (
    <div className="App">
      <Layout>
        <FileLoader />
        <AudioPlayer />
        <PlayList />
        <FileReader />
      </Layout>
    </div>
  );
}

export default App;
