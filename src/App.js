import React, {Component} from 'react';
import PianoContainer from './PianoContainer';
import StartAudioContextButton from './StartAudioContextButton';
import SynthProvider from './SynthProvider';
import DropDown from './DropDown';

class App extends Component {
  render() {
    return (
      <div>
        <StartAudioContextButton />
        <SynthProvider>
          <PianoContainer octaves={6} />
          <DropDown
            name="waveforms"
            defaultValue="sawtooth"
            values={[
              {value: 'sawtooth', label: 'Sawtooth'},
              {value: 'sine', label: 'Sine'},
              {value: 'square', label: 'Square'},
              {value: 'triangle', label: 'Triangle'}
            ]}
          />
        </SynthProvider>
      </div>
    );
  }
}

export default App;
