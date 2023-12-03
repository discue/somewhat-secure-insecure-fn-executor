'use strict'

//Freezing objects defined in base-objects.txt
Object.freeze(global["Number"])
Object.freeze(global["BigInt"])
Object.freeze(global["Math"])
Object.freeze(global["Date"])
Object.freeze(global["String"])

//Freezing objects defined in custom-lib-functions.txt
Object.freeze(global["atob"])
Object.freeze(global["btoa"])
Object.freeze(global["isObject"])
Object.freeze(global["isPromise"])
Object.freeze(global["isArray"])

//Freezing objects defined in errors.txt
Object.freeze(global["Error"])
Object.freeze(global["AggregateError"])
Object.freeze(global["EvalError"])
Object.freeze(global["RangeError"])
Object.freeze(global["ReferenceError"])
Object.freeze(global["SyntaxError"])
Object.freeze(global["TypeError"])
Object.freeze(global["URIError"])

//Freezing objects defined in fundamental-objects.txt
Object.freeze(global["Object"])
Object.freeze(global["Function"])
Object.freeze(global["Boolean"])
Object.freeze(global["Symbol"])

//Freezing objects defined in global-functions.txt
Object.freeze(global["escape"])
Object.freeze(global["unescape"])
Object.freeze(global["eval"])
Object.freeze(global["isFinite"])
Object.freeze(global["isNaN"])
Object.freeze(global["parseFloat"])
Object.freeze(global["parseInt"])
Object.freeze(global["decodeURI"])
Object.freeze(global["decodeURIComponent"])
Object.freeze(global["encodeURI"])
Object.freeze(global["encodeURIComponent"])

//Freezing objects defined in indexed-collections.txt
Object.freeze(global["Array"])
Object.freeze(global["Int8Array"])
Object.freeze(global["Uint8Array"])
Object.freeze(global["Uint8ClampedArray"])
Object.freeze(global["Int16Array"])
Object.freeze(global["Uint16Array"])
Object.freeze(global["Int32Array"])
Object.freeze(global["Uint32Array"])
Object.freeze(global["BigInt64Array"])
Object.freeze(global["BigUint64Array"])
Object.freeze(global["Float32Array"])
Object.freeze(global["Float64Array"])

//Freezing objects defined in internationalization.txt
Object.freeze(global["Intl"])

//Freezing objects defined in keyed-collections.txt
Object.freeze(global["Map"])
Object.freeze(global["Set"])
Object.freeze(global["WeakMap"])
Object.freeze(global["WeakSet"])

//Freezing objects defined in memory-management.txt
Object.freeze(global["WeakRef"])
Object.freeze(global["FinalizationRegistry"])

//Freezing objects defined in reflection.txt
Object.freeze(global["Reflect"])
Object.freeze(global["Proxy"])

//Freezing objects defined in structured-data.txt
Object.freeze(global["ArrayBuffer"])
Object.freeze(global["SharedArrayBuffer"])
Object.freeze(global["DataView"])
Object.freeze(global["Atomics"])
Object.freeze(global["JSON"])