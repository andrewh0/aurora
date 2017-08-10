import {assocIn} from 'icepick';
import {get} from 'lodash';
import {toStringPath} from '../util/path';

function createModuleUpdater(type: string): Function {
  return (path: Array<string>, value: any) => ({
    type,
    payload: {
      path,
      value
    }
  });
}

function createToneUpdater(
  toneRefPath: Array<string>,
  actionType: string
): Function {
  return (path: Array<string>, value) => (dispatch, getState) => {
    const toneRef = get(getState(), toneRefPath);
    if (toneRef) {
      toneRef.set(toStringPath(path), value);
      dispatch(createModuleUpdater(actionType)(path, value));
    }
  };
}

function moduleUpdateReducer(state, action) {
  return assocIn(state, action.payload.path, action.payload.value);
}

export {createToneUpdater, moduleUpdateReducer};
