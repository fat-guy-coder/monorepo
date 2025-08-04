<template>
  <div class="array-methods-container">
    <header class="guide-header">
      <h1>JavaScript Array ES 方法基本指南</h1>
      <p>全面掌握现代 JavaScript 数组操作方法</p>
    </header>

    <Nav :list="data" :keyMap="{ children: 'methods' }" :showChild="true" :stopPropagation="true" />

    <div class="content-wrapper">
      <!-- 内容区域 -->
      <div class="content">
        <!-- 迭代方法 -->
        <section class="method-group" v-for="item in data" :key="item.id" :id="item.id">
          <h2>
            {{ item.name }} <a @click="goToByRouteName(item.route)" v-if="item.route">跳转实现</a>
          </h2>
          <p class="group-desc">{{ item.description }}</p>

          <div class="method-grid">
            <div
              class="method-card"
              v-for="method in item.methods"
              :key="method.id"
              :id="method.id"
            >
              <div class="method-header">
                <h3>{{ method.name }}</h3>
                <div class="method-since">{{ method.since }}</div>
              </div>
              <div class="method-complexity">
                <p v-for="(item, index) in method.complexity" :key="index">
                  {{ item }}
                </p>
                <!-- <p>空间复杂度: {{ method.complexity[1] }}</p> -->
              </div>
              <div class="method-content">
                <div class="method-desc">
                  <p>{{ method.description }}</p>
                </div>
                <div class="code-example">
                  <pre>{{ method.codeExample }}</pre>
                </div>
                <div class="use-case">
                  <h4>适用场景</h4>
                  <ul>
                    <li v-for="scene in method.scene" :key="scene">{{ scene }}</li>
                  </ul>
                </div>
                <div class="note">
                  <h4>注意事项</h4>
                  <ul>
                    <li v-for="note in method.note" :key="note">{{ note }}</li>
                  </ul>
                </div>
                <div class="extend" v-if="method.extend">
                  <h4>
                    扩展
                    <a
                      @click="method.extendExpand = method.extendExpand === 1 ? 2 : 1"
                      v-if="method.extendExpand"
                      class="extend-toggle"
                      >{{ method.extendExpand === 2 ? '收起' : '展开' }}</a
                    >
                  </h4>
                  <ul
                    class="extend-list"
                    :style="{ height: method.extendExpand === 2 ? 'auto' : '0px' }"
                  >
                    <li v-for="extend in method.extend" :key="extend.id">
                      <div class="extend-title">{{ extend.description }}</div>
                      <div class="code-example">
                        <pre><code>{{ extend.codeExample }}</code></pre>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 总结 -->
        <section class="conclusion-section">
          <h2>总结与最佳实践</h2>
          <div class="conclusion-content">
            <div class="key-points">
              <h3>关键要点</h3>
              <ul>
                <li>优先使用不修改原数组的方法（map、filter等）</li>
                <li>使用 find/findIndex 替代循环查找</li>
                <li>使用 includes 检查元素存在性</li>
                <li>利用 flatMap 简化映射和展平操作</li>
                <li>使用 Array.isArray() 进行可靠的数组类型检查</li>
              </ul>
            </div>

            <div class="best-practices">
              <h3>性能建议</h3>
              <ul>
                <li>避免在循环中修改数组长度（如使用 push/pop）</li>
                <li>对于大型数组，使用 for 循环可能比 forEach 更高效</li>
                <li>减少不必要的数组复制</li>
                <li>使用 TypedArray 处理数值数据</li>
                <li>链式调用时注意中间数组创建</li>
              </ul>
            </div>

            <div class="ecosystem">
              <h3>现代数组方法生态系统</h3>
              <div class="method-timeline">
                <div class="timeline-item">
                  <div class="era">ES5 (2009)</div>
                  <div class="methods">forEach, map, filter, reduce, some, every</div>
                </div>
                <div class="timeline-item">
                  <div class="era">ES6 (2015)</div>
                  <div class="methods">find, findIndex, Array.from, Array.of, fill, copyWithin</div>
                </div>
                <div class="timeline-item">
                  <div class="era">ES2016+</div>
                  <div class="methods">includes, flat, flatMap, at</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Nav from '@/components/ScrollNav.vue'

