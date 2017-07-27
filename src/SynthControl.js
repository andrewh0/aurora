import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import Slider from './Slider';
import DropDown from './DropDown';
import {isFat} from './util/synth';

class SynthControl extends Component {
  static contextTypes = {
    synth: PropTypes.object,
    filter: PropTypes.object
  };

  state = {
    osc: _.merge(
      {},
      this.context.synth.get(),
      this.context.synth.get(['oscillator.spread', 'oscillator.count']) // HACK
    ),
    filter: this.context.filter.get()
  };

  updateSynth(path, value) {
    const {synth} = this.context;
    const {osc} = this.state;
    synth.set(path, value);
    this.setState({osc: _.set(osc, path, value)});
  }

  updateFilter(path, value) {
    const {filter: contextFilter} = this.context;
    const {filter: stateFilter} = this.state;
    contextFilter.set(path, value);
    this.setState({filter: _.set(stateFilter, path, value)});
  }

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

  handleFilterTypeChange = value => {
    this.updateFilter('type', value);
  };

  handleFilterFrequencyChange = value => {
    this.updateFilter('frequency', value);
  };

  handleFilterQChange = value => {
    this.updateFilter('Q', value);
  };

  handleFilterRolloffChange = value => {
    this.updateFilter('rolloff', value);
  };
  handleFilterGainChange = value => {
    this.updateFilter('gain', value);
  };

  render() {
    const {osc, filter} = this.state;
    const enableSpreadControls = isFat(osc.oscillator.type);
    return (
      <div>
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
        <div className="filter-controls">
          <h1>Filter Controls</h1>
          <DropDown
            label="Filter Type"
            name="filter-type"
            value={filter.type}
            values={[
              {value: 'lowpass', label: 'Low Pass'},
              {value: 'highpass', label: 'High Pass'},
              {value: 'bandpass', label: 'Band Pass'},
              {value: 'lowshelf', label: 'Low Shelf'},
              {value: 'highshelf', label: 'High Shelf'},
              {value: 'notch', label: 'Notch'},
              {value: 'allpass', label: 'All Pass'},
              {value: 'peaking', label: 'Peaking'}
            ]}
            onChange={this.handleFilterTypeChange}
          />
          <Slider
            value={filter.frequency}
            onChange={this.handleFilterFrequencyChange}
            min={30}
            max={22000}
            step={1}
            label="Frequency"
          />
          <Slider
            value={filter.Q}
            onChange={this.handleFilterQChange}
            min={0.1}
            max={18}
            step={0.1}
            label="Q"
          />
          {_.includes(['lowshelf', 'highshelf', 'peaking'], filter.type) &&
            <Slider
              value={filter.gain}
              onChange={this.handleFilterGainChange}
              min={-12}
              max={12}
              step={1}
              label="Gain"
            />}
          <DropDown
            label="Filter Rolloff"
            name="filter-rolloff"
            value={filter.rolloff}
            values={[{value: -12}, {value: -24}, {value: -48}, {value: -96}]}
            onChange={this.handleFilterRolloffChange}
          />
        </div>
      </div>
    );
  }
}

export default SynthControl;
