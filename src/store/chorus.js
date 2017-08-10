// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_CHORUS = 'UPDATE_CHORUS';

const defaultChorus = new Tone.Chorus().set('wet', 0);

const chorusInitialState = {
  toneRef: defaultChorus,
  ...defaultChorus.get()
};

const updateChorus = createToneUpdater(['chorus', 'toneRef'], UPDATE_CHORUS);

function chorus(
  chorusState: Object = chorusInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_CHORUS:
      return moduleUpdateReducer(chorusState, action);
    default:
      return chorusState;
  }
}

export {chorus, updateChorus};
