// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_PHASER = 'UPDATE_PHASER';

const defaultPhaser = new Tone.Phaser().set('wet', 0);

const phaserInitialState = {
  toneRef: defaultPhaser,
  ...defaultPhaser.get()
};

const updatePhaser = createToneUpdater(['phaser', 'toneRef'], UPDATE_PHASER);

function phaser(
  phaserState: Object = phaserInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_PHASER:
      return moduleUpdateReducer(phaserState, action);
    default:
      return phaserState;
  }
}

export {phaser, updatePhaser};
