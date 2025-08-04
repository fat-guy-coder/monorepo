<template>
  <div class="digital-logic-container">
    <header class="header">
      <h1>数字逻辑基础</h1>
      <p class="subtitle">数据表示、存储与使用场景</p>
    </header>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">3</div>
        <div class="stat-label">核心数据类型</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">8</div>
        <div class="stat-label">存储机制</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">10+</div>
        <div class="stat-label">应用场景</div>
      </div>
    </div>

    <div class="content">
      <div class="data-section">
        <h2><i class="icon-int"></i> 整数表示与存储</h2>

        <div class="section">
          <h3>存储原理</h3>
          <div class="storage-visualization">
            <div class="bit-row">
              <div v-for="i in 8" :key="'int-bit-' + i" class="bit-cell">
                <span class="bit-value">0</span>
                <span class="bit-index">2<sup>{{ 7 - i }}</sup></span>
              </div>
              <div class="bit-label">8位整数</div>
            </div>
            <div class="bit-row">
              <div v-for="i in 16" :key="'int-bit2-' + i" class="bit-cell">
                <span class="bit-value">1</span>
                <span class="bit-index">2<sup>{{ 15 - i }}</sup></span>
              </div>
              <div class="bit-label">16位整数</div>
            </div>
          </div>
          <p>整数在计算机中通常以<b>二进制补码</b>形式存储：</p>
          <ul>
            <li><b>原码</b>：最高位表示符号（0正1负），其余位表示数值</li>
            <li><b>反码</b>：正数同原码，负数符号位不变，数值位取反</li>
            <li><b>补码</b>：正数同原码，负数在反码基础上加1</li>
          </ul>
        </div>

        <div class="section">
          <h3>读取原理</h3>
          <p>整数读取时直接进行二进制转换：</p>
          <div class="formula-box">
            value = (-1)<sup>sign</sup> × Σ(bit<sub>i</sub> × 2<sup>i</sup>)
          </div>
          <p>例如：8位补码 <b>1111 1010</b> 的值为：</p>
          <div class="calculation">
            <div>1. 取反：<span class="binary">0000 0101</span></div>
            <div>2. 加1：<span class="binary">0000 0110</span> = 6</div>
            <div>3. 加符号：-6</div>
          </div>
        </div>

        <div class="section">
          <h3>使用场景</h3>
          <div class="scenarios">
            <div class="scenario-card">
              <div class="scenario-icon">🔢</div>
              <h4>计数器</h4>
              <p>循环计数、对象ID等</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h4>索引值</h4>
              <p>数组索引、数据库ID</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🎮</div>
              <h4>游戏状态</h4>
              <p>生命值、得分、位置坐标</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>整数类型比较</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>类型</th>
                  <th>大小(位)</th>
                  <th>范围</th>
                  <th>存储空间</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>byte</td>
                  <td>8</td>
                  <td>-128 到 127</td>
                  <td>1字节</td>
                </tr>
                <tr>
                  <td>short</td>
                  <td>16</td>
                  <td>-32,768 到 32,767</td>
                  <td>2字节</td>
                </tr>
                <tr>
                  <td>int</td>
                  <td>32</td>
                  <td>-2<sup>31</sup> 到 2<sup>31</sup>-1</td>
                  <td>4字节</td>
                </tr>
                <tr>
                  <td>long</td>
                  <td>64</td>
                  <td>-2<sup>63</sup> 到 2<sup>63</sup>-1</td>
                  <td>8字节</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="data-section">
        <h2><i class="icon-float"></i> 浮点数表示与存储</h2>

        <div class="section">
          <h3>IEEE 754标准</h3>
          <div class="float-visualization">
            <div class="bit-row">
              <div class="bit-cell sign">
                <span class="bit-value">S</span>
                <span class="bit-label">符号位</span>
              </div>
              <div v-for="i in 8" :key="'exp-bit-' + i" class="bit-cell exponent">
                <span class="bit-value">E</span>
                <span class="bit-index">{{ i - 1 }}</span>
              </div>
              <div v-for="i in 23" :key="'frac-bit-' + i" class="bit-cell fraction">
                <span class="bit-value">F</span>
                <span class="bit-index">{{ i - 1 }}</span>
              </div>
              <div class="bit-label">32位单精度浮点数</div>
            </div>
          </div>
          <p>浮点数由三部分组成：</p>
          <ul>
            <li><b>符号位(S)</b>：1位，0表示正数，1表示负数</li>
            <li><b>指数位(E)</b>：8位（单精度）/11位（双精度），采用偏移表示法</li>
            <li><b>尾数位(F)</b>：23位（单精度）/52位（双精度），表示小数部分</li>
          </ul>
          <p>浮点数值计算公式：</p>
          <div class="formula-box">
            value = (-1)<sup>S</sup> × (1 + F) × 2<sup>(E - bias)</sup>
          </div>
          <p>其中单精度浮点数的bias为127，双精度为1023</p>
        </div>

        <div class="section">
          <h3>特殊值处理</h3>
          <div class="special-values">
            <div class="value-card">
              <div class="value-title">零值</div>
              <div class="value-representation">E=0, F=0</div>
            </div>
            <div class="value-card">
              <div class="value-title">无穷大</div>
              <div class="value-representation">E=255, F=0</div>
            </div>
            <div class="value-card">
              <div class="value-title">NaN</div>
              <div class="value-representation">E=255, F≠0</div>
            </div>
            <div class="value-card">
              <div class="value-title">非规格化</div>
              <div class="value-representation">E=0, F≠0</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>使用场景</h3>
          <div class="scenarios">
            <div class="scenario-card">
              <div class="scenario-icon">📐</div>
              <h4>科学计算</h4>
              <p>物理模拟、数学运算</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">💰</div>
              <h4>金融系统</h4>
              <p>汇率、利息计算</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🎨</div>
              <h4>图形处理</h4>
              <p>3D坐标、颜色值</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>精度问题示例</h3>
          <div class="precision-example">
            <div class="code-block">
              <pre><code>// JavaScript中的浮点数精度问题
