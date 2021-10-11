import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function FileHandler() {
    const filesMeta = useSelector((state) => state.file.filesMeta);
    const [message, setMessage] = useState(`I'm the File Handler Component, thank you for making me real.`)

    const handleSubmit = () => {
        filesMeta.length > 0 ? callAPI() : setMessage(`There's nothing to send.`)
    }

    const callAPI = async () => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}`,
            filesMeta
        )
            .then(res => { return res.data })
            .catch(err => console.log(err.message));
        setMessage(response.message)
    };

    const fileReader = async (files) => {
        for (const file of files) {
            let blob = await fetch(file.localUrl).then(res => res.blob());
            console.log(blob)

            // To Do: Handle/Prepare new blob for axios post call to API
        }
    }

    useEffect(() => {
        filesMeta.length > 0 ? setMessage(`I've got some data for you.`) : null
        fileReader(filesMeta)
    }, [filesMeta])

    return (
        <div className="file-handler">
            <div className="file-handler__message">{message}</div>
            <button className="file-handler__submit-btn" onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}