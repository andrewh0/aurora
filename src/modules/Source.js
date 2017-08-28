// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../ui/Slider';
import Oscillator from './Oscillator';
import {toArrayPath} from '../util/path';
import {updateSource} from '../store/source';

const mapStateToProps = ({source: {amplitudeEnv, portamento}}) => {
  return {
    envelope: amplitudeEnv,
    portamento
  };
};

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedSource extends Component {
  updateSynth = (path, value) => {
    this.props.dispatch(updateSource(toArrayPath(path), value));
  };

  handlePortamentoChange = value => {
    this.updateSynth('portamento', value);
  };

  handleAttackChange = value => {
    this.updateSynth('amplitudeEnv.attack', value);
  };

  handleDecayChange = value => {
    this.updateSynth('amplitudeEnv.decay', value);
  };

  handleSustainChange = value => {
    this.updateSynth('amplitudeEnv.sustain', value);
  };

  handleReleaseChange = value => {
    this.updateSynth('amplitudeEnv.release', value);
  };

  render() {
    const {envelope, portamento} = this.props;
    return (
      <div className="source-controls">
        <h1>Source Controls</h1>
        <Slider
          value={envelope.attack}
          onChange={this.handleAttackChange}
          min={0.005}
          max={1}
          step={0.001}
          label="Attack"
        />
        <Slider
          value={envelope.decay}
          onChange={this.handleDecayChange}
          min={0.005}
          max={1}
          step={0.001}
          label="Decay"
        />
        <Slider
          value={envelope.sustain}
          onChange={this.handleSustainChange}
          min={0}
          max={1}
          step={0.001}
          label="Sustain"
        />
        <Slider
          value={envelope.release}
          onChange={this.handleReleaseChange}
          min={0.2}
          max={2}
          step={0.001}
          label="Release"
        />
        <Slider
          value={portamento}
          onChange={this.handlePortamentoChange}
          min={0}
          max={5}
          step={0.01}
          label="Portamento"
        />
        <Oscillator number={0} />
        <Oscillator number={1} />
        <Oscillator number={2} />
      </div>
    );
  }
}

const Source = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSource);

export default Source;
