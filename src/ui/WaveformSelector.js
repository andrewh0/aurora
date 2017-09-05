// @flow

import React, {Component} from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  margin: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const SvgWrapper = styled.div`display: inline-block;`;

const unselectedStrokeColor = '#000000';
const selectedStrokeColor = '#e2cb00';
const strokeWidth = 2;

const Sine = ({isSelected}) =>
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50">
    <g
      fill="none"
      strokeWidth={strokeWidth}
      stroke={isSelected ? selectedStrokeColor : unselectedStrokeColor}
      strokeMiterlimit="10">
      <path d="M.586 25.02c3.052-7.326 6.104-14.65 12.207-14.65C25 10.37 25 39.668 37.205 39.668" />
      <path d="M12.793 10.37C25 10.37 25 39.666 37.205 39.666c6.104 0 9.157-7.324 12.21-14.648" />
    </g>
  </StyledSvg>;

const Square = ({isSelected}) =>
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="-1 0 52 52">
    <path
      fill="none"
      strokeWidth={strokeWidth}
      stroke={isSelected ? selectedStrokeColor : unselectedStrokeColor}
      strokeMiterlimit="10"
      d="M.5 24V10.5h24v29h25V24"
    />
  </StyledSvg>;

const Triangle = ({isSelected}) =>
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50">
    <path
      fill="none"
      strokeWidth={strokeWidth}
      stroke={isSelected ? selectedStrokeColor : unselectedStrokeColor}
      strokeMiterlimit="10"
      d="M.59 24.976l12.107-14.68 24.286 29.237L49.41 24.976"
    />
  </StyledSvg>;

const Sawtooth = ({isSelected}) =>
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50">
    <path
      fill="none"
      strokeWidth={strokeWidth}
      stroke={isSelected ? selectedStrokeColor : unselectedStrokeColor}
      strokeMiterlimit="10"
      d="M.575 24.35L24.5 9.97v29.115L49.285 24.35"
    />
  </StyledSvg>;

class WaveformSelector extends Component {
  handleWaveformSelect = (waveform: string) => (e: SyntheticMouseEvent) => {
    e.preventDefault();
    this.props.onWaveformChange(waveform);
  };
  render() {
    const {currentWaveform} = this.props;
    return (
      <div>
        <SvgWrapper onClick={this.handleWaveformSelect('fatsine')}>
          <Sine isSelected={currentWaveform === 'fatsine'} />
        </SvgWrapper>
        <SvgWrapper onClick={this.handleWaveformSelect('fattriangle')}>
          <Triangle isSelected={currentWaveform === 'fattriangle'} />
        </SvgWrapper>
        <SvgWrapper onClick={this.handleWaveformSelect('fatsquare')}>
          <Square isSelected={currentWaveform === 'fatsquare'} />
        </SvgWrapper>
        <SvgWrapper onClick={this.handleWaveformSelect('fatsawtooth')}>
          <Sawtooth isSelected={currentWaveform === 'fatsawtooth'} />
        </SvgWrapper>
      </div>
    );
  }
}

export default WaveformSelector;
