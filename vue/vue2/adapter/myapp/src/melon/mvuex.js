/*
    mvuex
        1.插件 （能被 Vue.use）
        2.实例化的是Vuex.Store
            new Vuex.Store({
                state,
                getters,
                mutations, -> (state, payload)
                actions, -> ({commit})
                modules
            })
        3.实例能访问到$store
        4.$store = {
            getters, -> 可访问实例化传入的getters的函数执行结果
            state, -> 可访问实例化传入的state
            commit, -> 可访问实例化传入的mutations
            dispatch, -> 可访问实例化传入的actions
        }
*/
let _Vue;
class Store {
    constructor(options) {
        this.$options = options;
        /*
            this.state = {} // 通过 this.$store.state 访问
            // state需要是响应式
            Object.keys(this.$options.state || {}).forEach(key => {
                let initial = this.$options.state[key] == 0 ? 0 : (this.$options.state[key] || '') // 初始值
                _Vue.util.defineReactive(this.state, key, initial)
            })
        */

        // 创建响应式 state
        this._vm = new _Vue({
            data: {
                $$state: options.state,
            },
        });

        this.getters = {} // this.$store.getters.xxx
        // options.getters的函数和getters属性对应
        Object.keys(options.getters || {}).forEach(key => {
            const _state = this.state // 闭包内保存当前 state 的引用
            Object.defineProperty(this.getters, key, {
                configurable: false,
                enumerable: true,
                get() {
                    return options.getters[key](_state)
                },
                set() {
                    throw new Error(`不能修改getters`)
                }
            })
        })

        // type -> mutation_type
        this.commit = (type, payload = {}) => {
            return options.mutations[type](this.state, payload);
        };
        this.dispatch = (type, payload) => {
            // 注意 this 问题
            return options.actions[type](this, payload);
        };
    }

    get state() {
        return this._vm.$data.$$state
        // return this._vm._data.$$state
    }

    set state(v) {
        throw new Error(`不能修改state`)
    }
}
function install(Vue) {
    _Vue = Vue;
    console.log(`${_Vue.name} 进入mvuex`);

    // 3
    Vue.mixin({
        beforeCreate() {
            const store = this.$options.store;
            if (store) {
                console.log(store);
                _Vue.prototype.$store = store;
            }
        },
    });
}

export default {
    Store,
    install
};
