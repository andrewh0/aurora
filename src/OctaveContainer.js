import React, {Component} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {NOTES} from './util/notes';
import KeyContainer from './KeyContainer';

const Octave = styled.div`display: flex;`;

class OctaveContainer extends Component {
  render() {
    const {onPlay, onStop, mouseDown, octave, playing} = this.props;
    return (
      <Octave>
        {NOTES.map(({noteName, color}, i) =>
          <KeyContainer
            key={i}
            type={color}
            onPlay={onPlay}
            onStop={onStop}
            mouseDown={mouseDown}
            note={`${noteName}${octave}`}
            isPlaying={_.includes(playing, `${noteName}${octave}`)}
          />
        )}
      </Octave>
    );
  }
}

export default OctaveContainer;
