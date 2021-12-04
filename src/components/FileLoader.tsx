import * as React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToPlayList } from '../features/audioSlice';
import { addFiles } from '../features/fileSlice';

interface FileData {
  name: String;
  type: String;
  size: Number;
  lastModified: String;
  localUrl: String;
}

const formatData = (files: FileData[]) => {
  const formattedData: FileData[] = [];

  files.forEach((file) => {
    const fileDocument: FileData = {
      name: file.name,
      type: file.type ? file.type : 'NA',
      size: file.size,
      lastModified: file.lastModified,
      localUrl: URL.createObjectURL(file),
    };
    formattedData.push(fileDocument);
  });
  return formattedData;
};

export default function FileLoader() {
  const [filenameList, setFilenamesList] = useState([
    'Please Upload Your Audio',
  ]);
  const audioInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleUpload = () => {
    const currentFiles = audioInput.current.files;

    // Read files for their file names
    let fileNames = Array.from(currentFiles).map((file) => file.name);
    setFilenamesList(fileNames);

    // Read files and create binary string
    let newAudioElements = Array.from(currentFiles).map((file) =>
      URL.createObjectURL(file)
    );
    dispatch(addToPlayList(newAudioElements));

    // Read files and create meta objects
    dispatch(addFiles(formatData(Array.from(currentFiles))));
  };

  return (
    <div className="uploader__wrapper">
      <div>
        <button className="uploader__button">
          Upload a file
          <input
            className="uploader__input"
            ref={audioInput}
            type="file"
            onInput={handleUpload}
          />
        </button>
      </div>
      <div className="uploader__file-list">
        {filenameList.map((filename, index) => (
          <div className="uploader__file-item" key={index}>
            {filename}
          </div>
        ))}
      </div>
    </div>
  );
}
