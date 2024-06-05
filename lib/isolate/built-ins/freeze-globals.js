
//Freezing objects defined in assembly.txt
global['WebAssembly'] = Object.freeze(global['WebAssembly'])

//Freezing objects defined in base-objects.txt
global['Number'] = Object.freeze(global['Number'])
global['BigInt'] = Object.freeze(global['BigInt'])
global['Math'] = Object.freeze(global['Math'])
global['Date'] = Object.freeze(global['Date'])
global['String'] = Object.freeze(global['String'])

//Freezing objects defined in custom-lib-functions.txt
global['atob'] = Object.freeze(global['atob'])
global['btoa'] = Object.freeze(global['btoa'])
global['isObject'] = Object.freeze(global['isObject'])
global['isPromise'] = Object.freeze(global['isPromise'])
global['isArray'] = Object.freeze(global['isArray'])
global['run'] = Object.freeze(global['run'])
global['userSuppliedScript'] = Object.freeze(global['userSuppliedScript'])

//Freezing objects defined in errors.txt
global['Error'] = Object.freeze(global['Error'])
global['AggregateError'] = Object.freeze(global['AggregateError'])
global['EvalError'] = Object.freeze(global['EvalError'])
global['RangeError'] = Object.freeze(global['RangeError'])
global['ReferenceError'] = Object.freeze(global['ReferenceError'])
global['SyntaxError'] = Object.freeze(global['SyntaxError'])
global['TypeError'] = Object.freeze(global['TypeError'])
global['URIError'] = Object.freeze(global['URIError'])

//Freezing objects defined in fundamental-objects.txt
global['Object'] = Object.freeze(global['Object'])
global['Function'] = Object.freeze(global['Function'])
global['Boolean'] = Object.freeze(global['Boolean'])
global['Symbol'] = Object.freeze(global['Symbol'])
global['RegExp'] = Object.freeze(global['RegExp'])
global['Promise'] = Object.freeze(global['Promise'])

//Freezing objects defined in global-functions.txt
global['escape'] = Object.freeze(global['escape'])
global['unescape'] = Object.freeze(global['unescape'])
global['eval'] = Object.freeze(global['eval'])
global['isFinite'] = Object.freeze(global['isFinite'])
global['isNaN'] = Object.freeze(global['isNaN'])
global['parseFloat'] = Object.freeze(global['parseFloat'])
global['parseInt'] = Object.freeze(global['parseInt'])
global['decodeURI'] = Object.freeze(global['decodeURI'])
global['decodeURIComponent'] = Object.freeze(global['decodeURIComponent'])
global['encodeURI'] = Object.freeze(global['encodeURI'])
global['encodeURIComponent'] = Object.freeze(global['encodeURIComponent'])

//Freezing objects defined in indexed-collections.txt
global['Array'] = Object.freeze(global['Array'])
global['Int8Array'] = Object.freeze(global['Int8Array'])
global['Uint8Array'] = Object.freeze(global['Uint8Array'])
global['Uint8ClampedArray'] = Object.freeze(global['Uint8ClampedArray'])
global['Int16Array'] = Object.freeze(global['Int16Array'])
global['Uint16Array'] = Object.freeze(global['Uint16Array'])
global['Int32Array'] = Object.freeze(global['Int32Array'])
global['Uint32Array'] = Object.freeze(global['Uint32Array'])
global['BigInt64Array'] = Object.freeze(global['BigInt64Array'])
global['BigUint64Array'] = Object.freeze(global['BigUint64Array'])
global['Float32Array'] = Object.freeze(global['Float32Array'])
global['Float64Array'] = Object.freeze(global['Float64Array'])

//Freezing objects defined in internationalization.txt
global['Intl'] = Object.freeze(global['Intl'])

//Freezing objects defined in keyed-collections.txt
global['Map'] = Object.freeze(global['Map'])
global['Set'] = Object.freeze(global['Set'])
global['WeakMap'] = Object.freeze(global['WeakMap'])
global['WeakSet'] = Object.freeze(global['WeakSet'])

//Freezing objects defined in memory-management.txt
global['WeakRef'] = Object.freeze(global['WeakRef'])
global['FinalizationRegistry'] = Object.freeze(global['FinalizationRegistry'])

//Freezing objects defined in reflection.txt
global['Reflect'] = Object.freeze(global['Reflect'])
global['Proxy'] = Object.freeze(global['Proxy'])

//Freezing objects defined in structured-data.txt
global['ArrayBuffer'] = Object.freeze(global['ArrayBuffer'])
global['SharedArrayBuffer'] = Object.freeze(global['SharedArrayBuffer'])
global['DataView'] = Object.freeze(global['DataView'])
global['Atomics'] = Object.freeze(global['Atomics'])
global['JSON'] = Object.freeze(global['JSON'])

//Freezing global object now
global = Object.freeze(global)