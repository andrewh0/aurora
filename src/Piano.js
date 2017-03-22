import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import synth from './util/synth';
import keyboardMap from './util/keyboardMap';
import {NOTES, getNoteNameFromMidi, getVelocityFromMidi} from './util/notes';

const Piano = styled.div`
  display: flex;
`;

const Key = styled.div`
  cursor: pointer;
  width: 40px;
  border: 1px solid gray;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const WhiteKey = styled(Key)`
  height: 200px;
  background-color: ${props => props.isPlaying ? 'blue' : 'white'};
`;

const BlackKey = styled(Key)`
  z-index: 1;
  width: 30px;
  height: 120px;
  margin-left: -15px;
  margin-right: -15px;
  background-color: ${props => props.isPlaying ? 'blue' : 'black'};
  border: none;
`;

const Octave = styled.div`
  display: flex;
`;

class KeyContainer extends Component {
  handleTouchStart = e => {
    e.preventDefault();
    e.stopPropagation();
    this.play(this.props.note);
  };
  handleTouchEnd = e => {
    e.preventDefault();
    e.stopPropagation();
    this.stop(this.props.note);
  };
  handleMouseOver = e => {
    e.preventDefault();
    const {note, mouseDown} = this.props;
    if (mouseDown) {
      this.play(note);
    }
  };
  handleMouseDown = e => {
    e.preventDefault();
    this.play(this.props.note);
  };
  handleMouseUp = e => {
    e.preventDefault();
    this.stop(this.props.note);
  };
  handleMouseOut = e => {
    e.preventDefault();
    this.stop(this.props.note);
  };
  play = note => {
    this.props.onPlay(note);
  };
  stop = note => {
    this.props.onStop(note);
  };
  render() {
    return this.props.type === 'white'
      ? <WhiteKey
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          onMouseOver={this.handleMouseOver}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseOut={this.handleMouseOut}
          isPlaying={this.props.isPlaying}
        />
      : <BlackKey
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          onMouseOver={this.handleMouseOver}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseOut={this.handleMouseOut}
          isPlaying={this.props.isPlaying}
        />;
  }
}

class OctaveContainer extends Component {
  render() {
    const {onPlay, onStop, mouseDown, octave, playing} = this.props;
    return (
      <Octave>
        {NOTES.map(({noteName, color}, i) => (
          <KeyContainer
            key={i}
            type={color}
            onPlay={onPlay}
            onStop={onStop}
            mouseDown={mouseDown}
            note={`${noteName}${octave}`}
            isPlaying={_.includes(playing, `${noteName}${octave}`)}
          />
        ))}
      </Octave>
    );
  }
}

class PianoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octaveOffset: 3,
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
  handlePlay = (noteName, velocity = 1) => {
    if (!_.includes(this.state.playing, noteName)) {
      synth.triggerAttack(noteName, '+0.05', velocity);
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
