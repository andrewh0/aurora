// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_DELAY = 'UPDATE_DELAY';

const defaultDelay = new Tone.FeedbackDelay().set('wet', 0);

const delayInitialState = {
  toneRef: defaultDelay,
  ...defaultDelay.get()
};

const updateDelay = createToneUpdater(['delay', 'toneRef'], UPDATE_DELAY);

function delay(
  delayState: Object = delayInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_DELAY:
      return moduleUpdateReducer(delayState, action);
    default:
      return delayState;
  }
}

export {delay, updateDelay};
