import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function PlayList() {
    const playlist = useSelector((state) => state.audio.audioPlayList)
    const [playListDisplay, setPlaylistDisplay] = useState([]);

    useEffect(() => {
        setPlaylistDisplay(playlist)
    }, [playlist])

    return (
        <ul>
            {playListDisplay}
        </ul>
    )
}