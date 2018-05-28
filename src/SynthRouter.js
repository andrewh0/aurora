// @flow

import React, {Component} from 'react';
import Tone from 'tone';
import {connect} from 'react-redux';

const mapStateToProps = ({
  source: {toneRef: synth},
  filter: {toneRef: filter},
  distortion: {toneRef: distortion},
  phaser: {toneRef: phaser},
  chorus: {toneRef: chorus},
  equalizer: {toneRef: equalizer},
  reverb: {toneRef: reverb},
  delay: {toneRef: delay},
  compressor: {toneRef: compressor},
  panVol: {toneRef: panVol},
  meter: {
    left: {toneRef: meterL},
    right: {toneRef: meterR}
  },
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
  panVol,
  meterL,
  meterR,
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
      panVol,
      meterL,
      meterR,
      analyzer
    } = this.props;
    const split = new Tone.Split();
    split.left.connect(meterL);
    split.right.connect(meterR);
    synth.chain(
      filter,
      distortion,
      phaser,
      chorus,
      equalizer,
      reverb,
      delay,
      compressor,
      panVol
    );
    panVol.fan(split, analyzer, Tone.Master);
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

const SynthRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedSynthRouter);

export default SynthRouter;
