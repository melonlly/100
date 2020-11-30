/*

    get() 捕获器毁在捕获属性值的操作中被调用

    set() 捕获器毁在设置属性值的操作中被调用
        proxy.property = v
        proxy[property] = v
        Object.create(proxy)[property] = v
        Reflect.set(proxy, property, v, receiver)
    
    has() 属性是否存在 in / with

    defineProperty() 属性是否成功定义

    getOwnPropertyDescriptor() 自身属性描述对象

    deleteProperty() 属性删除

    ownKeys()

    getPrototypeOf() / setPrototypeOf()

    isExtensible() 是否可扩展

    preventExtensions() 是否已经不可扩展

    apply()

    construct() new 

*/