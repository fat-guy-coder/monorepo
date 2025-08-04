<template>
  <div class="main-container">
    <h1 class="title">JavaScript 类型转换指南</h1>

    <h2>JavaScript的隐式类型转换和显式类型转换</h2>


    <h3>
      <p>
        隐式类型转换:在执行操作时，JavaScript自动将某些数据类型转换为适当的类型以完成操作。这通常发生在进行比较或运算时，例如将数字与字符串相加时，JavaScript会自动将数字转换为字符串，进行字符串拼接。
      </p>
      <p>
        显式类型转换:开发者显式地调用转换方法（如 `Number()`, `String()`, `Boolean()`）将数据从一种类型转换为另一种类型。显式转换通常用于确保值的类型符合预期。
      </p>
    </h3>

    <div class="control-panel">
      <button v-for="tab in tabs" :key="tab" @click="currentTab = tab"
        :class="['tab-btn', { active: currentTab === tab }]">
        {{ tab }}
      </button>
    </div>

    <div class="content">
      <section v-show="currentTab === '隐式转换'" class="conversion-section">
        <h2 class="subtitle">常见隐式转换场景</h2>
        <div class="examples">
          <div v-for="(example, index) in implicitExamples" :key="'implicit' + index" class="example-card"
            @click="showDetails(example)">
            <div class="code-block">
              <pre>{{ example.expression }}</pre>
            </div>
            <div class="result" :style="{ color: resultColor(example.result) }">
              ⇒ {{ example.result }}
            </div>
            <div v-if="selectedExample === example" class="explanation">
              <p>{{ example.explanation }}</p>
              <p class="type-info">转换过程: {{ example.process }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-show="currentTab === '显式转换'" class="conversion-section">
        <h2 class="subtitle">显式转换方法</h2>
        <div class="examples">
          <div v-for="(example, index) in explicitExamples" :key="'explicit' + index" class="example-card"
            @click="showDetails(example)">
            <div class="code-block">
              <pre>{{ example.expression }}</pre>
            </div>
            <div class="result" :style="{ color: resultColor(example.result) }">
              ⇒ {{ example.result }}
            </div>
            <div v-if="selectedExample === example" class="explanation">
              <p>{{ example.explanation }}</p>
              <p class="type-info">返回类型: {{ example.returnType }}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="table-section">
        <h2 class="subtitle">使用不同的数值转换为数字(Number), 字符串(String), 布尔值(Boolean) <a
            href="https://www.runoob.com/js/js-type-conversion.html" target="_blank">摘自菜鸟教程</a> </h2>
        <h2 class="pay-attention">
          <span>Number([20])===20</span>
          <span>Boolean('0')===true</span>
          <span>Number('')===0</span>
          <span>Boolean('')===false</span>
          <span>Number([])===0</span>
          <span>[].toString()===''</span>
          <span>Number(null)===0</span>
        </h2>
        <table class="reference">
          <tbody>
            <tr>
              <th>原始值</th>
              <th>转换为数字</th>
              <th>转换为字符串</th>
              <th>转换为布尔值</th>
            </tr>
            <tr>
              <td>false</td>
              <td>0</td>
              <td>"false"</td>
              <td>false</td>
            </tr>
            <tr>
              <td>true</td>
              <td>1</td>
              <td>"true"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>"0"</td>
              <td>false</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>"1"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>"0"</td>
              <td>0</td>
              <td>"0"</td>
              <td class="important">true</td>
            </tr>
            <tr>
              <td>"000"</td>
              <td>0</td>
              <td>"000"</td>
              <td class="important">true</td>
            </tr>
            <tr>
              <td>"1"</td>
              <td>1</td>
              <td>"1"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>NaN</td>
              <td>NaN</td>
              <td>"NaN"</td>
              <td>false</td>
            </tr>
            <tr>
              <td>Infinity</td>
              <td>Infinity</td>
              <td>"Infinity"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>-Infinity</td>
              <td>-Infinity</td>
              <td>"-Infinity"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>""</td>
              <td class="important">0</td>
              <td>""</td>
              <td class="important">false</td>
            </tr>
            <tr>
              <td>"20"</td>
              <td>20</td>
              <td>"20"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>"Runoob"</td>
              <td>NaN</td>
              <td>"Runoob"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>[ ]</td>
              <td class="important">0</td>
              <td>""</td>
              <td>true</td>
            </tr>
            <tr>
              <td>[20]</td>
              <td class="important">20</td>
              <td>"20"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>[10,20]</td>
              <td>NaN</td>
              <td>"10,20"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>["Runoob"]</td>
              <td>NaN</td>
              <td>"Runoob"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>["Runoob","Google"]</td>
              <td>NaN</td>
              <td>"Runoob,Google"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>function(){}</td>
              <td>NaN</td>
              <td>"function(){}"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>{ }</td>
              <td>NaN</td>
              <td>"[object Object]"</td>
              <td>true</td>
            </tr>
            <tr>
              <td>null</td>
              <td class="important">0</td>
              <td>"null"</td>
              <td>false</td>
            </tr>
            <tr>
              <td>undefined</td>
              <td>NaN</td>
              <td>"undefined"</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Example {
  expression: string
  result: string
  explanation: string
  process?: string
  returnType?: string
}

const currentTab = ref('隐式转换')
const selectedExample = ref<Example | null>(null)
const tabs = ['隐式转换', '显式转换']

// ... existing code ...
const implicitExamples: Example[] = [
  {
    expression: '"5" + 2',
    result: '"52"',
    explanation: '数值转换为字符串',
    process: '2 → "2" → 字符串拼接',
  },
  {
    expression: '"5" - 2',
    result: '3',
    explanation: '字符串转换为数值',
    process: '"5" → 5 → 执行减法',
  },
  {
    expression: 'null == undefined',
    result: 'true',
    explanation: '特殊相等规则',
    process: 'null和undefined在==比较时相等',
  },
  {
    expression: '[] == 0',
    result: 'true',
    explanation: '对象转基本类型',
    process: '[] → "" → 0 → 比较 0 == 0',
  },
  // 新增的隐式转换场景
  {
    expression: '1 + "1"',
    result: '"11"',
    explanation: '数值转换为字符串',
    process: '1 → "1" → 字符串拼接',
  },
  {
    expression: 'true + 1',
    result: '2',
    explanation: '布尔值转换为数值',
    process: 'true → 1 → 1 + 1',
  },
  {
    expression: 'false + 1',
    result: '1',
    explanation: '布尔值转换为数值',
    process: 'false → 0 → 0 + 1',
  },
  {
    expression: '"" == 0',
    result: 'true',
    explanation: '空字符串转换为数值',
    process: '"" → 0 → 比较 0 == 0',
  },
  // ... existing code ...
]
// ... existing code ...

const explicitExamples: Example[] = [
  {
    expression: 'Number("42")',
    result: '42',
    explanation: '转换为数值类型',
    returnType: 'number',
  },
  {
    expression: 'String(123)',
    result: '"123"',
    explanation: '转换为字符串类型',
    returnType: 'string',
  },
  {
    expression: 'Boolean(0)',
    result: 'false',
    explanation: '转换为布尔类型',
    returnType: 'boolean',
  },
  {
    expression: '!!"hello"',
    result: 'true',
    explanation: '双非运算符转换',
    returnType: 'boolean',
  },
  // 新增的显式转换场景
  {
    expression: 'parseInt("10")',
    result: '10',
    explanation: '字符串转换为整数',
    returnType: 'number',
  },
  {
    expression: 'parseFloat("10.5")',
    result: '10.5',
    explanation: '字符串转换为浮点数',
    returnType: 'number',
  },
  {
    expression: 'String(true)',
    result: '"true"',
    explanation: '布尔值转换为字符串',
    returnType: 'string',
  },
  {
    expression: 'Number(null)',
    result: '0',
    explanation: 'null转换为数值',
    returnType: 'number',
  },
  // 其他显式转换方法
  {
    expression: 'Boolean("")',
    result: 'false',
    explanation: '空字符串转换为布尔类型',
    returnType: 'boolean',
  },
  {
    expression: 'Boolean(" ")',
    result: 'true',
    explanation: '非空字符串转换为布尔类型',
    returnType: 'boolean',
  },
  {
    expression: 'Number(undefined)',
    result: 'NaN',
    explanation: 'undefined转换为数值',
    returnType: 'number',
  },
  {
    expression: 'String(undefined)',
    result: '"undefined"',
    explanation: 'undefined转换为字符串',
    returnType: 'string',
  },
]

const showDetails = (example: Example) => {
  selectedExample.value = example === selectedExample.value ? null : example
}

const resultColor = (result: string) => {
  if (result.includes('"')) return '#42b983' // 字符串颜色
  if (result === 'true') return '#ff7875' // true颜色
  if (result === 'false') return '#69b1ff' // false颜色
  return '#ffc53d' // 数字颜色
}
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@secondary-color: #42b983;
@error-color: #ff4d4f;
@warning-color: #ffc53d;
@info-color: #69b1ff;

pre {
  color: #fff;
}

.main-main-container {
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.title {
  text-align: center;
  color: @primary-color;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.control-panel {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  color: @primary-color;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &.active {
    background: linear-gradient(145deg, @secondary-color, darken(@secondary-color, 10%));
    color: white;
    box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
  }

  &:hover {
    transform: translateY(-2px);
  }
}

.content {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.subtitle {
  color: @primary-color;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid @secondary-color;
  padding-left: 1rem;
}

.examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
}

.code-block {
  background: @primary-color;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  margin-bottom: 1rem;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.result {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
}

.explanation {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  padding-top: 1rem;
  border-top: 1px dashed #ddd;

  .type-info {
    color: @info-color;
    font-weight: 500;
    margin-top: 0.5rem;
  }
}

.table-section {
  margin: 2rem 0;

  .pay-attention {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: space-between;
    flex-flow: wrap;

    span {
      color: #fd0808;
    }
  }
}

.reference {
  width: 100%;

  th {
    font-size: 2rem;
  }

  td {
    text-align: center;
    line-height: 2em;
    min-width: 24px;
    border: 1px solid #d4d4d4;
    padding: 5px;
    padding-top: 7px;
    padding-bottom: 7px;
    vertical-align: top;
  }

  .important {
    color: red;
    font-weight: 900;
  }
}
</style>
