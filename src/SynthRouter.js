// @flow

import React, {Component} from 'react';
import Tone from 'tone';
import {connect} from 'react-redux';

const mapStateToProps = ({
  oscillator: {toneRef: synth},
  filter: {toneRef: filter},
  distortion: {toneRef: distortion},
  phaser: {toneRef: phaser},
  chorus: {toneRef: chorus},
  equalizer: {toneRef: equalizer},
  reverb: {toneRef: reverb},
  delay: {toneRef: delay},
  compressor: {toneRef: compressor},
  analyzer: {toneRef: analyzer}
}) => ({
  synth,
  filter,
  distortion,
  phaser,
  chorus,
  equalizer,
  reverb,
  delay,
  compressor,
  analyzer
});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

class UnconnectedSynthRouter extends Component {
  componentWillMount() {
    const {
      synth,
      filter,
      distortion,
      phaser,
      chorus,
      equalizer,
      reverb,
      delay,
      compressor,
      analyzer
    } = this.props;
    synth.chain(
      filter,
      distortion,
      phaser,
      chorus,
      equalizer,
      reverb,
      delay,
      compressor,
      analyzer,
      Tone.Master
    );
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const SynthRouter = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedSynthRouter
);

export default SynthRouter;
