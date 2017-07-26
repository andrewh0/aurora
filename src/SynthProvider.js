import React, {Component, PropTypes} from 'react';
import Tone from 'tone';

class SynthProvider extends Component {
  static childContextTypes = {
    synth: PropTypes.object,
    filter: PropTypes.object
  };
  static defaultProps = {
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

  filter = new Tone.Filter(1000, 'lowpass', -12);
  distortion = new Tone.Distortion().set('wet', 0);
  phaser = new Tone.Phaser().set('wet', 0);
  chorus = new Tone.Chorus().set('wet', 0);
  equalizer = new Tone.EQ3();
  reverb = new Tone.Freeverb().set('wet', 0);
  delay = new Tone.FeedbackDelay().set('wet', 0);
  compressor = new Tone.Compressor();
  analyzer = new Tone.Analyser();

  synth = new Tone.PolySynth(
    this.props.voices,
    Tone.Synth,
    this.props.opts
  ).chain(
    this.filter,
    this.distortion,
    this.phaser,
    this.chorus,
    this.equalizer,
    this.reverb,
    this.delay,
    this.compressor,
    this.analyzer,
    Tone.Master
  );

  getChildContext() {
    return {
      synth: this.synth,
      filter: this.filter
    };
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default SynthProvider;
