// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropDown from '../../ui/DropDown';
import Slider from '../../ui/Slider';
import {updateDistortion} from '../../store/distortion';

type DistortionOversample = 'none' | '2x' | '4x';

const mapStateToProps = ({
  distortion: {distortion, oversample, wet}
}): {distortion: number, oversample: DistortionOversample, wet: number} => ({
  distortion,
  oversample,
  wet
});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedDistortion extends Component {
  updateDistortion = (path, value) => {
    this.props.dispatch(updateDistortion(path, value));
  };
  handleDistortionOversampleChange = value => {
    this.updateDistortion(['oversample'], value);
  };
  handleDistortionWetChange = value => {
    this.updateDistortion(['wet'], value);
  };
  handleDistortionAmountChange = value => {
    this.updateDistortion(['distortion'], value);
  };
  render() {
    const {distortion, oversample, wet} = this.props;
    return (
      <div>
        <h1>Distortion</h1>
        <Slider
          onChange={this.handleDistortionAmountChange}
          value={distortion}
          min={0}
          max={1}
          step={0.1}
          label="Amount"
        />
        <DropDown
          label="Oversample"
          name="distortion-oversample"
          value={oversample}
          values={[
            {value: 'none', label: 'None'},
            {value: '2x', label: '2x'},
            {value: '4x', label: '4x'}
          ]}
          onChange={this.handleDistortionOversampleChange}
        />
        <Slider
          value={wet}
          onChange={this.handleDistortionWetChange}
          min={0}
          max={1}
          step={0.1}
          label="Dry/Wet"
        />
      </div>
    );
  }
}

const Distortion = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedDistortion
);

export default Distortion;
