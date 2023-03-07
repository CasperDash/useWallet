/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepEqual = (a: any, b: any) => {
  // check if a and b are both null or undefined
  if (a === null && b === null) return true;
  if (a === undefined && b === undefined) return true;

  // check if a and b are of the same type
  if (typeof a !== typeof b) return false;

  // check if a and b are both primitive types
  if (typeof a !== 'object') return a === b;

  // check if a and b have the same number of properties
  if (Object.keys(a as Record<any, any>).length !== Object.keys(b as Record<any, any>).length) return false;

  // check if all properties of a exist in b and are equal
  // eslint-disable-next-line no-restricted-syntax
  for (const key in a) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};
