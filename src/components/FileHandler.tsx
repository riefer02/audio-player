import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface FileData {
  name: string;
  type: string;
  size: number;
  lastModified: string;
  localUrl: string;
}

export default function FileHandler() {
  const filesMeta = useSelector((state) => state.file.filesMeta);
  const [formattedFilesMeta, setFormattedFilesMeta] = useState([]);
  const [message, setMessage] = useState(``);

  const fileReader = async (files: FileData[]) => {
    for (const file of files) {
      const blob = await fetch(file.localUrl).then((res) => res.blob());
      const fd = new FormData();

      fd.append('upload-meta', JSON.stringify(file));
      fd.append('upload-file', blob, file.name);

      setFormattedFilesMeta(fd);
    }
  };

  const callAPI = async () => {
    const response = await axios
      .post(`${import.meta.env.VITE_API_URL}audio/upload`, formattedFilesMeta, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.data)
      .catch((err) => err);
    setMessage(response.message);
  };

  const handleSubmit = () =>
    filesMeta.length > 0 ? callAPI() : setMessage(`There's nothing to send.`);

  useEffect(() => {
    if (filesMeta.length > 0) setMessage(`File ready to send to database.`);

    fileReader(filesMeta);
  }, [filesMeta]);

  const fetchAudioFile = async () => {
    const url = `${import.meta.env.VITE_API_URL}audio/two-suns`;

    await axios
      .get(url)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="file-handler">
      <div className="alert">{message.length > 0 && message}</div>
      <button className="btn" onClick={() => handleSubmit()}>
        Submit
      </button>
      <button className="btn" onClick={() => fetchAudioFile()}>
        Call API
      </button>
    </div>
  );
}
