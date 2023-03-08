/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepEqual = (a: any, b: any) => {
  // check if a and b are both null or undefined
  if (a === null && b === null) return true;
  if (a === undefined && b === undefined) return true;
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) return false;

    let length: number;
    let i: number;

    if (Array.isArray(a) && Array.isArray(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }

    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();

    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]!)) return false;

    for (i = length; i-- !== 0; ) {
      const key = keys[i];

      if (key && !deepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
};
