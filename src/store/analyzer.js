// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_ANALYZER = 'UPDATE_ANALYZER';

const defaultAnalyzer = new Tone.Analyser('waveform', '1024');

const analyzerInitialState = {
  toneRef: defaultAnalyzer,
  ...defaultAnalyzer.get()
};

const updateAnalyzer = createToneUpdater(
  ['analyzer', 'toneRef'],
  UPDATE_ANALYZER
);

function analyzer(
  analyzerState: Object = analyzerInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_ANALYZER:
      return moduleUpdateReducer(analyzerState, action);
    default:
      return analyzerState;
  }
}

export {analyzer, updateAnalyzer};
