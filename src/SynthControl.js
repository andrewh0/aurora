// @flow

import React, {Component} from 'react';
import Oscillator from './modules/Oscillator';
import Filter from './modules/Filter';

class SynthControl extends Component {
  render() {
    return (
      <div>
        <Oscillator />
        <Filter />
      </div>
    );
  }
}

export default SynthControl;
