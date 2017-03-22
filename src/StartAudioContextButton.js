import React, {Component} from 'react';
import styled from 'styled-components';
import Tone from 'tone';
import StartAudioContext from 'startaudiocontext';

const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: green;
  color: white;
`;

class StartAudioContextButton extends Component {
  handleClick = e => {
    e.preventDefault();
    StartAudioContext(Tone.context, null);
  };
  render() {
    return (
      <Button id="button" onClick={this.handleClick}>
        Start here
      </Button>
    );
  }
}

export default StartAudioContextButton;
