import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatSongName } from '../lib/helpers';

export default function InfoDisplay() {
  const playlist = useSelector((state) => state.playlist.audioPlayList);
  const curIndex = useSelector((state) => state.playlist.curAudioIndex);
  const curSongName = useSelector((state) => state.playlist.curSongName);
  const [curAudioURL, setCurrentAudioURL] = useState(playlist[curIndex]);

  useEffect(() => {
    setCurrentAudioURL(playlist[curIndex]);
  }, []);

  return (
    <div className="info-display flex">
      <div className="font-medium">
        <span className="font-normal mr-10">{formatSongName(curSongName)}</span>
      </div>
      <div>
        {curIndex + 1}/{playlist.length} Songs
      </div>
    </div>
  );
}
