function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function (data) {
        var me = this;
        Object.keys(data).forEach(function (key) {
            me.convert(key, data[key]);
        });
    },
    convert: function (key, val) {
        this.defineReactive(this.data, key, val);
    },
    /*
        响应式
            0.为 data 的属性添加 Dep （闭包，每个属性对应一个 Dep，其中包含依赖该属性的所有 Watcher）
            1.为 data 添加属性 getter、setter
            2.访问 data 的属性值时，会为该属性的 dep 添加 Watcher
            3.设置 data 的属性值时，
                3.1 如果设置的是对象，为新对象递归添加响应式属性
                3.2 通知依赖该属性的所有 Watcher，调用对应的回调
    */
    defineReactive: function (data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function () {
                console.log(`geeeeeeeeeeeeeeeeeet`)
                if (Dep.target) {
                    console.log(Dep.target)
                    dep.depend();
                }
                return val;
            },
            set: function (newVal) {
                console.log(`seeeeeeeeeeeeeeeeeet`)
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            },
        });
    },
};

// 用于递归
function observe(data) {
    if (!data || typeof data !== "object") {
        return;
    }
    return new Observer(data);
}
