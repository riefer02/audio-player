import React from 'react';
import AudioPlayer from './components/AudioPlayer'
import FileLoader from './components/FileLoader';
import FileReader from './components/InfoDisplay';
import Layout from './components/Layout';
import FileHandler from './components/FileHandler';
import './assets/styles/app.css';

function App() {

  return (
    <div>
      <Layout>
        <div className="container mx-auto">
          <div className="row-1 flex justify-start align-middle ">
            <FileLoader />
            <FileReader />
            <FileHandler />
          </div>
          <div className="flex justify-start align-middle">
            <AudioPlayer />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;
