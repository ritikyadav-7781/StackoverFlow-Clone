import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import sample from "../../assets/sample.mp4";
import "./CustomVideoPlayer.css";

//useRef:
const CustomVideoPlayer = ({ slideIn, handleSlideIn }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressIndicatorRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPauseButton, setShowPauseButton] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("loadedmetadata", () => {
      // Video duration is available once metadata is loaded
      setDuration(Math.floor(video.duration));
    });

    video.addEventListener("timeupdate", () => {
      // Update current time as video plays
      setCurrentTime(Math.floor(video.currentTime));
    });
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.clientWidth;
      const indicatorPosition =
        (video.currentTime / duration) * progressBarWidth;
      progressIndicatorRef.current.style.left = `${indicatorPosition}px`;
    }
  });

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPauseButton(true);

      // Hide the pause button after 2 seconds
      setTimeout(() => {
        setShowPauseButton(false);
      }, 2000);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPauseButton(false);
    }
  };
  const handleDoubleClick = (event) => {
    // Check if the double-click occurred on the left half of the video
    const videoRect = videoRef.current.getBoundingClientRect();
    const clickX = event.clientX - videoRect.left;
    if (clickX < videoRect.width / 2) {
      // Skip backward 10 seconds
      videoRef.current.currentTime -= 10;
    } else {
      // Skip forward 10 seconds (right side)
      videoRef.current.currentTime += 10;
    }
  };
  const handleScreenClick = () => {
    // Toggle play/pause when anywhere on the screen is clicked
    togglePlay();
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const calculateProgressBarWidth = () => {
    if (duration > 0) {
      return (currentTime / duration) * 100 + "%";
    }
    return "0%";
  };
  const handleProgressBarClick = (e) => {
    // Calculate the clicked time based on the click position
    const clickedX =
      e.clientX - progressBarRef.current.getBoundingClientRect().left;
    const progressBarWidth = progressBarRef.current.clientWidth;
    const seekTime = (clickedX / progressBarWidth) * duration;

    // Set the video's current time to the seek time
    videoRef.current.currentTime = seekTime;
  };

  const toggleFullScreen = () => {
    const videoElement = videoRef.current;

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2 video-placement">
        <div className="video-player">
          <video
            className="Video"
            ref={videoRef}
            src={sample}
            onClick={handleScreenClick}
            onDoubleClick={handleDoubleClick}
          />
          {showPauseButton && (
            <button className="play-pause" onClick={togglePlay}>
              {isPlaying ? "❚❚" : "►"}
            </button>
          )}

          <div
            className="progress-bar-container"
            ref={progressBarRef}
            onClick={handleProgressBarClick}
          >
            <div
              className="progress-bar"
              style={{ width: calculateProgressBarWidth() }}
            >
              <div className="progress-indicator" ref={progressIndicatorRef} />
            </div>
          </div>
          <div className="duration">
            {isPlaying ? (
              <button onClick={togglePlay}>
                <FontAwesomeIcon icon={faPause} />
              </button>
            ) : (
              <button onClick={togglePlay}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            )}
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <button className="fullScreenButton" onClick={toggleFullScreen}>
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
