<template>
  <div class="hello">
    <h1>{{ msg }}6666</h1>
    <span :id="id">{{mags}}</span>
    <div :class="[class1, class2]">样式</div>
    <div :class="{active: class3}">666666666666</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      mags: '文本编辑',
      id: 'tst',
      class1: 'test-1',
      class2: 'test-2',
      class3: true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
