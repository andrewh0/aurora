// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import Tone from 'tone';
import StartAudioContext from 'startaudiocontext';

const Button = styled.button`
  width: 100vw;
  height: 100vh;
  opacity: 0.7;
  background-color: black;
  color: white;
  position: absolute;
  z-index: 2;
  border: none;
  text-transform: uppercase;
  display: ${props => (props.isHidden ? 'none' : 'block')}
  font-weight: 700;
  font-size: 36px;
  cursor: pointer;
`;

class StartAudioContextButton extends Component {
  state = {
    isHidden: false
  };
  componentWillMount() {
    if (document.body) {
      document.body.classList.add('no-scroll');
    }
  }
  handleClick = (e: Event): void => {
    e.preventDefault();
    StartAudioContext(Tone.context, null);
    this.setState({isHidden: true});
    if (document.body) {
      document.body.classList.remove('no-scroll');
    }
  };
  render() {
    return (
      <Button onClick={this.handleClick} isHidden={this.state.isHidden}>
        Click to start
      </Button>
    );
  }
}

export default StartAudioContextButton;
