import Tone from 'tone';

const synth = new Tone.PolySynth(10, Tone.Synth, {
  oscillator: {
    type: 'sawtooth'
  },
  envelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 1,
    release: 0.2
  }
}).toMaster();

export default synth;
