<template>
  <div class="special-types-reference">
    <!-- 标题区域 -->
    <header class="header">
      <h1>JavaScript 特殊数据类型</h1>
      <p class="subtitle">深入解析 JavaScript 中的特殊值及其行为特点</p>
    </header>

    <!-- 控制区域 -->
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="搜索数据类型..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
    </div>

    <!-- 数据类型展示区域 -->
    <div class="types-container">
      <div
        v-for="(type, index) in filteredTypes"
        :key="index"
        class="type-card"
        :style="{ 'border-top': `4px solid ${getTypeColor(type.name)}` }"
      >
        <div class="card-header">
          <h2>
            {{ type.name }}
            <a v-if="type.route" @click="goToRoute(type.route)">跳转{{ type.route }}</a>
          </h2>
          <div class="type-tag">{{ type.type }}</div>
        </div>

        <div class="card-content">
          <div class="section">
            <h3>概念</h3>
            <p>{{ type.concept }}</p>
          </div>

          <div class="section">
            <h3>使用指南</h3>
            <ul>
              <li v-for="(guide, i) in type.guides" :key="i">{{ guide }}</li>
            </ul>
          </div>

          <div class="section">
            <h3>注意事项</h3>
            <ul>
              <li v-for="(note, i) in type.notes" :key="i">{{ note }}</li>
            </ul>
          </div>

          <div class="section">
            <h3>检测方法</h3>
            <pre>{{ type.detection }}</pre>
          </div>

          <div class="section">
            <h3>常见操作</h3>
            <pre>{{ type.operations }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 比较表格 -->
    <div class="comparison-section">
      <h2>特殊数据类型比较</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>数据类型</th>
              <th>类型检测</th>
              <th>是否假值</th>
              <th>可转换为数值</th>
              <th>可转换为布尔值</th>
              <th>可转换为字符串</th>
              <th>相等性比较</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(type, index) in types" :key="index">
              <td>{{ type.name }}</td>
              <td>
                <code>{{ type.detection.split('\n')[0] }}</code>
              </td>
              <td>{{ type.falsy ? '是' : '否' }}</td>
              <td>{{ type.toNumber }}</td>
              <td>{{ type.toBoolean }}</td>
              <td>{{ type.toString }}</td>
              <td>{{ type.equality }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>JavaScript 特殊数据类型参考 | 最后更新: {{ new Date().toLocaleDateString() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['goToByRouteName'])

function goToRoute(name: string) {
  emit('goToByRouteName', name)
}

// 数据类型定义
interface SpecialType {
  name: string
  type: string
  concept: string
  guides: string[]
  notes: string[]
  detection: string
  operations: string
  falsy: boolean
  toNumber: string
  toBoolean: string
  toString: string
  equality: string
  route?: string
}

// 特殊数据类型数据
const types = ref<SpecialType[]>([
  {
    name: 'NaN',
    type: 'Number',
    concept:
      '表示非数字值（Not-a-Number），是数值类型的一个特殊值，用于表示数学运算中无法表示的结果。',
    guides: [
      "用于表示无效的数学运算结果（如 0/0 或 'abc' * 1）",
      '当函数期望返回数值但无法返回有效数值时使用',
      '在数据验证中标识无效数值输入',
    ],
    notes: [
      'NaN 不等于任何值，包括它自己（NaN === NaN 返回 false）',
      '使用 isNaN() 或 Number.isNaN() 检测 NaN',
      '数学运算中只要有 NaN 参与，结果通常也是 NaN',
      'JSON.stringify 会将 NaN 转换为 null',
    ],
    detection:
      'isNaN(value); // 全局方法，会进行类型转换\nNumber.isNaN(value); // ES6 方法，严格检测',
    operations:
      "// 数学运算\nconsole.log(NaN + 5); // NaN\n\n// 类型转换\nconsole.log(Number('abc')); // NaN\n\n// 比较操作\nconsole.log(NaN === NaN); // false",
    falsy: true,
    toNumber: 'NaN',
    toBoolean: 'false',
    toString: "'NaN'",
    equality: '不等于任何值（包括自身）',
  },
  {
    name: 'null',
    type: 'Primitive',
    concept: '表示变量没有指向任何对象值，通常用于表示有意缺少的对象值。',
    guides: [
      '当变量需要明确表示为空时使用',
      '在函数参数中表示可选参数未提供',
      '作为对象属性的初始值表示该属性可被后续赋值',
    ],
    notes: [
      "typeof null 返回 'object'（历史遗留问题）",
      'JSON.stringify 会将 null 保留为 null',
      '与 undefined 不同，null 表示有意赋值为空',
      '在数值上下文中转换为 0，在布尔上下文中转换为 false',
    ],
    detection: 'value === null; // 严格等于检查\nObject.is(value, null); // ES6 方法',
    operations:
      "// 赋值\nlet obj = null;\n\n// 类型检查\nconsole.log(typeof null); // 'object'\n\n// 相等比较\nconsole.log(null == undefined); // true\nconsole.log(null === undefined); // false",
    falsy: true,
    toNumber: '0',
    toBoolean: 'false',
    toString: "'null'",
    equality: 'null == undefined 为 true，其他都为 false',
  },
  {
    name: 'undefined',
    type: 'Primitive',
    concept: '表示变量已声明但尚未赋值，或对象属性不存在，是未定义值的默认状态。',
    guides: ['用于检查变量是否已赋值', '检测函数参数是否提供', '检查对象属性是否存在'],
    notes: [
      '声明但未赋值的变量默认值为 undefined',
      '函数未指定返回值时返回 undefined',
      'JSON.stringify 会忽略 undefined 值',
      '在数值上下文中转换为 NaN，在布尔上下文中转换为 false',
    ],
    detection: "value === undefined; // 严格等于检查\ntypeof value === 'undefined'; // 安全检测",
    operations:
      '// 变量声明\nlet x;\nconsole.log(x); // undefined\n\n// 函数返回值\nfunction noReturn() {}\nconsole.log(noReturn()); // undefined\n\n// 对象属性\nconst obj = {};\nconsole.log(obj.prop); // undefined',
    falsy: true,
    toNumber: 'NaN',
    toBoolean: 'false',
    toString: "'undefined'",
    equality: 'undefined == null 为 true，其他都为 false',
  },
  {
    name: 'Infinity',
    type: 'Number',
    concept: '表示正无穷大的数值，用于表示超出 JavaScript 可表示最大数值的结果。',
    guides: [
      '表示数学上的无穷大概念',
      '用于处理超出数值范围的计算结果',
      '在需要特殊标记极大数值的场景中使用',
    ],
    notes: [
      '正数除以 0 得到 Infinity',
      'Infinity 大于任何有限数值',
      'Infinity 参与数学运算有特殊规则',
      'JSON.stringify 会将 Infinity 转换为 null',
    ],
    detection:
      'value === Infinity; // 严格等于检查\nNumber.isFinite(value); // 检测有限数（返回 false）',
    operations:
      '// 数学运算\nconsole.log(1 / 0); // Infinity\nconsole.log(Infinity + 100); // Infinity\nconsole.log(Infinity * 0); // NaN\n\n// 比较操作\nconsole.log(Infinity > Number.MAX_VALUE); // true\nconsole.log(Infinity === Infinity); // true',
    falsy: false,
    toNumber: 'Infinity',
    toBoolean: 'true',
    toString: "'Infinity'",
    equality: 'Infinity === Infinity 为 true',
  },
  {
    name: '-Infinity',
    type: 'Number',
    concept: '表示负无穷大的数值，用于表示超出 JavaScript 可表示最小数值的结果。',
    guides: [
      '表示数学上的负无穷大概念',
      '用于处理超出数值范围的计算结果',
      '在需要特殊标记极小数值的场景中使用',
    ],
    notes: [
      '负数除以 0 得到 -Infinity',
      '-Infinity 小于任何有限数值',
      '-Infinity 参与数学运算有特殊规则',
      'JSON.stringify 会将 -Infinity 转换为 null',
    ],
    detection:
      'value === -Infinity; // 严格等于检查\nNumber.isFinite(value); // 检测有限数（返回 false）',
    operations:
      '// 数学运算\nconsole.log(-1 / 0); // -Infinity\nconsole.log(-Infinity * 2); // -Infinity\nconsole.log(-Infinity + Infinity); // NaN\n\n// 比较操作\nconsole.log(-Infinity < Number.MIN_VALUE); // true\nconsole.log(-Infinity === -Infinity); // true',
    falsy: false,
    toNumber: '-Infinity',
    toBoolean: 'true',
    toString: "'-Infinity'",
    equality: '-Infinity === -Infinity 为 true',
  },
  {
    name: 'Symbol',
    type: 'Primitive',
    route: 'Symbol',
    concept: '表示唯一的、不可变的值，通常用作对象属性的标识符，避免命名冲突。',
    guides: [
      '创建对象唯一属性键',
      '定义对象的元属性（如 Symbol.iterator）',
      '实现私有属性（结合 WeakMap）',
    ],
    notes: [
      '每个 Symbol 都是唯一的，即使描述相同',
      'Symbol 属性不可枚举，不会被 for...in 遍历',
      'JSON.stringify 会忽略 Symbol 属性',
      '使用 Symbol.for() 创建全局共享的 Symbol',
    ],
    detection:
      "typeof value === 'symbol'; // 类型检测\nSymbol.keyFor(sym); // 获取全局 Symbol 的键",
    operations:
      "// 创建 Symbol\nconst sym1 = Symbol('description');\nconst sym2 = Symbol('description');\nconsole.log(sym1 === sym2); // false\n\n// 对象属性\nconst obj = {};\nobj[sym1] = 'value';\n\n// 全局 Symbol\nconst globalSym = Symbol.for('key');\nconsole.log(Symbol.keyFor(globalSym)); // 'key'",
    falsy: false,
    toNumber: 'TypeError',
    toBoolean: 'true',
    toString: "'Symbol(description)'",
    equality: '相同 Symbol 实例才相等',
  },
  {
    name: 'BigInt',
    type: 'Primitive',
    route: 'BigInt',
    concept: '表示任意精度的整数，用于处理超过 Number.MAX_SAFE_INTEGER 的整数值。',
    guides: [
      '处理大整数计算（如金融、加密）',
      '表示超出安全整数范围的数值',
      '与普通数值交互时需显式转换',
    ],
    notes: [
      'BigInt 字面量以 n 结尾（如 123n）',
      '不能与 Number 类型混合运算，需显式转换',
      'JSON.stringify 不支持 BigInt，会抛出错误',
      'BigInt 不支持 Math 对象中的方法',
    ],
    detection:
      "typeof value === 'bigint'; // 类型检测\nvalue.constructor === BigInt; // 构造函数检测",
    operations:
      "// 创建 BigInt\nconst bigNum = 9007199254740991n;\nconst bigFromStr = BigInt('9007199254740991');\n\n// 数学运算\nconsole.log(bigNum + 1n); // 9007199254740992n\n\n// 类型转换\nconsole.log(Number(bigNum)); // 9007199254740991\nconsole.log(2n == 2); // true\nconsole.log(2n === 2); // false",
    falsy: false,
    toNumber: '可能丢失精度',
    toBoolean: 'true（0n 为 false）',
    toString: '数字字符串',
    equality: '与相同 BigInt 值相等，与数值宽松相等',
  },
])

// 搜索词
const searchTerm = ref<string>('')

// 过滤数据类型
const filteredTypes = computed(() => {
  return types.value.filter(
    (type) =>
      !searchTerm.value ||
      type.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      type.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      type.concept.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

// 获取数据类型颜色
const getTypeColor = (typeName: string) => {
  const colors: Record<string, string> = {
    NaN: '#ef476f', // 红色
    null: '#7209b7', // 紫色
    undefined: '#3a0ca3', // 深蓝
    Infinity: '#4cc9f0', // 天蓝
    '-Infinity': '#4361ee', // 蓝色
    Symbol: '#06d6a0', // 绿色
    BigInt: '#ffd166', // 黄色
  }

  return colors[typeName] || '#9e9e9e'
}
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@info-color: #118ab2;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.special-types-reference {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.controls {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;

  .search-box {
    position: relative;
    max-width: 500px;
    width: 100%;

    .search-input {
      width: 100%;
      padding: 12px 15px 12px 40px;
      border: 1px solid @border-color;
      border-radius: 30px;
      font-size: 1rem;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 2px 8px rgba(67, 97, 238, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }
  }
}

.types-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.type-card {
  background: @card-bg;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  padding: 15px 20px;
  background: fade(@primary-color, 5%);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.4rem;
    color: @secondary-color;
  }

  .type-tag {
    background: fade(@primary-color, 15%);
    color: @primary-color;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .section {
    h3 {
      font-size: 1.1rem;
      color: @primary-color;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid @border-color;
    }

    p,
    ul {
      margin-bottom: 5px;
      color: lighten(@text-color, 15%);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
      }
    }

    pre {
      background: @light-bg;
      border-left: 3px solid @primary-color;
      padding: 12px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      border-radius: 0 4px 4px 0;
      white-space: pre-wrap;
      color: #333;
    }
  }
}

.comparison-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;

  h2 {
    text-align: center;
    color: @secondary-color;
    margin-bottom: 20px;
    font-size: 1.8rem;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 10%);
      color: @primary-color;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) {
      background-color: fade(@primary-color, 3%);
    }

    tr:hover {
      background-color: fade(@primary-color, 5%);
    }

    code {
      background: fade(@primary-color, 10%);
      color: @primary-color;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 20px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
  margin-top: auto;
}

@media (max-width: 768px) {
  .types-container {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .comparison-section {
    padding: 15px;
    overflow-x: auto;

    h2 {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px 0;

    h1 {
      font-size: 1.8rem;
    }
  }

  .card-header h2 {
    font-size: 1.2rem;
  }
}
</style>
