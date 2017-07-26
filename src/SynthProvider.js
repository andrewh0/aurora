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
  filter = new Tone.Filter(200, 'lowpass', -12).toMaster();

  synth = new Tone.PolySynth(
    this.props.voices,
    Tone.Synth,
    this.props.opts
  ).connect(this.filter);

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
