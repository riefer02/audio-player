import React from 'react';
import AudioPlayer from './components/AudioPlayer';
import FileLoader from './components/FileLoader';
import Layout from './components/Layout';
import FileHandler from './components/FileHandler';
import './assets/styles/app.css';

function App() {
  return (
    <div className="plaebak-app">
      <Layout>
        <FileLoader />
        <FileHandler />
        <AudioPlayer />
      </Layout>
    </div>
  );
}

export default App;
