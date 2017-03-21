import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import synth from './util/synth';
import keyboardMap from './util/keyboardMap';

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
    const {octave} = this.props;
    synth.triggerAttackRelease(`${note}${octave}`);
    console.log(`${note}${octave}`);
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
  constructor(props) {
    super(props);
    this.state = {
      octaveOffset: 3,
      playing: []
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
  handleKeyDown = e => {
    const keyCode = e.keycode || e.which;
    const {octaveOffset} = this.state;
    const noteMetadata = keyboardMap[keyCode];
    if (noteMetadata) {
      const {note, octaveBase} = noteMetadata;
      const noteName = `${note}${octaveBase + octaveOffset}`;
      if (!_.includes(this.state.playing, noteName)) {
        synth.triggerAttack(noteName);
        this.setState({
          playing: _.concat(this.state.playing, noteName)
        });
      }
    }
  };
  handleKeyUp = e => {
    const keyCode = e.keycode || e.which;
    const {octaveOffset, playing} = this.state;
    const noteMetadata = keyboardMap[keyCode];
    if (noteMetadata) {
      const {note, octaveBase} = noteMetadata;
      const noteName = `${note}${octaveBase + octaveOffset}`;
      const foundNote = _.find(playing, note => note === noteName);
      if (foundNote) {
        synth.triggerRelease(foundNote);
        this.setState({
          playing: _.without(this.state.playing, foundNote)
        });
      }
    }
  };
  onMIDISuccess = midiAccess => {
    const inputs = midiAccess.inputs.values();
    for (let input of inputs) {
      input.onmidimessage = this.onMIDIMessage;
    }
  };
  onMIDIFailure = error => {
    console.log(
      "No access to MIDI devices or your browser doesn't support WebMIDI API." +
        error
    );
  };
  onMIDIMessage = ({data: [command, note, velocity]}) => {
    console.log('Command, note, velocity', [command, note, velocity]); // [command/channel, note, velocity]
  };
  render() {
    const {octaves} = this.props;
    const {octaveOffset} = this.state;
    return (
      <Piano>
        {_.times(octaves, i => (
          <OctaveContainer key={i} octave={i + octaveOffset} />
        ))}
      </Piano>
    );
  }
}

export default PianoContainer;
