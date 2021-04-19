// Promise 状态
const STATE = {
    PENDING: "PENDING", // 执行态
    FULFILLED: "FULFILLED", // 完成态
    REJECTED: "REJECTED", // 拒绝态
};

/*
    promise 解决过程
*/
function promiseResolutionProcedure(newPromise, x, resolve, reject) {
    // 判断 promise 对象
    if (newPromise === x) {
        return new TypeError(`Chaining cycle detected for promise #<MyPromise>`); // 避免循环引用
    } else {
        if (x instanceof MyPromise) {
            // 状态判断
            if(x.state === STATE.PENDING) {
                x.then((data) => {
                    promiseResolutionProcedure(
                        newPromise,
                        data,
                        resolve,
                        reject
                    ); // 递归调用
                }, reject);
            } else {
                x.state === STATE.FULFILLED && resolve(x.value)
                x.state === STATE.REJECTED && reject(x.value)
            }
        } else {
            // 判断 thenable 对象
            if (
                x !== null &&
                (typeof x === "object" || typeof x === "function") &&
                typeof x.then === "function"
            ) {
                x.then((data) => {
                    promiseResolutionProcedure(
                        newPromise,
                        data,
                        resolve,
                        reject
                    ); // 递归调用
                }, reject);
            } else {
                resolve(x);
            }
        }
    }
}

class MyPromise {
    constructor(fn) {
        this.state = STATE.PENDING; // 当前状态
        this.value = undefined; // 当前值
        this.resolvedCallbacks = []; // 执行列表
        const resolve = (val) => {
            // 初始化时，resolve(promise || thenable)
            if (typeof val === "object" || typeof val === "function") {
                promiseResolutionProcedure(this, val, resolve, reject)
                return
            }
            // 模拟微任务
            setTimeout(() => {
                if (this.state === STATE.PENDING) {
                    this.state = STATE.FULFILLED;
                    this.value = val;
                    this.resolvedCallbacks.map((callback) => callback(val)); // 依次执行
                }
            });
        };
        const reject = (reason) => {
            this.state = STATE.REJECTED;
            this.value = reason;
        };
        fn(resolve, reject);
    }
    then(onFulfilled = (val) => val) {
        if (this.state === STATE.PENDING) {
            // 返回新Promise（链式调用
            const newPromise = new MyPromise((resolve, reject) => {
                this.resolvedCallbacks.push(() => {
                    const x = onFulfilled(this.value);
                    promiseResolutionProcedure(newPromise, x, resolve, reject);
                });
            });
            return newPromise;
        }
    }
}