console.log(0.1 + 0.2);  // 0.30000000000000004
console.log(0.1 * 0.2);  // 0.020000000000000004</code></pre>
            </div>
            <p>解决方案：</p>
            <ul>
              <li>使用整数运算代替浮点运算（如以分为单位存储金额）</li>
              <li>使用高精度数学库（如BigDecimal）</li>
              <li>合理设置误差范围（epsilon）进行比较</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="data-section">
        <h2><i class="icon-string"></i> 字符串表示与存储</h2>

        <div class="section">
          <h3>编码与存储</h3>
          <div class="encoding-visualization">
            <div class="encoding-row">
              <div class="char-cell">'H'</div>
              <div class="char-cell">'e'</div>
              <div class="char-cell">'l'</div>
              <div class="char-cell">'l'</div>
              <div class="char-cell">'o'</div>
              <div class="char-cell">' '</div>
              <div class="char-cell">'世'</div>
              <div class="char-cell">'界'</div>
            </div>
            <div class="bit-row">
              <div class="byte-cell">01001000</div>
              <div class="byte-cell">01100101</div>
              <div class="byte-cell">01101100</div>
              <div class="byte-cell">01101100</div>
              <div class="byte-cell">01101111</div>
              <div class="byte-cell">00100000</div>
              <div class="byte-cell">11100111 10111011 10010000</div>
              <div class="byte-cell">11100100 10111101 10010000</div>
            </div>
            <div class="encoding-label">"Hello 世界" 的UTF-8编码</div>
          </div>

          <div class="encoding-types">
            <div class="encoding-card">
              <h4>ASCII (1字节)</h4>
              <p>英文字符、数字、符号</p>
              <div class="encoding-range">0-127</div>
            </div>
            <div class="encoding-card">
              <h4>Latin-1 (1字节)</h4>
              <p>西欧语言扩展</p>
              <div class="encoding-range">0-255</div>
            </div>
            <div class="encoding-card">
              <h4>UTF-8 (1-4字节)</h4>
              <p>可变长度Unicode</p>
              <div class="encoding-range">全球字符</div>
            </div>
            <div class="encoding-card">
              <h4>UTF-16 (2/4字节)</h4>
              <p>固定长度Unicode</p>
              <div class="encoding-range">全球字符</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>内存结构</h3>
          <div class="memory-layout">
            <div class="memory-row header">
              <div class="memory-cell">地址</div>
              <div class="memory-cell">内容</div>
              <div class="memory-cell">说明</div>
            </div>
            <div class="memory-row">
              <div class="memory-cell">0x1000</div>
              <div class="memory-cell">0x05</div>
              <div class="memory-cell">字符串长度</div>
            </div>
            <div class="memory-row">
              <div class="memory-cell">0x1001</div>
              <div class="memory-cell">'H' (0x48)</div>
              <div class="memory-cell">字符1</div>
            </div>
            <div class="memory-row">
              <div class="memory-cell">0x1002</div>
              <div class="memory-cell">'e' (0x65)</div>
              <div class="memory-cell">字符2</div>
            </div>
            <div class="memory-row">
              <div class="memory-cell">0x1003</div>
              <div class="memory-cell">'l' (0x6C)</div>
              <div class="memory-cell">字符3</div>
            </div>
            <div class="memory-row">
              <div class="memory-cell">0x1004</div>
              <div class="memory-cell">'l' (0x6C)</div>
              <div class="memory-cell">字符4</div>
            </div>
            <div class="memory-row">
              <div class="memory-cell">0x1005</div>
              <div class="memory-cell">'o' (0x6F)</div>
              <div class="memory-cell">字符5</div>
            </div>
            <div class="memory-footer">"Hello" 的Pascal风格内存表示</div>
          </div>

          <div class="string-types">
            <div class="type-card">
              <h4>C风格字符串</h4>
              <p>以'\0'结尾的字符数组</p>
              <div class="type-example">char str[] = "Hello";</div>
            </div>
            <div class="type-card">
              <h4>Pascal字符串</h4>
              <p>首字节存储长度</p>
              <div class="type-example">[5][H][e][l][l][o]</div>
            </div>
            <div class="type-card">
              <h4>现代语言字符串</h4>
              <p>长度+字符数据+编码信息</p>
              <div class="type-example">JS/Python/Java字符串对象</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>使用场景</h3>
          <div class="scenarios">
            <div class="scenario-card">
              <div class="scenario-icon">📝</div>
              <h4>文本处理</h4>
              <p>文档、日志、配置文件</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🌐</div>
              <h4>网络通信</h4>
              <p>HTTP头、JSON/XML数据</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">👤</div>
              <h4>用户界面</h4>
              <p>标签、提示信息、输入框</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>字符串操作优化</h3>
          <div class="optimization">
            <div class="optimization-card">
              <h4>不可变字符串</h4>
              <p>Java、Python、JavaScript等语言中的字符串不可变，修改操作会创建新对象</p>
            </div>
            <div class="optimization-card">
              <h4>字符串池</h4>
              <p>JVM等环境使用字符串池重用相同字符串，减少内存占用</p>
            </div>
            <div class="optimization-card">
              <h4>Rope数据结构</h4>
              <p>用于高效处理超大字符串的树状结构</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>数字逻辑基础 © 2023 | 理解数据存储原理是编程与系统设计的核心基础</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const intExample = ref({
  binary: '11111010',
  decimal: -6
});

