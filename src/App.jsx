import React from 'react';
import AudioPlayer from './components/AudioPlayer'
import FileLoader from './components/FileLoader';
import PlayList from './components/PlayList';
import FileReader from './components/InfoDisplay';
import Layout from './components/Layout';
import FileHandler from './components/FileHandler';
import './assets/styles/app.css';

function App() {

  return (
    <div>
      <Layout>
        <div className="row-1 flex justify-start align-middle">
          <FileLoader />
          <FileReader />
          <FileHandler />
        </div>
        <AudioPlayer />
        <PlayList />
      </Layout>
    </div>
  );
}

export default App;
