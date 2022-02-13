type Nullish = null | undefined

export const run = <T = any>(func: ((...args: any[]) => T) | T, ...args: any[]): T =>
    isFunction(func) ? func(...args) : func

export const match = (v, switchObject) => {
    if (switchObject[v]) return switchObject[v]
    return switchObject["default"]
}

const isTypeof = <T>(type: string) => (v:any): v is T => typeof v === type

export const isObject = (v: any): v is object =>
    !!v && typeof v === "object" && v.constructor === Object
export const isString = isTypeof<string>("string")
export const isFunction = isTypeof<Function>("function")
export const isNullish = (v:any):v is Nullish => v===undefined||v===null
export const isBoolean = isTypeof<boolean>("boolean")
export const { isArray } = Array
export const isError = (e:any):e is Error =>
    e instanceof Error && typeof e.message !== "undefined"
export const isNumber = (v:any, includeString = false) => {
    if (includeString && isString(v)) {
        const reg = /^-?\d*\.?\d*$/
        return reg.test(v)
    } else {
        if (Number.isNaN(v)) return false
        return isTypeof<number>("number")(v)
    }
}
export const isInteger = (v:any, includeString = false) =>
    Number.isInteger(includeString ? Number(v) : v)

type ClassName  = string | boolean | Nullish

export const cn = (...classes: ClassName[]) =>
    classes.filter(isString).join(" ")

export const noop = () => {}

export const toArray = <T>(v:T): Array<T> =>
    isArray(v) ? v : [v]

export const toDictionary = (arr:object[], key) =>
    isArray(arr) ? Object.fromEntries(arr.map((v, i) => [v[key] || i, v])) : {}

export const stopEventPropagation = (event: Event) => event?.stopPropagation()

const isObjectEmpty = (obj: Object) => {
    for (let i in obj) return false
    return true
}

export const isEmpty = (v:any) => {
    if (v===0) return false
    if (!v) return true
    if (isString(v)) return !/([^\s])/.test(v)
    if(isArray(v)) return v.length===0
    if (isObject(v)) return isObjectEmpty(v)
    return false
}

export const  random = (min = 0, max = 1, float = false) => {
    const rand = Math.random() * (max - min + 1) + min
    return float ? rand : Math.floor(rand)
}
