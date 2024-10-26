import React from 'react';
import './IPod.css';

import IPodSVG from './IPodSVG.jsx';

const IPod: React.FC = () => {

  const handlePlayPause = (event) => {
    console.log(event);
    console.log('Play/Pause clicked');
  };

  return (
    <div className="ipod-svg-container">
      <IPodSVG className="ipod-svg" onChildClick={handlePlayPause}/>
    </div>
  );
};

export default IPod;
