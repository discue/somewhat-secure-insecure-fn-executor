
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

## Example
```js
const executor = require('@discue/somewhat-secure-insecure-fn-executor')

const { result } = await executor('return 1+1')
console.log(result) // 2
```

## Run tests
To run tests, run the following command

```bash
./test.sh
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

