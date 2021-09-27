import React from 'react';
import { useSelector } from 'react-redux';

export default function InfoDisplay() {
    const playlist = useSelector((state) => state.audio.audioPlayList)
    const curIndex = useSelector((state) => state.audio.curAudioIndex)

    return (
        <div>InfoDisplay</div>
    )
}