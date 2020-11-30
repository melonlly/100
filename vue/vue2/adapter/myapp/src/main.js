import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

console.log(App.name)
App.name = 'appppp'
console.log(App.name)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
