import './assets/css/main.less'
import { createApp, } from 'vue'
import { createPinia } from 'pinia'
import './test'
// import './demo'

// const count = reactive({ age: 0 })

// const count2 = ref(0)

// setTimeout(() => {
//   count.value = 2
// }, 0)
// setTimeout(() => {
//   count.age = 3
// }, 1000)
// setTimeout(() => {
//   count.age = 4
// }, 2000)

// watch(count, (val, old) => {
//   console.log(val)
// }, {
//   immediate: true
// })

import App from './App.vue'
import router from './router'

export const app = createApp(App)



app.use(createPinia())

app.use(router)


app.directive('loaded', {
  mounted(el, binding) {
    const { value } = binding
    if (!value) return
    if (Array.isArray(value)) {
      value.forEach(item => {
        item(el)
      })
    } else if (typeof value === 'function') {
      value(el)
    } else {
      console.log(value)
    }
  }
})




app.mount('#app')

