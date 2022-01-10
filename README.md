# kickstart-utils
Every project should kickstart with some basic utils :)

## Usage
`npm install kickstart-utils`

```
import { run, match, cn } from 'kickstart-utils'

let myFunc = null
run(myFunc) // null

myFunc = () => console.log("hello")
run(myFunc) // "hello"

let switchExpression = "foo"
const value = match(switchExpression , {
  foo: 2,
  bar: 3,
  default: 5
}) // 2

let condition = false
let classFromProp = undefined
const chainedCSSClasses = cn("a", classFromProp, "b", condition && "c", "d") // "a b d"

let myVar = 3
toArray(myVar) // [3]
toArray([myVar]) // [3]

let array = [{ id: "1_2", foo: 2 }, { id: "3_4", bar: 3 }]
toDictionary(array, "id") // { 1_2: {id: "1_2", foo: 2 }, 3_4: { id: "3_4", bar: 3 } }
```
