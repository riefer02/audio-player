import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

export default function AudioPlayer() {
  const playlist = useSelector((state) => state.audio.audioPlayList)
  const [isPlaying, setPlayState] = useState(0);
  const [curIndex, setCurIndex] = useState(0);
  const [player, setPlayer] = useState(new Audio())
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);

  const handleAudioSrc = (list, curIndex) => {
    setPlayer(list[curIndex]);
  }

  const changeAudioSrc = (curIndex, isForward) => {
    const newIndex = isForward ? curIndex + 1 : curIndex - 1;
    setCurIndex(newIndex);
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
      setPlayState(0);
    })
  }, [player])

  return (
    <div>
      <h1>Plaebak</h1>
      <h3>AudioPlayer</h3>
      <button onClick={() => { changeAudioSrc(curIndex, 0) }}>Prev Song</button ><button onClick={() => { changeAudioSrc(curIndex, 1) }}>Next Song</button>
      <h4>Currently Playing: { }</h4>
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
          onClick={() => { isPlaying ? setPlayState(false) : setPlayState(true) }}>
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
