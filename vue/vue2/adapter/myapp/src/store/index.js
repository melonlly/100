import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../melon/mvuex'

// 1.插件
Vue.use(Vuex)

// 2.Vuex.Store
export default new Vuex.Store({
  state: {
    counter: 0,
    outter: {
      aaa: 321,
      inner: {
        aaa: 123
      }
    }
  },
  mutations: {
    add(state) {
      state.counter++
    },
    outterAdd(state) {
      state.outter.aaa++
    },
    innerAdd(state) {
      state.outter.inner.aaa++
    }
  },
  actions: {
    add({commit}, payload) {
      console.log(`actions -> add -> ${ payload }`);
      setTimeout(() => {
        commit('add')
      }, 500)
    }
  },
  getters: {
    counter100(state) {
      return state.counter * 100
    }
  }
})
