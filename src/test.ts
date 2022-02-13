import {
    isBoolean,
    isFunction,
    isNullish,
    isObject,
    isString,
    match,
    run,
    isArray,
    isError,
    isNumber,
    isInteger, cn, noop, toArray, toDictionary, stopEventPropagation, isEmpty
} from "./index";

describe("run", ()=>{
    it("check values that are not a function", () => {
        expect(run("abc", 1,2,3)).toBe("abc")
        expect(run(null, 1,2,3)).toBe(null)
        expect(run(undefined, 1,2,3)).toBe(undefined)
        expect(run(23)).toBe(23)
        expect(run(true)).toBe(true)
        expect(run({a:1})).toEqual({a:1})
    })
    it("check on functions", () =>{
        expect(run(()=>2)).toBe(2)
        expect(run((v)=>v,2)).toBe(2)
        expect(run((a,b,c)=>a+b+c,1,2,3)).toBe(6)
    })
})

describe("match", () =>{
    it("simple",()=>{
        let switchExpression = "foo"
        const switchObject = {
            foo: 2,
            bar: 3,
            default: 5
        }
        expect(match("foo" , switchObject)).toBe(2)
        expect(match("default" , switchObject)).toBe(5)
        expect(match("not exist" , switchObject)).toBe(5)
        expect(match("not exist" , switchObject)).toBe(5)
        expect(match(2 , switchObject)).toBe(5)
        expect(match(2 , {})).toBe(undefined)
    })
    it ("array", () =>{
        expect(match(2 , [1,2,3])).toBe(3)
    })
})

test("isObject", ()=>{
    expect(isObject(null)).toBe(false)
    expect(isObject("hello")).toBe(false)
    expect(isObject(String("hello"))).toBe(false)
    expect(isObject(new Object([1,2]))).toBe(false)
    expect(isObject([{a:1}])).toBe(false)

    expect(isObject(new Object({a:1}))).toBe(true)
    expect(isObject(new Object({}))).toBe(true)
    expect(isObject({a:1})).toBe(true)
})

test("isString",()=>{
    expect(isString(undefined)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString([1,2])).toBe(false)

    expect(isString("")).toBe(true)
    expect(isString("abc")).toBe(true)
    expect(isString(String("abc"))).toBe(true)
})

test("isFunction",()=>{
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction([1,2])).toBe(false)

    expect(isFunction(()=>{})).toBe(true)
})

test("isNullish",()=>{
    expect(isNullish([1,2])).toBe(false)
    expect(isNullish("")).toBe(false)

    expect(isNullish(undefined)).toBe(true)
    expect(isNullish(null)).toBe(true)
})

test("isBoolean",()=>{
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean("")).toBe(false)
    expect(isBoolean(0)).toBe(false)

    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(Boolean("false"))).toBe(true)
    expect(isBoolean(Boolean(false))).toBe(true)
})

test("isArray",()=>{
    expect(isArray(null)).toBe(false)
    expect(isArray({a:1})).toBe(false)

    expect(isArray([1,2])).toBe(true)
    expect(isArray(Array(1,2))).toBe(true)
})

test("isError",()=>{
    expect(isError(undefined)).toBe(false)
    expect(isError(null)).toBe(false)
    expect(isError(new Object({message:"msg"}))).toBe(false)

    expect(isError(Error())).toBe(true)
    expect(isError(new Error("hi"))).toBe(true)
})

test("isNumber",()=>{
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber([1])).toBe(false)
    expect(isNumber("2")).toBe(false)
    expect(isNumber(NaN)).toBe(false)
    expect(isNumber(NaN, true)).toBe(false)
    expect(isNumber("123..2144", true)).toBe(false)
    expect(isNumber("123.21.44", true)).toBe(false)
    expect(isNumber(".123.2144", true)).toBe(false)
    expect(isNumber(".1232144.", true)).toBe(false)

    expect(isNumber(123.2144)).toBe(true)
    expect(isNumber("123.2144", true)).toBe(true)
    expect(isNumber(".1232144", true)).toBe(true)
    expect(isNumber("1232144.", true)).toBe(true)
    expect(isNumber("0.1232144", true)).toBe(true)
    expect(isNumber("1232144.0", true)).toBe(true)
})

