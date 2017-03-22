import React, {Component} from 'react';
import PianoContainer from './PianoContainer';
import StartAudioContextButton from './StartAudioContextButton';

class App extends Component {
  render() {
    return (
      <div>
        <StartAudioContextButton />
        <PianoContainer octaves={6} />
      </div>
    );
  }
}

export default App;
