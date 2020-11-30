function MVVM(options) {
    this.$options = options || {};
    var data = (this._data = this.$options.data);
    var me = this;

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function (key) {
        me._proxyData(key);
    });

    this._initComputed(); // 初始化 computed 
    console.log(this)
    
    // 1.先创建可观察的对象
    observe(data, this);
    // 2.解析模板
    this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
    constructor: MVVM,
    $watch: function (key, cb, options) {
        new Watcher(this, key, cb);
    },

    // 数据代理，访问 this 上的属性，转而访问 this._data 上
    _proxyData: function (key, setter, getter) {
        var me = this;
        setter =
            setter ||
            Object.defineProperty(me, key, {
                configurable: false,
                enumerable: true,
                get: function proxyGetter() {
                    return me._data[key];
                },
                set: function proxySetter(newVal) {
                    me._data[key] = newVal;
                },
            });
    },

    _initComputed: function () {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === "object") {
            Object.keys(computed).forEach(function (key) {
                Object.defineProperty(me, key, {
                    get:
                        typeof computed[key] === "function"
                            ? computed[key]
                            : computed[key].get,
                    set: function () {},
                });
            });
        }
    },
};
