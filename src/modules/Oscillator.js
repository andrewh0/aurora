import React, {Component} from 'react';
import Slider from '../ui/Slider';
import DropDown from '../ui/DropDown';
import {isFat} from '../util/synth';

class Oscillator extends Component {
  updateSynth = (path, value) => {
    this.props.updateSynth(path, value);
  };
  handleVolumeChange = value => {
    this.updateSynth('volume', value);
  };

  handlePortamentoChange = value => {
    this.updateSynth('portamento', value);
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
    const {osc} = this.props;
    const enableSpreadControls = isFat(osc.oscillator.type);
    return (
      <div className="filter-controls">
        <h1>Oscillator Controls</h1>
        <Slider
          value={osc.volume}
          onChange={this.handleVolumeChange}
          min={-12}
          max={12}
          step={1}
          label="Volume"
        />
        <DropDown
          label="Waveform"
          name="waveforms"
          value={osc.oscillator.type}
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
          value={osc.envelope.attack}
          onChange={this.handleAttackChange}
          min={0.005}
          max={1}
          step={0.001}
          label="Attack"
        />
        <Slider
          value={osc.envelope.decay}
          onChange={this.handleDecayChange}
          min={0.005}
          max={1}
          step={0.001}
          label="Decay"
        />
        <Slider
          value={osc.envelope.sustain}
          onChange={this.handleSustainChange}
          min={0}
          max={1}
          step={0.001}
          label="Sustain"
        />
        <Slider
          value={osc.envelope.release}
          onChange={this.handleReleaseChange}
          min={0.2}
          max={2}
          step={0.001}
          label="Release"
        />
        <Slider
          value={osc.portamento}
          onChange={this.handlePortamentoChange}
          min={0}
          max={5}
          step={0.01}
          label="Portamento"
        />
        {enableSpreadControls && [
          <Slider
            key="spread"
            value={osc.oscillator.spread}
            onChange={this.handleSpreadChange}
            min={0}
            max={100}
            step={1}
            label="Spread"
          />,
          <Slider
            key="count"
            value={osc.oscillator.count}
            onChange={this.handleCountChange}
            min={1}
            max={8}
            step={1}
            label="Voices"
          />
        ]}
      </div>
    );
  }
}

export default Oscillator;
