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
        throw new TypeError(`Chaining cycle detected for promise #<MyPromise>`); // 避免循环引用
    } else {
        if (x instanceof MyPromise) {
            // 状态判断
            if (x.state === STATE.PENDING) {
                x.then((data) => {
                    promiseResolutionProcedure(
                        newPromise,
                        data,
                        resolve,
                        reject
                    ); // 递归调用
                }, reject);
            } else {
                x.state === STATE.FULFILLED && resolve(x.value);
                x.state === STATE.REJECTED && reject(x.value);
            }
        } else {
            // 判断 thenable 对象
            if (
                x !== null &&
                (typeof x === "object" || typeof x === "function") &&
                x.then &&
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
        this.rejectedCallbacks = []; // 回绝列表
        const resolve = (val) => {
            /*
                初始化时，resolve(promise || thenable)
                    需要注意特殊对象：Null、Array等
            */
            if (
                val !== null &&
                (typeof val === "object" || typeof val === "function") &&
                val.then &&
                typeof val.then === "function"
            ) {
                promiseResolutionProcedure(this, val, resolve, reject);
                return;
            }
            // 模拟微任务
            setTimeout(() => {
                if (this.state === STATE.PENDING) {
                    this.value = val;
                    this.state = STATE.FULFILLED;
                    this.resolvedCallbacks.map((callback) => callback(val)); // 依次执行
                }
            });
        };
        const reject = (reason) => {
            if (
                reason !== null &&
                (typeof reason === "object" || typeof reason === "function") &&
                reason.then &&
                typeof reason.then === "function"
            ) {
                promiseResolutionProcedure(this, reason, resolve, reject);
                return;
            }
            // 模拟微任务
            setTimeout(() => {
                if (this.state === STATE.PENDING) {
                    this.value = reason;
                    this.state = STATE.REJECTED;
                    this.rejectedCallbacks.map((callback) => callback(reason)); // 依次执行
                }
            });
        };
        fn(resolve, reject);
    }

    then(
        onFulfilled = (val) => val,
        // reject 默认抛出错误
        onRejected = (reason) => {
            throw new Error(reason);
        }
    ) {
        // 已经完成的promise
        if (this.state === STATE.FULFILLED) {
            return new MyPromise((resolve, reject) => {
                const x = onFulfilled(this.value);
                promiseResolutionProcedure(newPromise, x, resolve, reject);
            });
        }
        // 已经回绝的promise
        if (this.state === STATE.REJECTED) {
            return new MyPromise((resolve, reject) => {
                const x = onRejected(this.value);
                promiseResolutionProcedure(newPromise, x, resolve, reject);
            });
        }
        // 未完成的promise
        if (this.state === STATE.PENDING) {
            // 返回新Promise（链式调用）
            const newPromise = new MyPromise((resolve, reject) => {
                this.resolvedCallbacks.push(() => {
                    const x = onFulfilled(this.value);
                    promiseResolutionProcedure(newPromise, x, resolve, reject);
                });
                this.rejectedCallbacks.push(() => {
                    const x = onRejected(this.value);
                    promiseResolutionProcedure(newPromise, x, resolve, reject);
                });
            });
            return newPromise;
        }
    }

    static all(promiseArray) {
        return new MyPromise((resolve, reject) => {
            const resultArray = [];
            let total = 0;

            function processResult(i, data) {
                resultArray[i] = data;
                total++;
                if (total === promiseArray.length) {
                    // 处理完成
                    resolve(resultArray);
                }
            }

            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(
                    (data) => {
                        processResult(i, data);
                    },
                    (reason) => {
                        // 处理失败
                        reject(reason);
                    }
                );
            }
        });
    }
}
