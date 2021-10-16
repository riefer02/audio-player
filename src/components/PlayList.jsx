import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function PlayList() {
    const playlist = useSelector((state) => state.audio.audioPlayList)
    const [playListDisplay, setPlaylistDisplay] = useState([]);

    useEffect(() => {
        console.log(playlist);
        setPlaylistDisplay(playlist)

    }, [playlist])

    useEffect(() => {
        const renderPlaylist = () => {
            playlist.forEach(item => {
            })
        }
        renderPlaylist()
    }, [playListDisplay])

    return (
        <div className="playlist">
            <div className="playlist__header">Playlist</div>
        </div>

    )
}