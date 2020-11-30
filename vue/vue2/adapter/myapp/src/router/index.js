import Home from '@/views/Home.vue'
import Page from '@/views/Page.vue'
import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../melon/mvue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Home },
        { path: '/page', component: Page }
    ]
})