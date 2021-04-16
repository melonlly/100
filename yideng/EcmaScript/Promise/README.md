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
2. Promise 实例化后直接 resolve
3. 