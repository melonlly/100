/*
    mvuex
        1.插件 （能被 Vue.use）
        2.实例化的是Vuex.Store
            new Vuex.Store({
                state,
                mutations, -> (state, payload)
                actions, -> ({commit})
                modules
            })
        3.实例能访问到$store
        4.$store = {
            state, -> 可访问实例化传入的state
            commit, -> 可访问实例化传入的mutations
            dispatch, -> 可访问实例化传入的actions
        }
*/
let _Vue;
const Vuex = {
    Store(options) {
        this.$options = options
        this.state = {} // 通过 this.$store.state 访问
        // state需要是响应式
        Object.keys(this.$options.state || {}).forEach(key => {
            let initial = this.$options.state[key] == 0 ? 0 : (this.$options.state[key] || '') // 初始值
            _Vue.util.defineReactive(this.state, key, initial)
        })
        // type -> mutation_type
        this.commit = (type, payload = {}) => {
            console.log(type)
            return this.$options.mutations[type](this.state, payload)
        }
        this.dispatch = (type) => {
            return this.$options.actions[type]({
                commit: this.commit
            })
        }
    },
    install(Vue) {
        _Vue = Vue
        console.log(`${ _Vue.name } 进入mvuex`);

        // 3
        Vue.mixin({
            created() {
                const store = this.$options.store
                if (store) {
                    console.log(store)
                    _Vue.prototype.$store = store
                }
            }
        })
    }
}

export default Vuex