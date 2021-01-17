const fs = require("fs");
const _ = require("loadsh");

// 基础函子
class Functor {
    constructor(val) {
        this.val = val;
    }
    map(f) {
        return new Functor(f(this.val));
    }
}
// Monad 函子
class Monad extends Functor {
    join() {
        return this.val;
    }
    flatMap(f) {
        /*
            1. f 接受一个函数返回的IO函子
            2. this.val 等于上一步的脏操作
            3. this.map(f) compose(f, this.val) 函数组合 需要手动执行
            4. 返回这个组合函数并执行 注意先后执行顺序
        */
        return this.map(f).join();
    }
}
const compose = _.flowRight;
// IO函子用来包裹脏操作
class IO extends Monad {
    // val是最初的脏操作
    static of(val) {
        return new IO(val);
    }
    map(f) {
        return IO.of(compose(f, this.val));
    }
}
const readFile = function (filename) {
    return IO.of(function () {
        return fs.readFileSync(filename, "utf-8");
    });
};
const print = function (x) {
    console.log(`print`);
    return IO.of(function () {
        console.log(`print-IO`);
        return x + "函数式";
    });
};

const result = readFile("user.txt").flatMap(print);

console.log(result().val());
