import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import synth from './util/synth';
import keyboardMap from './util/keyboardMap';
import {getNoteNameFromMidi, getVelocityFromMidi} from './util/notes';
import OctaveContainer from './OctaveContainer';

const Piano = styled.div`
  display: flex;
`;

class PianoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octaveOffset: 1,
      playing: [],
      mouseDown: false
    };
  }
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
    if (!_.includes(this.state.playing, noteName)) {
      synth.triggerAttack(noteName, mobile ? '+0.05' : null, velocity);
      this.setState({
        playing: _.concat(this.state.playing, noteName)
      });
    }
  };
  handleStop = noteName => {
    const {playing} = this.state;
    const foundNote = _.find(playing, note => note === noteName);
    if (foundNote) {
      synth.triggerRelease(foundNote);
      this.setState({
        playing: _.without(playing, foundNote)
      });
    }
  };
  handleKeyDown = e => {
    const keyCode = e.keycode || e.which;
    const {octaveOffset} = this.state;
    const noteMetadata = keyboardMap[keyCode];
    if (noteMetadata) {
      const {note, octaveBase} = noteMetadata;
      const noteName = `${note}${octaveBase + octaveOffset}`;
      this.handlePlay(noteName);
    }
  };
  handleKeyUp = e => {
    const keyCode = e.keycode || e.which;
    const {octaveOffset} = this.state;
    const noteMetadata = keyboardMap[keyCode];
    if (noteMetadata) {
      const {note, octaveBase} = noteMetadata;
      const noteName = `${note}${octaveBase + octaveOffset}`;
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
  onMIDIMessage = ({data: [command, note, velocity]}) => {
    switch (command) {
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
      <Piano onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        {_.times(octaves, i => (
          <OctaveContainer
            key={i}
            octave={i + octaveOffset}
            onPlay={this.handlePlay}
            onStop={this.handleStop}
            mouseDown={mouseDown}
            playing={playing}
          />
        ))}
      </Piano>
    );
  }
}

export default PianoContainer;
