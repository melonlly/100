/*
    同步迭代器

    next() => { value, done }
*/
const createIterator = (items) => {
    const keys = Object(items);
    const len = keys.length;
    let pointer = 0;
    return {
        next() {
            const done = pointer >= len;
            const value = !done ? items[keys[pointer++]] : undefined;
            return {
                value,
                done,
            };
        },
    };
};
const it = createIterator([1, 2, 3]);
console.log(it);

const arr = [1, 2, 3];
console.log(typeof arr[Symbol.iterator]);
for (const k of arr) {
    console.log(k);
}

/*
    异步迭代器 asynchronous iterator
    异步遍历语句 for...await...of

    next() => promise
*/
// const createAsyncIterator = (items) => {
//     const keys = Object(items);
//     const len = keys.length;
//     let pointer = 0;
//     return {
//         next() {
//             const done = pointer >= len;
//             const value = !done ? items[keys[pointer++]] : undefined;
//             return Promise.resolve({
//                 value,
//                 done,
//             });
//         },
//     };
// };
// const asyncIt = createAsyncIterator([1, 2, 3]);

const asyncList = {
    a: "1",
    b: "2",
    [Symbol.asyncIterator]() {
        const _this = this;
        const keys = Object.keys(_this);
        const len = keys.length;
        let pointer = 0;
        return {
            next() {
                const done = pointer >= len;
                const value = !done ? _this[keys[pointer++]] : undefined;
                return new Promise((resolve) => {
                    setTimeout(() => resolve({ value, done }), 1000);
                });
            },
        };
    },
};

async function asyncFn() {
    for await (const val of asyncList) {
        console.log(val);
    }
}
// asyncFn();

/*
    Promise.finally()
*/

/*
    Rest
    Spread
*/
const obj111 = {
    a: "aaa",
    b: 222,
    c: {
        d: 233,
    },
};
const { a, ...other } = obj111;
console.log(a, other); // 'aaa' {b, c}
