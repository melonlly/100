let target = {
    id: 'target'
}
let handler = {}
var proxy = new Proxy(target, handler)

// id属性会访问同一个值
console.log(target.id === proxy.id) // true

// 代理和目标不是同一个对象
console.log(target === proxy) // false

// 因为 Proxy.prototype === undefined ，所有不能使用 instanceof 操作符
try {
    console.log(target instanceof Proxy) // err
    console.log(proxy instanceof Proxy) // err
} catch (error) {
    console.log(error)
}

console.log(target.hasOwnProperty('id')) // true
console.log(proxy.hasOwnProperty('id')) // true

console.log('=======================================================')

/*
    使用代理的主要目的是可以定义捕获器（拦截器）
*/
// get
// proxy[property]、proxy.property、Object.create(proxy)[property] 等操作都会触发 get
const getHandler = {
    /**
     * get
     * @param {*} trapTarget 目标对象
     * @param {*} property 属性名
     * @param {*} receiver 代理对象
     */
    get(trapTarget, property, receiver) {
        console.log(trapTarget === target)
        console.log(property)
        /*
            直接通过 proxyGet.id 访问，receiver === proxyGet
            如果copy了一个新的代理对象
                Object.create(proxyGet)
                receiver就是这个新的代理对象
            因此 receiver 是实际访问属性时的那个对象，而不一定是 new Proxy 生成的对象
        */
        // console.log(receiver === proxyGet)
        console.log(receiver === copyProxy)
        return 'get'
    }
}
const proxyGet = new Proxy(target, getHandler)
// console.log(proxyGet.id)
const copyProxy = Object.create(proxyGet)
console.log(copyProxy.id)
// console.log(Object.create(proxyGet)['id']) // get

console.log('=======================================================')

let reflectHandler = {
    // 1
    // get() {
    //     return Reflect.get(...arguments)
    // }

    // 2
    get: Reflect.get
}
// or 完全空代理，全反射
let reflectProxy = new Proxy(target, Reflect)
console.log(reflectProxy.id === target.id) // true
/*
    利用反射，可以对原返回值进行一些修饰
*/
reflectHandler = {
    get() {
        return Reflect.get(...arguments) + '!!!'
    }
}
console.log(new Proxy(target, reflectHandler).id) // target!!!

console.log('=======================================================')

/*
    “捕获器不变式”：通常会防止捕获器定义出现反常行为
*/
const obj = {}
Object.defineProperty(obj, 'foo', {
    configurable: false,
    writable: false,
    value: 'bar'
})
try {
    console.log(new Proxy(obj, {
        get() {
            return 'xxx'
        }
    }).foo)
} catch (error) {
    console.log(error)
}

console.log('=======================================================')

/*
    可撤销代理 revocable()
        撤销操作是不可逆的
*/
var { proxy, revoke } = Proxy.revocable(target, {
    get() {
        return 'get'
    }
})
console.log(proxy.id) // target
revoke() // 撤销
try {
    console.log(proxy.id)
} catch (error) {
    console.log(error)
}

console.log('=======================================================')

/*
    某些情况下应该优先使用 反射api
        大多数 反射api 在 Object 类型上都有对应的方法
        Object 上的api适用于通用程序，而 反射api 适用于对象的控制和操作
    
    状态标记，表示执行是否成功，布尔值
        Reflect.defineProperty()
        Reflect.preventExtensions()
        Reflect.setPrototypeOf()
        Reflect.set()
        Reflect.deleteProperty()
        一些情况下，可用于取代 Object 上对应的api（如果使用Object进行操作，会抛出错误）
    
    用 反射api 替代操作符
        Reflect.get()               // 访问
        Reflect.set()               // 设置
        Reflect.has()               // in / with
        Reflect.deleteProperty()    // delete
        Reflect.construct()         // new
    
    Reflect.apply()
*/

console.log('=======================================================')

/*
    多层代理
*/
const firstProxy = new Proxy(target, {
    get() {
        console.log('first proxy')
        return Reflect.get(...arguments)
    }
})
const secondProxy = new Proxy(firstProxy, {
    get() {
        console.log('second proxy')
        return Reflect.get(...arguments) // 必须触发原始get，以触发下一层代理
    }
})
console.log(secondProxy.id)

console.log('=======================================================')

/*
    代理的问题
        1. this
*/
target = {
    isEqualsProxy() {
        return this === thisProxy
    }
}
const thisProxy = new Proxy(target, {})
console.log(target.isEqualsProxy()) // false
console.log(thisProxy.isEqualsProxy()) // true
// looks no problem ？ 
const wm = new WeakMap()
class User {
    constructor(userId) {
        wm.set(this, userId)
    }
    set id(userId) {
        wm.set(this, userId)
    }
    get id() {
        return wm.get(this)
    }
}
const user = new User('melon')
console.log(user.id) // melon
const userProxy = new Proxy(user, {})
console.log(userProxy.id) // undefined
/*
    why？
        User使用自身实例（目标对象）作为WeakMap的key，而代理对象并不等于目标对象，
        代理对象尝试从自身访问id时，此时的this是代理对象，所以从WeakMap中取出对应的value值时，就是undefined
    how to fix it？
        代理 User 类本身
*/
const UserClassProxy = new Proxy(User, {})
const userInsProxy = new UserClassProxy('hhh')
console.log(userInsProxy.id) // hhh
