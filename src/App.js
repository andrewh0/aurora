// @flow

import React, {Component} from 'react';
import Piano from './Piano';
import StartAudioContextButton from './StartAudioContextButton';
import SynthRouter from './SynthRouter';
import SynthControl from './SynthControl';

class App extends Component {
  render() {
    return (
      <div>
        <StartAudioContextButton />
        <SynthRouter>
          <Piano octaves={6} />
          <SynthControl />
        </SynthRouter>
      </div>
    );
  }
}

export default App;
