// @flow

function toArrayPath(stringPath: string): Array<string> {
  return stringPath.split('.');
}

function toStringPath(arrayPath: Array<string>): string {
  return arrayPath.join('.');
}

export {toArrayPath, toStringPath};
