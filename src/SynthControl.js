// @flow

import React from 'react';
import styled from 'styled-components';
import {PIANO_KEY_HEIGHT} from './util/styleConstants';
import Source from './modules/Source';
import Filter from './modules/Filter';
import Volume from './modules/Volume';
import Analyzer from './modules/effects/Analyzer';
import Effects from './modules/effects/Effects';

const StyledSynthControl = styled.div`
  padding: 16px;
  margin-bottom: ${PIANO_KEY_HEIGHT};
`;

const SynthControl = () => (
  <StyledSynthControl>
    <Source />
    <Filter />
    <Effects />
    <Volume />
    <Analyzer />
  </StyledSynthControl>
);

export default SynthControl;
