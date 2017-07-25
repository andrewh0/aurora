import React, {Component, PropTypes} from 'react';
import Tone from 'tone';

class SynthProvider extends Component {
  static childContextTypes = {
    synth: PropTypes.object
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
  synth = new Tone.PolySynth(
    this.props.voices,
    Tone.Synth,
    this.props.opts
  ).toMaster();
  getChildContext() {
    return {synth: this.synth};
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
