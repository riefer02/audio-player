import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayState, setCurIndex } from '../features/playlistSlice';
import InfoDisplay from './InfoDisplay';

export default function AudioPlayer() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.audioPlayList);
  const isPlaying = useSelector((state) => state.playlist.isPlaying);
  const curIndex = useSelector((state) => state.playlist.curAudioIndex);
  const [player, setPlayer] = useState(new Audio());
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);

  const handleAudioSrc = (list, curIndex) => {
    setPlayer(new Audio(list[curIndex]));
  };

  const changeAudioSrc = (curIndex, isForward) => {
    let newIndex = isForward ? curIndex + 1 : curIndex - 1;
    if (playlist.length === 1 || playlist.length === 0) {
      return;
    } else if (playlist[newIndex] === undefined) {
      isForward ? (newIndex = 0) : (newIndex = playlist.length - 1);
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

  useEffect(() => {
    handleAudioSrc(playlist, curIndex);
  }, [curIndex, playlist]);

  useEffect(() => {
    !isPlaying ? player.pause() : player.play();
  }, [isPlaying]);

  useEffect(() => {
    player.addEventListener('ended', () => {
      console.log('ended');
    });
  }, [player]);

  return (
    <div className="audio-player">
      <div className="playlight__wrapper">
        <div
          className={`playlight ${isPlaying ? 'playlight--on' : ''} mr-auto`}
        ></div>
        <InfoDisplay />
      </div>
      <div className="flex w-full align-center justify-center">
        <button
          onClick={() => {
            changeAudioSrc(curIndex, 0);
          }}
        >
          Prev Song
        </button>
        <button
          onClick={() => {
            changeAudioSrc(curIndex, 1);
          }}
        >
          Next Song
        </button>
      </div>
      <div className="row">
        {/* Rewind Button */}
        <div
          onClick={() => {
            retreatTime();
          }}
          className={`playlist__control  ${leftClick ? 'clicked' : ''}`}
          onAnimationEnd={() => setLeftClick(false)}
        >
          &larr;
        </div>
        {/* Play/Stop Button */}
        <div
          className="playlist__control"
          onClick={() => {
            isPlaying
              ? dispatch(setPlayState(false))
              : dispatch(setPlayState(true));
          }}
        >
          {isPlaying ? <div>&mdash;</div> : <div>&gt;</div>}
        </div>
        {/* Advance Button */}
        <div
          onClick={() => {
            advanceTime();
          }}
          className={`playlist__control  ${rightClick ? 'clicked' : ''}`}
          onAnimationEnd={() => setRightClick(false)}
        >
          &rarr;
        </div>
      </div>
    </div>
  );
}
