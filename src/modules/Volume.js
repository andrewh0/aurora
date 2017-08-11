// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from '../ui/Slider';
import {updatePanVol} from '../store/panVol';
import Meter from './Meter';

const mapStateToProps = ({
  panVol: {pan, volume}
}): {
  pan: number,
  volume: number
} => ({pan, volume});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedPanVol extends Component {
  updatePanVol = (path, value) => {
    this.props.dispatch(updatePanVol(path, value));
  };
  handleVolumeChange = value => {
    this.updatePanVol(['volume'], value);
  };
  handlePanChange = value => {
    this.updatePanVol(['pan'], value);
  };

  render() {
    const {pan, volume} = this.props;
    return (
      <div>
        <h1>Panning and Volume</h1>
        <Slider
          onChange={this.handleVolumeChange}
          value={volume}
          min={-35}
          max={3}
          step={1}
          label="Volume"
        />
        <Slider
          value={pan}
          min={-1}
          max={1}
          step={0.1}
          onChange={this.handlePanChange}
          label="Pan"
        />
        <Meter />
      </div>
    );
  }
}

const PanVol = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPanVol);

export default PanVol;
