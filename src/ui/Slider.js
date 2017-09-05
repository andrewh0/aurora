// @flow

import React, {Component} from 'react';
import styled from 'styled-components';

const thumbBorderWidth = 1;
const thumbHeight = 20;
const thumbWidth = thumbHeight;
const trackBackgroundColor = '#777';
const trackBackgroundColorFocus = `#B8E0FF`;
const trackHeight = 8;
const trackBorderRadius = 4;
const trackBorder = `1px solid #010101`;
const sliderBoxShadow = `1px 1px 1px black, 0px 0px 1px #0d0d0d`;

const thumbStyles = `
  // box-shadow: ${sliderBoxShadow};
  border: ${thumbBorderWidth}px solid black;
  height: ${thumbHeight}px;
  width: ${thumbWidth}px;
  border-radius: 100%;
  background: white;
  cursor: pointer;
`;

const trackStyles = `
// box-shadow: ${sliderBoxShadow};
  width: 100%;
  height: ${trackHeight}px;
  cursor: pointer;
  background: ${trackBackgroundColor};
  border-radius: ${trackBorderRadius}px;
  border: ${trackBorder};
`;

const StyledInput = styled.input`
  /* https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/ */
  -webkit-appearance: none;
  width: 200px;
  background: transparent;
  margin-bottom: 4px;
  margin-right: 4px;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: ${-0.5 * thumbWidth + 2 * thumbBorderWidth + 1}px;
    ${thumbStyles};
  }

  &::-moz-range-thumb {
    ${thumbStyles};
  }

  &::-ms-thumb {
    ${thumbStyles};
  }

  &::-webkit-slider-runnable-track {
    ${trackStyles};
  }

  &:focus::-webkit-slider-runnable-track {
    background: ${trackBackgroundColorFocus};
  }

  &::-moz-range-track {
    ${trackStyles};
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
    height: ${trackHeight}px;
    border-width: 16px 0;
  }
  &::-ms-fill-lower {
    background: ${trackBackgroundColor};
    border: ${trackBorder};
    border-radius: ${trackBorderRadius}px;
    box-shadow: ${sliderBoxShadow};
  }
  &:focus::-ms-fill-lower {
    background: ${trackBackgroundColorFocus};
  }
  &::-ms-fill-upper {
    background: ${trackBackgroundColor};
    border: ${trackBorder};
    border-radius: ${trackBorderRadius}px;
    box-shadow: ${sliderBoxShadow};
  }
  &:focus::-ms-fill-upper {
    background: ${trackBackgroundColorFocus};
  }
`;

const SliderWrapper = styled.div`margin-bottom: 8px;`;

const SliderLabel = styled.p`
  margin-top: 0;
  margin-bottom: 4px;
`;

const SliderInputWrapper = styled.div`display: flex;`;

class Slider extends Component {
  state = {
    value: this.props.value
  };
  handleChange = (e: Event & {target: HTMLInputElement}) => {
    this.props.onChange(+e.target.value);
    this.setState({value: +e.target.value});
  };
  render() {
    const {min, max, step, label, value} = this.props;
    return (
      <SliderWrapper>
        <SliderLabel>
          {label}
        </SliderLabel>
        <SliderInputWrapper>
          <StyledInput
            onChange={this.handleChange}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
          />
          {this.state.value}
        </SliderInputWrapper>
      </SliderWrapper>
    );
  }
}

export default Slider;
