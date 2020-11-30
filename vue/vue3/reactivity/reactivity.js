/*
    map: WeakMap {
        target: {
            key: [effect1, effect2, ...]
        }
    }
*/

const targetMap = new WeakMap()
const effectStack = [] // 临时存储 effect ，用于执行

// 收集依赖（追踪依赖）
function track(target, key) {
    if (effectStack.length > 0) {
        const effect = effectStack[effectStack.length - 1]
        if (effect) {
            // 初始化
            // 判断map中target对应的map是否存在，没有则创建
            let depMap = targetMap.get(target)
            if (!depMap) {
                depMap = new Map()
                targetMap.set(target, depMap)
            }
            // 判断target对应的map中是否存在key，没有则创建
            let deps = depMap.get(key)
            if (!deps) {
                deps = new Set()
                depMap.set(key, deps)
            }
            // 收集依赖（双向存储）
            if (!deps.has(effect)) {
                deps.add(effect)
                effect.deps.push(deps)
            }
        }
    }
}

// 触发effect
function trigger(target, key, info) {
    const depMap = targetMap.get(target)
    if (!depMap || !key) return
    const deps = depMap.get(key) // target对应的map中找 effect 集合

    const effects = new Set()
    const computed = new Set()
    deps.forEach(effect => {
        if (effect.computed) {
            computed.add(effect)
        } else {
            effects.add(effect)
        }
    })
    effects.forEach(effect => effect())
    computed.forEach(computed => computed())
}

const observeHandler = {
    get(target, key) {
        const ret = Reflect.get(target, key)

        // @todo 收集依赖到全局map
        track(target, key)

        return ret // typeof ret === 'object'
    },
    set(target, key, value) {
        const info = {
            oldValue: Reflect.get(target, key),
            newValue: value
        }
        Reflect.set(target, key, value)

        // @todo 响应，执行依赖相关effect
        trigger(target, key, info)
    }
}

function reactive(target) {
    const observed = new Proxy(target, observeHandler)
    return observed
}

function effect(fn, options = {}) {
    const e = createReactiveEffect(fn, options)
    if (!options.lazy) {
        e()
    }
    return e
}

function createReactiveEffect(fn, options = {}) {
    const effect = function effect(...args) {
        return run(effect, fn, args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}

// 真正执行 effect
function run(effect, fn, args) {
    if (effectStack.indexOf(effect) === -1) {
        try {
            effectStack.push(effect)
            return fn(...args)
        } finally {
            effectStack.pop() // effect 执行完成后移除当前执行的 effect
        }
    }
}

function computed(fn) {
    const runner = effect(fn, {
        computed: true,
        lazy: true
    })
    return {
        effect: runner,
        get value() {
            return runner()
        }
    }
}