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

export const cn = (...classes) =>
    classes.filter(identity).filter(isString).join(" ")
