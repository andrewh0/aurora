import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import Slider from './Slider';
import DropDown from './DropDown';

class SynthControl extends Component {
  static contextTypes = {
    synth: PropTypes.object
  };

  state = {
    params: _.merge(
      {},
      this.context.synth.get(),
      this.context.synth.get(['oscillator.spread', 'oscillator.count']) // HACK
    )
  };

  updateSynth(path, value) {
    const {synth} = this.context;
    const {params} = this.state;
    synth.set(path, value);
    this.setState({params: _.set(params, path, value)});
  }

  handleVolumeChange = value => {
    this.updateSynth('volume', value);
  };

  handleWaveformChange = value => {
    this.updateSynth('oscillator.type', value);
  };

  handleAttackChange = value => {
    this.updateSynth('envelope.attack', value);
  };

  handleDecayChange = value => {
    this.updateSynth('envelope.decay', value);
  };

  handleSustainChange = value => {
    this.updateSynth('envelope.sustain', value);
  };

  handleReleaseChange = value => {
    this.updateSynth('envelope.release', value);
  };

  handleSpreadChange = value => {
    this.updateSynth('oscillator.spread', value);
  };

  handleCountChange = value => {
    this.updateSynth('oscillator.count', value);
  };

  render() {
    const {params} = this.state;
    return (
      <div>
        <Slider
          value={params.volume}
          onChange={this.handleVolumeChange}
          min={-12}
          max={12}
          step={1}
          label="Volume"
        />
        <DropDown
          label="Waveform"
          name="waveforms"
          value={params.oscillator.type}
          values={[
            {value: 'sawtooth', label: 'Sawtooth'},
            {value: 'sine', label: 'Sine'},
            {value: 'square', label: 'Square'},
            {value: 'triangle', label: 'Triangle'},
            {value: 'fatsawtooth', label: 'Fat Sawtooth'},
            {value: 'fatsine', label: 'Fat Sine'},
            {value: 'fatsquare', label: 'Fat Square'},
            {value: 'fattriangle', label: 'Fat Triangle'}
          ]}
          onChange={this.handleWaveformChange}
        />
        <Slider
          value={params.envelope.attack}
          onChange={this.handleAttackChange}
          min={0.005}
          max={1}
          step={0.001}
          label="Attack"
        />
        <Slider
          value={params.envelope.decay}
          onChange={this.handleDecayChange}
          min={0.005}
          max={1}
          step={0.001}
          label="Decay"
        />
        <Slider
          value={params.envelope.sustain}
          onChange={this.handleSustainChange}
          min={0}
          max={1}
          step={0.001}
          label="Sustain"
        />
        <Slider
          value={params.envelope.release}
          onChange={this.handleReleaseChange}
          min={0.2}
          max={2}
          step={0.001}
          label="Release"
        />
        <Slider
          value={params.oscillator.spread}
          onChange={this.handleSpreadChange}
          min={0}
          max={100}
          step={1}
          label="Spread"
        />
        <Slider
          value={params.oscillator.count}
          onChange={this.handleCountChange}
          min={1}
          max={8}
          step={1}
          label="Count"
        />
      </div>
    );
  }
}

export default SynthControl;
