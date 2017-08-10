// @flow

import {combineReducers} from 'redux';
import {oscillator} from './oscillator';
import {filter} from './filter';
import {distortion} from './distortion';
import {phaser} from './phaser';
import {chorus} from './chorus';
import {equalizer} from './equalizer';
import {reverb} from './reverb';

const rootReducer = combineReducers({
  oscillator,
  filter,
  distortion,
  phaser,
  chorus,
  equalizer,
  reverb
});

export default rootReducer;
