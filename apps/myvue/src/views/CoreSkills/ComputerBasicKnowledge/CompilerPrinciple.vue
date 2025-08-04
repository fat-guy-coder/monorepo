<template>
  <div class="compiler-principles-container">
    <header class="header">
      <h1>编译原理</h1>
      <p class="subtitle">从源代码到可执行程序的奇妙旅程</p>
    </header>

    <div class="content-wrapper">
      <div class="definition-card">
        <h2>什么是编译原理？</h2>
        <p>
          编译原理是计算机科学的核心领域之一，主要研究将高级编程语言编写的源代码转换为计算机硬件能够直接执行的低级语言（如机器码）的理论、方法和技术。
        </p>
        <p>
          编译器是实现这种转换的程序，它不仅是编程语言实现的基石，其技术也广泛应用于解释器、代码分析工具、代码优化等领域。
        </p>
      </div>
      <section class="overview-section">


        <div class="flowchart">
          <h2>编译过程流程图</h2>
          <div class="flowchart-container">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>源代码</h3>
                <p>高级语言编写的程序</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>词法分析</h3>
                <p>生成Token序列</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>语法分析</h3>
                <p>构建语法树</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>语义分析</h3>
                <p>类型检查等</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>中间代码</h3>
                <p>平台无关表示</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h3>优化</h3>
                <p>性能提升</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">7</div>
              <div class="step-content">
                <h3>目标代码</h3>
                <p>机器可执行</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="stages-section">
        <h2>编译器的核心阶段</h2>
        <div class="stages-grid">
          <div v-for="(stage, index) in stages" :key="index" class="stage-card">
            <div class="card-header">
              <div class="stage-number">{{ index + 1 }}</div>
              <h3>{{ stage.title }}</h3>
            </div>
            <div class="card-content">
              <p>{{ stage.description }}</p>
              <div class="stage-example" v-if="stage.example">
                <strong>示例:</strong> {{ stage.example }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="key-concepts">
        <h2>编译原理核心概念</h2>
        <div class="concepts-container">
          <div class="concept-card" v-for="(concept, index) in concepts" :key="index">

            <h3>{{ concept.title }}</h3>
            <p>{{ concept.description }}</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>编译原理是计算机科学的基础，掌握它有助于深入理解编程语言和计算机系统</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const stages = ref([
  {
    title: "词法分析 (Lexical Analysis)",
    description: "将源代码分解为有意义的词素（Token）序列的过程。词法分析器读取字符流，识别出关键字、标识符、常量、运算符等基本单元。",
    example: "int x = 5; → [关键字'int', 标识符'x', 运算符'=', 常量'5', 分号';']"
  },
  {
    title: "语法分析 (Syntax Analysis)",
    description: "根据语言的语法规则，将Token序列构建成语法树（Parse Tree或AST）。此阶段检查程序的结构是否符合语法规则。",
    example: "表达式 'a + b * c' 构建为 AST: (+ a (* b c))"
  },
  {
    title: "语义分析 (Semantic Analysis)",
    description: "检查程序的语义正确性，包括类型检查、作用域分析、变量声明检查等。确保程序在逻辑上是有意义的。",
    example: "检查 'int a = 'hello';' 中的类型不匹配错误"
  },
  {
    title: "中间代码生成 (Intermediate Code Generation)",
    description: "生成与平台无关的中间表示形式，如三地址码、P-代码等。这种中间表示便于后续优化和目标代码生成。",
    example: "x = y + z * 5 → t1 = z * 5; t2 = y + t1; x = t2"
  },
  {
    title: "代码优化 (Code Optimization)",
    description: "对中间代码进行变换，提高程序的执行效率或减少资源占用。包括常量折叠、死代码消除、循环优化等。",
    example: "x = 2 * 3; → x = 6; （常量折叠）"
  },
  {
    title: "目标代码生成 (Code Generation)",
    description: "将优化后的中间代码转换为目标机器的汇编语言或机器代码。此阶段需要考虑目标机器的指令集、寄存器分配等问题。",
    example: "生成 x86、ARM 或 MIPS 等平台的汇编指令"
  }
]);

const concepts = ref([
  {

    title: "有限自动机 (Finite Automata)",
    description: "用于词法分析的形式化模型，包括确定有限自动机(DFA)和非确定有限自动机(NFA)。"
  },
  {
    title: "上下文无关文法 (CFG)",
    description: "用于描述编程语言语法的形式化方法，通常用巴科斯范式(BNF)或其扩展表示。"
  },
  {
    title: "符号表管理",
    description: "编译器用于存储变量、函数等标识符信息的数据结构，支持快速查找和属性管理。"
  },
  {
    title: "优化技术",
    description: "包括数据流分析、循环优化、寄存器分配等技术，用于提高生成代码的效率。"
  }
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

// 颜色变量
@primary-color: #1e88e5;
@primary-light: #e3f2fd;
@secondary-color: #1565c0;
@accent-color: #ff9800;
@text-color: #333;
@light-gray: #f5f7fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

// 基础样式
.compiler-principles-container {
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
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: @secondary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.4rem;
    color: #666;
    font-weight: 300;
  }
}

.content-wrapper {
  display: grid;
  gap: 2.5rem;
}

// 概述部分
.overview-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.definition-card {
  background: @light-gray;
  border-radius: 10px;
  padding: 1.8rem;
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
    margin-bottom: 1.2rem;
    text-align: justify;
  }
}

.flowchart {
  background: white;
  border-radius: 10px;
  padding: 1.8rem;
  box-shadow: @card-shadow;

  h2 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    border-bottom: 2px solid @accent-color;
    padding-bottom: 0.5rem;
  }
}

.flowchart-container {
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;
  gap: 0.8rem;
}

.flow-step {
  flex: 0 0 auto;
  width: 140px;
  background: linear-gradient(135deg, @primary-light, #fff);
  border: 1px solid @border-color;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .step-number {
    width: 30px;
    height: 30px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.8rem;
    font-weight: bold;
  }

  h3 {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    color: @secondary-color;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }
}

.flow-arrow {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #777;
  padding: 0 0.5rem;
}

// 阶段部分
.stages-section {
  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @primary-color;
  }
}

.stages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.stage-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  .card-header {
    background: linear-gradient(to right, @primary-color, @secondary-color);
    color: white;
    padding: 1.2rem;
    display: flex;
    align-items: center;

    .stage-number {
      width: 32px;
      height: 32px;
      background: white;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  .card-content {
    padding: 1.5rem;

    p {
      margin-bottom: 1.2rem;
      text-align: justify;
    }

    .stage-example {
      background: #f9f9f9;
      border-left: 4px solid @accent-color;
      padding: 0.8rem;
      font-size: 0.9rem;
      border-radius: 0 4px 4px 0;
      margin-top: 1rem;
    }
  }
}

// 核心概念部分
.key-concepts {
  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @accent-color;
  }
}

.concepts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.8rem;
}

.concept-card {
  background: white;
  border-radius: 10px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: @card-shadow;
  transition: all 0.3s ease;

  &:hover {
    background: @primary-light;
    transform: translateY(-3px);
  }

  .concept-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1.5rem;
    background: @primary-light;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 36px;
      height: 36px;
      fill: @primary-color;
    }
  }

  h3 {
    color: @secondary-color;
    margin: 1rem 0;
    font-size: 1.25rem;
  }

  p {
    font-size: 0.95rem;
    color: #555;
    margin: 0;
  }
}

.footer {
  margin-top: 3rem;
  padding: 1.5rem;
  text-align: center;
  background: @light-gray;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
}
</style>
