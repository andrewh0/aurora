// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const mapStateToProps = ({analyzer: {toneRef: analyzer}}) => ({analyzer});

const mapDispatchToProps = (dispatch: Function): Object => ({dispatch});

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100px;
  border: 2px solid #333;
  border-radius: 4px;
  background-color: white;
  margin: 8px;
`;

class UnconnectedAnalyzer extends Component {
  frameId: number;
  canvas: HTMLCanvasElement;
  componentDidMount() {
    this.startLoop();
  }
  componentWillUnmount() {
    this.stoploop();
  }
  startLoop(): void {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.analyzeWaveform);
    }
  }
  stoploop(): void {
    window.cancelAnimationFrame(this.frameId);
  }
  analyzeWaveform = (): void => {
    const {analyzer} = this.props;
    const data = analyzer.analyse();
    this.drawWaveform(data);
    this.frameId = window.requestAnimationFrame(this.analyzeWaveform);
  };
  drawWaveform(values: Uint8Array): void {
    const canvasHeight = 150;
    const canvasWidth = 2000;
    const waveContext = this.canvas.getContext('2d');
    waveContext.clearRect(0, 0, canvasWidth, canvasHeight);
    waveContext.beginPath();
    waveContext.lineJoin = 'round';
    waveContext.lineWidth = 1;
    waveContext.moveTo(0, (values[0] / 255) * canvasHeight);
    for (let i of values.keys()) {
      const val = values[i] / 255;
      const x = canvasWidth * (i / values.length);
      const y = val * canvasHeight;
      waveContext.lineTo(x, y);
    }
    waveContext.stroke();
  }
  setCanvasRef = (el: HTMLCanvasElement): void => {
    this.canvas = el;
  };
  render() {
    return (
      <div>
        <h1>Analysis</h1>
        <StyledCanvas innerRef={this.setCanvasRef} />
      </div>
    );
  }
}

const Analyzer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedAnalyzer);

export default Analyzer;
