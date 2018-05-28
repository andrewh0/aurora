// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../../ui/Slider';
import PercentSlider from '../../ui/PercentSlider';
import {updatePhaser} from '../../store/phaser';
import {ModuleTitle, ModuleCard} from '../moduleStyles';

const mapStateToProps = ({
  phaser: {Q, baseFrequency, frequency, octaves, wet}
}): {
  Q: number,
  baseFrequency: number,
  frequency: number,
  octaves: number,
  wet: number
} => ({
  Q,
  baseFrequency,
  frequency,
  octaves,
  wet
});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedPhaser extends Component {
  updatePhaser = (path, value) => {
    this.props.dispatch(updatePhaser(path, value));
  };
  handlePhaserQChange = value => {
    this.updatePhaser(['Q'], value);
  };
  handlePhaserBaseFrequencyChange = value => {
    this.updatePhaser(['baseFrequency'], value);
  };
  handlePhaserFrequencyChange = value => {
    this.updatePhaser(['frequency'], value);
  };
  handlePhaserOctavesChange = value => {
    this.updatePhaser(['octaves'], value);
  };
  handlePhaserWetChange = value => {
    this.updatePhaser(['wet'], value);
  };
  render() {
    const {Q, baseFrequency, frequency, octaves, wet} = this.props;
    return (
      <ModuleCard>
        <ModuleTitle>Phaser</ModuleTitle>
        <Slider
          onChange={this.handlePhaserQChange}
          value={Q}
          min={0.1}
          max={18}
          step={0.1}
          label="Resonance"
        />
        <Slider
          onChange={this.handlePhaserBaseFrequencyChange}
          value={baseFrequency}
          min={30}
          max={22000}
          step={1}
          label="Base Frequency"
        />
        <Slider
          onChange={this.handlePhaserFrequencyChange}
          value={frequency}
          min={0.01}
          max={20}
          step={0.01}
          label="Modulating Frequency"
        />
        <Slider
          onChange={this.handlePhaserOctavesChange}
          value={octaves}
          min={0}
          max={7}
          step={1}
          label="Octaves"
        />
        <PercentSlider
          value={wet}
          onChange={this.handlePhaserWetChange}
          label="Dry/Wet"
        />
      </ModuleCard>
    );
  }
}

const Phaser = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedPhaser);

export default Phaser;
