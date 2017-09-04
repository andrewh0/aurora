// @flow

import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import Slider from '../ui/Slider';
import DropDown from '../ui/DropDown';
import {isFat} from '../util/synth';
import {toArrayPath} from '../util/path';
import {updateSource} from '../store/source';

const mapStateToProps = ({source}, {number}) => {
  const oscillatorProp = `oscillator${number}`;
  const detuneProp = `detune${number}`;
  const panProp = `pan${number}`;
  return {
    oscillatorProp,
    detuneProp,
    panProp,
    oscillator: _.get(source, oscillatorProp),
    detune: _.get(source, detuneProp),
    pan: _.get(source, panProp)
  };
};

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedOscillator extends Component {
  updateSynth = (path, value) => {
    this.props.dispatch(updateSource(toArrayPath(path), value));
  };

  handleVolumeChange = value => {
    this.updateSynth(`${this.props.oscillatorProp}.volume`, value);
  };

  handleWaveformChange = value => {
    this.updateSynth(`${this.props.oscillatorProp}.type`, value);
  };

  handleDetuneChange = value => {
    this.updateSynth(this.props.detuneProp, value);
  };

  handlePanChange = value => {
    this.updateSynth(`${this.props.panProp}.pan`, value);
  };

  handleSpreadChange = value => {
    this.updateSynth(`${this.props.oscillatorProp}.spread`, value);
  };

  handleCountChange = value => {
    this.updateSynth(`${this.props.oscillatorProp}.count`, value);
  };
  render() {
    const {oscillator, detune, pan} = this.props;
    const enableSpreadControls = isFat(oscillator.type);
    return (
      <div>
        <h1>Oscillator Controls</h1>
        <Slider
          value={oscillator.volume}
          onChange={this.handleVolumeChange}
          min={-36}
          max={12}
          step={1}
          label="Volume"
        />
        <DropDown
          label="Waveform"
          name="waveforms"
          value={oscillator.type}
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
          value={detune}
          onChange={this.handleDetuneChange}
          min={-2400}
          max={2400}
          step={100}
          label="Detune (Cents)"
        />
        <Slider
          value={pan.pan || 0}
          min={-1}
          max={1}
          step={0.1}
          onChange={this.handlePanChange}
          label="Pan"
        />
        {enableSpreadControls && [
          <Slider
            key="spread"
            value={oscillator.spread || 0}
            onChange={this.handleSpreadChange}
            min={0}
            max={100}
            step={1}
            label="Spread"
          />,
          <Slider
            key="count"
            value={oscillator.count || 1}
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

const Oscillator = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedOscillator
);

export default Oscillator;
