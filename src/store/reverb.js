// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_REVERB = 'UPDATE_REVERB';

const defaultReverb = new Tone.Freeverb().set('wet', 0);

const reverbInitialState = {
  toneRef: defaultReverb,
  ...defaultReverb.get()
};

const updateReverb = createToneUpdater(['reverb', 'toneRef'], UPDATE_REVERB);

function reverb(
  reverbState: Object = reverbInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_REVERB:
      return moduleUpdateReducer(reverbState, action);
    default:
      return reverbState;
  }
}

export {reverb, updateReverb};
