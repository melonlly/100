/*
    常见面向对象语言都支持：接口继承和实现继承
        因为在 ECMAScript 中函数没有签名，所以接口继承是不可能实现的
    
    实现继承主要通过 原型链 来实现

    原型链
        实例的原型 [[Prototype]] 和构造函数的原型 prototype 都指向了原型对象（链接了实例和构造函数）
        如果 原型对象 也是另一个类型的实例？
        这样这个 原型对象 作为实例，与另一个类型的构造函数也构成了联系
        依次类推，实例 和 原型 之间就构成了一条原型链（原型链的尽头是 Object.prototype === null）
*/
// 原型链继承
// 父类
function SuperType() {
    this.property = true
    this.colors = ['red', 'green', 'blue']
}
SuperType.prototype.getSuperValue = function() {
    return this.property
}
// 子类
function SubType() {
    this.subProperty = false
}
console.log(SubType.prototype) // 默认子类的原型中带有子类的构造函数 constructor
/*
    继承父类 SuperType
        存在问题：重写了 子类 原型，使子类构造函数指向父类构造函数
*/
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function() {
    return this.subProperty
}
const superIns = new SuperType()
const subIns = new SubType()
console.log(subIns.getSubValue()) // false
console.log(subIns.getSuperValue()) // true
console.log(subIns.constructor) // Super
console.log(superIns.constructor === subIns.constructor) // true

/*
    原型链的问题 1
        当原型中包含引用值的时候，引用值会在所有实例间共享，因此通常 属性 会在构造函数中定义，而不会在原型上定义
        SubType.prototype = new SuperType() 修改子类原型为父类实例，使原本的实例属性变为原型属性
*/
subIns.colors.push('yellow')
console.log(subIns.colors) // ["red", "green", "blue", "yellow"]
console.log(superIns.colors) //  ["red", "green", "blue"]
const subIns1 = new SubType() // 所有实例公用了同一属性 colors
console.log(subIns1.colors) // ["red", "green", "blue", "yellow"]
subIns1.colors.push('black') // 在任何一个实例中修改属性的引用值，都会反映到其他所有实例中
console.log(subIns.colors) // ["red", "green", "blue", "yellow", 'black']
/*
    原型链的问题 2
        子类在实例化时不能给父类型的构造函数传参
*/

/*
    盗用构造函数
        在子类构造函数中，调用一遍父类构造函数，使定义在父类中的属性，在子类也创建一次
*/
function func0() {
    return `global function func0: ${ this.name }`
}
function SuperTypeX(name) {
    this.name = name
    this.colors = ["red", "green", "blue"]
    this.func0 = func0
    this.func1 = function() {
        return `Super inner function func1: ${ this.name }`
    }
}
function SubTypeX() {
    SuperTypeX.call(this, 'melon') // 可以在子类中向父类构造函数传参
    this.age = 28
}
SuperTypeX.prototype.func2 = function() {
    return `Super prototype func2: ${ this.name }`
}
const subX1 = new SubTypeX()
subX1.colors.push('black')
const subX2 = new SubTypeX()
console.log(subX2.colors) // ["red", "green", "blue"]
/*
    盗用构造函数的问题
        1. 也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用
        2. 子类不能访问父类原型上定义的方法
*/
console.log(subX2.func0 && subX2.func0()) // global function func0: melon
console.log(subX2.func1 && subX2.func1()) // Super inner function func1: melon
console.log(subX2.func2 && subX2.func2()) // undefined

/*
    组合继承 = 原型链继承 + 盗用构造函数
        重写原型，依旧存在 构造函数 问题
*/
// 接上面 盗用构造函数 方法，重写 子类 原型，即可实现组合继承
SubTypeX.prototype = new SuperTypeX() // 继承父类原型上所有方法
const subX3 = new SubTypeX()
console.log(subX3.func2 && subX3.func2()) // Super prototype func2: melon
console.log(SubTypeX.prototype.constructor === SuperTypeX) // true
console.log(subX3.constructor) // SuperTypeX

/*
    原型式继承
*/
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}

/*
    寄生式组合继承
        解决 重写原型 导致的构造函数问题
*/
// 接上面 组合继承 方法，重新定义 子类 原型指向的构造函数，修正为子类构造函数
SubTypeX.prototype.constructor = SubTypeX
const subX4 = new SubTypeX()
console.log(SubTypeX.prototype.constructor === SubTypeX) // true
console.log(subX4.constructor) // SubTypeX