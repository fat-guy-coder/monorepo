<template>
  <div class="assembly-language-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>汇编语言</h1>
        <p class="subtitle">机器语言的助记符，硬件操作的艺术</p>
      </div>
      <div class="chip-group">
        <span class="chip">低级语言</span>
        <span class="chip">硬件编程</span>
        <span class="chip">高效执行</span>
        <span class="chip">逆向工程</span>
      </div>
    </header>

    <div class="content">
      <section class="overview">
        <div class="definition-card">
          <h2>什么是汇编语言？</h2>
          <p>
            汇编语言（Assembly Language）是一种低级编程语言，它与计算机的机器语言指令一一对应，但使用助记符（如MOV、ADD、JMP等）代替数字操作码，并使用符号地址代替绝对地址。
          </p>
          <p>
            汇编语言是机器语言的可读表示形式，它提供了对计算机硬件的直接控制能力，允许程序员编写高度优化的代码，但也要求程序员对计算机体系结构有深入的理解。
          </p>
          <div class="conversion-flow">
            <div class="step">
              <div class="step-icon">💻</div>
              <h3>汇编语言</h3>
              <p>MOV AX, 5</p>
            </div>
            <div class="arrow">→ 汇编器 →</div>
            <div class="step">
              <div class="step-icon">⚙️</div>
              <h3>机器语言</h3>
              <p>101110000000010100000000</p>
            </div>
            <div class="arrow">→ CPU执行 →</div>
            <div class="step">
              <div class="step-icon">✅</div>
              <h3>结果</h3>
              <p>AX寄存器 = 5</p>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <h2>汇编语言核心特点</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon" :style="{ backgroundColor: feature.color }">
              {{ feature.icon }}
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="instructions-section">
          <h2>常见汇编指令类型</h2>
          <div class="instruction-table">
            <div class="table-header">
              <div class="col-instruction">指令</div>
              <div class="col-example">示例</div>
              <div class="col-description">功能描述</div>
            </div>
            <div class="table-row" v-for="(instruction, index) in instructions" :key="index">
              <div class="col-instruction">
                <span class="instruction-name">{{ instruction.name }}</span>
              </div>
              <div class="col-example">
                <code>{{ instruction.example }}</code>
              </div>
              <div class="col-description">{{ instruction.description }}</div>
            </div>
          </div>
        </section>

        <section class="applications-section">
          <h2>汇编语言应用场景</h2>
          <div class="application-list">
            <div class="application-item" v-for="(app, index) in applications" :key="index">
              <div class="app-index">{{ index + 1 }}</div>
              <div class="app-content">
                <h3>{{ app.title }}</h3>
                <p>{{ app.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="comparison-section">
        <h2>汇编语言 vs 高级语言</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col-criteria">比较标准</div>
            <div class="col-assembly">汇编语言</div>
            <div class="col-high-level">高级语言</div>
          </div>
          <div class="table-row" v-for="(item, index) in comparisons" :key="index">
            <div class="col-criteria">{{ item.criteria }}</div>
            <div class="col-assembly">{{ item.assembly }}</div>
            <div class="col-high-level">{{ item.highLevel }}</div>
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>汇编语言示例：两数相加</h2>
        <div class="code-container">
          <div class="code-header">
            <span>x86汇编代码</span>
            <button class="copy-button" @click="copyCode">复制代码</button>
          </div>
          <pre><code>{{ assemblyCode }}</code></pre>
        </div>
        <div class="explanation">
          <h3>代码解析：</h3>
          <ul>
            <li><strong>.MODEL SMALL</strong> - 指定内存模型</li>
            <li><strong>.STACK 100H</strong> - 定义堆栈段大小</li>
            <li><strong>.DATA</strong> - 数据段开始</li>
            <li><strong>NUM1 DB 5</strong> - 定义字节变量NUM1并初始化为5</li>
            <li><strong>NUM2 DB 7</strong> - 定义字节变量NUM2并初始化为7</li>
            <li><strong>SUM DB ?</strong> - 定义未初始化的字节变量SUM</li>
            <li><strong>MOV指令</strong> - 数据传输</li>
            <li><strong>ADD指令</strong> - 加法运算</li>
            <li><strong>MOV AH, 4CH</strong> - 程序结束调用</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>汇编语言是理解计算机底层工作原理的关键，虽然现代开发中较少直接使用，但掌握汇编思想对成为优秀程序员至关重要。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const features = ref([
  { icon: '🔍', title: '硬件直接控制', description: '直接操作CPU寄存器、内存地址和I/O端口', color: '#e3f2fd' },
  { icon: '⚡', title: '执行效率高', description: '编译后代码精简，执行速度快，资源消耗少', color: '#e8f5e9' },
  { icon: '🧩', title: '一对一映射', description: '每条汇编指令对应一条机器语言指令', color: '#f3e5f5' },
  { icon: '📏', title: '平台相关性', description: '不同CPU架构有不同的汇编指令集', color: '#fff8e1' },
  { icon: '🎯', title: '精细优化', description: '允许对代码进行极致的空间和时间优化', color: '#e0f7fa' },
  { icon: '🛠️', title: '系统编程', description: '操作系统内核、驱动程序和固件开发的基础', color: '#ffecb3' },
]);

const instructions = ref([
  { name: 'MOV', example: 'MOV AX, BX', description: '将数据从源操作数传输到目标操作数' },
  { name: 'ADD', example: 'ADD AX, 5', description: '加法运算' },
  { name: 'SUB', example: 'SUB CX, DX', description: '减法运算' },
  { name: 'MUL', example: 'MUL BL', description: '无符号乘法' },
  { name: 'DIV', example: 'DIV CL', description: '无符号除法' },
  { name: 'INC', example: 'INC SI', description: '操作数加1' },
  { name: 'DEC', example: 'DEC DI', description: '操作数减1' },
  { name: 'JMP', example: 'JMP LABEL', description: '无条件跳转' },
  { name: 'CMP', example: 'CMP AX, BX', description: '比较两个操作数' },
  { name: 'CALL', example: 'CALL SUBROUTINE', description: '调用子程序' },
  { name: 'RET', example: 'RET', description: '从子程序返回' },
  { name: 'PUSH', example: 'PUSH AX', description: '将操作数压入堆栈' },
  { name: 'POP', example: 'POP BX', description: '从堆栈弹出数据到操作数' },
  { name: 'INT', example: 'INT 21H', description: '调用中断服务程序' },
]);

const applications = ref([
  {
    title: '操作系统内核',
    description: '编写操作系统核心部分，如任务调度、内存管理和中断处理程序'
  },
  {
    title: '设备驱动程序',
    description: '开发需要直接与硬件交互的设备驱动，如显卡、网卡驱动'
  },
  {
    title: '嵌入式系统',
    description: '资源受限的嵌入式设备开发，要求极高的执行效率和紧凑的代码'
  },
  {
    title: '性能关键代码',
    description: '游戏引擎、科学计算等需要极致优化的关键代码段'
  },
  {
    title: '逆向工程',
    description: '分析恶意软件、破解程序或研究闭源软件的工作原理'
  },
  {
    title: '编译器开发',
    description: '编译器后端生成目标机器代码的关键环节'
  },
]);

const comparisons = ref([
  { criteria: '可读性', assembly: '低（需要专业训练）', highLevel: '高（接近自然语言）' },
  { criteria: '开发效率', assembly: '低（代码量大）', highLevel: '高（抽象程度高）' },
  { criteria: '执行效率', assembly: '高（直接操作硬件）', highLevel: '中等（需要编译优化）' },
  { criteria: '可移植性', assembly: '低（与硬件紧密相关）', highLevel: '高（跨平台支持）' },
  { criteria: '控制粒度', assembly: '细（直接控制硬件）', highLevel: '粗（依赖运行时环境）' },
  { criteria: '学习曲线', assembly: '陡峭（需理解计算机体系结构）', highLevel: '平缓（抽象层次高）' },
]);

const assemblyCode = ref(`; 简单汇编程序：计算两数之和
.MODEL SMALL
.STACK 100H

.DATA
    NUM1 DB 5     ; 定义第一个数
    NUM2 DB 7     ; 定义第二个数
    SUM  DB ?     ; 存储结果

.CODE
START:
    MOV AX, @DATA ; 初始化数据段
    MOV DS, AX

    MOV AL, NUM1  ; 将NUM1加载到AL寄存器
    ADD AL, NUM2  ; 将NUM2加到AL
    MOV SUM, AL   ; 将结果存储到SUM

    ; 显示结果（简化版）
    MOV DL, SUM
    ADD DL, '0'   ; 转换为ASCII
    MOV AH, 02H   ; DOS显示字符功能
    INT 21H

    ; 退出程序
    MOV AH, 4CH   ; DOS退出功能
    INT 21H

END START`);

const copyCode = () => {
  navigator.clipboard.writeText(assemblyCode.value)
    .then(() => alert('代码已复制到剪贴板！'))
    .catch(err => console.error('复制失败:', err));
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

// 颜色变量
@primary-color: #1976d2;
@primary-light: #e3f2fd;
@secondary-color: #0d47a1;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f5f7fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@warning-color: #ffc107;

// 基础样式
.assembly-language-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-bottom: 2px solid @primary-light;

  .title-wrapper {
    margin-bottom: 1.5rem;

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      color: @secondary-color;
      margin-bottom: 0.5rem;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.4rem;
      color: #666;
      font-weight: 300;
    }
  }

  .chip-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;

    .chip {
      background: @primary-light;
      color: @primary-color;
      padding: 0.5rem 1.2rem;
      border-radius: 20px;
      font-weight: 500;
      font-size: 0.95rem;
      border: 1px solid fade(@primary-color, 20%);
    }
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.overview {
  .definition-card {
    background: @light-gray;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 0.5rem;
    }

    p {
      margin-bottom: 1.5rem;
      text-align: justify;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }
}

.conversion-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;

  .step {
    flex: 1;
    min-width: 200px;
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: @card-shadow;

    .step-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      color: @primary-color;
      margin: 0.5rem 0;
      font-size: 1.3rem;
    }

    p {
      font-family: 'Roboto Mono', monospace;
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.95rem;
      margin: 0.5rem 0 0;
    }
  }

  .arrow {
    color: #777;
    font-weight: 500;
    min-width: 120px;
    text-align: center;
    font-size: 1.1rem;
  }
}

