import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setPlayState, setCurIndex } from '../features/audioSlice';

export default function AudioPlayer() {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.audio.audioPlayList)
  const isPlaying = useSelector((state) => state.audio.isPlaying)
  const curIndex = useSelector((state) => state.audio.curAudioIndex)
  const [player, setPlayer] = useState(new Audio())
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);

  useEffect(() => {
    handleAudioSrc(playlist, curIndex);
  }, [])

  const handleAudioSrc = (list, curIndex) => {
    setPlayer(new Audio(list[curIndex]));
  }

  const changeAudioSrc = (curIndex, isForward) => {
    let newIndex = isForward ? curIndex + 1 : curIndex - 1;
    if (playlist.length === 1 || playlist.length === 0) {
      return
    } else if (playlist[newIndex] === undefined) {
      isForward ? newIndex = 0 : newIndex = playlist.length - 1;
      dispatch(setCurIndex(newIndex));
      return;
    } else {
      dispatch(setCurIndex(newIndex));
    }
  }

  const advanceTime = () => {
    setRightClick(true);
    player.currentTime = player.currentTime + 0.5;
  }

  const retreatTime = () => {
    setLeftClick(true);
    player.currentTime = player.currentTime - 0.5;

  }

  useEffect(() => {
    handleAudioSrc(playlist, curIndex);
  }, [curIndex, playlist])

  useEffect(() => {
    !isPlaying ? player.pause() : player.play();
  }, [isPlaying])

  useEffect(() => {
    player.addEventListener('ended', () => {
      console.log('ended');
    })
  }, [player])

  return (
    <div>
      <h1>Plaebak</h1>
      <h3>AudioPlayer</h3>
      <button onClick={() => { changeAudioSrc(curIndex, 0) }}>Prev Song</button>
      <button onClick={() => { changeAudioSrc(curIndex, 1) }}>Next Song</button>
      <h4>Current Song:</h4>
      <div className="light__wrapper">
        <div className={`light ${isPlaying ? 'light--on' : ''}`}>
        </div>
      </div>
      <div className="row">
        {/* Rewind Button */}
        <div onClick={() => { retreatTime() }}
          className={`button  ${leftClick ? 'clicked' : ''}`}
          onAnimationEnd={() => setRightClick(false)}>&larr;</div>
        {/* Play/Stop Button */}
        <div
          className="button"
          onClick={() => { isPlaying ? dispatch(setPlayState(false)) : dispatch(setPlayState(true)) }}>
          {isPlaying ? <div>&mdash;</div> : <div>&gt;</div>}
        </div>
        {/* Advance Button */}
        <div
          onClick={() => { advanceTime() }}
          className={`button  ${rightClick ? 'clicked' : ''}`}
          onAnimationEnd={() => setRightClick(false)}>
          &rarr;
        </div>
      </div>
    </div>
  );
}
