import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayState, setCurIndex } from '../features/playlistSlice';
import InfoDisplay from './InfoDisplay';

export default function AudioPlayer() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.audioPlayList);
  const isPlaying: boolean = useSelector((state) => state.playlist.isPlaying);
  const curIndex: number = useSelector((state) => state.playlist.curAudioIndex);
  const [player, setPlayer] = useState(new Audio());
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);

  const handleAudioSrc = (list, curIndex: number) =>
    setPlayer(new Audio(list[curIndex]));

  const changeAudioSrc = (curIndex: number, isForward: boolean) => {
    let newIndex = isForward ? curIndex + 1 : curIndex - 1;

    if (playlist.length === 1 || playlist.length === 0) {
      return;
    } else if (playlist[newIndex] === undefined) {
      newIndex = isForward ? 0 : playlist.length - 1;

      dispatch(setCurIndex(newIndex));
      return;
    } else {
      dispatch(setCurIndex(newIndex));
    }
  };

  const advanceTime = () => {
    setRightClick(true);
    player.currentTime = player.currentTime + 0.5;
  };

  const retreatTime = () => {
    setLeftClick(true);
    player.currentTime = player.currentTime - 0.5;
  };

  useEffect(() => handleAudioSrc(playlist, curIndex), [curIndex, playlist]);

  useEffect(() => (!isPlaying ? player.pause() : player.play()), [isPlaying]);

  useEffect(() => {
    player.addEventListener('ended', () => {
      console.log('ended');
    });
  }, [player]);

  return (
    <div className="audio-player">
      <button className="btn" onClick={() => changeAudioSrc(curIndex, false)}>
        Prev Song
      </button>
      <button className="btn" onClick={() => changeAudioSrc(curIndex, true)}>
        Next Song
      </button>
      <button
        onClick={() => retreatTime()}
        className={`btn  ${leftClick ? 'clicked' : ''}`}
        onAnimationEnd={() => setLeftClick(false)}
      >
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
        {isPlaying ? <div>&mdash;</div> : <div>Play</div>}
      </button>
      <button
        onClick={() => advanceTime()}
        className={`btn ${rightClick ? 'clicked' : ''}`}
        onAnimationEnd={() => setRightClick(false)}
      >
        Scrub Forward
      </button>
    </div>
  );
}