test("isInteger",()=>{
    expect(isInteger(undefined)).toBe(false)
    expect(isInteger([1])).toBe(false)
    expect(isInteger("2")).toBe(false)
    expect(isInteger(NaN)).toBe(false)
    expect(isInteger(NaN, true)).toBe(false)
    expect(isInteger(123.2144)).toBe(false)
    expect(isInteger(".1232144", true)).toBe(false)

    expect(isInteger("123.", true)).toBe(true)
    expect(isInteger("123.0", true)).toBe(true)
    expect(isInteger(123.0)).toBe(true)
    expect(isInteger("1232144", true)).toBe(true)
    expect(isInteger(1232144, true)).toBe(true)
})

test("cn", ()=>{
    const arr = [
        "a",()=>"a",["a"],{a:"a"},true,false,undefined,null,2,NaN,"b","c"
    ]
    // @ts-ignore
    expect(cn(...arr)).toBe("a b c")
})

test("noop",()=>{
    expect(noop).toBe(noop)
})

test("toArray",()=>{
    expect(toArray(undefined)).toEqual([undefined])
    expect(toArray([undefined])).toEqual([undefined])
    expect(toArray(0)).toEqual([0])
    expect(toArray([0])).toEqual([0])
    expect(toArray(false)).toEqual([false])
    expect(toArray([false])).toEqual([false])
    expect(toArray(2)).toEqual([2])
    expect(toArray([2])).toEqual([2])
    expect(toArray([[]])).toEqual([[]])
    expect(toArray([])).toEqual([])
})

test("toDictionary",()=>{
    const arr = [
        {id:1,name:"aaa"},
        {id:"hi",name:"bbb"},
        {id:3,name:"ccc"}
    ]
    const expected = {
        1: {id:1,name:"aaa"},
        "hi": {id:"hi",name:"bbb"},
        3: {id:3,name:"ccc"}
    }
    expect(toDictionary(arr,"id")).toEqual(expected)
    expect(toDictionary([],"id")).toEqual({})
})

test("stopEventPropagation",()=>{
    expect(stopEventPropagation(undefined)).toBe(undefined)
    expect(stopEventPropagation(null)).toBe(undefined)
})

describe("isEmpty",()=>{
    it("string",()=>{
        expect(isEmpty(String("?"))).toBe(false)
        expect(isEmpty("false")).toBe(false)
        expect(isEmpty("    ")).toBe(true)
    })
    it("object",()=>{
        expect(isEmpty({a:{}})).toBe(false)
        expect(isEmpty({a:1})).toBe(false)
        expect(isEmpty({})).toBe(true)
        expect(isEmpty(new Object({}))).toBe(true)
    })
    it("array",()=>{
        expect(isEmpty([null])).toBe(false)
        expect(isEmpty([undefined])).toBe(false)
        expect(isEmpty([" "])).toBe(false)
        expect(isEmpty(Array(1,2))).toBe(false)
        expect(isEmpty(Array())).toBe(true)
        expect(isEmpty([])).toBe(true)
    })
    it("Error",()=>{
        expect(isEmpty(new Error())).toBe(false)
        expect(isEmpty(new Error("err"))).toBe(false)
    })
    it("Number",()=>{
        expect(isEmpty(Number(23))).toBe(false)
        expect(isEmpty(Infinity)).toBe(false)
        expect(isEmpty(0)).toBe(false)
        expect(isEmpty(NaN)).toBe(true)
    })
    it("function", ()=>{
        expect(isEmpty(() => {})).toBe(false)
    })
    it("boolean", ()=>{
        expect(isEmpty(Boolean(true))).toBe(false)
        expect(isEmpty(false)).toBe(true)
    })
})