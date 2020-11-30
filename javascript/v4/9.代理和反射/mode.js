/*
    代理模式
        1.跟踪属性访问 get/set
        2.隐藏属性
*/
const hidden = ['foo', 'bar']
const target = {
    'foo': 1,
    'bar': 2,
    'baz': 3
}
const proxy = new Proxy(target, {
    get(target, property) {
        return hidden.includes(property) ? undefined : Reflect.get(...arguments)
    },
    has(target, property) {
        return hidden.includes(property) ? undefined : Reflect.has(...arguments)
    }
})
console.log(proxy.foo, proxy.baz) // undefined 3
console.log('bar' in proxy, 'baz' in proxy) // false true

/*
    3.属性验证
        可以决定允许或拒绝赋值
        函数可以通过 apply 校验入参
        构造函数可以通过 construct 校验参数
*/
const onlyNumberProxy = new Proxy(target, {
    set(target, property, value) {
        return typeof value === 'number' && Reflect.set(...arguments)
    }
})
onlyNumberProxy.foo = 10
onlyNumberProxy.foo = '10'
console.log(onlyNumberProxy.foo) // 10

console.log('=========================================')

/*
    数据绑定与可观察对象
*/
const userList = [] // 收集
class User {
    constructor(name) {
        this._name = name
    }
}
const UserProxy = new Proxy(User, {
    construct() {
        const user = Reflect.construct(...arguments)
        userList.push(user)
        return user
    }
})
new UserProxy('melon')
new UserProxy('xigua')
new UserProxy('haha')
console.log(userList) // [ User, User, User ]

const task = []
function emit(v) {
    console.log(v)
}
const taskProxy = new Proxy(task, {
    set(target, property, value, receiver) {
        const success = Reflect.set(...arguments) // 是否 set 成功
        if (success) {
            emit(Reflect.get(target, property, receiver)) // 触发额外的任务
        }
        return success
    }
})
taskProxy.push('111') // 111
taskProxy.push('222') // 222
taskProxy.push('333') // 333