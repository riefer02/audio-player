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
  const audioInput = useRef<HTMLInputElement>(null);
  const [filenameList, setFilenamesList] = useState(['']);

  const handleUpload = () => {
    if (null !== audioInput.current) {
      const currentFiles = Array.from(audioInput.current.files);

      const fileNames = currentFiles.map((file) => file.name);

      const newAudioElements = currentFiles.map((file) =>
        URL.createObjectURL(file)
      );

      setFilenamesList(fileNames);

      dispatch(addToPlayList(newAudioElements));

      dispatch(addFiles(formatData(currentFiles)));
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
