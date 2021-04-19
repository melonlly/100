# 手写 Promise

## Promise 自身的状态

1. state 存放当前的状态
2. value 存放当前状态的值
3. then()，返回一个新的 Promise 实例
4. resolve()，返回一个新的 Promise 实例
5. catch()，返回一个新的 Promise 实例
6. finally()
7. 静态方法，如 Promise.all()、Promise.resolve() ...

## 实际案例

1. 在 setTimeout 中去 resolve
2. Promise 实例化后直接执行同步 resolve
3. 防止多次 resolve（仅第一次 resolve 生效）
4. then 方法链式调用（支持空调用）
5. then 传递 thenable 对象
6. then 传递 promise 对象
7. resolve 传递 promise 对象
8. 循环promise