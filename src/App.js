import React, {Component} from 'react';
import PianoContainer from './PianoContainer';
import StartAudioContextButton from './StartAudioContextButton';
import SynthProvider from './SynthProvider';
import SynthControl from './SynthControl';

class App extends Component {
  render() {
    return (
      <div>
        <StartAudioContextButton />
        <SynthProvider>
          <PianoContainer octaves={6} />
          <SynthControl />
        </SynthProvider>
      </div>
    );
  }
}

export default App;
