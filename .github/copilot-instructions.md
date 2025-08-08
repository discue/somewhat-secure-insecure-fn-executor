# Somewhat Secure Insecure Function Executor

A Node.js library that executes untrusted JavaScript code in an isolated V8 environment using the `isolated-vm` package. The library provides security features like blocking eval, freezing globals, and capturing console logs while running user-supplied scripts safely.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

**CRITICAL NODE.JS REQUIREMENT**: This project requires the latest Node.js LTS version due to the `isolated-vm` dependency. NEVER attempt to build with older versions.

### Bootstrap, Build, and Test
- Install the latest Node.js LTS version using your preferred method (nvm, package manager, or official installer)
- `npm ci` -- installs dependencies including isolated-vm (takes ~3-5 seconds). NEVER CANCEL - Set timeout to 60+ seconds.
- `npm test` or `./test.sh` -- runs 266 comprehensive tests (takes ~1.5 seconds). NEVER CANCEL - Set timeout to 30+ seconds for safety.
- `npm run lint` -- runs ESLint on lib/ directory (takes <1 second). NEVER CANCEL - Set timeout to 10+ seconds.

### Development Workflow
- Ensure you're using the latest Node.js LTS version (`node --version`)
- `npm ci` -- install dependencies after any package.json changes (3-5 seconds)
- `npm test` or `./test.sh` -- run full test suite to validate changes (1.5 seconds)
- `npm run lint` -- validate code style and JSDoc compliance (<1 second)

## Validation

- **ALWAYS validate Node.js version first**: `node --version` should show the latest LTS version
- **ALWAYS run complete test suite** after making any code changes to ensure security features remain intact
- **ALWAYS test actual functionality** by running a simple test script that exercises the main API:
  ```javascript
  const executor = require('./lib/index.js');
  
  // Test basic execution
  const result1 = await executor('return 1 + 1');
  console.log('Basic test:', result1.result === 2);
  
  // Test argument passing
  const result2 = await executor('return args.a + args.b', { a: 5, b: 3 });
  console.log('Args test:', result2.result === 8);
  
  // Test security (should fail)
  const result3 = await executor('eval("malicious")');
  console.log('Security test:', result3.error !== undefined);
  
  // Test console capture
  const result4 = await executor('console.log("test"); return "done"');
  console.log('Console test:', result4.logs.log.includes('test'));
  ```
- **ALWAYS run `npm run lint`** before committing or the CI (.github/workflows/lints.yml) will fail
- **NEVER CANCEL** test runs - they complete in ~1.5 seconds but set 30+ second timeouts for safety
- **NEVER CANCEL** build commands - npm ci takes 3-5 seconds but set 60+ second timeouts for safety

## Common Tasks

### Repository Structure
```
.
├── .github/
│   ├── workflows/          # CI pipelines (tests.yml, lints.yml, release.yml)
│   └── dependabot.yml      # Dependency updates config
├── lib/
│   ├── index.js            # Main entry point and API
│   └── isolate/            # Core isolation functionality
│       ├── isolate.js      # V8 isolate management
│       ├── script-compiler.js  # Script compilation
│       ├── script-runner.js    # Script execution
│       ├── helper-scripts.js   # Utility functions
│       ├── built-ins/      # Built-in globals and security
│       └── scripts/        # Runtime scripts
├── test/
│   ├── global-mocha-setup.js  # Test configuration
│   └── spec/               # Test files matching lib/ structure
├── package.json            # Dependencies and scripts
├── .eslintrc.js           # ESLint configuration
├── test.sh               # Simple test runner script
└── README.md             # API documentation and examples
```

### Key Components
- **lib/index.js**: Main API entry point - exports async function that accepts script and optional args
- **lib/isolate/isolate.js**: Core V8 isolate creation and management
- **lib/isolate/script-runner.js**: Script compilation and execution logic
- **lib/isolate/built-ins/**: Security policies and global object freezing
- **test/spec/**: Comprehensive test suite with 266 tests covering all security features

### Build Timing Expectations
- **npm ci**: ~3-5 seconds (NEVER CANCEL - isolated-vm requires compilation - set 60+ second timeout)
- **npm test** or **./test.sh**: ~1.5 seconds for 266 tests (NEVER CANCEL - set 30+ second timeout)
- **npm run lint**: <1 second (NEVER CANCEL - set 10+ second timeout)

### Security Features Tested
- Blocks `eval()`, `Function()`, `new Function()`, and `WebAssembly.*`
- Freezes all global objects and built-ins (Object, Array, Math, etc.)
- Blocks access to Node.js APIs (process, require, etc.)
- Blocks access to Web APIs (fetch, setTimeout, etc.)
- Captures and returns console logs (log, error, warn, info)
- Provides execution timing and error details

### CI Pipeline Info
- **tests.yml**: Runs on push, uses Node.js LTS, executes `./test.sh`
- **lints.yml**: Runs ESLint on lib/ directory
- **release.yml**: Handles versioning and npm publishing
- **Timeout**: CI tests have 5-minute timeout, lints have 10-minute timeout

### Common Debugging
- If isolated-vm fails to compile: Verify Node.js version is the latest LTS version
- If tests fail after changes: Check that security restrictions haven't been broken
- If lint fails: Run `npm run lint` locally to see specific issues
- If coverage seems broken: Use `npm test` directly rather than `npm run coverage`

### Package.json Scripts Reference
```json
{
  "test": "mocha --recursive --check-leaks --timeout 5000 --file test/global-mocha-setup.js",
  "coverage": "nyc mocha --check-leaks --timeout 5000 --file test/global-mocha-setup.js", 
  "lint": "eslint -c .eslintrc.js lib",
  "create-types": "npx tsc lib/index.js --declaration --emitDeclarationOnly --allowJs --lib es2022"
}
```

Note: `./test.sh` is a simple wrapper that runs `npm test` and is used by the CI pipeline.

## Working with the API

The main export is an async function that executes JavaScript in an isolated environment:

```javascript
const executor = require('@discue/somewhat-secure-insecure-fn-executor');

// Basic usage
const result = await executor('return 1 + 1');
// { result: 2, logs: {...}, durationMillis: 0 }

// With arguments  
const result = await executor('return args.sum', { sum: 42 });
// { result: 42, logs: {...}, durationMillis: 0 }

// Error handling
const result = await executor('eval("bad")');
// { error: {...}, logs: { error: ['...'] }, durationMillis: 1 }
```

Always test changes against the security model - the library should block dangerous operations while allowing safe computations and returning detailed execution information.