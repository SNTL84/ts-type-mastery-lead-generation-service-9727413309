/**
 * Challenge: #9 - Deep Readonly
 * Difficulty: Medium
 * Author: SNTL84 (https://github.com/SNTL84)
 *
 * Strategy: Recursively mark all properties as readonly.
 * Functions and primitives are returned as-is.
 */

export type DeepReadonly<T> =
  T extends (...args: any[]) => any
    ? T
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T
