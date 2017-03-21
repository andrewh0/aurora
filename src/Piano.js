import React, {Component} from 'react';
import styled from 'styled-components';
import {times} from 'lodash';

const NOTES = [
  {
    noteName: 'C',
    color: 'white'
  },
  {
    noteName: 'C#',
    color: 'black'
  },
  {
    noteName: 'D',
    color: 'white'
  },
  {
    noteName: 'D#',
    color: 'black'
  },
  {
    noteName: 'E',
    color: 'white'
  },
  {
    noteName: 'F',
    color: 'white'
  },
  {
    noteName: 'F#',
    color: 'black'
  },
  {
    noteName: 'G',
    color: 'white'
  },
  {
    noteName: 'G#',
    color: 'black'
  },
  {
    noteName: 'A',
    color: 'white'
  },
  {
    noteName: 'A#',
    color: 'black'
  },
  {
    noteName: 'B',
    color: 'white'
  }
];

const Piano = styled.div`
  display: flex;
`;

const Key = styled.div`
  cursor: pointer;
  width: 40px;
  border: 1px solid gray;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  &:hover {
    background-color: lightblue;
  }
`;

const WhiteKey = styled(Key)`
  height: 200px;
  background-color: white;
`;

const BlackKey = styled(Key)`
  z-index: 1;
  width: 30px;
  height: 120px;
  margin-left: -15px;
  margin-right: -15px;
  background-color: black;
  border: none;
`;

const Octave = styled.div`
  display: flex;
`;

class OctaveContainer extends Component {
  handlePlay = note => {
    console.log(note);
  };
  render() {
    return (
      <Octave>
        {NOTES.map(({noteName, color}, i) => (
          <KeyContainer
            key={i}
            type={color}
            onPlay={this.handlePlay}
            note={noteName}
          />
        ))}
      </Octave>
    );
  }
}

class KeyContainer extends Component {
  handleClick = e => {
    e.preventDefault();
    const {onPlay, note} = this.props;
    onPlay(note);
  };
  render() {
    return this.props.type === 'white'
      ? <WhiteKey onClick={this.handleClick} />
      : <BlackKey onClick={this.handleClick} />;
  }
}

class PianoContainer extends Component {
  componentWillMount() {
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
  onMIDISuccess = midiAccess => {
    const inputs = midiAccess.inputs.values();
    for (let input of inputs) {
      input.onmidimessage = this.onMIDIMessage;
    }
  };
  onMIDIFailure = error => {
    console.log(
      "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " +
        error
    );
  };
  onMIDIMessage = ({data: [command, note, velocity]}) => {
    console.log('Command, note, velocity', [command, note, velocity]); // [command/channel, note, velocity]
  };
  render() {
    const {octaves} = this.props;
    return (
      <Piano>
        {times(octaves, i => <OctaveContainer key={i} />)}
      </Piano>
    );
  }
}

export default PianoContainer;
