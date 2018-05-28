import Tone from 'tone';

export default class TripleSynth extends Tone.Monophonic {
  constructor(options) {
    super(options);
    this.oscillator0 = new Tone.OmniOscillator(440, 'fatsawtooth');
    this.oscillator1 = new Tone.OmniOscillator(440, 'fatsquare');
    this.oscillator2 = new Tone.OmniOscillator(440, 'fatsine');
    this.frequency = new Tone.Signal(440, Tone.Type.Frequency);
    this.pan0 = new Tone.Panner().set('pan', 0);
    this.pan1 = new Tone.Panner().set('pan', 0);
    this.pan2 = new Tone.Panner().set('pan', 0);
    this.amplitudeEnv = new Tone.AmplitudeEnvelope();

    // TODO: Add frequencyEnv
    // this.frequencyEnv = new Tone.FrequencyEnvelope(
    //   {
    //     attack: 0.06,
    //     decay: 0.2,
    //     sustain: 0.5,
    //     release: 3,
    //     baseFrequency: this.frequency.value,
    //     octaves: 0,
    //     exponent: 1
    //   }
    // );

    this.detune0 = this.oscillator0.detune;
    this.detune1 = this.oscillator1.detune;
    this.detune2 = this.oscillator2.detune;

    this.frequency.connect(this.oscillator0.frequency);
    this.frequency.connect(this.oscillator1.frequency);
    this.frequency.connect(this.oscillator2.frequency);

    // TODO: Add frequencyEnv
    // this.frequencyEnv.connect(this.frequency);

    this.oscillator0.chain(this.pan0, this.amplitudeEnv);
    this.oscillator1.chain(this.pan1, this.amplitudeEnv);
    this.oscillator2.chain(this.pan2, this.amplitudeEnv);
    this.amplitudeEnv.connect(this.output);

    this.oscillator0.start();
    this.oscillator1.start();
    this.oscillator2.start();
  }
  _triggerEnvelopeAttack(time, velocity) {
    this.amplitudeEnv.triggerAttack(time, velocity);
    // TODO: Add frequencyEnv
    // this.frequencyEnv.triggerAttack(time);
    return this;
  }
  _triggerEnvelopeRelease(time) {
    this.amplitudeEnv.triggerRelease(time);
    // TODO: Add frequencyEnv
    // this.frequencyEnv.triggerRelease(time);
    return this;
  }
}
