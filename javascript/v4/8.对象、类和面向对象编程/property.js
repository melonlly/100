/*
    1.数据属性
        [[Configurable]]
        [[Enumberable]]
        [[Writable]]
        [[Value]]
    
    需要通过 Object.defineProperty() 修改属性的默认特性

    2.访问器属性
        [[Configurable]]
        [[Enumberable]]
        [[Get]]
        [[Set]]
*/
let book = {}
Object.defineProperties(book, {
    year_: {
        value: 2020
    },
    edition: {
        value: 4
    },
    year: {
        get: function() {
            return this.year_
        },
        set: function(v) {
            this.year_ = v
            this.edition++
        }
    }
})

/*
    Object.assign()     对象融合（混入）

    Object.is()         判断两个参数是否相同
*/
console.log(Object.is(true, 1)) // false
console.log(Object.is({}, {})) // false
console.log(Object.is('2', 2)) // false
console.log(Object.is(+0, -0)) // false
console.log(Object.is(+0, 0)) // true
console.log(Object.is(-0, 0)) // false
console.log(Object.is(NaN, NaN)) // true
// 检查超过两个值
function check(x, ...rest) {
    return Object.is(x, rest[0]) && (rest.length < 2 || check(...rest))
}
console.log(check(1, 1, 1)) // true
console.log(check({}, {}, {})) // false