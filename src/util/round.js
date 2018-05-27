// @flow

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#A_better_solution
function round(number: number, precision: number = 0): number {
  const shift = (number, exponent) => {
    const numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

export { round };
