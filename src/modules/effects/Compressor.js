// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../../ui/Slider';
import {updateCompressor} from '../../store/compressor';
import {ModuleTitle, ModuleCard} from '../moduleStyles';

const mapStateToProps = ({
  compressor: {attack, knee, ratio, release, threshold}
}): {
  attack: number,
  knee: number,
  ratio: number,
  release: number,
  threshold: number
} => ({attack, knee, ratio, release, threshold});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedCompressor extends Component {
  updateCompressor = (path, value) => {
    this.props.dispatch(updateCompressor(path, value));
  };
  handleCompressorAttackChange = value => {
    this.updateCompressor(['attack'], value);
  };
  handleCompressorKneeChange = value => {
    this.updateCompressor(['knee'], value);
  };
  handleCompressorRatioChange = value => {
    this.updateCompressor(['ratio'], value);
  };
  handleCompressorReleaseChange = value => {
    this.updateCompressor(['release'], value);
  };
  handleCompressorThresholdChange = value => {
    this.updateCompressor(['threshold'], value);
  };
  render() {
    const {attack, knee, ratio, release, threshold} = this.props;
    return (
      <ModuleCard>
        <ModuleTitle>Compressor</ModuleTitle>
        <Slider
          onChange={this.handleCompressorAttackChange}
          value={attack}
          min={0.00001}
          max={1}
          step={0.0001}
          label="Attack (s)"
        />
        <Slider
          onChange={this.handleCompressorKneeChange}
          value={knee}
          min={0}
          max={40}
          step={1}
          label="Knee (dB)"
        />
        <Slider
          onChange={this.handleCompressorRatioChange}
          value={ratio}
          min={1}
          max={20}
          step={0.1}
          label="Ratio"
        />
        <Slider
          onChange={this.handleCompressorReleaseChange}
          value={release}
          min={0.001}
          max={1}
          step={0.001}
          label="Release (s)"
        />
        <Slider
          onChange={this.handleCompressorThresholdChange}
          value={threshold}
          min={-100}
          max={0}
          step={1}
          label="Threshold (dB)"
        />
      </ModuleCard>
    );
  }
}

const Compressor = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedCompressor);

export default Compressor;
