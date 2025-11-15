<template>
  <div class="trie-tree-intro">
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">Trie树（字典树）</h1>
        <p class="subtitle">高效字符串搜索与存储的数据结构</p>
        <div class="trie-visualization">
          <div class="visual-container">
            <div class="trie-tree" ref="trieTree">
              <div class="node root-node" @click="highlightNode('root')">
                <div class="node-content">
                  <span class="node-char">Root</span>
                </div>
                <div class="children">
                  <div class="child-node" v-for="child in rootChildren" :key="child.char"
                    :class="{ active: activeNode === child.char }"
                    @click.stop="highlightNode(child.char)">
                    <div class="node-content">
                      <span class="node-char">{{ child.char }}</span>
                      <span class="node-end" v-if="child.isEnd">★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="word-examples">
              <h3>存储的单词</h3>
              <div class="word-list">
                <span v-for="word in storedWords" :key="word" class="word-tag">{{ word }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="section in sections"
            :key="section.id"
            :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)"
          >
            <span class="nav-icon">{{ section.icon }}</span>
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 结构特点 -->
        <section id="structure" class="content-section">
          <h2>结构特点</h2>
          <p class="section-description">Trie树是一种专门用于处理字符串的树形数据结构，通过共享前缀来优化存储和搜索。</p>

          <div class="structure-features">
            <div class="feature-grid">
              <div class="feature-card" v-for="feature in structureFeatures" :key="feature.title">
                <div class="feature-icon">{{ feature.icon }}</div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
                <div class="feature-example" v-if="feature.example">
                  <pre><code>{{ feature.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="node-structure">
            <h3>Trie节点结构</h3>
            <div class="structure-code">
              <pre><code>{{ nodeStructureCode }}</code></pre>
            </div>
          </div>
        </section>

        <!-- 核心操作 -->
        <section id="operations" class="content-section">
          <h2>核心操作</h2>
          <p class="section-description">Trie树支持高效的插入、搜索和前缀匹配操作。</p>

          <div class="operation-demos">
            <div class="operation-tabs">
              <button
                v-for="op in operations"
                :key="op.name"
                :class="{ active: activeOperation === op.name }"
                @click="activeOperation = op.name"
                class="operation-tab"
              >
                {{ op.name }}
              </button>
            </div>

            <div class="operation-content">
              <div v-for="op in operations" :key="op.name" v-show="activeOperation === op.name" class="operation-detail">
                <h3>{{ op.name }}</h3>
                <p>{{ op.description }}</p>
                <div class="operation-steps">
                  <div class="step" v-for="(step, index) in op.steps" :key="index">
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-content">
                      <p>{{ step }}</p>
                    </div>
                  </div>
                </div>
                <div class="operation-code">
                  <pre><code>{{ op.code }}</code></pre>
                </div>
                <div class="operation-complexity">
                  <strong>时间复杂度：</strong> {{ op.timeComplexity }}
                  <br>
                  <strong>空间复杂度：</strong> {{ op.spaceComplexity }}
                </div>
              </div>
            </div>
          </div>

          <div class="interactive-demo">
            <h3>交互演示</h3>
            <div class="demo-controls">
              <input
                v-model="demoInput"
                placeholder="输入单词进行操作"
                class="demo-input"
                @keyup.enter="performOperation"
              >
              <div class="demo-buttons">
                <button @click="performInsert" class="demo-btn insert-btn">插入</button>
                <button @click="performSearch" class="demo-btn search-btn">搜索</button>
                <button @click="performPrefix" class="demo-btn prefix-btn">前缀搜索</button>
                <button @click="resetDemo" class="demo-btn reset-btn">重置</button>
              </div>
            </div>
            <div class="demo-output">
              <div class="output-message" :class="outputType">{{ outputMessage }}</div>
              <div class="current-words">
                <strong>当前单词：</strong>
                <span v-for="word in currentWords" :key="word" class="word-badge">{{ word }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 优缺点分析 -->
        <section id="pros-cons" class="content-section">
          <h2>优缺点分析</h2>
          <p class="section-description">Trie树在特定场景下表现优异，但也存在一些局限性。</p>

          <div class="comparison-grid">
            <div class="pros-section">
              <h3>优点</h3>
              <div class="pros-list">
                <div class="pro-item" v-for="pro in advantages" :key="pro.title">
                  <div class="pro-icon">✅</div>
                  <div class="pro-content">
                    <h4>{{ pro.title }}</h4>
                    <p>{{ pro.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="cons-section">
              <h3>缺点</h3>
              <div class="cons-list">
                <div class="con-item" v-for="con in disadvantages" :key="con.title">
                  <div class="con-icon">❌</div>
                  <div class="con-content">
                    <h4>{{ con.title }}</h4>
                    <p>{{ con.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="optimization-techniques">
            <h3>优化技术</h3>
            <div class="technique-cards">
              <div class="technique-card" v-for="tech in optimizations" :key="tech.name">
                <h4>{{ tech.name }}</h4>
                <p>{{ tech.description }}</p>
                <div class="tech-example" v-if="tech.example">
                  <pre><code>{{ tech.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section id="applications" class="content-section">
          <h2>使用场景</h2>
          <p class="section-description">Trie树在多个领域都有重要的应用价值。</p>

          <div class="application-scenarios">
            <div class="scenario-cards">
              <div class="scenario-card" v-for="scenario in applicationScenarios" :key="scenario.title">
                <div class="scenario-icon">{{ scenario.icon }}</div>
                <h3>{{ scenario.title }}</h3>
                <p>{{ scenario.description }}</p>
                <div class="scenario-example" v-if="scenario.example">
                  <strong>示例：</strong>
                  <pre><code>{{ scenario.example }}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="real-world-examples">
            <h3>实际应用案例</h3>
            <div class="case-studies">
              <div class="case-study" v-for="caseStudy in realWorldCases" :key="caseStudy.name">
                <div class="case-header">
                  <h4>{{ caseStudy.name }}</h4>
                  <span class="case-domain">{{ caseStudy.domain }}</span>
                </div>
                <div class="case-content">
                  <p><strong>应用描述：</strong>{{ caseStudy.description }}</p>
                  <div class="case-implementation" v-if="caseStudy.implementation">
                    <strong>实现要点：</strong>
                    <pre><code>{{ caseStudy.implementation }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 变种与扩展 -->
        <section id="variants" class="content-section">
          <h2>变种与扩展</h2>
          <p class="section-description">针对不同需求，Trie树有多种改进和变种形式。</p>

          <div class="variant-types">
            <div class="variant-card" v-for="variant in trieVariants" :key="variant.name">
              <div class="variant-header">
                <h3>{{ variant.name }}</h3>
                <span class="variant-tag">{{ variant.type }}</span>
              </div>
              <div class="variant-content">
                <p>{{ variant.description }}</p>
                <div class="variant-pros-cons">
                  <div class="variant-pros">
                    <strong>优点：</strong>
                    <ul>
                      <li v-for="pro in variant.pros" :key="pro">{{ pro }}</li>
                    </ul>
                  </div>
                  <div class="variant-cons">
                    <strong>缺点：</strong>
                    <ul>
                      <li v-for="con in variant.cons" :key="con">{{ con }}</li>
                    </ul>
                  </div>
                </div>
                <div class="variant-code" v-if="variant.code">
                  <pre><code>{{ variant.code }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>Trie树 - 高效的字符串处理数据结构</p>
      <p class="footer-note">特别适用于前缀匹配和字典类应用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 响应式数据
const activeSection = ref('structure');
const activeOperation = ref('插入');
const activeNode = ref('');
const demoInput = ref('');
const outputMessage = ref('输入单词开始演示');
const outputType = ref('info');
const currentWords = ref<string[]>(['hello', 'world', 'hi', 'hero', 'hex']);

// Trie树演示数据
const rootChildren = ref([
  { char: 'h', isEnd: false },
  { char: 'w', isEnd: false }
]);

const storedWords = ref(['hello', 'world', 'hi', 'hero', 'hex']);

// 导航章节
const sections = [
  { id: 'structure', title: '结构特点', icon: '🏗️' },
  { id: 'operations', title: '核心操作', icon: '⚙️' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' },
  { id: 'applications', title: '使用场景', icon: '💡' },
  { id: 'variants', title: '变种扩展', icon: '🔀' }
];

// 结构特点
const structureFeatures = [
  {
    icon: '🌳',
    title: '树形结构',
    description: 'Trie树是一种多叉树，每个节点代表一个字符，从根节点到某个节点的路径构成一个字符串前缀。',
    example: `根节点
  │
  ├── h
  │   ├── e
  │   │   ├── l
  │   │   │   └── l
  │   │   │       └── o
  │   │   └── r
  │   │       └── o
  │   └── i
  └── w
      └── o
          └── r
              └── l
                  └── d`
  },
  {
    icon: '🔤',
    title: '字符存储',
    description: '每个节点存储一个字符，节点间的父子关系表示字符的前后顺序。',
    example: `class TrieNode {
  char: string;
  children: Map<string, TrieNode>;
  isEnd: boolean;
}`
  },
  {
    icon: '🎯',
    title: '前缀共享',
    description: '具有相同前缀的单词共享路径，大大减少了存储空间。',
    example: `"hello" 和 "hero" 共享前缀 "he"`
  },
  {
    icon: '🚀',
    title: '高效搜索',
    description: '搜索时间复杂度与字符串长度成正比，与字典大小无关。',
    example: `搜索 "hello": O(5)
搜索 "world": O(5)`
  }
];

// 节点结构代码
const nodeStructureCode = `class TrieNode {
  // 节点字符
  char: string;
  // 子节点映射
  children: Map<string, TrieNode>;
  // 是否单词结束
  isEnd: boolean;
  // 词频统计（可选）
  frequency: number;

  constructor(char: string) {
    this.char = char;
    this.children = new Map();
    this.isEnd = false;
    this.frequency = 0;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode('');
  }

  // 插入单词
  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char));
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
    node.frequency++;
  }

  // 搜索单词
  search(word: string): boolean {
    const node = this.traverse(word);
    return node !== null && node.isEnd;
  }

  // 前缀搜索
  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  // 遍历辅助方法
  private traverse(word: string): TrieNode | null {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return null;
      }
      node = node.children.get(char)!;
    }
    return node;
  }
}`;

// 核心操作
const operations = [
  {
    name: '插入',
    description: '将单词插入Trie树，构建字符路径。',
    steps: [
      '从根节点开始',
      '逐个字符遍历单词',
      '如果字符不存在，创建新节点',
      '移动到子节点继续处理',
      '在最后一个字符节点标记单词结束'
    ],
    code: `insert(word: string): void {
  let node = this.root;
  for (const char of word) {
    if (!node.children.has(char)) {
      node.children.set(char, new TrieNode(char));
    }
    node = node.children.get(char)!;
  }
  node.isEnd = true;
}`,
    timeComplexity: 'O(L)，其中L是单词长度',
    spaceComplexity: 'O(L)，最坏情况下需要创建L个新节点'
  },
  {
    name: '搜索',
    description: '检查单词是否存在于Trie树中。',
    steps: [
      '从根节点开始',
      '逐个字符遍历单词',
      '如果字符不存在，返回false',
      '如果所有字符都存在，检查最后一个节点是否标记为单词结束'
    ],
    code: `search(word: string): boolean {
  const node = this.traverse(word);
  return node !== null && node.isEnd;
}`,
    timeComplexity: 'O(L)，其中L是单词长度',
    spaceComplexity: 'O(1)，不需要额外空间'
  },
  {
    name: '前缀搜索',
    description: '检查是否存在以指定前缀开头的单词。',
    steps: [
      '从根节点开始',
      '逐个字符遍历前缀',
      '如果字符不存在，返回false',
      '如果所有字符都存在，返回true'
    ],
    code: `startsWith(prefix: string): boolean {
  return this.traverse(prefix) !== null;
}`,
    timeComplexity: 'O(P)，其中P是前缀长度',
    spaceComplexity: 'O(1)，不需要额外空间'
  },
  {
    name: '删除',
    description: '从Trie树中删除单词，可能需要清理无用节点。',
    steps: [
      '找到单词的结束节点',
      '如果节点有子节点，只取消结束标记',
      '如果节点没有子节点，删除节点并向上递归删除无用节点'
    ],
    code: `delete(word: string): boolean {
  return this.deleteRecursive(this.root, word, 0);
}

private deleteRecursive(node: TrieNode, word: string, index: number): boolean {
  if (index === word.length) {
    if (!node.isEnd) return false;
    node.isEnd = false;
    return node.children.size === 0;
  }

  const char = word[index];
  const child = node.children.get(char);
  if (!child) return false;

  const shouldDelete = this.deleteRecursive(child, word, index + 1);
  if (shouldDelete) {
    node.children.delete(char);
    return node.children.size === 0 && !node.isEnd;
  }
  return false;
}`,
    timeComplexity: 'O(L)，其中L是单词长度',
    spaceComplexity: 'O(L)，递归调用栈深度'
  }
];

// 优点
const advantages = [
  {
    title: '高效前缀搜索',
    description: '前缀搜索时间复杂度仅为O(P)，其中P是前缀长度，与字典大小无关。'
  },
  {
    title: '空间优化',
    description: '共享前缀的单词只存储一次公共部分，特别适合存储大量具有公共前缀的单词。'
  },
  {
    title: '搜索性能稳定',
    description: '搜索时间只与查询字符串长度有关，不受字典中单词数量的影响。'
  },
  {
    title: '自动补全友好',
    description: '天然支持自动补全功能，可以快速找到所有以指定前缀开头的单词。'
  }
];

// 缺点
const disadvantages = [
  {
    title: '空间消耗',
    description: '每个字符都需要一个节点，对于长单词和大型字典，空间消耗可能较大。'
  },
  {
    title: '内存碎片',
    description: '使用指针链接节点，可能导致内存碎片，影响缓存性能。'
  },
  {
    title: '构建成本',
    description: '初始化时需要构建整个Trie树，对于动态变化的字典需要维护成本。'
  },
  {
    title: '字符集限制',
    description: '对于大型字符集（如Unicode），子节点数量可能很大，影响性能。'
  }
];

// 优化技术
const optimizations = [
  {
    name: '压缩Trie',
    description: '将单字符路径压缩为多字符节点，减少节点数量。',
    example: `// 压缩前: r -> o -> o -> m
// 压缩后: room`
  },
  {
    name: '双数组Trie',
    description: '使用两个数组表示Trie结构，提高内存局部性和访问速度。',
    example: `BASE数组: 存储状态转移基础值
CHECK数组: 验证状态转移有效性`
  },
  {
    name: '三数组Trie',
    description: '在双数组基础上增加TAIL数组存储后缀，进一步压缩空间。'
  },
  {
    name: '后缀树',
    description: '存储字符串的所有后缀，支持更复杂的字符串操作。'
  }
];

// 使用场景
const applicationScenarios = [
  {
    icon: '🔍',
    title: '搜索引擎',
    description: '用于实现搜索建议和自动补全功能。',
    example: `用户输入 "goo"
建议: "google", "good", "goose", ...`
  },
  {
    icon: '📱',
    title: '输入法',
    description: '存储词库，提供智能输入和词语联想。',
    example: `输入 "zhong"
联想: "中国", "中文", "中间", ...`
  },
  {
    icon: '🛡️',
    title: '敏感词过滤',
    description: '快速检测文本中是否包含敏感词汇。',
    example: `检测 "这个内容很好"
敏感词: "内容" -> 匹配`
  },
  {
    icon: '📚',
    title: '拼写检查',
    description: '检查单词拼写是否正确，提供纠正建议。',
    example: `输入 "recieve"
建议: "receive"`
  },
  {
    icon: '🌐',
    title: 'IP路由',
    description: '用于最长前缀匹配，实现IP路由表查找。',
    example: `IP: 192.168.1.1
匹配最长前缀: 192.168.1.0/24`
  },
  {
    icon: '📊',
    title: '数据压缩',
    description: '在字典压缩算法中存储字符串字典。',
    example: `LZW算法使用Trie树构建编码字典`
  }
];

// 实际应用案例
const realWorldCases = [
  {
    name: 'Google搜索',
    domain: '搜索引擎',
    description: 'Google搜索使用Trie树实现搜索建议功能，当用户输入查询时快速提供相关搜索建议。',
    implementation: `// 存储热门搜索词
const searchTrie = new Trie();

// 添加搜索词
searchTrie.insert("javascript tutorial");
searchTrie.insert("java programming");
searchTrie.insert("python course");

// 获取搜索建议
function getSuggestions(prefix: string): string[] {
  const suggestions: string[] = [];
  // 遍历以prefix开头的所有单词
  return suggestions;
}`
  },
  {
    name: '手机输入法',
    domain: '输入系统',
    description: '手机输入法使用Trie树存储词库，根据用户输入拼音提供汉字候选。',
    implementation: `class PinyinTrie {
  private trie: Trie;

  // 添加拼音-汉字映射
  addMapping(pinyin: string, hanzi: string): void {
    this.trie.insert(pinyin);
    // 存储映射关系...
  }

  // 根据拼音获取候选汉字
  getCandidates(pinyin: string): string[] {
    if (this.trie.startsWith(pinyin)) {
      // 返回匹配的汉字
    }
    return [];
  }
}`
  },
  {
    name: '网络防火墙',
    domain: '网络安全',
    description: '使用Trie树存储敏感词库，对网络内容进行实时过滤和检测。',
    implementation: `class ContentFilter {
  private keywordTrie: Trie;

  constructor(keywords: string[]) {
    this.keywordTrie = new Trie();
    keywords.forEach(keyword => this.keywordTrie.insert(keyword));
  }

  // 检测文本是否包含敏感词
  containsSensitiveWords(text: string): boolean {
    for (let i = 0; i < text.length; i++) {
      let node = this.keywordTrie.root;
      for (let j = i; j < text.length; j++) {
        const char = text[j];
        if (!node.children.has(char)) break;
        node = node.children.get(char)!;
        if (node.isEnd) return true;
      }
    }
    return false;
  }
}`
  }
];

// Trie树变种
const trieVariants = [
  {
    name: '压缩Trie',
    type: '空间优化',
    description: '通过合并单字符路径为多字符节点来减少节点数量。',
    pros: [
      '显著减少节点数量',
      '降低内存使用',
      '提高缓存性能'
    ],
    cons: [
      '实现复杂度增加',
      '插入删除操作更复杂',
      '需要额外处理节点分裂合并'
    ],
    code: `class CompressedTrieNode {
  fragment: string;  // 存储字符串片段
  children: Map<string, CompressedTrieNode>;
  isEnd: boolean;
}`
  },
  {
    name: '后缀树',
    type: '功能扩展',
    description: '存储字符串的所有后缀，支持子串搜索、最长重复子串等复杂操作。',
    pros: [
      '支持复杂的字符串操作',
      '高效的子串搜索',
      '一次构建多次查询'
    ],
    cons: [
      '构建复杂度较高',
      '空间消耗较大',
      '实现复杂'
    ]
  },
  {
    name: '双数组Trie',
    type: '性能优化',
    description: '使用BASE和CHECK两个数组表示Trie，提高内存局部性和访问速度。',
    pros: [
      '极快的查找速度',
      '内存连续，缓存友好',
      '适合静态字典'
    ],
    cons: [
      '构建过程复杂',
      '插入删除困难',
      '空间可能浪费'
    ],
    code: `class DoubleArrayTrie {
  private base: number[];
  private check: number[];

  // 状态转移
  transition(state: number, char: string): number {
    const next = base[state] + charCode(char);
    if (check[next] === state) return next;
    return -1;
  }
}`
  },
  {
    name: '三数组Trie',
    type: '空间压缩',
    description: '在双数组基础上增加TAIL数组存储后缀，进一步压缩空间。',
    pros: [
      '更高的空间效率',
      '保持快速查询',
      '适合大型字典'
    ],
    cons: [
      '实现极其复杂',
      '构建时间较长',
      '维护困难'
    ]
  }
];

// 交互演示方法
const performInsert = () => {
  if (!demoInput.value.trim()) {
    outputMessage.value = '请输入要插入的单词';
    outputType.value = 'warning';
    return;
  }

  const word = demoInput.value.toLowerCase();
  if (currentWords.value.includes(word)) {
    outputMessage.value = `单词 "${word}" 已存在`;
    outputType.value = 'warning';
  } else {
    currentWords.value.push(word);
    outputMessage.value = `成功插入单词: ${word}`;
    outputType.value = 'success';
    demoInput.value = '';
  }
};

const performSearch = () => {
  if (!demoInput.value.trim()) {
    outputMessage.value = '请输入要搜索的单词';
    outputType.value = 'warning';
    return;
  }

  const word = demoInput.value.toLowerCase();
  if (currentWords.value.includes(word)) {
    outputMessage.value = `找到单词: ${word}`;
    outputType.value = 'success';
  } else {
    outputMessage.value = `未找到单词: ${word}`;
    outputType.value = 'error';
  }
};

const performPrefix = () => {
  if (!demoInput.value.trim()) {
    outputMessage.value = '请输入要搜索的前缀';
    outputType.value = 'warning';
    return;
  }

  const prefix = demoInput.value.toLowerCase();
  const matches = currentWords.value.filter(word => word.startsWith(prefix));

  if (matches.length > 0) {
    outputMessage.value = `前缀 "${prefix}" 匹配的单词: ${matches.join(', ')}`;
    outputType.value = 'success';
  } else {
    outputMessage.value = `没有找到以 "${prefix}" 开头的单词`;
    outputType.value = 'error';
  }
};

const resetDemo = () => {
  currentWords.value = ['hello', 'world', 'hi', 'hero', 'hex'];
  demoInput.value = '';
  outputMessage.value = '已重置演示数据';
  outputType.value = 'info';
};

const performOperation = () => {
  // 默认执行插入操作
  performInsert();
};

// 高亮节点
const highlightNode = (char: string) => {
  activeNode.value = char;
};

// 滚动到指定章节
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动以更新活动章节
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #4a6fa5;
@primary-light: #6b8cbc;
@primary-dark: #3a5680;
@success-color: #27ae60;
@warning-color: #f39c12;
@error-color: #e74c3c;
@info-color: #3498db;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@card-bg: #fdfdfd;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
@shadow-hover: 0 8px 24px 0 rgba(0, 0, 0, 0.15);

// 基础样式
.trie-tree-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @bg-color;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, @primary-color 0%, @primary-dark 100%);
  color: white;
  padding: 3rem 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .header-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }

  .title {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .subtitle {
    font-size: 1.5rem;
    opacity: 0.9;
    margin: 0 0 3rem;
    font-weight: 400;
    text-align: center;
  }
}

// Trie树可视化
.trie-visualization {
  margin-top: 2rem;

  .visual-container {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
    backdrop-filter: blur(10px);
  }

  .trie-tree {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    .node {
      display: flex;
      flex-direction: column;
      align-items: center;

      &.root-node {
        .node-content {
          background: @primary-light;
        }
      }

      .node-content {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: @text-color;
        font-weight: 700;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        margin-bottom: 1rem;
        position: relative;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .node-char {
          font-size: 1.2rem;
        }

        .node-end {
          position: absolute;
          top: -5px;
          right: -5px;
          background: @success-color;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }
      }

      .children {
        display: flex;
        gap: 2rem;

        .child-node {
          &.active .node-content {
            background: @success-color;
            color: white;
          }
        }
      }
    }
  }

  .word-examples {
    text-align: center;

    h3 {
      margin: 0 0 1rem;
      color: white;
    }

    .word-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;

      .word-tag {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
      }
    }
  }
}

// 内容布局
.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem;
}

// 导航侧边栏
.nav-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      &:hover {
        background-color: darken(@sidebar-bg, 2%);
        color: @primary-color;
      }

      &.active {
        background-color: white;
        color: @primary-color;
        border-left-color: @primary-color;
        font-weight: 600;
      }

      .nav-icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 880px;
}

// 内容区块
.content-section {
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: @shadow;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: @shadow-hover;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }

  .section-description {
    color: @text-light;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
}

// 结构特点
.structure-features {
  margin: 2rem 0;

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0 0 0.75rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 1rem;
      color: @text-color;
    }

    .feature-example {
      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

.node-structure {
  margin-top: 2.5rem;

  h3 {
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .structure-code {
    pre {
      background: @sidebar-bg;
      border-radius: 6px;
      padding: 1.5rem;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.85rem;
        color: @text-color;
        line-height: 1.5;
      }
    }
  }
}

// 核心操作
.operation-demos {
  margin: 2rem 0;

  .operation-tabs {
    display: flex;
    border-bottom: 1px solid @border-color;
    margin-bottom: 1.5rem;

    .operation-tab {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
      font-weight: 500;

      &:hover {
        color: @primary-color;
      }

      &.active {
        color: @primary-color;
        border-bottom-color: @primary-color;
        font-weight: 600;
      }
    }
  }

  .operation-detail {
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    .operation-steps {
      margin: 1.5rem 0;

      .step {
        display: flex;
        margin-bottom: 1rem;

        .step-number {
          width: 30px;
          height: 30px;
          background: @primary-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
          padding-top: 0.25rem;
        }
      }
    }

    .operation-code {
      margin: 1.5rem 0;

      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1.25rem;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }

    .operation-complexity {
      padding: 1rem;
      background: lighten(@info-color, 45%);
      border-radius: 4px;
      border-left: 4px solid @info-color;
    }
  }
}

.interactive-demo {
  margin-top: 3rem;
  padding: 1.5rem;
  background: @card-bg;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .demo-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;

    .demo-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid @border-color;
      border-radius: 6px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.2);
      }
    }

    .demo-buttons {
      display: flex;
      gap: 0.5rem;

      .demo-btn {
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &.insert-btn {
          background: @success-color;
          color: white;

          &:hover {
            background: darken(@success-color, 10%);
          }
        }

        &.search-btn {
          background: @info-color;
          color: white;

          &:hover {
            background: darken(@info-color, 10%);
          }
        }

        &.prefix-btn {
          background: @warning-color;
          color: white;

          &:hover {
            background: darken(@warning-color, 10%);
          }
        }

        &.reset-btn {
          background: @error-color;
          color: white;

          &:hover {
            background: darken(@error-color, 10%);
          }
        }
      }
    }
  }

  .demo-output {
    .output-message {
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      font-weight: 500;

      &.success {
        background: lighten(@success-color, 45%);
        border-left: 4px solid @success-color;
        color: darken(@success-color, 20%);
      }

      &.error {
        background: lighten(@error-color, 45%);
        border-left: 4px solid @error-color;
        color: darken(@error-color, 20%);
      }

      &.warning {
        background: lighten(@warning-color, 45%);
        border-left: 4px solid @warning-color;
        color: darken(@warning-color, 20%);
      }

      &.info {
        background: lighten(@info-color, 45%);
        border-left: 4px solid @info-color;
        color: darken(@info-color, 20%);
      }
    }

    .current-words {
      .word-badge {
        display: inline-block;
        background: @sidebar-bg;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        margin: 0.25rem;
        font-size: 0.9rem;
      }
    }
  }
}

// 优缺点分析
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  .pros-section,
  .cons-section {
    h3 {
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid;

      .pros-section & {
        color: @success-color;
        border-bottom-color: @success-color;
      }

      .cons-section & {
        color: @error-color;
        border-bottom-color: @error-color;
      }
    }
  }

  .pros-list,
  .cons-list {
    .pro-item,
    .con-item {
      display: flex;
      margin-bottom: 1.5rem;

      .pro-icon,
      .con-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }

      .pro-content,
      .con-content {
        h4 {
          margin: 0 0 0.5rem;
          color: @text-color;
        }

        p {
          margin: 0;
          color: @text-light;
        }
      }
    }
  }
}

.optimization-techniques {
  margin-top: 3rem;

  h3 {
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .technique-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .technique-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;

    h4 {
      margin: 0 0 0.75rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 1rem;
      color: @text-color;
    }

    .tech-example {
      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

// 使用场景
.application-scenarios {
  margin: 2rem 0;

  .scenario-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .scenario-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-left: 4px solid @primary-color;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .scenario-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0 0 0.75rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 1rem;
      color: @text-color;
    }

    .scenario-example {
      pre {
        background: @sidebar-bg;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.4;
        }
      }
    }
  }
}

.real-world-examples {
  margin-top: 3rem;

  h3 {
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  .case-studies {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .case-study {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .case-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h4 {
        margin: 0;
        color: @primary-color;
      }

      .case-domain {
        background: @primary-color;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .case-content {
      p {
        margin-bottom: 1rem;
        color: @text-color;
      }

      .case-implementation {
        pre {
          background: @sidebar-bg;
          border-radius: 4px;
          padding: 1rem;
          overflow-x: auto;
          margin: 0;

          code {
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 0.85rem;
            color: @text-color;
            line-height: 1.4;
          }
        }
      }
    }
  }
}

// 变种与扩展
.variant-types {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.variant-card {
  padding: 1.5rem;
  background: @card-bg;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @primary-color;

  .variant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      color: @primary-color;
    }

    .variant-tag {
      background: @primary-color;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }

  .variant-pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;

    .variant-pros,
    .variant-cons {
      strong {
        display: block;
        margin-bottom: 0.5rem;
        color: @text-color;
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.25rem;
          color: @text-light;
        }
      }
    }

    .variant-pros {
      strong {
        color: @success-color;
      }
    }

    .variant-cons {
      strong {
        color: @error-color;
      }
    }
  }

  .variant-code {
    pre {
      background: @sidebar-bg;
      border-radius: 4px;
      padding: 1.25rem;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.85rem;
        color: @text-color;
        line-height: 1.4;
      }
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2.5rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;

  p {
    margin: 0.5rem 0;
  }

  .footer-note {
    font-size: 0.9rem;
    opacity: 0.7;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    margin-bottom: 1.5rem;
    position: static;

    .nav-list {
      display: flex;
      overflow-x: auto;

      li {
        flex-shrink: 0;
        border-left: none;
        border-bottom: 3px solid transparent;

        &.active {
          border-left: none;
          border-bottom-color: @primary-color;
        }
      }
    }
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .variant-pros-cons {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem 3rem;

    .title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .feature-grid,
  .scenario-cards,
  .technique-cards {
    grid-template-columns: 1fr;
  }

  .demo-controls {
    flex-direction: column;

    .demo-buttons {
      width: 100%;

      .demo-btn {
        flex: 1;
      }
    }
  }

  .operation-tabs {
    overflow-x: auto;

    .operation-tab {
      flex-shrink: 0;
    }
  }
}
</style>
