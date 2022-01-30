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
  const [message, setMessage] = useState(
    `I'm the File Handler Component, thank you for making me real.`
  );

  const fileReader = async (files: FileData[]) => {
    for (const file of files) {
      let blob = await fetch(file.localUrl).then((res) => res.blob());
      var fd = new FormData();
      fd.append('upload-meta', JSON.stringify(file));
      fd.append('upload-file', blob, file.name);
      setFormattedFilesMeta(fd);
    }
  };

  const callAPI = async () => {
    interface Response {
      message: string;
    }

    const response = await axios
      .post(`${import.meta.env.VITE_API_URL}audio/upload`, formattedFilesMeta, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.data)
      .catch((err) => err);
    setMessage(response.message);
  };

  const handleSubmit = () => {
    // Change to forEach file callAPI()
    filesMeta.length > 0 ? callAPI() : setMessage(`There's nothing to send.`);
  };

  useEffect(() => {
    filesMeta.length > 0 ? setMessage(`I've got some data for you.`) : null;
    fileReader(filesMeta);
  }, [filesMeta]);

  return (
    <div className="file-handler">
      <div className="file-handler__message">{message}</div>
      <button
        className="file-handler__submit-btn"
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
  );
}
