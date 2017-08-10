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
  equalizer: {toneRef: equalizer}
}) => ({
  synth,
  filter,
  distortion,
  phaser,
  chorus,
  equalizer
});

class UnconnectedSynthRouter extends Component {
  reverb = new Tone.Freeverb().set('wet', 0);
  delay = new Tone.FeedbackDelay().set('wet', 0);
  compressor = new Tone.Compressor();
  analyzer = new Tone.Analyser();

  componentWillMount() {
    const {synth, filter, distortion, phaser, chorus, equalizer} = this.props;
    synth.chain(
      filter,
      distortion,
      phaser,
      chorus,
      equalizer,
      this.reverb,
      this.delay,
      this.compressor,
      this.analyzer,
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

const SynthRouter = connect(mapStateToProps)(UnconnectedSynthRouter);

export default SynthRouter;
