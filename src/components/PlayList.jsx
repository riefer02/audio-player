import React from 'react';
import { useSelector } from 'react-redux';

export default function PlayList() {
    const playlist = useSelector((state) => state.audio.audioPlayList)

    return (<ul>
        {playlist.map((song, index) => {
            return <li key={index}>{song.currentSrc}</li>
        })}
    </ul>
    )
}