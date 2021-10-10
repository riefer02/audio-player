import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function FileHandler() {
    const [message, setMessage] = useState(`I'm the File Handler Component, thank you for making me real.`)

    const handleSubmit = () => {
        callAPI()
    }

    const callAPI = async () => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}`,
            { message: 'Hello API' }
        )
            .then(res => { return res.data })
            .catch(err => console.log(err.message));
        setMessage(response.message)
    };

    return (
        <div className="file-handler">
            <div className="file-handler__message">{message}</div>
            <button className="file-handler__submit-btn" onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}