// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../../ui/Slider';
import {updateEqualizer} from '../../store/equalizer';
import {ModuleTitle, ModuleCard} from '../moduleStyles';

const mapStateToProps = ({
  equalizer: {high, highFrequency, low, lowFrequency, mid}
}): {
  high: number,
  highFrequency: number,
  low: number,
  lowFrequency: number,
  mid: number
} => ({high, highFrequency, low, lowFrequency, mid});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedEqualizer extends Component {
  updateEqualizer = (path, value) => {
    this.props.dispatch(updateEqualizer(path, value));
  };
  handleEQHighChange = value => {
    this.updateEqualizer(['high'], value);
  };
  handleEQHighFrequencyChange = value => {
    this.updateEqualizer(['highFrequency'], value);
  };
  handleEQLowChange = value => {
    this.updateEqualizer(['low'], value);
  };
  handleEQLowFrequencyChange = value => {
    this.updateEqualizer(['lowFrequency'], value);
  };
  handleEQMidChange = value => {
    this.updateEqualizer(['mid'], value);
  };
  render() {
    const {high, highFrequency, low, lowFrequency, mid} = this.props;
    return (
      <ModuleCard>
        <ModuleTitle>Equalizer</ModuleTitle>
        <Slider
          onChange={this.handleEQHighChange}
          value={high}
          min={-68}
          max={6}
          step={1}
          label="High Gain (dB)"
        />
        <Slider
          onChange={this.handleEQHighFrequencyChange}
          value={highFrequency}
          min={200}
          max={18000}
          step={1}
          label="High Frequency (Hz)"
        />
        <Slider
          onChange={this.handleEQMidChange}
          value={mid}
          min={-68}
          max={6}
          step={1}
          label="Mid Gain (dB)"
        />
        <Slider
          onChange={this.handleEQLowChange}
          value={low}
          min={-68}
          max={6}
          step={1}
          label="Low Gain (dB)"
        />
        <Slider
          onChange={this.handleEQLowFrequencyChange}
          value={lowFrequency}
          min={50}
          max={5000}
          step={1}
          label="Low Frequency (Hz)"
        />
      </ModuleCard>
    );
  }
}

const Equalizer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedEqualizer);

export default Equalizer;
