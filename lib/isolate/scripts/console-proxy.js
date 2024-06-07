const logs = ['error', 'info', 'log', 'warn']

const fns = logs.reduce((context, next) => {
    context[next] = (...params) => {
        params.forEach((param) => {
            /* eslint-disable-next-line no-undef */
            if (isObject) {
                param = param.toString()
            }
            context[next]._cache.push(param)
        })
    }
    context[next]._cache = []
    return context
}, {})

/* eslint-disable-next-line no-global-assign */
console = new Proxy(console, {
    get(_obj, prop) {
        return fns[prop]
    }
})
