<template>
  <div class="binary-arrays">
    <h1>ECMAScript 二进制数组介绍</h1>

    <!-- 概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-icon">🔢</div>
        <div>
          <h2>什么是二进制数组？</h2>
          <p>处理原始二进制数据的JavaScript API</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">📊</div>
        <div>
          <h2>核心组件</h2>
          <p>ArrayBuffer, TypedArray, DataView</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🚀</div>
        <div>
          <h2>主要优势</h2>
          <p>高性能、内存高效、直接操作二进制</p>
        </div>
      </div>
    </div>

    <!-- 核心概念 -->
    <div class="section">
      <h2>二进制数组核心概念</h2>
      <div class="concepts">
        <div class="concept-card" v-for="(concept, index) in coreConcepts" :key="index">
          <div class="concept-icon">{{ concept.icon }}</div>
          <h3>{{ concept.name }}</h3>
          <p>{{ concept.description }}</p>
          <div class="concept-meta">
            <span>字节大小: {{ concept.byteSize }}</span>
            <span>元素范围: {{ concept.range }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用示例 -->
    <div class="section">
      <h2>二进制数组使用示例</h2>
      <div class="usage-examples">
        <div class="example">
          <h3>1. 创建与操作ArrayBuffer</h3>
          <pre class="code-block">
// 创建8字节的缓冲区
const buffer = new ArrayBuffer(8);

// 创建Int32Array视图（每个元素4字节）
const int32View = new Int32Array(buffer);

// 设置值
int32View[0] = 42;
int32View[1] = 1024;

// 创建Uint8Array视图（每个元素1字节）
const uint8View = new Uint8Array(buffer);

// 读取第一个32位整数的字节
console.log(uint8View[0]); // 42
console.log(uint8View[1]); // 0
console.log(uint8View[2]); // 0
console.log(uint8View[3]); // 0</pre
          >
        </div>

        <div class="example">
          <h3>2. 使用DataView处理混合数据类型</h3>
          <pre class="code-block">
// 创建12字节缓冲区（3个32位整数）
const buffer = new ArrayBuffer(12);
const view = new DataView(buffer);

// 设置不同位置的值（使用不同字节长度）
view.setInt32(0, 65535);    // 位置0，4字节
view.setUint16(4, 0xABCD);  // 位置4，2字节
view.setFloat32(8, Math.PI);// 位置8，4字节

// 读取值
console.log(view.getInt32(0));   // 65535
console.log(view.getUint16(4).toString(16)); // 'abcd'
console.log(view.getFloat32(8)); // 3.1415927410125732</pre
          >
        </div>

        <div class="example">
          <h3>3. 类型数组之间的转换</h3>
          <pre class="code-block">
// 创建Uint8Array（原始数据）
const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

// 转换为普通数组
const normalArray = Array.from(uint8Array);
console.log(normalArray); // [72, 101, 108, 108, 111]

// 从字符串创建
const encoder = new TextEncoder();
const strArray = encoder.encode("Hello Binary");

// 转换为字符串
const decoder = new TextDecoder();
const str = decoder.decode(strArray);
console.log(str); // "Hello Binary"

// 不同视图共享缓冲区
const buffer = uint8Array.buffer;
const floatArray = new Float32Array(buffer);
console.log(floatArray.length); // 原始长度/4</pre
          >
        </div>
      </div>
    </div>

    <!-- SharedArrayBuffer -->
    <div class="section">
      <h2>SharedArrayBuffer</h2>
      <div class="section-content">
        <div class="card">
          <h3>什么是SharedArrayBuffer？</h3>
          <p>
            <strong>SharedArrayBuffer</strong>
            是一种特殊的二进制缓冲区对象，允许在多个线程（如主线程和Web
            Worker）之间共享内存。与普通的 <code>ArrayBuffer</code> 不同，<code
              >SharedArrayBuffer</code
            >
            可以被多个线程同时读写，实现高效的数据交换和并发处理。
          </p>
        </div>
        <div class="card">
          <h3>主要特性</h3>
          <ul>
            <li>允许多个线程共享同一块内存</li>
            <li>支持原子操作，保证多线程数据安全</li>
            <li>适合高性能并发场景，如多线程计算、音视频处理等</li>
          </ul>
        </div>
        <div class="card">
          <h3>简单示例</h3>
          <pre class="code-block">
// 创建一个可共享的缓冲区
const sab = new SharedArrayBuffer(1024); // 1KB
// 在主线程和Worker中都可以通过TypedArray视图访问
const uint8 = new Uint8Array(sab);
uint8[0] = 42; // 主线程写入
// Worker线程也能读取到相同的数据
          </pre>
        </div>
        <div class="card">
          <h3>注意事项</h3>
          <ul>
            <li>
              出于安全考虑，只有在启用跨域隔离（Cross-Origin Isolation）时才能使用
              <code>SharedArrayBuffer</code>。
            </li>
            <li>需要配合 <code>Atomics</code> 对象进行线程安全的数据操作。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="section">
      <h2>二进制数组使用场景</h2>
      <div class="use-cases">
        <div class="case-card" v-for="(caseItem, index) in useCases" :key="index">
          <div class="case-icon">{{ caseItem.icon }}</div>
          <h3>{{ caseItem.title }}</h3>
          <p>{{ caseItem.description }}</p>
          <div class="case-technologies">
            <span v-for="(tech, i) in caseItem.technologies" :key="i">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 性能对比 -->
    <div class="section">
      <h2>性能对比：普通数组 vs 类型数组</h2>
      <div class="performance">
        <div class="test" v-for="(test, index) in performanceTests" :key="index">
          <div class="test-name">{{ test.name }}</div>
          <div class="test-results">
            <div class="result">
              <div class="result-label">普通数组</div>
              <div class="result-bar" :style="{ width: test.regular + '%' }">
                <span>{{ test.regular }}ms</span>
              </div>
            </div>
            <div class="result">
              <div class="result-label">类型数组</div>
              <div class="result-bar" :style="{ width: test.typed + '%' }">
                <span>{{ test.typed }}ms</span>
              </div>
            </div>
          </div>
          <div class="test-improvement">性能提升: {{ test.improvement }}倍</div>
        </div>
      </div>
    </div>

    <!-- 优缺点 -->
    <div class="section">
      <h2>二进制数组的优缺点</h2>
      <div class="pros-cons">
        <div class="pros">
          <h3>优点 ✅</h3>
          <ul>
            <li v-for="(pro, index) in advantages" :key="index">{{ pro }}</li>
          </ul>
        </div>
        <div class="cons">
          <h3>缺点 ❌</h3>
          <ul>
            <li v-for="(con, index) in disadvantages" :key="index">{{ con }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="section">
      <h2>二进制数组最佳实践</h2>
      <div class="best-practices">
        <div class="practice" v-for="(practice, index) in bestPractices" :key="index">
          <div class="practice-number">{{ index + 1 }}</div>
          <div class="practice-content">
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
            <div v-if="practice.example" class="practice-example">
              <pre>{{ practice.example }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 核心概念
const coreConcepts = ref([
  {
    name: 'ArrayBuffer',
    icon: '📦',
    description: '表示通用的、固定长度的原始二进制数据缓冲区',
    byteSize: '可变',
    range: 'N/A',
  },
  {
    name: 'Int8Array',
    icon: '🔢',
    description: '8位有符号整数数组（-128 到 127）',
    byteSize: '1字节/元素',
    range: '-128 到 127',
  },
  {
    name: 'Uint8Array',
    icon: '🔢',
    description: '8位无符号整数数组（0 到 255）',
    byteSize: '1字节/元素',
    range: '0 到 255',
  },
  {
    name: 'Uint8ClampedArray',
    icon: '🎨',
    description: '8位无符号整数数组（0-255），超出范围的值将被截断',
    byteSize: '1字节/元素',
    range: '0 到 255',
  },
  {
    name: 'Int16Array',
    icon: '🔢',
    description: '16位有符号整数数组（-32,768 到 32,767）',
    byteSize: '2字节/元素',
    range: '-32,768 到 32,767',
  },
  {
    name: 'Uint16Array',
    icon: '🔢',
    description: '16位无符号整数数组（0 到 65,535）',
    byteSize: '2字节/元素',
    range: '0 到 65,535',
  },
  {
    name: 'Int32Array',
    icon: '🔢',
    description: '32位有符号整数数组（-2^31 到 2^31-1）',
    byteSize: '4字节/元素',
    range: '-2,147,483,648 到 2,147,483,647',
  },
  {
    name: 'Uint32Array',
    icon: '🔢',
    description: '32位无符号整数数组（0 到 4,294,967,295）',
    byteSize: '4字节/元素',
    range: '0 到 4,294,967,295',
  },
  {
    name: 'Float32Array',
    icon: '🔢',
    description: '32位IEEE浮点数数组',
    byteSize: '4字节/元素',
    range: '±3.4e38 (7位有效数字)',
  },
  {
    name: 'Float64Array',
    icon: '🔢',
    description: '64位IEEE浮点数数组',
    byteSize: '8字节/元素',
    range: '±1.8e308 (15位有效数字)',
  },
  {
    name: 'BigInt64Array',
    icon: '🔢',
    description: '64位有符号整数数组（用于大整数）',
    byteSize: '8字节/元素',
    range: '-2^63 到 2^63-1',
  },
  {
    name: 'BigUint64Array',
    icon: '🔢',
    description: '64位无符号整数数组（用于大整数）',
    byteSize: '8字节/元素',
    range: '0 到 2^64-1',
  },
  {
    name: 'DataView',
    icon: '🔍',
    description: '底层缓冲区读写多种数值类型的视图',
    byteSize: 'N/A',
    range: '支持所有数值类型',
  },
])

// 使用场景
const useCases = ref([
  {
    icon: '🖼️',
    title: '图像处理',
    description: '操作像素数据、图像解码/编码、Canvas图像处理',
    technologies: ['Canvas API', 'WebGL', 'ImageData'],
  },
  {
    icon: '📡',
    title: '网络通信',
    description: '处理WebSocket二进制数据、解析网络协议、优化AJAX传输',
    technologies: ['WebSocket', 'Fetch API', 'XMLHttpRequest'],
  },
  {
    icon: '🔊',
    title: '音频处理',
    description: 'Web Audio API操作、音频解码、实时音频处理',
    technologies: ['Web Audio API', 'MediaStream', 'AudioBuffer'],
  },
  {
    icon: '📁',
    title: '文件操作',
    description: '读取/处理文件内容、实现文件切片上传/下载',
    technologies: ['File API', 'Blob', 'FileReader'],
  },
  {
    icon: '🎮',
    title: '游戏开发',
    description: '高效存储游戏状态、网格数据、物理引擎计算',
    technologies: ['WebGL', 'WebGPU', 'Game Engines'],
  },
  {
    icon: '🔐',
    title: '加密操作',
    description: '实现加密算法、处理密钥、哈希计算',
    technologies: ['Web Crypto API', 'SubtleCrypto'],
  },
])

// 性能对比
const performanceTests = ref([
  {
    name: '创建100万元素数组',
    regular: 120,
    typed: 8,
    improvement: '15',
  },
  {
    name: '数值求和计算',
    regular: 95,
    typed: 12,
    improvement: '8',
  },
  {
    name: '内存占用',
    regular: 8,
    typed: 1,
    improvement: '8',
  },
  {
    name: '排序操作',
    regular: 320,
    typed: 150,
    improvement: '2.1',
  },
])

// 优缺点
const advantages = ref([
  '高性能：直接操作内存，比普通数组快5-10倍',
  '内存高效：精确控制内存分配，无额外开销',
  '类型安全：明确指定数据类型，避免隐式转换',
  '二进制兼容：与Web API（WebGL、Web Audio等）无缝集成',
  '大文件处理：可处理大于内存的文件（流式处理）',
  '数据精确：避免JavaScript数字精度问题',
])

const disadvantages = ref([
  '学习曲线：概念较复杂，需要理解底层内存模型',
  '灵活性低：固定大小和类型，无法动态调整',
  '浏览器兼容：旧版浏览器（如IE10以下）支持有限',
  '调试困难：二进制数据不易阅读和调试',
  'API较底层：需要手动管理字节顺序和数据对齐',
  'GC管理：大缓冲区可能影响垃圾回收效率',
])

// 最佳实践
const bestPractices = ref([
  {
    title: '选择合适的类型数组',
    description: '根据数据特性选择最合适的类型数组，平衡精度和内存使用',
    example:
      '// 颜色处理使用Uint8ClampedArray\nconst imageData = new Uint8ClampedArray(width * height * 4);',
  },
  {
    title: '重用ArrayBuffer',
    description: '避免频繁创建缓冲区，重用ArrayBuffer减少内存分配开销',
    example:
      'const buffer = new ArrayBuffer(1024);\n// 重用同一个buffer\nconst view1 = new Int32Array(buffer);\nconst view2 = new Uint8Array(buffer);',
  },
  {
    title: '使用DataView处理混合数据',
    description: '当需要处理多种数据类型时，使用DataView更高效',
    example:
      'const view = new DataView(buffer);\nview.setInt32(0, 100);\nview.setFloat32(4, 3.14159);',
  },
  {
    title: '批量操作数据',
    description: '使用set()方法批量复制数据，减少单独操作的开销',
    example:
      'const source = new Uint8Array(1024);\nconst target = new Uint8Array(2048);\ntarget.set(source, 512); // 批量复制',
  },
  {
    title: '使用TextEncoder/TextDecoder',
    description: '高效处理字符串与二进制数据的转换',
    example:
      "const encoder = new TextEncoder();\nconst data = encoder.encode('Hello');\nconst decoder = new TextDecoder();\nconst text = decoder.decode(data);",
  },
  {
    title: '避免不必要的转换',
    description: '尽量减少二进制数据与普通数组之间的转换操作',
    example:
      '// 直接在类型数组上操作，避免转换为普通数组\nfor (let i = 0; i < typedArray.length; i++) {\n  // 处理操作\n}',
  },
])
</script>

<style lang="less" scoped>
.binary-arrays {
  max-width: 1200px;
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
    font-size: 1.3rem;
    color: #2980b9;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .overview-card {
      display: flex;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      align-items: center;

      .overview-icon {
        font-size: 2.5rem;
        margin-right: 20px;
      }

      p {
        margin: 10px 0 0;
        color: #555;
        line-height: 1.5;
      }
    }
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  // 核心概念
  .concepts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;

    .concept-card {
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;

      .concept-icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0;
        min-height: 60px;
      }

      .concept-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #7f8c8d;
        margin-top: 10px;
        border-top: 1px dashed #ddd;
        padding-top: 10px;
      }
    }
  }

  // 使用示例
  .usage-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 20px;

    .example {
      margin-bottom: 20px;
    }
  }

  // 代码块样式
  .code-block {
    background: #2c3e50;
    color: #f1f2f6;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 15px 0;
    tab-size: 2;
  }

  // 使用场景
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .case-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;

      .case-icon {
        font-size: 2rem;
        margin-bottom: 15px;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0 15px;
        min-height: 60px;
      }

      .case-technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;

        span {
          background: #3498db;
          color: white;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }
    }
  }

  // 性能对比
  .performance {
    .test {
      margin-bottom: 25px;

      .test-name {
        font-weight: bold;
        margin-bottom: 10px;
        color: #2c3e50;
      }

      .test-results {
        margin-bottom: 10px;

        .result {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          .result-label {
            width: 100px;
            font-size: 0.9rem;
            color: #7f8c8d;
          }

          .result-bar {
            height: 30px;
            background: linear-gradient(to right, #3498db, #2ecc71);
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            transition: width 0.5s ease;

            span {
              color: white;
              font-weight: bold;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            }
          }
        }
      }

      .test-improvement {
        font-weight: bold;
        color: #2ecc71;
        text-align: right;
      }
    }
  }

  // 优缺点
  .pros-cons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 30px;

    .pros,
    .cons {
      padding: 20px;
      border-radius: 8px;
    }

    .pros {
      background: #e8f5e9;
      border: 1px solid #c8e6c9;

      h3 {
        color: #2ecc71;
      }
    }

    .cons {
      background: #ffebee;
      border: 1px solid #ffcdd2;

      h3 {
        color: #e74c3c;
      }
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        line-height: 1.5;
      }
    }
  }

  // 最佳实践
  .best-practices {
    .practice {
      display: flex;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ddd;

      &:last-child {
        border-bottom: none;
      }

      .practice-number {
        min-width: 40px;
        height: 40px;
        background: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      .practice-content {
        flex: 1;

        p {
          color: #555;
          line-height: 1.6;
          margin: 10px 0;
        }

        .practice-example {
          background: #2c3e50;
          color: #f1f2f6;
          padding: 15px;
          border-radius: 6px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          margin-top: 10px;
          overflow-x: auto;
        }
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

    .overview,
    .concepts,
    .use-cases,
    .pros-cons {
      grid-template-columns: 1fr;
    }

    .usage-examples {
      grid-template-columns: 1fr;
    }

    .code-block {
      font-size: 0.8rem;
    }
  }
}
</style>
