// @flow

import React from 'react';
import Slider from './Slider';

const PercentSlider = (props: {
  onChange: Function,
  value: number,
  label: string
}) => <Slider min={0} max={1} step={0.1} {...props} />;

export default PercentSlider;
