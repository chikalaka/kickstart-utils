# [kickstart-utils](https://www.npmjs.com/package/kickstart-utils) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chikalaka/kickstart-utils/blob/main/LICENSE)

Every project should kickstart with some basic utils :)

With no dependencies! 
## Installation
```shell
npm install kickstart-utils
```

## API

- [Utils](#utils)
    - [cn](#cn)
    - [isEmpty](#isEmpty)
    - [match](#match)
    - [noop](#noop)
    - [random](#random)
    - [run](#run)
    - [stopEventPropagation](#stopEventPropagation)
    - [toArray](#toArray)
    - [toDictionary](#toDictionary)
- [Type check](#type-check) []
    - [isArray](#isArray)
    - [isBoolean](#isBoolean)
    - [isError](#isError)
    - [isFunction](#isFunction)
    - [isInteger](#isInteger)
    - [isNullish](#isNullish)
    - [isNumber](#isNumber)
    - [isObject](#isObject)
    - [isString](#isString)
- [Types](#types) {}
    - [Nullish](#Nullish)
    - [Primitive](#Primitive)

### Utils

### cn

Stands for class-names - returns a string removing anything unrelated to css class names.

```typescript jsx
import {cn} from 'kickstart-utils';

<div class={cn('foo', a && 'bar', b, 'baz')}/> // class="foo baz" 
```

### isEmpty

Check if falsy (except 0) or empty object

```js
import { isEmpty } from 'kickstart-utils';

isEmpty(null) // true
isEmpty(" ") // true
isEmpty([]) // true
isEmpty({}) // true
```

### match
Instead of cumbersome switch case, match for cleaner, reusable code
```js
import { match } from 'kickstart-utils';

const value = match("foo" , {
  foo: 2,
  bar: 3,
  default: 5
}) // 2
```

### noop
For any time we need a noop function
```jsx
import { noop } from 'kickstart-utils';

<div onClick={noop} /> 
```

### random
Random, or random between two numbers
```js
import { random } from 'kickstart-utils'

random(4, 8) // 4, 5, 6, 7, 8
```

### run
For the times we're not sure if the value is a function.
For most cases, if we are sure the value is either a function or undefined, we can use `myFunc?.(args)`.
```js
import { run } from 'kickstart-utils';

const myFunc = (text) => console.log('hi', text)
run(myFunc, 'foo') // 'hi foo'
run('Not a function') // 'Not a function'
```

### stopEventPropagation
Instead of `event => event.stopPropagation()`
```jsx
import { stopEventPropagation } from 'kickstart-utils';

<input onChange={stopEventPropagation} />
```

### toArray
Convert anything to an array
```js
import { toArray } from 'kickstart-utils';

toArray(null) // [null]
toArray('hello') // ['hello']
toArray([1, 2, 3]) // [1, 2, 3]
```

### toDictionary
Convert array of objects to a dictionary
```js
import { toDictionary } from 'kickstart-utils';

const arr = [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]
toDictionary(arr, 'id') // { 1: { id: 1, name: 'foo' }, 2: { id: 2, name: 'bar' } }
```

### Type check (with ts type guards)
Most of them are self-explanatory.
### isArray

### isBoolean

### isError

### isFunction

### isInteger
With an option to check on a string.

### isNullish
Nullish is a type that is either null or undefined.

### isNumber
With an option to check on a string.

### isObject
Check if is an object (not Array, or null)
```js
import { isObject } from 'kickstart-utils';

isObject([{ foo: 'bar' }]) // false
```

### isString

### Types
Some common ts types

### Nullish
null or undefined

### Primitive
js primitive types