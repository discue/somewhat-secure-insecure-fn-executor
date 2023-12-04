
<p align="center">
<a href="https://www.discue.io/" target="_blank" rel="noopener noreferrer"><img width="128" src="https://www.discue.io/icons-fire-no-badge-square/web/icon-192.png" alt="Vue logo">
</a>
</p>

<br/>
<div align="center">

[![GitHub tag](https://img.shields.io/github/tag/discue/somewhat-secure-insecure-fn-executor?include_prereleases=&sort=semver&color=blue)](https://github.com/discue/somewhat-secure-insecure-fn-executor/releases/)
[![Latest Stable Version](https://img.shields.io/npm/v/@discue/somewhat-secure-insecure-fn-executor.svg)](https://www.npmjs.com/package/@discue/somewhat-secure-insecure-fn-executor)
[![License](https://img.shields.io/npm/l/@discue/somewhat-secure-insecure-fn-executor.svg)](https://www.npmjs.com/package/@discue/somewhat-secure-insecure-fn-executor)
<br/>
[![NPM Downloads](https://img.shields.io/npm/dt/@discue/somewhat-secure-insecure-fn-executor.svg)](https://www.npmjs.com/package/@discue/somewhat-secure-insecure-fn-executor)
[![NPM Downloads](https://img.shields.io/npm/dm/@discue/somewhat-secure-insecure-fn-executor.svg)](https://www.npmjs.com/package/@discue/somewhat-secure-insecure-fn-executor)
<br/>
[![contributions - welcome](https://img.shields.io/badge/contributions-welcome-blue)](/CONTRIBUTING.md "Go to contributions doc")
[![Made with Node.js](https://img.shields.io/badge/Node.js->=18-blue?logo=node.js&logoColor=white)](https://nodejs.org "Go to Node.js homepage")

</div>

# somewhat-secure-insecure-fn-executor
**Don't let the funny title fool you**. There was definitely not enough testing to make sure this library can provide significant security for running untrusted code. 

What it **does**, is to run untrusted code in an isolated environment with a minimum set of APIs to reduce the attack surface.

**Generally:** You should not run untrusted code anywhere.

And if you have to to? Make sure you cover the untrusted code sandbox on various levels:
- Allow only certain functions to be executed
- Disable code generation via e.g. `eval` and `new Function()`
- Do not run code that was was obfuscated
- Run the sandbox with smallest possible set of permissions
- Run the container of the sandbox with smallest possible set of permissions
- Run the smallest number of services in the same account as the sandbox
- more.. :)

## Installation
```bash
npm install @discue/somewhat-secure-insecure-fn-executor
```

## Constraints
- Execution of `eval()`, `Function()`, `new Function()`, and `WebAssembly.*` is not allowed.
- Return values of scripts must be `Primitives`, or `Objects`. `Functions`, `Symbols` and others are not allowed.
- Each script runs in a dedicated environment. The environment is never shared.
- Built-in global variables cannot be changed.

## API
The main export of the module is a function. It expects the following parameters:
1. JS code as `string`
2. Optional: An object to be passed to the script as `args`.

The return value is an object with the following properties:
- **result**: The return value of the script. May be null. 
- **logs**: Logs captured during script execution
- **durationMillis**: Duration of script execution in milliseconds
- **ExecutionError**: Details about a captured error. May be null. 

```js
/**
 * @param {string} script the script to run
 * @param {object} args arguments to pass to the script
 * @returns {ExecutionResult}
 */
const executor = require('@discue/somewhat-secure-insecure-fn-executor')

/**
 * @typedef ExecutionResult
 * @property {any} [result] the return value of the given script
 * @property {Object<String, Array>} logs the logs captured during script execution
 * @property {number} durationMillis duration of the script execution in milliseconds
 * @property {ExecutionError} [error] error details captured during script execution
 */

/**
 * @typedef ExecutionError
 * @property {string} [cause] the cause from the caputured error. May be null.
 * @property {number} [code] the code from the captured error. May be null.
 * @property {string} stack the stack trace from the captured error.
 * @property {string} message the message from the captured error. 
 */

```

## Examples
### Simple script execution
Scripts will be executed in a dedicated environment independent of the main process. The return value of the script will be returned to the caller, too. 
```js
const executor = require('@discue/somewhat-secure-insecure-fn-executor')
const result = await executor('return 1+1')
// {
//   "result": 2,
//   "logs": {
//     "log": [],
//     "error": [],
//     "warn": [],
//     "info": []
//   },
//   "durationMillis": 0
// }
```

### Execution with parameters
To pass parameters to the script, call the executor function with an object as second parameter. The parameter object will be available as `args` for execution of your script.
```js
const executor = require('@discue/somewhat-secure-insecure-fn-executor')
const result = await executor('return args.a + args.b', { a: 1, b: 3 })
// {
//   "result": 4,
//   "logs": {
//     "log": [],
//     "error": [],
//     "warn": [],
//     "info": []
//   },
//   "durationMillis": 0
// }
```

### Node globals are not available
The user provided scripts are executed in a dedicated v8 environment. NodeJS globals are not available in this context. 

```js
const executor = require('@discue/somewhat-secure-insecure-fn-executor')
const result = await executor('process.exit(0)')
// {
//   "logs": {
//     "log": [],
//     "error": [
//       "ReferenceError: process is not defined"
//     ],
//     "warn": [],
//     "info": []
//   },
//   "error": {
//     "message": "process is not defined",
//     "stack": [
//       "ReferenceError: process is not defined",
//       "at userSuppliedScript (file:///user-supplied-script.js:1:1)",
//       "at runtime.js:38:24"
//     ]
//   },
//   "durationMillis": 1
// }
```

### Error handling
Any exceptions occuring during script execution are captured and returned to the caller. The `error` object contains details of the exception like `cause`, `code`, `message`, and `stack`.
```js
const executor = require('@discue/somewhat-secure-insecure-fn-executor')
const result = await executor(`
eval(1+1)
`)
// {
//   "logs": {
//     "log": [],
//     "error": [
//       "Error: \"eval\" is not allowed in this context."
//     ],
//     "warn": [],
//     "info": []
//   },
//   "error": {
//     "message": "\"eval\" is not allowed in this context.",
//     "stack": [
//       "Error: \"eval\" is not allowed in this context.",
//       "at global.<computed> (file:///code-generation.js:1:19)",
//       "at userSuppliedScript (file:///user-supplied-script.js:2:9)",
//       "at runtime.js:38:24"
//     ]
//   },
//   "durationMillis": 0
// }
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

