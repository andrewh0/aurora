// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_EQUALIZER = 'UPDATE_EQUALIZER';

const defaultEqualizer = new Tone.EQ3();

const equalizerInitialState = {
  toneRef: defaultEqualizer,
  ...defaultEqualizer.get()
};

const updateEqualizer = createToneUpdater(
  ['equalizer', 'toneRef'],
  UPDATE_EQUALIZER
);

function equalizer(
  equalizerState: Object = equalizerInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_EQUALIZER:
      return moduleUpdateReducer(equalizerState, action);
    default:
      return equalizerState;
  }
}

export {equalizer, updateEqualizer};
