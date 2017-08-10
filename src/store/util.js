// @flow

import {assocIn} from 'icepick';
import {get} from 'lodash';
import {toStringPath} from '../util/path';

export type ActionType = string;

export type StandardAction = {
  type: string,
  payload?: any,
  error?: ?boolean,
  meta?: any
};

function createModuleUpdater(type: string): Function {
  return (path: Array<string>, value: any): StandardAction => ({
    type,
    payload: {
      path,
      value
    }
  });
}

function createToneUpdater(
  toneRefPath: Array<string>,
  actionType: ActionType
): Function {
  return (path: Array<string>, value: any): Function => (
    dispatch: Function,
    getState: Function
  ): void => {
    const toneRef = get(getState(), toneRefPath);
    if (toneRef) {
      toneRef.set(toStringPath(path), value);
      dispatch(createModuleUpdater(actionType)(path, value));
    }
  };
}

function moduleUpdateReducer(state: Object, action: StandardAction): Object {
  if (action.payload) {
    return assocIn(state, action.payload.path, action.payload.value);
  }
  return state;
}

export {createToneUpdater, moduleUpdateReducer};
