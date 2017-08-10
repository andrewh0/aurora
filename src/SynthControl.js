// @flow

import React, {Component} from 'react';
import Oscillator from './modules/Oscillator';
import Filter from './modules/Filter';
import Distortion from './modules/effects/Distortion';
import Phaser from './modules/effects/Phaser';

class SynthControl extends Component {
  render() {
    return (
      <div>
        <Oscillator />
        <Filter />
        <Distortion />
        <Phaser />
      </div>
    );
  }
}

export default SynthControl;
