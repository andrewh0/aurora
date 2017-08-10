// @flow

import React, {Component} from 'react';
import Oscillator from './modules/Oscillator';
import Filter from './modules/Filter';
import Distortion from './modules/effects/Distortion';
import Phaser from './modules/effects/Phaser';
import Chorus from './modules/effects/Chorus';

class SynthControl extends Component {
  render() {
    return (
      <div>
        <Oscillator />
        <Filter />
        <Distortion />
        <Phaser />
        <Chorus />
      </div>
    );
  }
}

export default SynthControl;
