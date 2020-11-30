/*
    mvue-router
        1.插件 （能被 Vue.use）
        2.自带插件
            router-link
            router-view
        3.任何vue实例能够访问vue-router实例
            this.$router = {
                mode,
                options,
                ...
            }
        4.任何vue实例能够访问当前路由
            this.$route = {
                name,
                path,
                fullPath,
                query,
                params,
                ...
            }
*/
// Vue构造函数（use时会传入Vue） 避免import
let _Vue;
function VueRouter(options = {}) {
    this.$options = options
    const initial = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'current', initial) // 创建响应式current
    window.addEventListener('hashchange', () => {
        this.current = window.location.hash.slice(1) // 改变当前路由
    })
}
// 1
VueRouter.install = Vue => {
    _Vue = Vue
    console.log(`${ _Vue.name } 进入mvue-router`);

    // 3
    Vue.mixin({
        created() {
            const router = this.$options.router
            if (router) {
                _Vue.prototype.$router = router
            }
        }
    })

    // 2
    Vue.component('router-link', {
        // router-link 参数
        props: {
            to: {
                type: String,
                require: true
            }
        },
        render(createElement) {
            return createElement(
                'a',
                {
                    attrs: {
                        href: `#${ this.to }`
                    }
                },
                // 默认插槽值
                this.$slots.default
            )
        }
    })
    Vue.component('router-view', {
        render(createElement) {
            // 根据当前路由，匹配传入配置中routes对应的路由，找的需要被渲染的component
            console.log(this.$router.current)
            const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
            return createElement(route && route.component)
        }
    })
}

export default VueRouter