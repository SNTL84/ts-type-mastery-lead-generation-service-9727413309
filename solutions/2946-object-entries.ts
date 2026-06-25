/**
 * Challenge: #2946 - ObjectEntries
 * Difficulty: Hard
 * Author: SNTL84 (https://github.com/SNTL84)
 *
 * Strategy: Distribute over keys, handle optional properties
 * by removing the undefined from the value when key is required.
 */

export type ObjectEntries<T> = {
  [K in keyof T]-?: T[K] extends undefined
    ? [K, undefined]
    : [K, Required<T>[K]]
}[keyof T]