const floatExample = ref({
  binary: '11000010111011010100000000000000',
  decimal: -118.625
});

const stringExample = ref({
  text: "Hello 世界",
  utf8: "48 65 6C 6C 6F 20 E4 B8 96 E7 95 8C"
});
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

// 颜色变量
@primary: #4361ee;
@primary-light: #eef1fe;
@secondary: #3a0ca3;
@int-color: #4cc9f0;
@float-color: #f72585;
@string-color: #7209b7;
@light-bg: #f8f9fa;
@dark-text: #212529;
@gray-text: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

// 字体
.digital-logic-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @dark-text;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 30px 0;
  margin-bottom: 20px;
  background: linear-gradient(135deg, @primary-light, #ffffff);
  border-radius: 12px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @gray-text;
  }
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;

  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 20px 30px;
    text-align: center;
    box-shadow: @card-shadow;
    transition: transform 0.3s;
    min-width: 120px;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: @primary;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 0.9rem;
      color: @gray-text;
    }
  }
}

.content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: @card-shadow;
  margin-bottom: 30px;
}

.data-section {
  margin-bottom: 40px;

  h2 {
    font-size: 1.8rem;
    color: @primary;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 2px solid @light-bg;
    display: flex;
    align-items: center;

    i {
      margin-right: 12px;
      width: 40px;
      height: 40px;
      background: @primary-light;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
  }
}

.section {
  margin-bottom: 30px;

  h3 {
    font-size: 1.4rem;
    color: @secondary;
    margin-top: 0;
    margin-bottom: 15px;
  }
}

.storage-visualization,
.float-visualization,
.encoding-visualization {
  background: @light-bg;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  overflow-x: auto;

  .bit-row {
    display: flex;
    margin-bottom: 10px;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .bit-cell {
    width: 40px;
    height: 50px;
    border: 1px solid @border-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    background: white;

    &.sign {
      background: lighten(@int-color, 30%);
      width: 50px;
    }

    &.exponent {
      background: lighten(@float-color, 30%);
    }

    &.fraction {
      background: lighten(@string-color, 40%);
    }
  }

  .bit-value {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .bit-index {
    font-size: 0.7rem;
    color: @gray-text;
    margin-top: 4px;
  }

  .bit-label {
    margin-left: 15px;
    display: flex;
    align-items: center;
    color: @gray-text;
    font-size: 0.9rem;
  }
}

.byte-cell {
  min-width: 100px;
  height: 40px;
  border: 1px solid @border-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  margin-right: 5px;
  background: white;
  padding: 0 10px;
}

.encoding-label {
  text-align: center;
  color: @gray-text;
  font-size: 0.9rem;
  margin-top: 10px;
}

.char-cell {
  width: 50px;
  height: 50px;
  border: 1px solid @border-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 5px;
  background: white;
}

.formula-box {
  background: #f8f9ff;
  border: 2px dashed @primary;
  padding: 20px;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  text-align: center;
  margin: 15px 0;
  color: @secondary;
}

.calculation {
  background: @light-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;

  .binary {
    color: @primary;
    font-weight: bold;
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  .scenario-card {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: @card-shadow;
      border-color: @primary;
    }

    .scenario-icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    h4 {
      margin: 0 0 5px 0;
      color: @dark-text;
    }

    p {
      color: @gray-text;
      margin: 0;
      font-size: 0.9rem;
    }
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @light-bg;
      font-weight: 600;
    }

    tr:hover {
      background: @primary-light;
    }
  }
}

.special-values,
.encoding-types,
.string-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;

  .value-card,
  .encoding-card,
  .type-card {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 15px;
    text-align: center;

    .value-title,
    h4 {
      font-weight: 600;
      margin: 0 0 8px 0;
      color: @dark-text;
    }

    .value-representation {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: @primary;
      margin: 8px 0;
    }

    .encoding-range,
    .type-example {
      font-size: 0.9rem;
      color: @gray-text;
      margin-top: 8px;
    }
  }
}

.memory-layout {
  background: @light-bg;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 20px;
  overflow-x: auto;

  .memory-row {
    display: flex;

    &.header {
      font-weight: 600;
      border-bottom: 2px solid @border-color;
    }
  }

  .memory-cell {
    padding: 12px 15px;
    min-width: 100px;
    text-align: center;

    &:first-child {
      font-family: 'JetBrains Mono', monospace;
    }
  }

  .memory-footer {
    text-align: center;
    padding: 10px;
    color: @gray-text;
    font-size: 0.9rem;
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #e2e8f0;
  margin: 15px 0;

  code {
    display: block;
  }
}

.divider {
  height: 1px;
  background: @border-color;
  margin: 40px 0;
}

.optimization {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .optimization-card {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;

    h4 {
      color: @primary;
      margin-top: 0;
    }

    p {
      color: @gray-text;
    }
  }
}

.footer {
  text-align: center;
  padding: 20px;
  color: @gray-text;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
  margin-top: 20px;
}

// 图标样式
.icon-int::before {
  content: "🔢";
}

.icon-float::before {
  content: "📐";
}

.icon-string::before {
  content: "🔤";
}
</style>