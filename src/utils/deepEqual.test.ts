import { describe, expect, it } from 'vitest';

import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  it('returns true for two null values', () => {
    expect(deepEqual(null, null)).toBe(true);
  });

  it('returns true for two undefined values', () => {
    expect(deepEqual(undefined, undefined)).toBe(true);
  });

  it('returns false for a null and undefined values', () => {
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it('returns false for two values with different types', () => {
    expect(deepEqual(null, 'null')).toBe(false);
  });

  it('returns true for two equal primitive values', () => {
    expect(deepEqual(1, 1)).toBe(true);
  });

  it('returns false for two unequal primitive values', () => {
    expect(deepEqual(1, 2)).toBe(false);
  });

  it('returns true for two equal objects', () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
  });

  it('returns false for two objects with different numbers of properties', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('returns false for two objects with unequal properties', () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
});
