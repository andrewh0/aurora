// @flow

import Tone from 'tone';

import type {StandardAction} from './util';

const defaultMeterL = new Tone.Meter('level', 0.9);
const defaultMeterR = new Tone.Meter('level', 0.9);

const meterInitialState = {
  left: {
    toneRef: defaultMeterL,
    ...defaultMeterL.get()
  },
  right: {
    toneRef: defaultMeterR,
    ...defaultMeterR.get()
  }
};

function meter(
  meterState: Object = meterInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    default:
      return meterState;
  }
}

export {meter};
