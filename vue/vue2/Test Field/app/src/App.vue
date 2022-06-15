<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <a-input v-model="value" @change="onInputChange">
      <template slot="suffix">123</template>
    </a-input> -->
    <!-- <my-input v-model="value1" @change="onMyInputChange"></my-input> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <button @click="change">change</button>
    <ul>
      <li v-for="(item, i) in list" :key="i">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MyInput from './components/MyInput.vue'

export default {
  name: "App",
  data() {
    return {
      // value: '',
      // value1: ''
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  components: {
    // MyInput
    // HelloWorld
  },
  methods: {
    // onInputChange(value) {
    //   console.log(value);
    // },
    // onMyInputChange(value) {
    //   console.log(value);
    // }
    change() {
      this.list = [3, 6, 8, 9, 1, 4, 6, 7, 0, 0];
    },
  },
};
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
