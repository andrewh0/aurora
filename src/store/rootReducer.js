import {combineReducers} from 'redux';
import {oscillator} from './oscillator';
import {filter} from './filter';

const rootReducer = combineReducers({
  oscillator,
  filter
});

export default rootReducer;
