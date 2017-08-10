// @flow

import {combineReducers} from 'redux';
import {oscillator} from './oscillator';
import {filter} from './filter';
import {distortion} from './distortion';
import {phaser} from './phaser';

const rootReducer = combineReducers({
  oscillator,
  filter,
  distortion,
  phaser
});

export default rootReducer;
