import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayState, setCurIndex } from '../features/playlistSlice';

export default function AudioPlayer() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.audioPlayList);
  const isPlaying: boolean = useSelector((state) => state.playlist.isPlaying);
  const curIndex: number = useSelector((state) => state.playlist.curAudioIndex);
  const [player, setPlayer] = useState(new Audio());

  const handleAudioSrc = (list, curIndex: number) =>
    setPlayer(new Audio(list[curIndex]));

  const changeAudioSrc = (curIndex: number, isForward: boolean) => {
    let newIndex = isForward ? curIndex + 1 : curIndex - 1;

    if (playlist.length === 1 || playlist.length === 0) {
      return;
    } else if (playlist[newIndex] === undefined) {
      newIndex = isForward ? 0 : playlist.length - 1;
      dispatch(setCurIndex(newIndex));
    } else {
      dispatch(setCurIndex(newIndex));
    }
  };

  const advanceTime = () => (player.currentTime = player.currentTime + 0.5);
  const retreatTime = () => (player.currentTime = player.currentTime - 0.5);

  useEffect(() => handleAudioSrc(playlist, curIndex), [curIndex, playlist]);

  useEffect(() => (!isPlaying ? player.pause() : player.play()), [isPlaying]);

  return (
    <div className="audio-player">
      <button className="btn" onClick={() => changeAudioSrc(curIndex, false)}>
        Prev Song
      </button>
      <button className="btn" onClick={() => changeAudioSrc(curIndex, true)}>
        Next Song
      </button>
      <button onClick={() => retreatTime()} className={`btn`}>
        Scrub Backwards
      </button>
      <button
        className="btn"
        onClick={() =>
          isPlaying
            ? dispatch(setPlayState(false))
            : dispatch(setPlayState(true))
        }
      >
        {isPlaying ? <div>Stop</div> : <div>Play</div>}
      </button>
      <button onClick={() => advanceTime()} className={`btn`}>
        Scrub Forward
      </button>
    </div>
  );
}
