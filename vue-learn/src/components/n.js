import Vue from 'vue'
Vue.directive('n', {
  bind: function (el, binding) {
    // console.log(binding)
    el.textContent = Math.pow(binding.value, 2)
  },
  update: function (el, binding) {
    el.textContent = Math.pow(binding.value, 2)
  }
})

Vue.directive('m', {
  bind: function (el, binding) {
    // console.log(binding)
    el.textContent = Math.pow(binding.value, 3)
  },
  update: function (el, binding) {
    el.textContent = Math.pow(binding.value, 3)
  }
})