import React, { useEffect, useState } from 'react';
import '../assets/styles/audioplayer.css';

const getKeys = function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}

export default function AudioPlayer() {
  const [play, playState] = useState(0);
  const [player, setPlayer] = useState(new Audio('src/audio/guitar-sample-1.wav'))
  const [rightClick, setRightClick] = useState(false);

  // console.log('audioObj', player)
  // console.log(getKeys(player));
  // console.log('readyState', player.readyState);
  // console.log('dataStreamStrength', player.HAVE_ENOUGH_DATA);
  // console.log('autoplay', player.autoplay);
  // console.log('playbackRate', player.playbackRate);


  player.addEventListener('canplaythrough', (event) => {
    // console.log('`canplaythrough` event triggered');
    // console.log('Audio Duration', player.duration);
  })

  const advanceTime = () => {
    setRightClick(true);
    console.log('advancing time');
    player.currentTime = player.currentTime + 0.5;
    console.log(player.currentTime);
    return
  }

  useEffect(() => {
    if (!play) player.pause();
    if (play) player.play();
  }, [play])

  useEffect(() => {
    player.addEventListener('ended', () => {
      console.log('ended');
      playState(0);
    })
  }, [player])

  return (
    <div>
      <h1>AudioPlayer</h1>
      <div className="light__wrapper">
        <div className={`light ${play ? 'light--on' : ''}`}>
        </div>
      </div>
      <div className="row">
        <div className="button">&larr;</div>
        <div className="button" onClick={() => { play ? playState(false) : playState(true) }}>
          {
            play ? <div>&mdash;</div> : <div>&gt;</div>
          }
        </div>
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