/**
 * Challenge: #898 - Includes
 * Difficulty: Medium
 * Author: SNTL84 (https://github.com/SNTL84)
 *
 * Strategy: Walk the tuple head-by-head, use Equal for precise matching.
 * Avoids false positives with assignability-only checks.
 */
import type { Equal } from '@type-challenges/utils'

export type Includes<T extends readonly unknown[], U> =
  T extends [infer Head, ...infer Tail]
    ? Equal<Head, U> extends true
      ? true
      : Includes<Tail, U>
    : false
