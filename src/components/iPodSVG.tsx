import React from 'react';
import './iPodSVG.css';
//import IPodSVG from '../assets/MiniPod.svg?react';

import IPod from './IPod.jsx';

type iPodSVGProps = {
  onPlayPause: (event) => void;
};

const IPodSVGComponent: React.FC<iPodSVGProps> = ({ onPlayPause }) => {
  return (
    <div className="ipod-svg-container">
      <IPod className="ipod-svg"/>
    </div>
  );
};

export default IPodSVGComponent;
