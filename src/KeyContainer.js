import React, {Component} from 'react';
import styled from 'styled-components';

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

class KeyContainer extends Component {
  handleTouchStart = e => {
    e.preventDefault();
    e.stopPropagation();
    this.play(this.props.note, null, true);
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

export default KeyContainer;
