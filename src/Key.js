// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {PIANO_KEY_HEIGHT} from './util/styleConstants';
import {BRAND_COLOR} from './util/colors';

const KeyWrapper = styled.div`
  cursor: pointer;
  width: 40px;
  border: 1px solid #5d627a;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const WhiteKey = styled(KeyWrapper)`
  height: ${PIANO_KEY_HEIGHT};
  background-color: ${props => (props.isPlaying ? BRAND_COLOR : '#F2F4FF')};
`;

const BlackKey = styled(KeyWrapper)`
  z-index: 1;
  width: 30px;
  height: 120px;
  margin-left: -15px;
  margin-right: -15px;
  border-width: 2px;
  border-top-width: 1px;
  border-color: ${props => (props.isPlaying ? '#5D627A' : '#0E0F14')};
  background-color: ${props => (props.isPlaying ? BRAND_COLOR : '#0E0F14')};
`;

class Key extends Component {
  handleTouchStart = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
    this.play(this.props.note);
  };
  handleTouchEnd = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
    this.stop(this.props.note);
  };
  handleMouseOver = (e: Event): void => {
    e.preventDefault();
    const {note, mouseDown} = this.props;
    if (mouseDown) {
      this.play(note);
    }
  };
  handleMouseDown = (e: Event): void => {
    e.preventDefault();
    this.play(this.props.note);
  };
  handleMouseUp = (e: Event): void => {
    e.preventDefault();
    this.stop(this.props.note);
  };
  handleMouseOut = (e: Event): void => {
    e.preventDefault();
    this.stop(this.props.note);
  };
  play = (note: string): void => {
    this.props.onPlay(note);
  };
  stop = (note: string): void => {
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

export default Key;
