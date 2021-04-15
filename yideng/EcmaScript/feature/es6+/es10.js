/*
    flat()
    flatMap()
*/
const arr = [1, 2, 3, [4, 5]];
console.log(arr.flat());
const arr1 = [1, 2, 3, [4, 5, [6, 7]]];
console.log(arr1.flat());
console.log(arr1.flat(2)); // 指定深度
const arrN = [1, 2, [3, 4, [5, 6, [7, 8, [9, 0, [-1]]]]]];
console.log(arrN.flat(Infinity)); // 任意层
const arrEmpty = [1, 2, , , , 3];
console.log(arrEmpty.flat());

/*
    Object.fromEntries()
        对象自身可枚举属性的键值对数组
    Object.entries()
*/

/*
    trimStart()
    trimEnd()
*/

/*
    Symbol.prototype.description
*/

/*
    catch参数可以省略
*/
try {
    
} catch {
    
}

/*
    JSON.stringify 优化
*/

/*
    Array.prototype.sort()
        旧的v8：快速排序，不稳定，时间复杂度较高
        新的v8：混合排序，TimSort()
*/
const list = [
    {name: 'm', age: 10},
    {name: 'yd', age: 8},
    {name: 'www', age: 8},
]
list.sort((a,b) => a.age - b.age)
console.log(list);
/*
    非稳定排序
        [
            {name: 'www', age: 8},
            {name: 'yd', age: 8},
            {name: 'm', age: 10},
        ]
        改变了 age:8 两项的顺序

    稳定排序
        [
            {name: 'yd', age: 8},
            {name: 'www', age: 8},
            {name: 'm', age: 10},
        ]
        不会改变 age:8 两项的顺序
*/

/*
    新的 Function.toString()
        Object.prototype.toString()
    标准化返回精确字符串
*/


/*
    BigInt 任意精度整数
    
    基本数据类型
        Number String Boolean undefined null Symbol BigInt
    复杂数据类型
        Object
*/
console.log(Number.MAX_SAFE_INTEGER); // 2^53

let num1 = 1n;
let num10 = 10n;
console.log(typeof num1); // bigint
console.log(num1 === 1) // false
console.log(num1 == 1) // true
console.log(num10 - num1); // 9n
// console.log(num10 - 1); // TypeError
console.log(BigInt(100)); // 100n

/*
    标准化 globalThis 对象
        在任何平台访问全局属性
*/
console.log(globalThis);


























