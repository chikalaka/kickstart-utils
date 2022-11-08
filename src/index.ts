export type Nullish = null | undefined
export type Primitive = string | number | bigint | boolean | undefined | null

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

/**
 * <i>**match**</i> a value instead of switch case
 *
 * <code>match("foo", { foo: 2, bar: 3, default: 5 }); // 2</code>
 *
 * <code>match("hello", { foo: 2, bar: 3, default: 5 }); // 5</code>
 *
 * @param value value to be matched
 * @param switchObject compare the value to the object keys
 * @return the matched value, or default, if provided
 */
export const match = <T extends string | number | symbol, P extends any>(
  value: T,
  switchObject: Partial<Record<T | "default", P>>
): P | undefined => {
  if (switchObject[value]) return switchObject[value]
  return switchObject["default"]
}

const isTypeof =
  <T>(type: string) =>
  (v: any): v is T =>
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
export const isObject = (v: any): v is object =>
  !!v && typeof v === "object" && v.constructor === Object

export const isString = isTypeof<string>("string")
export const isFunction = isTypeof<Function>("function")

/**
 * Check if a value is <i>undefined</i> or <i>null</i>
 * @param v
 */
export const isNullish = (v: any): v is Nullish => v === undefined || v === null

export const isBoolean = isTypeof<boolean>("boolean")

/**
 * Shortcut for {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray Array.isArray}
 */
export const isArray = Array.isArray
export const isError = (e: any): e is Error =>
  (e instanceof Error && isString(e.message)) ||
  (e && e.stack && isString(e.stack) && isString(e.message)) ||
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
export const isNumber = (v: any, includeString = false) => {
  if (includeString && isString(v)) {
    const reg = /^-?\d*\.?\d*$/
    return reg.test(v)
  } else {
    if (Number.isNaN(v)) return false
    return isTypeof<number>("number")(v)
  }
}
/**
 * With an option to check on a string
 *
 * <code>isInteger(3.2) // false</code>
 *
 * <code>isInteger("12", true) // true</code>
 * @param v
 * @param includeString
 */
export const isInteger = (v: any, includeString = false) =>
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
export const isEmpty = (v: any) => {
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
