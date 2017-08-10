// @flow

import React, {Component} from 'react';
import Tone from 'tone';
import {connect} from 'react-redux';

const mapStateToProps = ({
  oscillator: {toneRef: synth},
  filter: {toneRef: filter}
}) => ({
  synth,
  filter
});

class UnconnectedSynthRouter extends Component {
  distortion = new Tone.Distortion().set('wet', 0);
  phaser = new Tone.Phaser().set('wet', 0);
  chorus = new Tone.Chorus().set('wet', 0);
  equalizer = new Tone.EQ3();
  reverb = new Tone.Freeverb().set('wet', 0);
  delay = new Tone.FeedbackDelay().set('wet', 0);
  compressor = new Tone.Compressor();
  analyzer = new Tone.Analyser();

  componentWillMount() {
    const {synth, filter} = this.props;
    synth.chain(
      filter,
      this.distortion,
      this.phaser,
      this.chorus,
      this.equalizer,
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