function isFat(oscType) {
  return typeof oscType === 'string' && oscType.indexOf('fat') === 0;
}

export {isFat};
