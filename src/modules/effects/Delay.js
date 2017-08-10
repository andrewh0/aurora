// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../../ui/Slider';
import PercentSlider from '../../ui/PercentSlider';
import {updateDelay} from '../../store/delay';

const mapStateToProps = ({
  delay: {delayTime, feedback, wet}
}): {delayTime: number, feedback: number, wet: number} => ({
  delayTime,
  feedback,
  wet
});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedDelay extends Component {
  updateDelay = (path, value) => {
    this.props.dispatch(updateDelay(path, value));
  };
  handleDelayTimeChange = value => {
    this.updateDelay(['delayTime'], value);
  };
  handleDelayFeedbackChange = value => {
    this.updateDelay(['feedback'], value);
  };
  handleDelayWetChange = value => {
    this.updateDelay(['wet'], value);
  };
  render() {
    const {delayTime, feedback, wet} = this.props;
    return (
      <div>
        <h1>Delay</h1>
        <Slider
          onChange={this.handleDelayTimeChange}
          value={delayTime}
          min={0.001}
          max={1}
          step={0.001}
          label="Time (s)"
        />
        <PercentSlider
          value={feedback}
          max={0.95}
          onChange={this.handleDelayFeedbackChange}
          label="Feedback"
        />
        <PercentSlider
          value={wet}
          onChange={this.handleDelayWetChange}
          label="Dry/Wet"
        />
      </div>
    );
  }
}

const Delay = connect(mapStateToProps, mapDispatchToProps)(UnconnectedDelay);

export default Delay;
