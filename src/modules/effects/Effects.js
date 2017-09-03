// @flow

import React, {Component} from 'react';
import styled from 'styled-components';

import Distortion from './Distortion';
import Phaser from './Phaser';
import Chorus from './Chorus';
import Equalizer from './Equalizer';
import Reverb from './Reverb';
import Delay from './Delay';
import Compressor from './Compressor';

const EffectsWrapper = styled.div`width: 100%;`;

class Effects extends Component {
  state = {
    open: false
  };
  handleToggleOpen = (e: SyntheticMouseEvent): void => {
    e.preventDefault();
    this.setState({open: !this.state.open});
  };
  render() {
    return (
      <div>
        <h1 onClick={this.handleToggleOpen}>Effects</h1>
        {this.state.open
          ? <EffectsWrapper>
              <Distortion />
              <Phaser />
              <Chorus />
              <Equalizer />
              <Reverb />
              <Delay />
              <Compressor />
            </EffectsWrapper>
          : null}
      </div>
    );
  }
}

export default Effects;
