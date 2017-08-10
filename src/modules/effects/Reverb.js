// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../../ui/Slider';
import PercentSlider from '../../ui/PercentSlider';
import {updateReverb} from '../../store/reverb';

const mapStateToProps = ({
  reverb: {dampening, roomSize, wet}
}): {dampening: number, roomSize: number, wet: number} => ({
  dampening,
  roomSize,
  wet
});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedReverb extends Component {
  updateReverb = (path, value) => {
    this.props.dispatch(updateReverb(path, value));
  };
  handleReverbDampeningChange = value => {
    this.updateReverb(['dampening'], value);
  };
  handleReverbWetChange = value => {
    this.updateReverb(['wet'], value);
  };
  handleReverbRoomSizeChange = value => {
    this.updateReverb(['roomSize'], value);
  };
  render() {
    const {dampening, roomSize, wet} = this.props;
    return (
      <div>
        <h1>Reverb</h1>
        <Slider
          onChange={this.handleReverbDampeningChange}
          value={dampening}
          min={30}
          max={22000}
          step={1}
          label="Dampening Cutoff (Hz)"
        />
        <PercentSlider
          value={roomSize}
          onChange={this.handleReverbRoomSizeChange}
          label="Room Size"
        />
        <PercentSlider
          value={wet}
          onChange={this.handleReverbWetChange}
          label="Dry/Wet"
        />
      </div>
    );
  }
}

const Reverb = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReverb);

export default Reverb;
