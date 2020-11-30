import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../melon/mvuex'

// 1.插件
Vue.use(Vuex)

// 2.Vuex.Store
export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      state.counter++
      console.log(state)
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 500)
    }
  },
  modules: {
  }
})
