import IPodSVGComponent from './components/iPodSVG';
import './App.css'


const App: React.FC = () => {
  
  const handlePlayPause = (event) => {
    console.log(event);
    console.log('Clicked on:', event.target.id);
    console.log('Play/Pause clicked');
  };

  return (
    <div className="app-container">
      <IPodSVGComponent
        onPlayPause={handlePlayPause}
      />
    </div>
  );
};

export default App
