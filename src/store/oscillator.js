import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

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

const updateOscillator = createToneUpdater(
  ['oscillator', 'toneRef'],
  UPDATE_OSC
);

function oscillator(oscillatorState = oscillatorInitialState, action) {
  switch (action.type) {
    case UPDATE_OSC:
      return moduleUpdateReducer(oscillatorState, action);
    default:
      return oscillatorState;
  }
}

export {oscillator, updateOscillator};
