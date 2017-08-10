import {assocIn} from 'icepick';
import Tone from 'tone';
import {toStringPath} from '../util/path';

const UPDATE_FILTER = 'UPDATE_FILTER';

const defaultFilter = new Tone.Filter(1000, 'lowpass', -12);

const filterInitialState = {
  toneRef: defaultFilter,
  ...defaultFilter.get()
};

function updateFilterState(path, value) {
  return {
    type: UPDATE_FILTER,
    payload: {
      path,
      value
    }
  };
}

function updateFilter(path, value) {
  return (dispatch, getState) => {
    getState().filter.toneRef.set(toStringPath(path), value);
    dispatch(updateFilterState(path, value));
  };
}

function filter(filterState = filterInitialState, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return assocIn(filterState, action.payload.path, action.payload.value);
    default:
      return filterState;
  }
}

export {filter, updateFilter};
