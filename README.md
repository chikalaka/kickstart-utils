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
```