.features-section {
  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @accent-color;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.8rem;
}

.feature-card {
  background: white;
  border-radius: 10px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: @card-shadow;
  transition: all 0.3s ease;
  border-top: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    width: 70px;
    height: 70px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  h3 {
    color: @secondary-color;
    margin: 1rem 0;
    font-size: 1.3rem;
  }

  p {
    font-size: 0.98rem;
    color: #555;
    margin: 0;
    line-height: 1.7;
  }
}

.columns {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.instructions-section {
  h2 {
    font-size: 1.6rem;
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @primary-color;
  }
}

.instruction-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .table-header {
    display: flex;
    background: @primary-color;
    color: white;
    font-weight: 500;
    padding: 1rem 1.5rem;

    .col-instruction {
      flex: 1;
      min-width: 100px;
    }

    .col-example {
      flex: 2;
      min-width: 150px;
    }

    .col-description {
      flex: 3;
    }
  }

  .table-row {
    display: flex;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid @border-color;

    &:nth-child(even) {
      background: @light-gray;
    }

    &:last-child {
      border-bottom: none;
    }

    .col-instruction {
      flex: 1;
      min-width: 100px;

      .instruction-name {
        font-weight: 700;
        color: @primary-color;
      }
    }

    .col-example {
      flex: 2;
      min-width: 150px;

      code {
        font-family: 'Roboto Mono', monospace;
        background: #f0f4f8;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.95rem;
      }
    }

    .col-description {
      flex: 3;
      font-size: 0.95rem;
    }
  }
}

