export const run = (func, ...args) => (isFunction(func) ? func(...args) : func)

export const match = (v, switchObject) => {
    if (switchObject[v]) return switchObject[v]
    return switchObject["default"]
}

export const identity = v => v

const isTypeof = type => v => typeof v === type

export const isString = isTypeof("string")
export const isFunction = isTypeof("function")
export const isUndefined = isTypeof("undefined")
export const isBoolean = isTypeof("boolean")
export const { isArray } = Array
export const isError = e =>
    (e instanceof Error) & (typeof e.message !== "undefined")

export const cn = (...classes) =>
    classes.filter(identity).filter(isString).join(" ")

export const noop = () => {}

export const toArray = value => {
    isArray(value) ? value : [value].filter(identity)
}

export const toDictionary = (arr, key) =>
    isArray(arr) ? Object.fromEntries(arr.map((v, i) => [v[key] || i, o])) : {}

export const stopEventPropagation = event => event.stopEventPropagation()

const isObjectEmpty = obj => {
    for (var i in obj) return false
    return true
}

// check isEmpty([" "]) and isEmpty([null])
export const isEmpty = v => {
    if (!v) return true
    if (isString(v)) return !/([^\s])/.test(v)
    return isObjectEmpty(v)
}
