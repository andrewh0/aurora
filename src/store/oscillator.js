import {assocIn} from 'icepick';
import Tone from 'tone';
import {toStringPath} from '../util/path';

const UPDATE_OSC = 'UPDATE_OSC';

const OSC_DEFAULTS = {
  voices: 16,
  opts: {
    oscillator: {
      type: 'fatsawtooth'
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 1,
      release: 0.2
    }
  }
};

const defaultPolySynth = new Tone.PolySynth(
  OSC_DEFAULTS.voices,
  Tone.Synth,
  OSC_DEFAULTS.opts
);

const oscillatorInitialState = {
  toneRef: defaultPolySynth,
  ...defaultPolySynth.get('volume'),
  ...defaultPolySynth.get('portamento'),
  ...defaultPolySynth.get([
    'oscillator.type',
    'oscillator.spread',
    'oscillator.count'
  ]),
  ...defaultPolySynth.get('envelope')
};

function updateOscillatorState(path, value) {
  return {
    type: UPDATE_OSC,
    payload: {
      path,
      value
    }
  };
}

function updateOscillator(path, value) {
  return (dispatch, getState) => {
    getState().oscillator.toneRef.set(toStringPath(path), value);
    dispatch(updateOscillatorState(path, value));
  };
}

function oscillator(oscillatorState = oscillatorInitialState, action) {
  switch (action.type) {
    case UPDATE_OSC:
      return assocIn(
        oscillatorState,
        action.payload.path,
        action.payload.value
      );
    default:
      return oscillatorState;
  }
}

export {oscillator, updateOscillator};
