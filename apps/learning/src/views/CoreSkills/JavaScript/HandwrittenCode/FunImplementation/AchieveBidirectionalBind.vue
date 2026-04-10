<template>
  <div class="binding-container">
    <!-- 原理实现演示 -->
    <article class="demo-card">
      <h2 class="demo-title">双向绑定原理实现</h2>
      <h3>双向绑定原理：数据的变化会自动更新视图，视图的变化也会自动更新数据，实现数据与视图的同步。</h3>
      <div class="demo-content">
        <div class="binding-box">
          <input type="text" class="demo-input" :value="state.inputValue" @input="handleInput">
          <p class="display-text">输入内容：{{ state.inputValue }}</p>
        </div>
        <pre class="code-block">// 核心实现代码
class SimpleReactive {
  private _value: string;
  private subscribers: Function[] = [];

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(newVal: string) {
    if (this._value !== newVal) {
      this._value = newVal;
      this.notify();
    }
  }

  subscribe(fn: Function) {
    this.subscribers.push(fn);
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this._value));
  }
}</pre>
      </div>
    </article>

    <!-- Vue3原生实现 -->
    <article class="demo-card">
      <h2 class="demo-title">原生实现</h2>
      <div class="demo-grid">
        <div class="method-box">
          <h3>基础绑定</h3>
          <input v-model="nativeData.basic" class="demo-input" placeholder="输入内容...">
          <p>当前值：{{ nativeData.basic }}</p>
        </div>

        <div class="method-box">
          <h3>组件绑定</h3>
          <CustomInput v-model="nativeData.custom" />
          <p>组件值：{{ nativeData.custom }}</p>
        </div>

        <div class="method-box">
          <h3>多模型绑定</h3>
          <input v-model="nativeData.first" class="demo-input" placeholder="第一个输入">
          <input v-model="nativeData.second" class="demo-input" placeholder="第二个输入">
          <p>合并值：{{ nativeData.first }} {{ nativeData.second }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CustomInput from '../../Components/CustomInput.vue'

type Fn<T> = (val: T) => void

// 自定义响应式实现
class SimpleReactive<T> {
  private _value: T
  private subscribers: Fn<T>[] = []

  constructor(value: T) {
    this._value = value
  }

  get value(): T {
    return this._value
  }

  set value(newVal: T) {
    if (this._value !== newVal) {
      this._value = newVal
      this.notify()
    }
  }

  subscribe(fn: (val: T) => void) {
    this.subscribers.push(fn)
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this._value))
  }
}

// 自定义实现逻辑
const state = reactive({
  inputValue: '',
  reactiveObj: new SimpleReactive('初始值')
})

// 监听输入事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  state.inputValue = target.value
  state.reactiveObj.value = target.value
}

// Vue3原生数据
const nativeData = reactive({
  basic: '',
  custom: '组件值',
  first: '',
  second: ''
})

// 订阅自定义响应式对象变化
state.reactiveObj.subscribe((val: string) => {
  console.log('值变化:', val)
})
</script>

<style lang="less">
// 设计变量
@primary-color: #409EFF;
@secondary-color: #67C23A;
@bg-color: #f5f7fa;
@border-color: #dcdfe6;
@text-color: #606266;

.binding-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .demo-title {
    color: @primary-color;
    border-left: 4px solid @primary-color;
    padding-left: 1rem;
    margin: 2rem 0;
    font-size: 1.5rem;
  }

  .demo-card {
    padding: 1.5rem;
    margin: 2rem 0;
    background: @bg-color;
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
  }

  .binding-box {
    padding: 2rem;
    background: white;
    border-radius: 6px;
    margin-bottom: 1.5rem;

    .demo-input {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid @border-color;
      border-radius: 4px;
      transition: all 0.3s;

      &:focus {
        border-color: @primary-color;
        box-shadow: 0 0 8px fade(@primary-color, 20%);
      }
    }

    .display-text {
      color: @secondary-color;
      margin-top: 1rem;
      font-weight: bold;
    }
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .method-box {
      padding: 1.5rem;
      background: white;
      border-radius: 6px;
      border: 1px solid lighten(@border-color, 5%);

      h3 {
        color: @text-color;
        margin-bottom: 1rem;
      }

      p {
        color: lighten(@text-color, 20%);
        margin-top: 1rem;
      }
    }
  }

  .code-block {
    background: darken(@bg-color, 3%);
    padding: 1.5rem;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    color: darken(@text-color, 10%);
    overflow-x: auto;

    &::selection {
      background: fade(@primary-color, 20%);
    }
  }
}
</style>
