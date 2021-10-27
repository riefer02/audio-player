import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function FileHandler() {
    const filesMeta = useSelector((state) => state.file.filesMeta);
    const [formattedFilesMeta, setFormattedFilesMeta] = useState([]);
    const [message, setMessage] = useState(`I'm the File Handler Component, thank you for making me real.`)

    const handleSubmit = () => {
        filesMeta.length > 0 ? callAPI() : setMessage(`There's nothing to send.`)
    }

    const callAPI = async () => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}`,
            formattedFilesMeta,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then(res => { return res.data })
            .catch(err => console.log(err.message));
        setMessage(response.message)
    };

    const fileReader = async (files) => {
        for (const file of files) {
            let blob = await fetch(file.localUrl).then(res => res.blob());
            var fd = new FormData();
            fd.append('upload', blob, 'myblob.txt');
            fd.append('upload-meta', JSON.stringify(file))
            setFormattedFilesMeta(fd);
        }
    }

    useEffect(() => {
        filesMeta.length > 0 ? setMessage(`I've got some data for you.`) : null
        fileReader(filesMeta)
    }, [filesMeta])

    useEffect(() => {
        console.log('Formatted Files Meta Data', formattedFilesMeta);
    }, [formattedFilesMeta])

    return (
        <div className="file-handler">
            <div className="file-handler__message">{message}</div>
            <button className="file-handler__submit-btn" onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}