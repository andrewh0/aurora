// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../../ui/Slider';
import DropDown from '../../ui/DropDown';
import PercentSlider from '../../ui/PercentSlider';
import {updateChorus} from '../../store/chorus';
import {ModuleTitle, ModuleCard} from '../moduleStyles';

type BasicOscillator = 'sine' | 'square' | 'sawtooth' | 'triangle';

const mapStateToProps = ({
  chorus: {delayTime, depth, feedback, frequency, spread, type, wet}
}): {
  delayTime: number,
  depth: number,
  feedback: number,
  frequency: number,
  spread: number,
  type: BasicOscillator,
  wet: number
} => ({delayTime, depth, feedback, frequency, spread, type, wet});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedChorus extends Component {
  updateChorus = (path, value) => {
    this.props.dispatch(updateChorus(path, value));
  };
  handleChorusDelayTimeChange = value => {
    this.updateChorus(['delayTime'], value);
  };
  handleChorusDepthChange = value => {
    this.updateChorus(['depth'], value);
  };
  handleChorusFeedbackChange = value => {
    this.updateChorus(['feedback'], value);
  };
  handleChorusFrequencyChange = value => {
    this.updateChorus(['frequency'], value);
  };
  handleChorusSpreadChange = value => {
    this.updateChorus(['spread'], value);
  };
  handleChorusTypeChange = value => {
    this.updateChorus(['type'], value);
  };
  handleChorusWetChange = value => {
    this.updateChorus(['wet'], value);
  };

  render() {
    const {
      delayTime,
      depth,
      feedback,
      frequency,
      spread,
      type,
      wet
    } = this.props;
    return (
      <ModuleCard>
        <ModuleTitle>Chorus</ModuleTitle>
        <Slider
          onChange={this.handleChorusDelayTimeChange}
          value={delayTime}
          min={0.1}
          max={18}
          step={0.1}
          label="Delay (ms)"
        />
        <PercentSlider
          onChange={this.handleChorusDepthChange}
          value={depth}
          label="Depth"
        />
        <PercentSlider
          onChange={this.handleChorusFeedbackChange}
          value={feedback}
          max={0.95}
          label="Feedback"
        />
        <Slider
          onChange={this.handleChorusFrequencyChange}
          value={frequency}
          min={0.01}
          max={10}
          step={0.01}
          label="Modulating Frequency"
        />
        <Slider
          onChange={this.handleChorusSpreadChange}
          value={spread}
          min={0}
          max={360}
          step={1}
          label="Spread (˚)"
        />
        <DropDown
          label="LFO type"
          name="chorus-lfo"
          value={type}
          values={[
            {value: 'sine', label: 'Sine'},
            {value: 'square', label: 'Square'},
            {value: 'sawtooth', label: 'Sawtooth'},
            {value: 'triangle', label: 'Triangle'}
          ]}
          onChange={this.handleChorusTypeChange}
        />
        <PercentSlider
          value={wet}
          onChange={this.handleChorusWetChange}
          label="Dry/Wet"
        />
      </ModuleCard>
    );
  }
}

const Chorus = connect(mapStateToProps, mapDispatchToProps)(UnconnectedChorus);

export default Chorus;
