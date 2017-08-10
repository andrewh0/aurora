// @flow

import {combineReducers} from 'redux';
import {oscillator} from './oscillator';
import {filter} from './filter';
import {distortion} from './distortion';
import {phaser} from './phaser';
import {chorus} from './chorus';
import {equalizer} from './equalizer';

const rootReducer = combineReducers({
  oscillator,
  filter,
  distortion,
  phaser,
  chorus,
  equalizer
});

export default rootReducer;
