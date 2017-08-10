import React, {Component} from 'react';
import PianoContainer from './PianoContainer';
import StartAudioContextButton from './StartAudioContextButton';
import SynthRouter from './SynthRouter';
import SynthControl from './SynthControl';

class App extends Component {
  render() {
    return (
      <div>
        <StartAudioContextButton />
        <SynthRouter>
          <PianoContainer octaves={6} />
          <SynthControl />
        </SynthRouter>
      </div>
    );
  }
}

export default App;
