/**
 * Challenge: #2257 - MinusOne
 * Difficulty: Hard
 * Source: https://github.com/type-challenges/type-challenges/issues/38224
 * Author: SNTL84 (https://github.com/SNTL84)
 *
 * Strategy:
 *   Treat N as a decimal string → subtract 1 digit-by-digit from the right
 *   → propagate borrow left → trim leading zeros.
 *
 * TypeScript 4.8+ required (uses `infer X extends T` shorthand)
 */

// Digit decrement map
type PrevDigit = {
  '0': '9'; '1': '0'; '2': '1'; '3': '2'; '4': '3';
  '5': '4'; '6': '5'; '7': '6'; '8': '7'; '9': '8';
}

/**
 * Splits a string into [head, lastChar]
 * e.g. SplitTail<"123"> → ["12", "3"]
 */
type SplitTail<S extends string, Head extends string = ""> =
  S extends `${infer F}${infer R}`
    ? R extends ""
      ? [Head, F]
      : SplitTail<R, `${Head}${F}`>
    : never

/**
 * Recursively subtract 1 from a numeric string with borrow propagation
 * e.g. SubtractOne<"100"> → "099" (before trimming)
 */
type SubtractOne<S extends string> =
  SplitTail<S> extends [infer H extends string, infer L extends string]
    ? L extends '0'
      ? H extends ""
        ? never // MinusOne<0> guard — would go negative
        : `${SubtractOne<H>}9`
      : L extends keyof PrevDigit
        ? `${H}${PrevDigit[L]}`
        : never
    : never

/**
 * Strips leading zeros, but preserves standalone "0"
 * e.g. TrimZeros<"099"> → "99", TrimZeros<"0"> → "0"
 */
type TrimZeros<S extends string> =
  S extends `0${infer R}`
    ? R extends ""
      ? "0"
      : TrimZeros<R>
    : S

/**
 * MinusOne<T> — subtract 1 from a positive integer type
 *
 * @example
 * MinusOne<5>   // → 4
 * MinusOne<100> // → 99
 * MinusOne<0>   // → never (guard)
 */
export type MinusOne<T extends number> =
  T extends 0
    ? never
    : `${T}` extends infer S extends string
      ? TrimZeros<SubtractOne<S>> extends infer R extends string
        ? R extends `${infer N extends number}`
          ? N
          : never
        : never
      : never

// ---- Tests ----
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
]
