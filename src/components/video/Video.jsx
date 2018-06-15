import React, { Component } from 'react';
import './Video.css';
import VideoControls from '../video-controls/VideoControls.jsx'

class Video extends Component {
  constructor(props) {
    super(props);
    this.videoContainer = React.createRef();
    this.video = React.createRef();

    this.state = {
      isPlaying: false,
      playingProgress: 0,
      isMuted: false,
      duration: 0,
      currentTime : 0,
      isEnded: false
    }
  }

  togglePlay = () => {
    const isPlaying = !this.video.current.paused;

    if (isPlaying) {
      this.video.current.pause();
    } else {
      this.video.current.play();
    }

    this.setState({
      isPlaying: !isPlaying,
      isEnded: false
    });
  }

  setProgress = () => {
    const video = this.video.current;
    const progress = Math.floor(video.currentTime / video.duration * 100);
    this.setState({
      playingProgress: progress,
      currentTime: video.currentTime
    })
  }

  handleProgressClick = (progressBarElement, mouseX) => {
    const video = this.video.current;
    const videoContainer = this.videoContainer.current;

    const relativeX = mouseX - progressBarElement.offsetLeft - videoContainer.offsetLeft;
    const progress = Math.floor(relativeX / progressBarElement.offsetWidth * 100);

    video.currentTime = progress / 100 * video.duration;

    this.setState({
      playingProgress: progress,
      isEnded: false
    });
  };

  toggleMute = () => {
    const isMuted = this.video.current.muted;

    this.video.current.muted = !isMuted;
    this.setState({
      isMuted: !isMuted
    })
  };

  onLoadedMetadata = () => {
    this.setState({
      duration: this.video.current.duration
    })
  }

  onEnded = () => {
    this.setState({
      isEnded: true,
      isPlaying: false
    })
  }

  render() {
    const { playingProgress, isMuted, duration, currentTime, isEnded, isPlaying } = this.state;

    return (
      <div className="Video" ref={ this.videoContainer }>
        <video
          src="https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4"
          ref={this.video}
          onTimeUpdate={this.setProgress }
          onLoadedMetadata={ this.onLoadedMetadata }
          onEnded={ this.onEnded }
        />
        <VideoControls
          isPlaying={ isPlaying }
          togglePlay={ this.togglePlay }
          playingProgress={ playingProgress }
          handleProgressClick={ this.handleProgressClick }
          isMuted={ isMuted }
          toggleMute={ this.toggleMute }
          videoDuration={ duration }
          videoCurrentTime={ currentTime }
          isEnded={ isEnded }
        />
      </div>
    );
  }
}

export default Video;