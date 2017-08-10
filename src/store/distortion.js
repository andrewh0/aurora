// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_DISTORTION = 'UPDATE_DISTORTION';

const defaultDistortion = new Tone.Distortion().set('wet', 0);

const distortionInitialState = {
  toneRef: defaultDistortion,
  ...defaultDistortion.get()
};

const updateDistortion = createToneUpdater(
  ['distortion', 'toneRef'],
  UPDATE_DISTORTION
);

function distortion(
  distortionState: Object = distortionInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_DISTORTION:
      return moduleUpdateReducer(distortionState, action);
    default:
      return distortionState;
  }
}

export {distortion, updateDistortion};
