// @flow

function isFat(oscType: ?string) {
  return typeof oscType === 'string' && oscType.indexOf('fat') === 0;
}

export {isFat};
