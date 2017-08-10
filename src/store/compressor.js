// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_COMPRESSOR = 'UPDATE_COMPRESSOR';

const defaultEqualizer = new Tone.Compressor();

const compressorInitialState = {
  toneRef: defaultEqualizer,
  ...defaultEqualizer.get()
};

const updateCompressor = createToneUpdater(
  ['compressor', 'toneRef'],
  UPDATE_COMPRESSOR
);

function compressor(
  compressorState: Object = compressorInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_COMPRESSOR:
      return moduleUpdateReducer(compressorState, action);
    default:
      return compressorState;
  }
}

export {compressor, updateCompressor};
