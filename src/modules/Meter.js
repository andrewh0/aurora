// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const mapStateToProps = ({
  meter: {
    left: {toneRef: meterL},
    right: {toneRef: meterR}
  }
}) => ({meterL, meterR});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

const MeterBar = styled.canvas`
  width: 20px;
  height: 100px;
  border: 1px solid black;
`;

class UnconnectedMeter extends Component {
  frameId: number;
  meterLeft: HTMLCanvasElement;
  meterRight: HTMLCanvasElement;
  componentDidMount() {
    this.startLoop();
  }
  componentWillUnmount() {
    this.stoploop();
  }
  startLoop(): void {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.getData);
    }
  }
  stoploop(): void {
    window.cancelAnimationFrame(this.frameId);
  }
  getData = (): void => {
    const {meterL, meterR} = this.props;
    const leftValue = meterL.value * 0.8;
    const rightValue = meterR.value * 0.8;
    this.drawMeter(leftValue, this.meterLeft);
    this.drawMeter(rightValue, this.meterRight);
    this.frameId = window.requestAnimationFrame(this.getData);
  };
  drawMeter = (value: number, canvasElement: HTMLCanvasElement): void => {
    const width = 20;
    const height = 100;
    const barHeight = value * height;
    const context = canvasElement.getContext('2d');
    canvasElement.width = width;
    canvasElement.height = height;
    context.clearRect(0, 0, width, height);
    if (value > 0.8) {
      context.fillStyle = '#FF0000';
    } else {
      context.fillStyle = '#00FF00';
    }
    context.fillRect(0, height - barHeight, width, barHeight);
  };
  setLeftBarRef = (el: HTMLCanvasElement): void => {
    this.meterLeft = el;
  };
  setRightBarRef = (el: HTMLCanvasElement): void => {
    this.meterRight = el;
  };
  render() {
    return (
      <div>
        <MeterBar innerRef={this.setLeftBarRef} />
        <MeterBar innerRef={this.setRightBarRef} />
      </div>
    );
  }
}

const Meter = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedMeter);

export default Meter;
