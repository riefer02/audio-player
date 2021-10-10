import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function FileReader() {
    const playlist = useSelector((state) => state.audio.audioPlayList)
    const curIndex = useSelector((state) => state.audio.curAudioIndex)
    const [curAudioURL, setCurrentAudioURL] = useState(playlist[curIndex])

    const handleFileRead = () => {
    }

    useEffect(() => {
        setCurrentAudioURL(playlist[curIndex]);
    }, [])

    useEffect(async () => {
        await handleFileRead(curAudioURL);
    }, [curAudioURL])

    return (
        <div>
            <h2>FileReader</h2>
            <h4>Current Index: {curIndex}</h4>
            <h4>Total Songs: {playlist.length}</h4>
        </div>
    )
}