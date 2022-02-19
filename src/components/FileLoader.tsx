import * as React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToPlayList } from '../features/playlistSlice';
import { addFiles } from '../features/fileSlice';

interface FileData {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  localUrl: string;
}

const formatData = (files: Array<File>) => {
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
  const dispatch = useDispatch();
  const [filenameList, setFilenamesList] = useState(['']);
  const audioInput = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (null !== audioInput.current) {
      const currentFiles: FileList = audioInput.current.files as FileList;

      // Read files for their file names
      const fileNames = Array.from(currentFiles).map((file) => file.name);
      setFilenamesList(fileNames);

      // Read files and create binary string
      const newAudioElements = Array.from(currentFiles).map((file) =>
        URL.createObjectURL(file)
      );

      dispatch(addToPlayList(newAudioElements));

      // Read files and create meta objects
      dispatch(addFiles(formatData(Array.from(currentFiles))));
    }
  };

  return (
    <div className="file-uploader__wrapper">
      <div>
        <button className="file-uploader__button">
          Upload a file
          <input
            className="file-uploader__input"
            ref={audioInput}
            type="file"
            onInput={handleUpload}
          />
        </button>
      </div>
      <div className="file-uploader__file-list">
        {filenameList.map((filename, index) => (
          <div className="file-uploader__file-item" key={index}>
            {filename}
          </div>
        ))}
      </div>
    </div>
  );
}
