// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';
import TripleSynth from '../TripleSynth';

import type {StandardAction} from './util';

const UPDATE_OSC = 'UPDATE_OSC';

const OSC_DEFAULTS = {
  voices: 8
};

const defaultPolySynth = new Tone.PolySynth(OSC_DEFAULTS.voices, TripleSynth);

const oscillatorInitialState = {
  toneRef: defaultPolySynth,
  ...defaultPolySynth.get([
    'oscillator0',
    'oscillator1',
    'oscillator2',
    'detune0',
    'detune1',
    'detune2',
    'pan0',
    'pan1',
    'pan2',
    'frequency',
    'filterEnv',
    'amplitudeEnv'
  ]),
  ...defaultPolySynth.get('portamento'),
  ...defaultPolySynth.get('volume')
};

const updateSource = createToneUpdater(['source', 'toneRef'], UPDATE_OSC);

function source(
  oscillatorState: Object = oscillatorInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_OSC:
      return moduleUpdateReducer(oscillatorState, action);
    default:
      return oscillatorState;
  }
}

export {source, updateSource};
