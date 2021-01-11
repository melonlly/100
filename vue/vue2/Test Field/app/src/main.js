import Vue from 'vue'
import App from './App.vue'
import { Input } from 'ant-design-vue'

console.log(Input);
console.log(Input.extend);
Vue.component(Input.name, Input)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
