// @flow

import Tone from 'tone';
import {createToneUpdater, moduleUpdateReducer} from './util';

import type {StandardAction} from './util';

const UPDATE_FILTER = 'UPDATE_FILTER';

const defaultFilter = new Tone.Filter(1000, 'lowpass', -12);

const filterInitialState = {
  toneRef: defaultFilter,
  ...defaultFilter.get()
};

const updateFilter = createToneUpdater(['filter', 'toneRef'], UPDATE_FILTER);

function filter(
  filterState: Object = filterInitialState,
  action: StandardAction
): Object {
  switch (action.type) {
    case UPDATE_FILTER:
      return moduleUpdateReducer(filterState, action);
    default:
      return filterState;
  }
}

export {filter, updateFilter};
