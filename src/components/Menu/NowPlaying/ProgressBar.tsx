import React from 'react';
import '../../../styles/components/NowPlaying/ProgressBar.css'; 

interface ProgressBarProps {
  currentTime: number;
  duration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration }) => {
  const progress = (currentTime / duration) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;