// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_PAN_VOL = 'UPDATE_PAN_VOL';

const defaultPanVol = new Tone.PanVol().set('pan', 0);

const panVolInitialState = {
  toneRef: defaultPanVol,
  ...defaultPanVol.get()
};

const updatePanVol = createToneUpdater(['panVol', 'toneRef'], UPDATE_PAN_VOL);

function panVol(
  panVolState: Object = panVolInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_PAN_VOL:
      return moduleUpdateReducer(panVolState, action);
    default:
      return panVolState;
  }
}

export {panVol, updatePanVol};
