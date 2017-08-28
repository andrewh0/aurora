// @flow

import React from 'react';
import styled from 'styled-components';
import {PIANO_KEY_HEIGHT} from './util/styleConstants';
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

const StyledSynthControl = styled.div`margin-bottom: ${PIANO_KEY_HEIGHT};`;

const SynthControl = () =>
  <StyledSynthControl>
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
  </StyledSynthControl>;

export default SynthControl;