.applications-section {
  h2 {
    font-size: 1.6rem;
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @accent-color;
  }
}

.application-list {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
}

.application-item {
  display: flex;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed @border-color;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .app-index {
    width: 36px;
    height: 36px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1rem;
    flex-shrink: 0;
    margin-right: 1.2rem;
    margin-top: 0.3rem;
  }

  .app-content {
    flex: 1;

    h3 {
      color: @secondary-color;
      margin: 0 0 0.7rem;
      font-size: 1.15rem;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #555;
      line-height: 1.7;
    }
  }
}

.comparison-section {
  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @primary-color;
  }
}

.comparison-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .table-header {
    display: flex;
    background: @primary-color;
    color: white;
    font-weight: 500;
    padding: 1rem 1.5rem;

    .col-criteria {
      flex: 2;
    }

    .col-assembly {
      flex: 2;
      text-align: center;
    }

    .col-high-level {
      flex: 2;
      text-align: center;
    }
  }

  .table-row {
    display: flex;
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid @border-color;

    &:nth-child(even) {
      background: @light-gray;
    }

    .col-criteria {
      flex: 2;
      font-weight: 500;
    }

    .col-assembly {
      flex: 2;
      text-align: center;
      color: @secondary-color;
      font-weight: 500;
    }

    .col-high-level {
      flex: 2;
      text-align: center;
      color: @accent-color;
      font-weight: 500;
    }
  }
}

.example-section {
  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @accent-color;
  }
}

.code-container {
  background: #2d2d2d;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #1e1e1e;
    padding: 0.8rem 1.2rem;
    color: #9cdcfe;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.95rem;

    .copy-button {
      background: #0078d4;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Noto Sans SC', sans-serif;
      font-weight: 500;
      transition: background 0.3s;

      &:hover {
        background: darken(#0078d4, 10%);
      }
    }
  }

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Roboto Mono', monospace;
      color: #d4d4d4;
      font-size: 0.95rem;
      line-height: 1.6;

      .comment {
        color: #6a9955;
      }

      .directive {
        color: #c586c0;
      }

      .instruction {
        color: #dcdcaa;
      }

      .register {
        color: #4ec9b0;
      }

      .number {
        color: #b5cea8;
      }
    }
  }
}

.explanation {
  background: @light-gray;
  border-radius: 8px;
  padding: 1.5rem;

  h3 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 0;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.6;

      &:last-child {
        margin-bottom: 0;
      }

      strong {
        color: @primary-color;
        font-family: 'Roboto Mono', monospace;
      }
    }
  }
}

.footer {
  margin-top: 3rem;
  padding: 1.5rem;
  text-align: center;
  background: @primary-light;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);
}

@media (max-width: 768px) {
  .assembly-language-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2.2rem;
  }

  .conversion-flow {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
