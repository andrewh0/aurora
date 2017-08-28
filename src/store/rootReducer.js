// @flow

import {combineReducers} from 'redux';
import {source} from './source';
import {filter} from './filter';
import {distortion} from './distortion';
import {phaser} from './phaser';
import {chorus} from './chorus';
import {equalizer} from './equalizer';
import {reverb} from './reverb';
import {delay} from './delay';
import {compressor} from './compressor';
import {analyzer} from './analyzer';
import {panVol} from './panVol';
import {meter} from './meter';

const rootReducer = combineReducers({
  source,
  filter,
  distortion,
  phaser,
  chorus,
  equalizer,
  reverb,
  delay,
  compressor,
  analyzer,
  panVol,
  meter
});

export default rootReducer;
