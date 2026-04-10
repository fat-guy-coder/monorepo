<template>
  <div class="conversion-guide">
    <h1>计算机进制转换原理</h1>

    <!-- 进制基础 -->
    <div class="section">
      <h2>进制系统基础</h2>
      <div class="base-systems">
        <div class="system" v-for="(system, index) in baseSystems" :key="index">
          <div class="system-icon">{{ system.icon }}</div>
          <h3>{{ system.name }}</h3>
          <p>{{ system.description }}</p>
          <div class="system-example">示例: {{ system.example }}</div>
        </div>
      </div>
    </div>

    <!-- 整数转换 -->
    <div class="section">
      <h2>整数进制转换</h2>

      <!-- 十进制转二进制 -->
      <div class="conversion-method">
        <h3>十进制整数转二进制</h3>
        <div class="method-steps">
          <div class="step" v-for="(step, index) in decToBinSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <p>{{ step }}</p>
          </div>
        </div>
        <div class="example">
          <h4>示例: 29<sub>10</sub> → ?<sub>2</sub></h4>
          <div class="calculation">
            <div v-for="(calc, i) in decToBinExample" :key="i" class="calc-step">
              <div>{{ calc.division }}</div>
              <div>余数: {{ calc.remainder }}</div>
            </div>
            <div class="result">结果: {{ decToBinResult }}</div>
          </div>
        </div>
      </div>

      <!-- 二进制转十进制 -->
      <div class="conversion-method">
        <h3>二进制整数转十进制</h3>
        <div class="method-steps">
          <div class="step" v-for="(step, index) in binToDecSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <p>{{ step }}</p>
          </div>
        </div>
        <div class="example">
          <h4>示例: 10111<sub>2</sub> → ?<sub>10</sub></h4>
          <div class="calculation">
            <div class="calc-step">
              <div>1×2<sup>4</sup> + 0×2<sup>3</sup> + 1×2<sup>2</sup> + 1×2<sup>1</sup> + 1×2<sup>0</sup></div>
            </div>
            <div class="calc-step">
              <div>16 + 0 + 4 + 2 + 1 = 23</div>
            </div>
            <div class="result">结果: 23<sub>10</sub></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 小数转换 -->
    <div class="section">
      <h2>小数进制转换</h2>

      <!-- 十进制小数转二进制 -->
      <div class="conversion-method">
        <h3>十进制小数转二进制</h3>
        <div class="method-steps">
          <div class="step" v-for="(step, index) in decFractionToBinSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <p>{{ step }}</p>
          </div>
        </div>
        <div class="example">
          <h4>示例: 0.625<sub>10</sub> → ?<sub>2</sub></h4>
          <div class="calculation">
            <div v-for="(calc, i) in decFractionToBinExample" :key="i" class="calc-step">
              <div>{{ calc.multiplication }}</div>
              <div>整数部分: {{ calc.integer }}</div>
            </div>
            <div class="result">结果: 0.{{ decFractionToBinResult }}<sub>2</sub></div>
          </div>
        </div>
      </div>

      <!-- 二进制小数转十进制 -->
      <div class="conversion-method">
        <h3>二进制小数转十进制</h3>
        <div class="method-steps">
          <div class="step" v-for="(step, index) in binFractionToDecSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <p>{{ step }}</p>
          </div>
        </div>
        <div class="example">
          <h4>示例: 0.101<sub>2</sub> → ?<sub>10</sub></h4>
          <div class="calculation">
            <div class="calc-step">
              <div>1×2<sup>-1</sup> + 0×2<sup>-2</sup> + 1×2<sup>-3</sup></div>
            </div>
            <div class="calc-step">
              <div>0.5 + 0 + 0.125 = 0.625</div>
            </div>
            <div class="result">结果: 0.625<sub>10</sub></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 转换工具 -->
    <div class="section">
      <h2>进制转换工具</h2>
      <div class="converter">
        <div class="converter-input">
          <input type="text" v-model="inputValue" placeholder="输入数字">
          <Select v-model="fromBase">
            <option v-for="base in bases" :key="base.value" :value="base.value">{{ base.label }}</option>
          </select>
          <span>转换为</span>
          <Select v-model="toBase">
            <option v-for="base in bases" :key="base.value" :value="base.value">{{ base.label }}</option>
          </select>
          <button @click="convert">转换</button>
        </div>
        <div class="converter-result">
          <h3 v-if="result !== ''">转换结果: {{ result }}</h3>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="section">
      <h2>进制转换应用场景</h2>
      <div class="applications">
        <div class="app-card" v-for="(app, index) in applications" :key="index">
          <div class="app-icon">{{ app.icon }}</div>
          <h3>{{ app.title }}</h3>
          <p>{{ app.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 进制系统基础
const baseSystems = ref([
  {
    name: "二进制",
    icon: "🔢",
    description: "基数为2，使用0和1表示",
    example: "1011₂ = 11₁₀"
  },
  {
    name: "十进制",
    icon: "🔟",
    description: "基数为10，日常使用数字系统",
    example: "123₁₀ = 123"
  },
  {
    name: "八进制",
    icon: "🔄",
    description: "基数为8，使用0-7表示",
    example: "17₈ = 15₁₀"
  },
  {
    name: "十六进制",
    icon: "#️⃣",
    description: "基数为16，使用0-9和A-F表示",
    example: "1F₁₆ = 31₁₀"
  }
]);

// 十进制转二进制步骤
const decToBinSteps = ref([
  "将十进制数除以2，记录商和余数",
  "用上一步的商继续除以2，记录新的余数",
  "重复此过程，直到商为0",
  "将余数从下往上排列，得到二进制数"
]);

// 十进制转二进制示例
const decToBinExample = ref([
  { division: "29 ÷ 2 = 14", remainder: "1 (LSB)" },
  { division: "14 ÷ 2 = 7", remainder: "0" },
  { division: "7 ÷ 2 = 3", remainder: "1" },
  { division: "3 ÷ 2 = 1", remainder: "1" },
  { division: "1 ÷ 2 = 0", remainder: "1 (MSB)" }
]);

const decToBinResult = computed(() => {
  return decToBinExample.value.map(s => s.remainder.charAt(0)).reverse().join('');
});

// 二进制转十进制步骤
const binToDecSteps = ref([
  "写出二进制数的每一位数字",
  "从右向左，给每位分配2的幂次（从0开始）",
  "将每位数字乘以其对应的2的幂次",
  "将所有乘积相加，得到十进制数"
]);

// 十进制小数转二进制步骤
const decFractionToBinSteps = ref([
  "将小数部分乘以2",
  "记录结果的整数部分（0或1）",
  "取结果的小数部分继续乘以2",
  "重复此过程，直到小数部分为0或达到所需精度",
  "将整数部分从上往下排列，得到二进制小数"
]);

// 十进制小数转二进制示例
const decFractionToBinExample = ref([
  { multiplication: "0.625 × 2 = 1.25", integer: "1 (MSB)" },
  { multiplication: "0.25 × 2 = 0.5", integer: "0" },
  { multiplication: "0.5 × 2 = 1.0", integer: "1 (LSB)" }
]);

const decFractionToBinResult = computed(() => {
  return decFractionToBinExample.value.map(s => s.integer.charAt(0)).join('');
});

// 二进制小数转十进制步骤
const binFractionToDecSteps = ref([
  "写出二进制小数的每一位数字",
  "从左向右，给每位分配2的负幂次（从-1开始）",
  "将每位数字乘以其对应的2的负幂次",
  "将所有乘积相加，得到十进制小数"
]);

// 进制转换工具
const bases = ref([
  { label: "二进制", value: 2 },
  { label: "八进制", value: 8 },
  { label: "十进制", value: 10 },
  { label: "十六进制", value: 16 }
]);

const inputValue = ref("");
const fromBase = ref(10);
const toBase = ref(2);
const result = ref("");

// 转换函数
const convert = () => {
  if (inputValue.value === "") {
    result.value = "请输入数字";
    return;
  }

  try {
    // 检查输入是否包含小数点
    if (inputValue.value.includes('.')) {
      const [integerPart, fractionalPart] = inputValue.value.split('.');

      // 转换整数部分
      const integerResult = parseInt(integerPart, fromBase.value).toString(toBase.value);

      // 转换小数部分
      let fractionalResult = "";
      let fractional = parseFloat(`0.${fractionalPart}`);
      const precision = 8; // 最大精度

      for (let i = 0; i < precision; i++) {
        fractional *= toBase.value;
        const digit = Math.floor(fractional);
        fractional -= digit;
        fractionalResult += digit.toString(toBase.value);
        if (fractional === 0) break;
      }

      result.value = `${integerResult}.${fractionalResult}`;
    } else {
      // 纯整数转换
      const num = parseInt(inputValue.value, fromBase.value);
      if (isNaN(num)) throw new Error("输入无效");
      result.value = num.toString(toBase.value);
    }
  } catch (e) {
    result.value = "转换错误: 输入无效";
  }
};

// 应用场景
const applications = ref([
  {
    icon: "💻",
    title: "计算机体系结构",
    description: "CPU指令处理、内存寻址使用二进制"
  },
  {
    icon: "📡",
    title: "网络通信",
    description: "IP地址使用点分十进制表示（实际是二进制）"
  },
  {
    icon: "🎨",
    title: "图形编程",
    description: "颜色值常用十六进制表示（如#FFFFFF）"
  },
  {
    icon: "🔐",
    title: "加密算法",
    description: "密钥处理需要二进制操作"
  }
]);
</script>

<style lang="less" scoped>
.conversion-guide {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);

  h1 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
    color: #2c3e50;
  }

  h2 {
    font-size: 1.7rem;
    padding-left: 10px;
    border-left: 4px solid #3498db;
    color: #2c3e50;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.4rem;
    color: #2980b9;
    margin-top: 0;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 1.1rem;
    color: #e74c3c;
    margin: 15px 0 10px;
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  // 进制系统基础
  .base-systems {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;

    .system {
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .system-icon {
        font-size: 2.5rem;
        margin-bottom: 10px;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0;
      }

      .system-example {
        font-family: monospace;
        background: #2c3e50;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.95rem;
        margin-top: 10px;
      }
    }
  }

  // 转换方法
  .conversion-method {
    margin-bottom: 30px;
    padding: 15px;
    background: #f1f2f6;
    border-radius: 8px;

    .method-steps {
      margin-bottom: 20px;

      .step {
        display: flex;
        margin-bottom: 10px;
        align-items: flex-start;

        .step-number {
          min-width: 30px;
          height: 30px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 10px;
        }

        p {
          margin: 0;
          line-height: 1.6;
          color: #555;
        }
      }
    }

    .example {
      background: white;
      border-radius: 6px;
      padding: 15px;
      border: 1px solid #e0e0e0;

      .calculation {
        .calc-step {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px dashed #eee;
          font-family: monospace;
          font-size: 1.1rem;

          &:last-child {
            border-bottom: none;
          }
        }

        .result {
          margin-top: 15px;
          padding: 10px;
          background: #2c3e50;
          color: white;
          border-radius: 4px;
          font-weight: bold;
          font-size: 1.1rem;
          text-align: center;
        }
      }
    }
  }

  // 转换工具
  .converter {
    .converter-input {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      margin-bottom: 20px;

      input,
      select,
      button {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      input {
        flex: 1;
        min-width: 100px;
      }

      button {
        background: #3498db;
        color: white;
        border: none;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #2980b9;
        }
      }
    }

    .converter-result {
      min-height: 60px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #e0e0e0;

      h3 {
        margin: 0;
        font-family: monospace;
        font-size: 1.3rem;
        color: #e74c3c;
      }
    }
  }

  // 应用场景
  .applications {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;

    .app-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .app-icon {
        font-size: 2rem;
        margin-bottom: 15px;
      }

      p {
        color: #555;
        line-height: 1.6;
        margin: 10px 0 0;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .base-systems,
    .applications {
      grid-template-columns: 1fr;
    }

    .converter-input {
      flex-direction: column;
      align-items: stretch !important;

      input,
      select,
      button {
        width: 100%;
      }
    }
  }
}
</style>