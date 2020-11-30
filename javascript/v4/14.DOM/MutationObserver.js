/*
    MutationObserver （取代被废弃的 MutationEvent）
        可以在 DOM 被修改时异步执行回调 （异步执行！！！）
    
    用 MutationObserver 可以观察整个文档、DOM树的一部分，或某个元素
        还可以观察 元素属性、子节点、文本、或者前三者任意组合的变化
*/
// 基本用法
let observer = new MutationObserver(() => console.log(`DOM was mutated!`))
// 1.关联 DOM，使用 observe()
// 宏任务 setTimeout/setInterval （同步代码、UI rendering、IO等）
setTimeout(() => console.log(`setTimeout async!`), 0)
// ep0：观察 body 元素属性变化
observer = new MutationObserver((mutationRecords, mutationObServer) => {
    console.log(mutationRecords) // 修改的记录
    console.log(mutationObServer) // 观察变化的对象实例
    console.log(`MutationObServer async: <body> attributes changed!`)
})
// 微任务 Promise
new Promise((resolve, reject) => {
    console.log(`create a promise`)
    sleep(1000) // 睡眠 1s ，模拟延时效果
    resolve(111)
}).then(data => {
    console.log(`Promise async: ${ data }!`)
})
observer.observe(document.body, {
    attributes: true
})
document.body.className = 'body'
console.log(`sync: <body> attributes changed!`)

// create a promise
// sync: <body> attributes changed!
// Promise async: 111!
// MutationObServer async: <body> attributes changed!
// setTimeout async!
// （setTimeout设置的是0ms）
// 根据以上执行顺序，可以得出
// 同步 -> Promise -> MutationObServer -> setTimeout

/*
    每一个回调会收到一个 MutationRecord 实例的数组
*/
document.body.setAttribute('foo', 'bar')

// observer.disconnect() // 终止执行回调

/*
    MutationObServerInit 对象用于控制对目标节点的观察范围
        subtree
        attribute
        attributeFilter
        attributeOldValue
        characterData
        characterDataOldValue
        childList
*/

/*
    MutationObServer 接口是出于性能考虑设计的，核心是异步回调与记录队列模型
        为了保证性能，每次变化的信息会保存在 MutationRecord 实例中，然后添加到记录队列，
        -> 仅当之前没有已排期的微任务回调时（队列中微任务长度为0）， -> 由此可知，MutationObServer 回调的优先级是微任务队列中最低的
        才会将观察者注册的回调事件，作为 微任务 调度到任务队列上
    
    takeRecords() 方法
        可以清空记录队列，取出并返回其中的所有 MutationRecord 实例
*/
document.body.className = 'foo'
document.body.className = 'bar'
document.body.className = 'baz'

// 清空记录队列后，就不会再执行观察者回调了
console.log(observer.takeRecords()) // [MutationRecord...]
console.log(observer.takeRecords()) // []

document.body.setAttribute('foo', 'bar') // 再次触发回调

/*
    性能、内存、垃圾回收
        1.MutationObServer 的引用
            MutationObServer 拥有对要观察的目标节点的弱引用（不会妨碍垃圾回收目标节点）
            目标节点却拥有对 MutationObserver 的强引用，如果目标节点从 DOM 中被移除，随之被垃圾回收，则关联的 MutationObServer 也会被垃圾回收
        2.MutationRecord 的引用
            MutationRecord 实例至少包含对已有 DOM 节点的一个引用（如果是 childList 类型，则包含多个节点引用）
            记录队列和回调处理的默认行为是耗尽这个队列，处理每个 MutationRecord，然后让他们超出作用域并被垃圾回收
*/