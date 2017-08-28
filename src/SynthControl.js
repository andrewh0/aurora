// @flow

import React from 'react';
import Source from './modules/Source';
import Filter from './modules/Filter';
import Distortion from './modules/effects/Distortion';
import Phaser from './modules/effects/Phaser';
import Chorus from './modules/effects/Chorus';
import Equalizer from './modules/effects/Equalizer';
import Reverb from './modules/effects/Reverb';
import Delay from './modules/effects/Delay';
import Compressor from './modules/effects/Compressor';
import Volume from './modules/Volume';
import Analyzer from './modules/effects/Analyzer';

const SynthControl = () =>
  <div>
    <Source />
    <Filter />
    <Distortion />
    <Phaser />
    <Chorus />
    <Equalizer />
    <Reverb />
    <Delay />
    <Compressor />
    <Volume />
    <Analyzer />
  </div>;

export default SynthControl;
