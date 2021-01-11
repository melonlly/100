<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <a-input v-model="value" @change="onInputChange">
      <template slot="suffix">123</template>
    </a-input>
    <!-- <my-input v-model="value1" @change="onMyInputChange"></my-input> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MyInput from './components/MyInput.vue'

export default {
  name: 'App',
  data() {
    return {
      value: '',
      value1: ''
    }
  },
  components: {
    // MyInput
    // HelloWorld
  },
  methods: {
    onInputChange(value) {
      console.log(value);
    },
    onMyInputChange(value) {
      console.log(value);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
