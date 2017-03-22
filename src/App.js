import React, {Component} from 'react';
import PianoContainer from './PianoContainer';
import StartAudioContextButton from './StartAudioContextButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PianoContainer octaves={4} />
        <StartAudioContextButton />
      </div>
    );
  }
}

export default App;
