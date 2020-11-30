/*
    对象创建
        1.工厂模式
*/
function createPerson(name, age, job) {
    let o = new Object()
    o.name = name
    o.age = age
    o.job = job
    o.say = function() {
        console.log(`my name is ${ this.name }, ${ this.age } years old, job is ${ this.job }`)
    }
    return o
}
let melon = createPerson('melon', 28, '1024')
melon.say()
console.log(melon)
// 对象标识问题 - 不知道新创建的对象是什么类型？

console.log('==========================================================')

/*
    构造函数模式
*/
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.say = function() {
        console.log(`my name is ${ this.name }, ${ this.age } years old, job is ${ this.job }`)
    }
}
melon = new Person('melon', 28, '1024')
melon.say()
/*
    相对于工厂模式
        1.没有显示的创建对象
        2.属性和方法绑定到this
        3.没有return

    创建构造函数的实例，需要使用 new 操作符，会进行如下操作
        1.在内存创建一个新对象
        2.新对象的 [[Prototype]] 特性被赋值为构造函数的 prototype 属性
        3.构造函数内部的 this 赋值为这个新对象
        4.执行构造函数
        5.如果构造函数有返回值，则返回该值，否则，返回刚创建的新对象
*/
console.log(`构造函数的 prototype ->`)
console.log(Person.prototype)
console.log(Person.prototype instanceof Object) // true
/*
    构造函数的问题
        其定义个方法会在每一个实例上都创建一遍
*/
// for (let i = 0; i < 10000; i++) {
//     (function (i) {
//         return new Person('melon' + i, i, '1024')
//     })(i)
// }
// for (let i = 0; i < 10000; i++) {
//     new Object()
// }

console.log('==========================================================')

/*
    原型模式
        原型：只要创建一个函数，就会按照特定规则为这个函数创建一个 prototype 属性（指向原型对象）
        原型对象：所有原型对象会自动获得一个 constructor 属性，指回与之关联的构造函数
    
    实例与构造函数原型之间有直接的联系
    实例与构造函数之间没有直接联系
*/
// 构造函数可以是函数表达式，也可以是函数声明
function Melon() {}
// 构造函数声明之后，就有一个与之关联的原型对象
console.log(typeof Melon.prototype) // object
console.log(Melon.prototype) // 原型对象，包含一个指向构造函数的constructor
console.log(Melon.prototype.constructor === Melon) // true
/*
    原型链：实例的 __proto__ 会指向其构造函数的原型对象，最终终止于 Object 的原型对象
        Object 原型的原型是 null
*/
console.log(Melon.prototype.__proto__ === Object.prototype) // true
console.log(Melon.prototype.__proto__.constructor === Object) // true
console.log(typeof Melon.prototype.__proto__.constructor) // function
console.log(Object.prototype.__proto__) // null

const xigua = new Melon()
/*
      实例  通过 __proto__ 链接到原型对象，它实际上指向 [[Prototype]]
    构造函数通过 prototype 链接到原型对象

    实例和构造函数没有直接联系

    原型链：通过 原型对象 将 实例和构造函数 "链接"起来
*/
console.log(xigua.__proto__ === Melon.prototype) // true
console.log(xigua.__proto__.constructor === Melon) // true
/*
    instanceof 检查实例的原型链中是否包含指定的构造函数的原型
*/
console.log(xigua instanceof Melon) // true
console.log(xigua instanceof Object) // true
console.log(Melon.prototype instanceof Object) // true
/*
    当没有 __proto__ 时
        使用 isPrototypeOf() 确定两个对象之间是否是原型关系
        使用 Object.getPrototypeOf() 获取对象的原型对象
*/
console.log(Melon.prototype.isPrototypeOf(xigua)) // true
console.log(Object.getPrototypeOf(xigua) === Melon.prototype) // true
console.log(Object.getPrototypeOf(xigua) === xigua.__proto__) // true

/*
    原型模式的问题
        1.弱化了向构造函数传递初始化参数的能力，会导致所有实例默认取得相同的属性值
        2.共享特性 （主要问题）
*/
// 真正问题来自包含 引用值 的属性
Melon.prototype = {
    constructor: Melon,
    name: 'xigua',
    age: 28,
    friends: ['xixi', 'haha'], // 含 引用值 的属性
    say() {
        console.log(this.name)
    }
}
const m1 = new Melon()
const m2 = new Melon()
m1.friends.push('melon')
console.log(m2.friends) // ['xixi', 'haha', 'melon']
