## Vue 基础知识
### 环境搭建
- vue-cli@3
- vue@2.5

> npm install -g @vue/cli

> yarn global add @vue/cli

```
$ vue -V
3.5.1

$ vue create vue-learn[project name]
$ cd vue-learn
$ npm run serve

# 项目启动： http://localhost:8080/
```
### 模板语法
```
<template>
    <!--插值-->
    <span>Message:{{msg}}</span>
    <span v-once>Message:{{msg}}</span>
    <p>using v-html directive:<span v-html="rawHtml"></span></p>
    <div v-bind:id="id"></div>
    <div v-bind:id="'list-' + id"></div>
    <!--表达式:单个表达式；有返回值-->
    <div>{{number+1}}{{OK?'yes':'no'}}{{message.split('').reverse().join('')}}</div>
    <!--过滤器:可以串联；本质是函数，所以可以接受参数-->
    <div>{{ number | capitalize }}</div>
    <div>{{ message | filterA | filterB }}</div>
    <div>{{ message | filterA('arg1', arg2) }}</div>
    <!--指令-->
    <!--
        v-once      // 执行一次性的插值,会影响该节点上的所有数据绑定
        v-html="showHtml" // 输出真正的html
        
        // v-bind
        v-bind:href="showHref"  // 变量绑定值
        :href="showHref"        // 缩写
        
        // 条件渲染 DOM节点显示与否
        v-if="show"     // 惰性渲染，在渲染条件比较稳定的时候使用（更高的切换消耗）
        v-show="show"   // display none CSS的切换（更高的初始渲染消耗）
        v-else          // 必须跟在 v-if 或 v-show 之后
        
        // v-on
        v-on:submit.prevent="doSomething"
        @submit="doSomething"        // 缩写
        
        // 修饰符
        .prevent    // event.preventDefault() 阻止默认事件
        .stop       // 阻止冒泡行为
        .capture    // 阻止捕获
        .self       // 只点自己本身才执行
        .once       // 只执行一次
        
        <!--自定义指令：数据处理不是很简单的时候使用自定义指令-->
    -->
</template>
<script>
export default {
    data () {
        return {
            msg: '文本编辑',
            id: 'text',
            number: 1,
            show: false,
            showHtml: '这是html内容',
            showHref: 'baidu.com'
        }
    },
    filters: {
        capitalize: function (val) {
            if (!val) return ''
            return number + 1
        }
    },
    methods: {
        doSomething () {
            console.log(this)
        }
    }
}
</script>
<style>
</style>
```

##### 自定义指令

应用：数据处理不是很简单的时候使用自定义指令

```
<template>
    <div v-n="4"></div>
</template>
```
```
// n.js
import Vue from 'vue'
Vue.directive('n', {
  bind: function (el, binding) {
    el.textContent = Math.pow(binding.value, 2)
  },
  update: function (el, binding) {
    el.textContent = Math.pow(binding.value, 2)
  },
})

// main.js
import '@/n.js'
```

### 计算属性

应用：具有依赖关系的数据监听

```
<template>
    <div id="example">
        <p>我姓{{firstName}}名{{lastName}},我的名字是{{fullName}}</p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            firstName: 'M',
            lastName: 'idlerg'
        }
    },
    // compoted 中的b 和 computed中的b 返回值一样
    // 计算属性中存在缓存机制，若果计算属性中的依赖属性没有发生变化，则不会被调用
    // computed 中没有缓存机制，页面每次刷新数据都会被调用
    computed: {
        // 默认为getter
        // fullName: function () {
        //    return this.firstName + ' ' + this.lastName
        // }
        // getter setter
        fullName: {
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            set: function (newVal) {
                // newVal = fullName 当fullName改变的时候firstName和lastName也会改变
                var names = newVal.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    },
    computed: {
        fullName: function () {
            return this.money - this.a
        }
    }
}
</script>
```
### 类与样式

##### 数组语法
应用：适合较少的class名
##### 对象语法
应用：适合较多的class名或者动态的class

```
<template>
    <!--数组的方式-->
    <!--<div class="test-1 test-2">数组语法</div>-->
    <div :class="[class1, class2]">数组语法</div>
    <div :class="[class ? class1 : class2, class3]">数组语法</div>
    
    <!--对象的方法-->
    <!--<div class="active">对象语法</div>-->
    <div :class="{active: class}">对象语法</div>
    
    <!--内联样式--> 对象方法-->
    <div :style="{color: activeColor, fontSize: fontSize + 'px'}"></div>
    <div :style="styleObject"></div>
    <!--内联样式--> 数组方法-->
    <div v-bind:style="[baseStyles, styleObject]">
</template>
<script>
export default {
    data () {
        return {
            class1: 'test-1',
            class2: 'test-2',
            class3: 'test-3',
            class: true,
            color: 'red',
            fontSize: '14,
            styleObject: {
                color: 'red',
                fontSize: '14px'
            },
            baseStyles: {
                border: '1px solid #000'
            }
        }
    }
}
</script>
```
### 条件&列表渲染
##### 基础用法
if else 、 for

```
<template
    <ul>
        <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
</template>
<script>
export default {
    data () {
        return {
            list:['a','b','c','d','e']
        }
    }
}
</script>
```
##### 分组用法
复杂模板的分组条件处理

```
<template
    <ul>
        <template v-for="(item, index) in list">
            <li :key="'item' + index">分组件处理</li>
            <li :key="index">{{item}}</li>
        </template>
    </ul>
</template>
<script>
export default {
    data () {
        return {
            list:['a','b','c','d','e']
        }
    }
}
</script>
```
### 事件处理
##### 事件定义及缩写
##### 内联写法
事件传参和事件对象
##### 事件修饰符
```
// 修饰符
.prevent    // event.preventDefault() 阻止默认事件
.stop       // 阻止冒泡行为
.capture    // 阻止捕获
.self       // 只点自己本身才执行
.once       // 只执行一次
```

### 深入了解组件
### 路由基础
### Vuex基础