export type Nullish = null | undefined
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | null
  | symbol

/**
 * <i>**run**</i> will trigger if a function, either way it returns the value
 *
 * <code>run(v => v + 2, 1); // 3</code>
 *
 * <code>run("foo", 1); // "foo"</code>
 *
 * @param func
 * @param args
 */
export const run = <T = any>(
  func: ((...args: any[]) => T) | T,
  ...args: any[]
): T => (isFunction(func) ? func(...args) : func)

type ValueUnion<T> = T[keyof T]

/**
 * A utility function that matches a given value against a match object and returns
 * the corresponding value associated with the matched key or the default value, if provided.
 * If no match or default value is found, it returns `undefined`.
 *
 * @template TValue - Allowed types for the value to be matched.
 * @template TMatchObject - Allowed structure for the match object, with an optional default property.
 *
 * @param {TValue} valueToMatch - The value to be matched against the keys in the match object.
 * @param {TMatchObject} matchObject - An object with keys to match against and their corresponding values. Can also have an optional 'default' property.
 *
 * @returns {TMatchObject extends { default: Exclude<any, undefined> } ? ValueUnion<TMatchObject> : undefined | ValueUnion<TMatchObject>}
 * If a match is found or a default value exists, the function returns the corresponding value.
 * If no match or default value is found, the function returns `undefined`.
 *
 * @example
 * const matchObject = {
 *   foo: 1,
 *   bar: 2,
 *   default: 3
 * }
 * match("foo", matchObject) // 1
 * match("qux", matchObject) // 3
 * match("qux", { foo: 1, bar: 2 }) // undefined
 */
export const match = <
  TValue extends string | number | symbol | undefined | null,
  TMatchObject extends
    | {
        [key in Exclude<TValue, undefined | null>]: any
      }
    | ({
        [key in Exclude<TValue, undefined | null>]?: any
      } & { default: Exclude<any, undefined> })
>(
  valueToMatch: TValue,
  matchObject: TMatchObject
): TMatchObject extends { default: Exclude<any, undefined> }
  ? ValueUnion<TMatchObject>
  : undefined | ValueUnion<TMatchObject> => {
  if (valueToMatch && matchObject.hasOwnProperty(valueToMatch)) {
    return matchObject[valueToMatch as Exclude<TValue, undefined | null>]
  }
  // @ts-ignore
  return matchObject["default"]
}

const isTypeof =
  <T>(type: string) =>
  (v: unknown): v is T =>
    typeof v === type

/**
 * Check if is an object, excluding Array and null
 *
 * <code>isObject(null) // false</code>
 *
 * <code>isObject([{ a: 1 }]) // false</code>
 *
 * <code>isObject({ a: 1 }) // true</code>
 * @param v
 */
export const isObject = (v: unknown): v is object =>
  !!v && typeof v === "object" && v.constructor === Object

export const isString = isTypeof<string>("string")
export const isFunction = isTypeof<Function>("function")

/**
 * Check if a value is <i>undefined</i> or <i>null</i>
 * @param v
 */
export const isNullish = (v: unknown): v is Nullish =>
  v === undefined || v === null

export const isBoolean = isTypeof<boolean>("boolean")

/**
 * Shortcut for {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray Array.isArray}
 */
export const isArray = Array.isArray

type ErrorObject = { stack: any; message: any }
export const isError = (e: unknown): e is Error =>
  (e instanceof Error && isString(e.message)) ||
  (e &&
    (e as ErrorObject).stack &&
    isString((e as ErrorObject).stack) &&
    isString((e as ErrorObject).message)) ||
  Object.prototype.toString.call(e) === "[object Error]"

/**
 * With an option to check on a string
 *
 * <code>isNumber(123.456) // true</code>
 *
 * <code>isNumber(".123", true) // true</code>
 * @param v
 * @param includeString
 */
export const isNumber = <T>(
  v: unknown,
  includeString = false
): v is T extends string ? string : number =>
  !isNaN(Number(v)) && (includeString || typeof v === "number")

/**
 * With an option to check on a string
 *
 * <code>isInteger(3.2) // false</code>
 *
 * <code>isInteger("12", true) // true</code>
 * @param v
 * @param includeString
 */
export const isInteger = <T>(
  v: unknown,
  includeString = false
): v is T extends string ? string : number =>
  Number.isInteger(includeString ? Number(v) : v)

type ClassName = string | boolean | Nullish

/**
 * <i>**cn**</i> returns a string removing anything unrelated to css class names
 *
 * <code>cn('foo', false && 'bar', undefined, 'baz'); // "foo baz"</code>
 *
 * @param classes
 * @return {string}
 */
export const cn = (...classes: ClassName[]) =>
  classes.filter(isString).join(" ")

/**
 * A <i>**noop**</i> function
 *
 * <code>noop = (...) => {}</code>
 * @param args
 */
export const noop = (...args: any[]) => {}

/**
 * Convert anything to an Array
 *
 * <code>toArray(null) // [null]</code>
 *
 * <code>toArray('hello') // ['hello']</code>
 *
 * <code>toArray([1, 2, 3]) // [1, 2, 3]</code>
 * @param v
 */
export const toArray = <T>(v: T): T extends any[] ? T : T[] =>
  // @ts-ignore
  isArray(v) ? v : [v]

/**
 * Convert array of objects to a dictionary
 *
 * <code>const arr = [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]</code>
 *
 * <code>toDictionary(arr, 'id')</code>
 *
 * <code>{
 *   1: { id: 1, name: 'foo' },
 *   2: { id: 2, name: 'bar' }
 * }</code>
 * @param arr
 * @param key
 */
export const toDictionary = <T extends Record<any, any>>(
  arr: T[],
  key: string | number
): Record<string, T> =>
  isArray(arr) ? Object.fromEntries(arr.map((v, i) => [v[key] || i, v])) : {}

/**
 * Instead of <code><i>event => event.stopPropagation()</i></code>
 * @param event
 */
export const stopEventPropagation = (event: Event) => event?.stopPropagation()

const isObjectEmpty = (obj: Object) => {
  for (let i in obj) return false
  return true
}

/**
 * <i>**isEmpty**</i> checks if falsy (except 0) or empty object
 *
 * <code>isEmpty(null) // true</code>
 *
 * <code>isEmpty(" ") // true</code>
 *
 * <code>isEmpty([]) // true</code>
 *
 * <code>isEmpty({}) // true</code>
 * @param v
 */
export const isEmpty = (v: unknown) => {
  if (isNullish(v)) return true
  if (isString(v)) return !/([^\s])/.test(v)
  if (isArray(v)) return v.length === 0
  if (isObject(v)) return isObjectEmpty(v)
  return false
}

/**
 * Returns a random number, or a random between min & max
 * @param min - the minimum range
 * @param max - the maximum range
 * @param float - should return float (or integer)
 */
export const random = (min?: number, max?: number, float = false) => {
  if (isNullish(min) || isNullish(max)) return Math.random()
  const add = float ? 0 : 1
  const rand = Math.random() * (max - min + add) + min
  return float ? rand : Math.floor(rand)
}

/**
 * Creates an Array from 0 to n (length)
 *
 * <code>range(3); // [0, 1, 2]</code>
 *
 * @param {number} length
 */
export const range = (length?: number) => Array.from(Array(length || 0).keys())
