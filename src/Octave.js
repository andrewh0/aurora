// @flow

import React, {Component} from 'react';
import {includes} from 'lodash';
import styled from 'styled-components';
import {NOTES} from './util/notes';
import Key from './Key';

const OctaveWrapper = styled.div`display: flex;`;

class Octave extends Component {
  render() {
    const {onPlay, onStop, mouseDown, octave, playing} = this.props;
    return (
      <OctaveWrapper>
        {NOTES.map(({noteName, color}, i) =>
          <Key
            key={i}
            type={color}
            onPlay={onPlay}
            onStop={onStop}
            mouseDown={mouseDown}
            note={`${noteName}${octave}`}
            isPlaying={includes(playing, `${noteName}${octave}`)}
          />
        )}
      </OctaveWrapper>
    );
  }
}

export default Octave;
