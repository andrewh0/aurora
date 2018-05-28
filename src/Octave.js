// @flow

import React from 'react';
import {includes} from 'lodash';
import styled from 'styled-components';
import {NOTES} from './util/notes';
import Key from './Key';

const OctaveWrapper = styled.div`
  display: flex;
`;

const Octave = ({
  onPlay,
  onStop,
  mouseDown,
  octave,
  playing
}: {
  onPlay: (noteName: string, velocity: number, mobile: boolean) => void,
  onStop: (noteName: string) => void,
  mouseDown: boolean,
  octave: number,
  playing: Array<string>
}) => (
  <OctaveWrapper>
    {NOTES.map(({noteName, color}, i) => (
      <Key
        key={i}
        type={color}
        onPlay={onPlay}
        onStop={onStop}
        mouseDown={mouseDown}
        note={`${noteName}${octave}`}
        isPlaying={includes(playing, `${noteName}${octave}`)}
      />
    ))}
  </OctaveWrapper>
);

export default Octave;
