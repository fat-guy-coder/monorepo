<template>
  <div class="encoding-container">
    <!-- 封面标题 -->
    <header class="hero-banner">
      <h1 class="title">字符编码</h1>
      <div class="encoding-tags">
        <span class="ascii">ASCII</span>
        <span class="unicode">Unicode</span>
        <span class="utf8">UTF-8</span>
      </div>
    </header>

    <!-- ASCII 介绍 -->
    <section class="section">
      <h2 class="section-title">📜 ASCII 介绍</h2>
      <div class="ascii-introduction">
        <p>ASCII（美国信息交换标准代码）是一种字符编码标准，用于电子通信。它使用7位二进制数表示128个字符，包括英文字母、数字、标点符号和控制字符。</p>
        <p>ASCII的设计初衷是为了在不同的计算机和设备之间实现信息的交换。它的字符集包括：</p>
        <ul>
          <li>控制字符（0-31）：如换行、回车等</li>
          <li>可打印字符（32-126）：包括空格、数字、字母和常用符号</li>
        </ul>
        <p>例如，字母'A'的ASCII码是65，字母'a'的ASCII码是97。ASCII的简单性和高效性使其成为早期计算机系统的标准字符集。</p>
        <p>尽管ASCII只能表示128个字符，但它为后来的字符编码标准（如UTF-8）奠定了基础，UTF-8向后兼容ASCII，允许使用更广泛的字符集。</p>
      </div>
    </section>

    <!-- Unicode 介绍 -->
    <section class="section">
      <h2 class="section-title">📜 Unicode 介绍</h2>
      <div class="unicode-introduction">
        <p>Unicode是一种字符编码标准，旨在为世界上所有的字符提供唯一的编码。它支持多种语言和符号，使得不同语言的文本可以在同一文档中共存。</p>
        <p>Unicode的设计初衷是为了消除不同字符编码之间的兼容性问题。它的字符集包括：</p>
        <ul>
          <li>基本多语言平面（BMP）：包含了大部分常用字符</li>
          <li>补充平面：用于存储不常用的字符和符号</li>
        </ul>
        <p>例如，汉字'中'的Unicode编码是U+4E2D，表情符号'😀'的Unicode编码是U+1F600。Unicode的广泛应用使其成为现代计算机系统中处理文本的标准。</p>
        <p>Unicode不仅支持多种语言，还为每个字符分配了一个唯一的代码点，确保了全球范围内的字符一致性。</p>
      </div>
    </section>

    <!-- UTF-8 介绍 -->
    <section class="section">
      <h2 class="section-title">📜 UTF-8 介绍</h2>
      <div class="utf8-introduction">
        <p>UTF-8是一种可变长度的字符编码方式，能够表示Unicode字符集中的所有字符。它使用1到4个字节来编码字符，兼容ASCII编码，使得早期的ASCII文本在UTF-8中保持不变。</p>
        <p>UTF-8的设计目标是为了在不牺牲兼容性的前提下，支持全球范围内的字符。它的特点包括：</p>
        <ul>
          <li>向后兼容ASCII：ASCII字符在UTF-8中占用1个字节</li>
          <li>可变长度：根据字符的不同，使用1到4个字节进行编码</li>
        </ul>
        <p>例如，字母'A'在UTF-8中仍然是0x41，而汉字'中'的UTF-8编码是0xE4B8AD。UTF-8的广泛应用使其成为互联网和现代计算机系统中最流行的字符编码方式。</p>
      </div>
    </section>

    <!-- UTF-16 介绍 -->
    <section class="section">
      <h2 class="section-title">📜 UTF-16 介绍</h2>
      <div class="utf16-introduction">
        <p>UTF-16是一种用于表示Unicode字符的编码方式，采用16位（2字节）为基本单元。它可以通过一个或两个16位单元来编码所有Unicode字符。</p>
        <p>UTF-16的主要特点包括：</p>
        <ul>
          <li>大多数常用字符（如中英文、常用符号）使用1个16位单元（2字节）表示</li>
          <li>极少数超出基本多语言平面（BMP）的字符（如部分表情符号、冷僻字）使用一对16位单元（即4字节，称为代理对）表示</li>
          <li>在不同平台上可能有字节序（大端/小端）问题，通常用BOM（字节顺序标记）区分</li>
        </ul>
        <p>例如，汉字'中'的UTF-16编码是<code>0x4E2D</code>，而表情符号'😀'的UTF-16编码是<code>0xD83D 0xDE00</code>（代理对）。</p>
        <p>UTF-16广泛应用于Windows操作系统和Java等平台，适合需要大量处理亚洲字符的场景。</p>
      </div>
    </section>

    <!-- UTF-32 介绍 -->
    <section class="section">
      <h2 class="section-title">📜 UTF-32 介绍</h2>
      <div class="utf32-introduction">
        <p>UTF-32是一种用于表示Unicode字符的编码方式，采用32位（4字节）为基本单元。它可以通过一个32位单元来编码所有Unicode字符。</p>
        <p>UTF-32的主要特点包括：</p>
        <ul>
          <li>每个字符都使用4个字节表示，固定长度，没有变长编码问题</li>
          <li>字符集范围大，可以表示所有Unicode字符，包括BMP和扩展字符</li>
          <li>没有字节序问题，因为每个字符都是固定长度的</li>
        </ul>
        <p>例如，汉字'中'的UTF-32编码是<code>0x00004E2D</code>，而表情符号'😀'的UTF-32编码是<code>0x0001F600</code>。</p>
        <p>UTF-32广泛应用于Windows操作系统和Java等平台，适合需要大量处理亚洲字符的场景。</p>
      </div>
    </section>

    <!-- 编码对比 -->
    <section class="section">
      <h2 class="section-title">🔡 编码系统对比</h2>
      <div class="encoding-grid">
        <div v-for="encoding in encodings" :key="encoding.name" class="encoding-card" :class="encoding.name">
          <div class="card-header">
            <div class="card-icon">{{ encoding.emoji }}</div>
            <h3>{{ encoding.name }}</h3>
          </div>
          <div class="card-body">
            <p class="meta">诞生时间: {{ encoding.year }}</p>
            <p class="meta">存储空间: {{ encoding.space }}</p>
            <div class="code-preview">
              <span v-for="(char, index) in encoding.example" :key="index" class="code-byte">
                {{ char }}
              </span>
            </div>
            <p class="pros-cons">{{ encoding.pros }}</p>
            <p class="pros-cons">{{ encoding.cons }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 编码转换 -->
    <section class="section">
      <h2 class="section-title">🔄 编码转换方法</h2>
      <div class="conversion-tabs">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>

      <!-- ASCII ↔ UTF-8 -->
      <div v-show="activeTab === 'ascii-utf8'" class="code-section">
        <pre class="code-block">// ASCII到UTF-8（自动兼容）
const asciiStr = 'Hello';
const utf8Buffer = new TextEncoder().encode(asciiStr);
// UTF-8到ASCII（过滤非ASCII字符）
function utf8ToAscii(utf8Str: string) {
  return utf8Str.replace(/[^\x00-\x7F]/g, '');
}</pre>
      </div>

      <!-- Unicode ↔ UTF-8 -->
      <div v-show="activeTab === 'unicode-utf8'" class="code-section">
        <pre class="code-block">// Unicode到UTF-8
function unicodeToUtf8(unicodeStr: string) {
  return unescape(encodeURIComponent(unicodeStr));
}

// UTF-8到Unicode
function utf8ToUnicode(utf8Str: string) {
  return decodeURIComponent(escape(utf8Str));
}</pre>
      </div>
    </section>

    <!-- 编码关系图 -->
    <section class="section">
      <h2 class="section-title">📊 编码关系示意图</h2>
      <div class="relation-diagram">
        <div class="encoding-node ascii">ASCII</div>
        <div class="arrow">→ 扩展 ←</div>
        <div class="encoding-node unicode">Unicode</div>
        <div class="arrow">→ 实现 ↓</div>
        <div class="encoding-node utf8">UTF-8</div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="section">
      <h2 class="section-title">🎯 使用场景建议</h2>
      <div class="usage-grid">
        <div v-for="scenario in usageScenarios" :key="scenario.title" class="scenario-card">
          <h3>{{ scenario.title }}</h3>
          <p>{{ scenario.description }}</p>
          <div class="recommend">
            {{ scenario.recommend }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('ascii-utf8');

const encodings = [
  {
    name: 'ASCII',
    emoji: '🇺🇸',
    year: '1963年',
    space: '1字节/字符',
    example: ['H', 'e', 'l', 'l', 'o'],
    pros: '简单高效，兼容性强',
    cons: '仅支持128个英文字符'
  },
  {
    name: 'Unicode',
    emoji: '🌍',
    year: '1991年',
    space: '2-4字节/字符',
    example: ['U+0048', 'U+4E2D', 'U+1F600'],
    pros: '全球字符统一编码',
    cons: '存储空间利用率低'
  },
  {
    name: 'UTF-8',
    emoji: '⚡',
    year: '1993年',
    space: '1-4字节/字符',
    example: ['48', 'E4B8AD', 'F09F9880'],
    pros: '变长编码，兼容ASCII',
    cons: '计算复杂度略高'
  },
  {
    name: 'UTF-16',
    emoji: '🔢',
    year: '1996年',
    space: '2-4字节/字符',
    example: ['48', '4E2D', 'D83DDE00'],
  },
  {
    name: 'UTF-32',
    emoji: '🔢',
    year: '1996年',
    space: '4字节/字符',
    example: ['48', '4E2D', 'D83DDE00'],
  }
];

const tabs = [
  { id: 'ascii-utf8', label: 'ASCII ↔ UTF-8' },
  { id: 'unicode-utf8', label: 'Unicode ↔ UTF-8' }
];

const usageScenarios = [
  {
    title: '英文文档',
    description: '纯英文内容处理',
    recommend: '推荐使用ASCII'
  },
  {
    title: '多语言系统',
    description: '需要支持多种语言',
    recommend: '必须使用Unicode'
  },
  {
    title: '网络传输',
    description: 'Web应用和数据交换',
    recommend: '首选UTF-8'
  }
];
</script>

<style lang="less">
@primary-color: #2c3e50;
@ascii-color: #3498db;
@unicode-color: #2ecc71;
@utf8-color: #e67e22;
@bg-color: #f8f9fa;

.encoding-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;

  .hero-banner {
    text-align: center;
    padding: 1rem 1rem;
    background: linear-gradient(135deg, @ascii-color, @unicode-color);
    border-radius: 1rem;
    margin-bottom: 2rem;

    .title {
      color: white;
      font-size: 2.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .encoding-tags {
      margin-top: 1.5rem;

      span {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        margin: 0 0.5rem;
        border-radius: 2rem;
        font-weight: bold;

        &.ascii {
          background: fade(@ascii-color, 20%);
          color: @ascii-color;
        }

        &.unicode {
          background: fade(@unicode-color, 20%);
          color: @unicode-color;
        }

        &.utf8 {
          background: fade(@utf8-color, 20%);
          color: @utf8-color;
        }
      }
    }
  }

  .section {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    &-title {
      color: @primary-color;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-left: 1rem;
      border-left: 4px solid @unicode-color;
    }
  }

  .encoding-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .encoding-card {
      border-radius: 1rem;
      overflow: hidden;
      border: 2px solid;

      &.ASCII {
        border-color: @ascii-color;
      }

      &.Unicode {
        border-color: @unicode-color;
      }

      &.UTF-8 {
        border-color: @utf8-color;
      }

      .card-header {
        padding: 1.5rem;
        background: @bg-color;
        display: flex;
        align-items: center;

        .card-icon {
          font-size: 2rem;
          margin-right: 1rem;
        }
      }

      .card-body {
        padding: 1.5rem;

        .meta {
          color: #666;
          margin: 0.5rem 0;
        }

        .code-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          margin: 1rem 0;

          .code-byte {
            padding: 0.3rem 0.6rem;
            background: @bg-color;
            border-radius: 0.3rem;
            font-family: 'Fira Code', monospace;
          }
        }

        .pros-cons {
          padding: 0.5rem;
          margin: 0.3rem 0;
          border-left: 3px solid;

          &:nth-child(odd) {
            border-color: @unicode-color;
            background: fade(@unicode-color, 5%);
          }

          &:nth-child(even) {
            border-color: @ascii-color;
            background: fade(@ascii-color, 5%);
          }
        }
      }
    }
  }

  .conversion-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      background: @bg-color;
      cursor: pointer;
      transition: all 0.3s;

      &.active {
        background: @unicode-color;
        color: white;
      }
    }
  }

  .code-block {
    background: #282c34;
    color: #abb2bf;
    padding: 1.5rem;
    border-radius: 0.8rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
  }

  .relation-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;

    .encoding-node {
      padding: 1.5rem 2rem;
      border-radius: 0.5rem;
      font-weight: bold;

      &.ascii {
        background: fade(@ascii-color, 10%);
        color: @ascii-color;
      }

      &.unicode {
        background: fade(@unicode-color, 10%);
        color: @unicode-color;
      }

      &.utf8 {
        background: fade(@utf8-color, 10%);
        color: @utf8-color;
      }
    }

    .arrow {
      font-size: 1.5rem;
      color: #666;
    }
  }

  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    .scenario-card {
      padding: 1.5rem;
      border: 2px solid #eee;
      border-radius: 0.8rem;

      .recommend {
        margin-top: 1rem;
        padding: 0.8rem;
        background: fade(@unicode-color, 10%);
        border-radius: 0.5rem;
        color: @unicode-color;
        font-weight: bold;
      }
    }
  }
}
</style>