const emit = defineEmits(['goToByRouteName'])

const goToByRouteName = (routeName: string) => {
  emit('goToByRouteName', routeName)
}

interface ArrayTypeItem {
  id: string
  name: string
  type: string
  description: string
  methods: ArrayMethod[]
  route?: string
}
interface ArrayMethod {
  id: string
  name: string
  since: string
  complexity: string[]
  description: string
  usage: string
  codeExample: string
  scene: string[]
  note: string[]
  extendExpand?: 1 | 2 | undefined
  extend?: {
    id: string
    description: string
    codeExample: string
  }[]
}
const data = ref<ArrayTypeItem[]>([])

onMounted(async () => {
  const { default: list } = await import('../JSON/ArrayMetods.json')
  data.value = list as ArrayTypeItem[]
})
</script>

<style scoped lang="less">
@primary-color: #4a7bf7;
@secondary-color: #6c5ce7;
@text-color: #2d3436;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #2ecc71;
@warning-color: #f39c12;
@error-color: #e74c3c;

.array-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.guide-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.navigation {
  flex: 0 0 250px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  max-height: 80vh;
  overflow-y: auto;

  .nav-group {
    margin-bottom: 1.5rem;

    h3 {
      margin-top: 0;
      color: @secondary-color;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.6rem 0.8rem;
      margin-bottom: 0.3rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

.content {
  flex: 1;
}

.method-group {
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .group-desc {
    color: lighten(@text-color, 20%);
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
  }
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 1.5rem;
}

.method-card {
  background: white;
  border-radius: 8px;
  box-shadow: @card-shadow;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: lighten(@primary-color, 45%);
  border-bottom: 1px solid @border-color;

  h3 {
    margin: 0;
    font-size: 1.4rem;
    color: @primary-color;
  }
}

.method-complexity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f5f7fa;
  border-radius: 6px;
  margin-bottom: 1.2rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.method-since {
  background: @primary-color;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.method-content {
  padding: 1.5rem;
}

.method-desc {
  margin-bottom: 1.2rem;

  p {
    line-height: 1.6;
    margin: 0;
  }
}

.code-example {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.2rem;
  border-left: 3px solid @primary-color;

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }
}

.extend-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;
}

.extend-toggle {
  cursor: pointer;
}

.use-case,
.note,
.extend {
  margin-bottom: 1.2rem;

  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: @primary-color;
    font-size: 1.1rem;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background: @primary-color;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.4rem;
      line-height: 1.5;
    }
  }
}

.note {
  h4 {
    color: @secondary-color;

    &::before {
      background: @secondary-color;
    }
  }
}

.conclusion-section {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
}

.conclusion-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .key-points,
  .best-practices {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      margin-top: 0;
      color: @primary-color;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @light-bg;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        line-height: 1.5;
      }
    }
  }
}

.ecosystem {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  grid-column: 1 / -1;

  h3 {
    margin-top: 0;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @light-bg;
  }
}

.method-timeline {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  .timeline-item {
    flex: 1;
    text-align: center;
    padding: 1rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      width: 100%;
      height: 2px;
      background: @primary-color;
      z-index: -1;
    }

    &:last-child::after {
      display: none;
    }
  }

  .era {
    background: @secondary-color;
    color: white;
    padding: 0.5rem;
    border-radius: 6px;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }

  .methods {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

@media (max-width: 1100px) {
  .method-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
    max-height: none;
  }

  .method-timeline {
    flex-direction: column;

    .timeline-item {
      margin-bottom: 1.5rem;

      &::after {
        top: 100%;
        left: 50%;
        width: 2px;
        height: 1.5rem;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
