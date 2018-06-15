import React from 'react';
import './VideoControls.css';
import FontAwesome from 'react-fontawesome';

const VideoControls = ({
  isPlaying,
  togglePlay,
  playingProgress,
  handleProgressClick,
  isMuted,
  toggleMute,
  videoDuration,
  videoCurrentTime,
  isEnded
}) => {
  let progressBarElement = React.createRef();

  return (
    <div className="Video-controls">
      <FontAwesome
        className="Video-play"
        name={ isEnded ? 'undo' : isPlaying ? 'pause' : 'play' }
        onClick={ togglePlay }
      />
      <progress
        className="Video-progress"
        value={ playingProgress }
        max="100"
        onClick={ (e) => handleProgressClick(progressBarElement.current, e.clientX) }
        ref={ progressBarElement }
      />
      <div className="Video-time">
        <span>{ formatTime(videoCurrentTime) }</span>
        <span>&nbsp;/&nbsp;</span>
        <span>{ formatTime(videoDuration) }</span>
      </div>
      <FontAwesome
        className="Video-mute"
        name={ isMuted ? 'volume-up' : 'volume-off' }
        onClick={ toggleMute }
      />
    </div>
  )
};

function formatTime(totalSeconds) {
  const hours   = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  seconds = Math.floor(seconds);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${ formattedHours }:${ formattedMinutes }:${ formattedSeconds }`;
}

export default VideoControls;
