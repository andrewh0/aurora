// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import keyboardMap from './util/keyboardMap';
import {getNoteNameFromMidi, getVelocityFromMidi} from './util/notes';
import Octave from './Octave';

const PianoContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  overflow: scroll;
`;
const PianoWrapper = styled.div`
  display: flex;
`;

const mapStateToProps = ({source: {toneRef: synth}, filter}) => ({
  synth
});

class UnconnectedPiano extends Component {
  state = {
    octaveOffset: 1,
    keyboardOctaveOffset: 2,
    keyboardMidiVelocity: 64,
    playing: [],
    mouseDown: false,
    sustaining: false
  };
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess({
          sysex: false
        })
        .then(this.onMIDISuccess, this.onMIDIFailure);
    } else {
      console.warn('No MIDI support in your browser.');
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
  handlePlay = (noteName, velocity = 1, mobile = false) => {
    const {playing, sustaining} = this.state;
    const {synth} = this.props;
    if (!_.includes(playing, noteName)) {
      synth.triggerAttack(noteName, mobile ? '+0.05' : null, velocity);
      this.setState({
        playing: _.concat(playing, noteName)
      });
    } else if (sustaining) {
      synth.triggerAttack(noteName, mobile ? '+0.05' : null, velocity);
    }
  };
  handleStop = noteName => {
    const {playing, sustaining} = this.state;
    const {synth} = this.props;
    const foundNote = _.find(playing, note => note === noteName);
    if (foundNote && !sustaining) {
      synth.triggerRelease(foundNote);
      this.setState({
        playing: _.without(playing, foundNote)
      });
    }
  };
  isAdjustingOctaveOrVelocity = (
    keyCode,
    keyboardOctaveOffset,
    keyboardMidiVelocity
  ) => {
    if (keyCode === 90 && keyboardOctaveOffset > -3) {
      // Z: octave down
      this.setState({
        keyboardOctaveOffset: Math.max(keyboardOctaveOffset - 1, -3)
      });
      return true;
    } else if (keyCode === 88 && keyboardOctaveOffset < 3) {
      // X: octave up
      this.setState({
        keyboardOctaveOffset: Math.min(keyboardOctaveOffset + 1, 3)
      });
      return true;
    } else if (keyCode === 67 && keyboardMidiVelocity > 0) {
      // C: velocity down
      this.setState({
        keyboardMidiVelocity: Math.max(keyboardMidiVelocity - 20, 0)
      });
      return true;
    } else if (keyCode === 86 && keyboardMidiVelocity < 127) {
      // V: velocity up
      this.setState({
        keyboardMidiVelocity: Math.min(keyboardMidiVelocity + 20, 127)
      });
      return true;
    }
    return false;
  };
  handleKeyDown = e => {
    const keyCode = e.keycode || e.which;
    const {
      octaveOffset,
      keyboardMidiVelocity,
      keyboardOctaveOffset
    } = this.state;
    if (
      this.isAdjustingOctaveOrVelocity(
        keyCode,
        keyboardOctaveOffset,
        keyboardMidiVelocity
      )
    ) {
      return;
    }
    const noteMetadata = keyboardMap[keyCode];
    if (noteMetadata) {
      const {note, octaveBase} = noteMetadata;
      const noteName = `${note}${octaveBase +
        octaveOffset +
        keyboardOctaveOffset}`;
      this.handlePlay(noteName, getVelocityFromMidi(keyboardMidiVelocity));
    }
  };
  handleKeyUp = e => {
    const keyCode = e.keycode || e.which;
    const {octaveOffset, keyboardOctaveOffset} = this.state;
    const noteMetadata = keyboardMap[keyCode];
    if (noteMetadata) {
      const {note, octaveBase} = noteMetadata;
      const noteName = `${note}${octaveBase +
        octaveOffset +
        keyboardOctaveOffset}`;
      this.handleStop(noteName);
    }
  };
  handleMouseDown = e => {
    e.preventDefault();
    this.setState({mouseDown: true});
  };
  handleMouseUp = e => {
    this.setState({mouseDown: false});
  };
  handleMouseLeave = e => {
    e.preventDefault();
    this.setState({mouseDown: false});
  };
  handleSustain = velocity => {
    const {synth} = this.props;
    if (!velocity) {
      synth.releaseAll();
      this.setState({
        playing: [],
        sustaining: false
      });
    } else {
      this.setState({sustaining: true});
    }
  };
  onMIDISuccess = midiAccess => {
    const inputs = midiAccess.inputs.values();
    for (let input of inputs) {
      input.onmidimessage = this.onMIDIMessage;
    }
  };
  onMIDIFailure = error => {
    console.warn(
      `No access to MIDI devices or your browser doesn't support WebMIDI API. ${error}`
    );
  };
  onMIDIMessage = ({data: [command, note, velocity]}): void => {
    switch (command) {
      case 176:
        this.handleSustain(velocity);
        break;
      case 144:
        this.handlePlay(
          getNoteNameFromMidi(note),
          getVelocityFromMidi(velocity)
        );
        break;
      case 128:
        this.handleStop(getNoteNameFromMidi(note));
        break;
      default:
        _.noop();
    }
  };
  render() {
    const {octaves} = this.props;
    const {octaveOffset, mouseDown, playing} = this.state;
    return (
      <PianoContainer>
        <PianoWrapper
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        >
          {_.times(octaves, i => (
            <Octave
              key={i}
              octave={i + octaveOffset}
              onPlay={this.handlePlay}
              onStop={this.handleStop}
              mouseDown={mouseDown}
              playing={playing}
            />
          ))}
        </PianoWrapper>
      </PianoContainer>
    );
  }
}

const Piano = connect(mapStateToProps)(UnconnectedPiano);

export default Piano;
