// @flow

import {combineReducers} from 'redux';
import {oscillator} from './oscillator';
import {filter} from './filter';
import {distortion} from './distortion';

const rootReducer = combineReducers({
  oscillator,
  filter,
  distortion
});

export default rootReducer;
