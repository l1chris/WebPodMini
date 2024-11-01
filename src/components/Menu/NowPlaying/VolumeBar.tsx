import React, {useEffect, useState} from 'react';
import '../../../styles/components/NowPlaying/VolumeBar.css'

type VolumeBarProps = {
  volume: number;
};

const VolumeBar: React.FC<VolumeBarProps> = ({ volume }) => {
  const [currentVolume, setCurrentVolume] = useState(volume);

  useEffect(() => {
    setCurrentVolume(volume);
  }, [volume]);

  return (
    <div className="volume-bar">
    <div className="volume-fill" style={{ width: `${currentVolume * 100}%` }}></div>
  </div>
  );
};

export default VolumeBar;