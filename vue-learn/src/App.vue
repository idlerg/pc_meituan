<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div v-m="4"></div>
    <div class="event">计算属性：我姓{{firstName}}名{{lastName}},我的名字是{{fullName}}</div>
    <button @click="numberClick">按钮</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  computed: {
    fullName: {
      get: function () {
        console.log('get')
        return this.firstName + ' ' + this.lastName
      },
      set: function (newVal) {
        console.log('set')
        console.log(newVal)
        var names = newVal.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
        console.log(this.firstName)
        console.log(this.lastName)
      }
    }
  },
  data () {
    return {
      list: ['a', 'b', 'c', 'd', 'e'],
      firstName: 'M',
      lastName: 'idlerg'
    }
  },
  methods: {
    numberClick () {
      this.fullName = '777 8888'
    }
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
