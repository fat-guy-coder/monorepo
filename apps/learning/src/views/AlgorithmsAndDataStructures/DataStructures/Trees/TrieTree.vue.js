var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ref, onMounted, onUnmounted } from 'vue';
// 响应式数据
var activeSection = ref('structure');
var activeOperation = ref('插入');
var activeNode = ref('');
var demoInput = ref('');
var outputMessage = ref('输入单词开始演示');
var outputType = ref('info');
var currentWords = ref(['hello', 'world', 'hi', 'hero', 'hex']);
// Trie树演示数据
var rootChildren = ref([
    { char: 'h', isEnd: false },
    { char: 'w', isEnd: false }
]);
var storedWords = ref(['hello', 'world', 'hi', 'hero', 'hex']);
// 导航章节
var sections = [
    { id: 'structure', title: '结构特点', icon: '🏗️' },
    { id: 'operations', title: '核心操作', icon: '⚙️' },
    { id: 'pros-cons', title: '优缺点', icon: '⚖️' },
    { id: 'applications', title: '使用场景', icon: '💡' },
    { id: 'variants', title: '变种扩展', icon: '🔀' }
];
// 结构特点
var structureFeatures = [
    {
        icon: '🌳',
        title: '树形结构',
        description: 'Trie树是一种多叉树，每个节点代表一个字符，从根节点到某个节点的路径构成一个字符串前缀。',
        example: "\u6839\u8282\u70B9\n  \u2502\n  \u251C\u2500\u2500 h\n  \u2502   \u251C\u2500\u2500 e\n  \u2502   \u2502   \u251C\u2500\u2500 l\n  \u2502   \u2502   \u2502   \u2514\u2500\u2500 l\n  \u2502   \u2502   \u2502       \u2514\u2500\u2500 o\n  \u2502   \u2502   \u2514\u2500\u2500 r\n  \u2502   \u2502       \u2514\u2500\u2500 o\n  \u2502   \u2514\u2500\u2500 i\n  \u2514\u2500\u2500 w\n      \u2514\u2500\u2500 o\n          \u2514\u2500\u2500 r\n              \u2514\u2500\u2500 l\n                  \u2514\u2500\u2500 d"
    },
    {
        icon: '🔤',
        title: '字符存储',
        description: '每个节点存储一个字符，节点间的父子关系表示字符的前后顺序。',
        example: "class TrieNode {\n  char: string;\n  children: Map<string, TrieNode>;\n  isEnd: boolean;\n}"
    },
    {
        icon: '🎯',
        title: '前缀共享',
        description: '具有相同前缀的单词共享路径，大大减少了存储空间。',
        example: "\"hello\" \u548C \"hero\" \u5171\u4EAB\u524D\u7F00 \"he\""
    },
    {
        icon: '🚀',
        title: '高效搜索',
        description: '搜索时间复杂度与字符串长度成正比，与字典大小无关。',
        example: "\u641C\u7D22 \"hello\": O(5)\n\u641C\u7D22 \"world\": O(5)"
    }
];
// 节点结构代码
var nodeStructureCode = "class TrieNode {\n  // \u8282\u70B9\u5B57\u7B26\n  char: string;\n  // \u5B50\u8282\u70B9\u6620\u5C04\n  children: Map<string, TrieNode>;\n  // \u662F\u5426\u5355\u8BCD\u7ED3\u675F\n  isEnd: boolean;\n  // \u8BCD\u9891\u7EDF\u8BA1\uFF08\u53EF\u9009\uFF09\n  frequency: number;\n\n  constructor(char: string) {\n    this.char = char;\n    this.children = new Map();\n    this.isEnd = false;\n    this.frequency = 0;\n  }\n}\n\nclass Trie {\n  private root: TrieNode;\n\n  constructor() {\n    this.root = new TrieNode('');\n  }\n\n  // \u63D2\u5165\u5355\u8BCD\n  insert(word: string): void {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children.has(char)) {\n        node.children.set(char, new TrieNode(char));\n      }\n      node = node.children.get(char)!;\n    }\n    node.isEnd = true;\n    node.frequency++;\n  }\n\n  // \u641C\u7D22\u5355\u8BCD\n  search(word: string): boolean {\n    const node = this.traverse(word);\n    return node !== null && node.isEnd;\n  }\n\n  // \u524D\u7F00\u641C\u7D22\n  startsWith(prefix: string): boolean {\n    return this.traverse(prefix) !== null;\n  }\n\n  // \u904D\u5386\u8F85\u52A9\u65B9\u6CD5\n  private traverse(word: string): TrieNode | null {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children.has(char)) {\n        return null;\n      }\n      node = node.children.get(char)!;\n    }\n    return node;\n  }\n}";
// 核心操作
var operations = [
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
        code: "insert(word: string): void {\n  let node = this.root;\n  for (const char of word) {\n    if (!node.children.has(char)) {\n      node.children.set(char, new TrieNode(char));\n    }\n    node = node.children.get(char)!;\n  }\n  node.isEnd = true;\n}",
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
        code: "search(word: string): boolean {\n  const node = this.traverse(word);\n  return node !== null && node.isEnd;\n}",
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
        code: "startsWith(prefix: string): boolean {\n  return this.traverse(prefix) !== null;\n}",
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
        code: "delete(word: string): boolean {\n  return this.deleteRecursive(this.root, word, 0);\n}\n\nprivate deleteRecursive(node: TrieNode, word: string, index: number): boolean {\n  if (index === word.length) {\n    if (!node.isEnd) return false;\n    node.isEnd = false;\n    return node.children.size === 0;\n  }\n\n  const char = word[index];\n  const child = node.children.get(char);\n  if (!child) return false;\n\n  const shouldDelete = this.deleteRecursive(child, word, index + 1);\n  if (shouldDelete) {\n    node.children.delete(char);\n    return node.children.size === 0 && !node.isEnd;\n  }\n  return false;\n}",
        timeComplexity: 'O(L)，其中L是单词长度',
        spaceComplexity: 'O(L)，递归调用栈深度'
    }
];
// 优点
var advantages = [
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
var disadvantages = [
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
var optimizations = [
    {
        name: '压缩Trie',
        description: '将单字符路径压缩为多字符节点，减少节点数量。',
        example: "// \u538B\u7F29\u524D: r -> o -> o -> m\n// \u538B\u7F29\u540E: room"
    },
    {
        name: '双数组Trie',
        description: '使用两个数组表示Trie结构，提高内存局部性和访问速度。',
        example: "BASE\u6570\u7EC4: \u5B58\u50A8\u72B6\u6001\u8F6C\u79FB\u57FA\u7840\u503C\nCHECK\u6570\u7EC4: \u9A8C\u8BC1\u72B6\u6001\u8F6C\u79FB\u6709\u6548\u6027"
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
var applicationScenarios = [
    {
        icon: '🔍',
        title: '搜索引擎',
        description: '用于实现搜索建议和自动补全功能。',
        example: "\u7528\u6237\u8F93\u5165 \"goo\"\n\u5EFA\u8BAE: \"google\", \"good\", \"goose\", ..."
    },
    {
        icon: '📱',
        title: '输入法',
        description: '存储词库，提供智能输入和词语联想。',
        example: "\u8F93\u5165 \"zhong\"\n\u8054\u60F3: \"\u4E2D\u56FD\", \"\u4E2D\u6587\", \"\u4E2D\u95F4\", ..."
    },
    {
        icon: '🛡️',
        title: '敏感词过滤',
        description: '快速检测文本中是否包含敏感词汇。',
        example: "\u68C0\u6D4B \"\u8FD9\u4E2A\u5185\u5BB9\u5F88\u597D\"\n\u654F\u611F\u8BCD: \"\u5185\u5BB9\" -> \u5339\u914D"
    },
    {
        icon: '📚',
        title: '拼写检查',
        description: '检查单词拼写是否正确，提供纠正建议。',
        example: "\u8F93\u5165 \"recieve\"\n\u5EFA\u8BAE: \"receive\""
    },
    {
        icon: '🌐',
        title: 'IP路由',
        description: '用于最长前缀匹配，实现IP路由表查找。',
        example: "IP: 192.168.1.1\n\u5339\u914D\u6700\u957F\u524D\u7F00: 192.168.1.0/24"
    },
    {
        icon: '📊',
        title: '数据压缩',
        description: '在字典压缩算法中存储字符串字典。',
        example: "LZW\u7B97\u6CD5\u4F7F\u7528Trie\u6811\u6784\u5EFA\u7F16\u7801\u5B57\u5178"
    }
];
// 实际应用案例
var realWorldCases = [
    {
        name: 'Google搜索',
        domain: '搜索引擎',
        description: 'Google搜索使用Trie树实现搜索建议功能，当用户输入查询时快速提供相关搜索建议。',
        implementation: "// \u5B58\u50A8\u70ED\u95E8\u641C\u7D22\u8BCD\nconst searchTrie = new Trie();\n\n// \u6DFB\u52A0\u641C\u7D22\u8BCD\nsearchTrie.insert(\"javascript tutorial\");\nsearchTrie.insert(\"java programming\");\nsearchTrie.insert(\"python course\");\n\n// \u83B7\u53D6\u641C\u7D22\u5EFA\u8BAE\nfunction getSuggestions(prefix: string): string[] {\n  const suggestions: string[] = [];\n  // \u904D\u5386\u4EE5prefix\u5F00\u5934\u7684\u6240\u6709\u5355\u8BCD\n  return suggestions;\n}"
    },
    {
        name: '手机输入法',
        domain: '输入系统',
        description: '手机输入法使用Trie树存储词库，根据用户输入拼音提供汉字候选。',
        implementation: "class PinyinTrie {\n  private trie: Trie;\n\n  // \u6DFB\u52A0\u62FC\u97F3-\u6C49\u5B57\u6620\u5C04\n  addMapping(pinyin: string, hanzi: string): void {\n    this.trie.insert(pinyin);\n    // \u5B58\u50A8\u6620\u5C04\u5173\u7CFB...\n  }\n\n  // \u6839\u636E\u62FC\u97F3\u83B7\u53D6\u5019\u9009\u6C49\u5B57\n  getCandidates(pinyin: string): string[] {\n    if (this.trie.startsWith(pinyin)) {\n      // \u8FD4\u56DE\u5339\u914D\u7684\u6C49\u5B57\n    }\n    return [];\n  }\n}"
    },
    {
        name: '网络防火墙',
        domain: '网络安全',
        description: '使用Trie树存储敏感词库，对网络内容进行实时过滤和检测。',
        implementation: "class ContentFilter {\n  private keywordTrie: Trie;\n\n  constructor(keywords: string[]) {\n    this.keywordTrie = new Trie();\n    keywords.forEach(keyword => this.keywordTrie.insert(keyword));\n  }\n\n  // \u68C0\u6D4B\u6587\u672C\u662F\u5426\u5305\u542B\u654F\u611F\u8BCD\n  containsSensitiveWords(text: string): boolean {\n    for (let i = 0; i < text.length; i++) {\n      let node = this.keywordTrie.root;\n      for (let j = i; j < text.length; j++) {\n        const char = text[j];\n        if (!node.children.has(char)) break;\n        node = node.children.get(char)!;\n        if (node.isEnd) return true;\n      }\n    }\n    return false;\n  }\n}"
    }
];
// Trie树变种
var trieVariants = [
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
        code: "class CompressedTrieNode {\n  fragment: string;  // \u5B58\u50A8\u5B57\u7B26\u4E32\u7247\u6BB5\n  children: Map<string, CompressedTrieNode>;\n  isEnd: boolean;\n}"
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
        code: "class DoubleArrayTrie {\n  private base: number[];\n  private check: number[];\n\n  // \u72B6\u6001\u8F6C\u79FB\n  transition(state: number, char: string): number {\n    const next = base[state] + charCode(char);\n    if (check[next] === state) return next;\n    return -1;\n  }\n}"
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
var performInsert = function () {
    if (!demoInput.value.trim()) {
        outputMessage.value = '请输入要插入的单词';
        outputType.value = 'warning';
        return;
    }
    var word = demoInput.value.toLowerCase();
    if (currentWords.value.includes(word)) {
        outputMessage.value = "\u5355\u8BCD \"".concat(word, "\" \u5DF2\u5B58\u5728");
        outputType.value = 'warning';
    }
    else {
        currentWords.value.push(word);
        outputMessage.value = "\u6210\u529F\u63D2\u5165\u5355\u8BCD: ".concat(word);
        outputType.value = 'success';
        demoInput.value = '';
    }
};
var performSearch = function () {
    if (!demoInput.value.trim()) {
        outputMessage.value = '请输入要搜索的单词';
        outputType.value = 'warning';
        return;
    }
    var word = demoInput.value.toLowerCase();
    if (currentWords.value.includes(word)) {
        outputMessage.value = "\u627E\u5230\u5355\u8BCD: ".concat(word);
        outputType.value = 'success';
    }
    else {
        outputMessage.value = "\u672A\u627E\u5230\u5355\u8BCD: ".concat(word);
        outputType.value = 'error';
    }
};
var performPrefix = function () {
    if (!demoInput.value.trim()) {
        outputMessage.value = '请输入要搜索的前缀';
        outputType.value = 'warning';
        return;
    }
    var prefix = demoInput.value.toLowerCase();
    var matches = currentWords.value.filter(function (word) { return word.startsWith(prefix); });
    if (matches.length > 0) {
        outputMessage.value = "\u524D\u7F00 \"".concat(prefix, "\" \u5339\u914D\u7684\u5355\u8BCD: ").concat(matches.join(', '));
        outputType.value = 'success';
    }
    else {
        outputMessage.value = "\u6CA1\u6709\u627E\u5230\u4EE5 \"".concat(prefix, "\" \u5F00\u5934\u7684\u5355\u8BCD");
        outputType.value = 'error';
    }
};
var resetDemo = function () {
    currentWords.value = ['hello', 'world', 'hi', 'hero', 'hex'];
    demoInput.value = '';
    outputMessage.value = '已重置演示数据';
    outputType.value = 'info';
};
var performOperation = function () {
    // 默认执行插入操作
    performInsert();
};
// 高亮节点
var highlightNode = function (char) {
    activeNode.value = char;
};
// 滚动到指定章节
var scrollToSection = function (sectionId) {
    var element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        activeSection.value = sectionId;
    }
};
// 监听滚动以更新活动章节
var handleScroll = function () {
    var scrollPosition = window.scrollY + 100;
    for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
        var section = sections_1[_i];
        var element = document.getElementById(section.id);
        if (element) {
            var offsetTop = element.offsetTop;
            var offsetHeight = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection.value = section.id;
                break;
            }
        }
    }
};
// 生命周期钩子
onMounted(function () {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(function () {
    window.removeEventListener('scroll', handleScroll);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-section']} */ ;
/** @type {__VLS_StyleScopedClasses['cons-section']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-pros']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['technique-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-tab']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trie-tree-intro" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trie-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trie-tree" }, { ref: "trieTree" }));
/** @type {typeof __VLS_ctx.trieTree} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.highlightNode('root');
    } }, { class: "node root-node" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "node-char" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "children" }));
var _loop_1 = function (child) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.highlightNode(child.char);
        } }, { class: "child-node" }), { key: (child.char) }), { class: ({ active: __VLS_ctx.activeNode === child.char }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "node-char" }));
    (child.char);
    if (child.isEnd) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "node-end" }));
    }
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.rootChildren)); _i < _a.length; _i++) {
    var child = _a[_i][0];
    _loop_1(child);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "word-examples" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "word-list" }));
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.storedWords)); _b < _c.length; _b++) {
    var word = _c[_b][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (word) }, { class: "word-tag" }));
    (word);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)(__assign({ class: "nav-sidebar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(__assign({ class: "nav-list" }));
var _loop_2 = function (section) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.scrollToSection(section.id);
        } }, { key: (section.id) }), { class: ({ active: __VLS_ctx.activeSection === section.id }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "nav-icon" }));
    (section.icon);
    (section.title);
};
for (var _d = 0, _e = __VLS_getVForSourceType((__VLS_ctx.sections)); _d < _e.length; _d++) {
    var section = _e[_d][0];
    _loop_2(section);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(__assign({ class: "main-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "structure" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "section-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "structure-features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-grid" }));
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.structureFeatures)); _f < _g.length; _f++) {
    var feature = _g[_f][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card" }, { key: (feature.title) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
    (feature.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (feature.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (feature.description);
    if (feature.example) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-example" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (feature.example);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-structure" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "structure-code" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.nodeStructureCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "operations" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "section-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-demos" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-tabs" }));
var _loop_3 = function (op) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeOperation = op.name;
        } }, { key: (op.name) }), { class: ({ active: __VLS_ctx.activeOperation === op.name }) }), { class: "operation-tab" }));
    (op.name);
};
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.operations)); _h < _j.length; _h++) {
    var op = _j[_h][0];
    _loop_3(op);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-content" }));
for (var _k = 0, _l = __VLS_getVForSourceType((__VLS_ctx.operations)); _k < _l.length; _k++) {
    var op = _l[_k][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (op.name) }, { class: "operation-detail" }));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.activeOperation === op.name) }), null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (op.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (op.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-steps" }));
    for (var _m = 0, _o = __VLS_getVForSourceType((op.steps)); _m < _o.length; _m++) {
        var _p = _o[_m], step = _p[0], index = _p[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (step);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-code" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (op.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-complexity" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (op.timeComplexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (op.spaceComplexity);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "interactive-demo" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ onKeyup: (__VLS_ctx.performOperation) }, { placeholder: "输入单词进行操作" }), { class: "demo-input" }));
(__VLS_ctx.demoInput);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-buttons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.performInsert) }, { class: "demo-btn insert-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.performSearch) }, { class: "demo-btn search-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.performPrefix) }, { class: "demo-btn prefix-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetDemo) }, { class: "demo-btn reset-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-output" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "output-message" }, { class: (__VLS_ctx.outputType) }));
(__VLS_ctx.outputMessage);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "current-words" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.currentWords)); _q < _r.length; _q++) {
    var word = _r[_q][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (word) }, { class: "word-badge" }));
    (word);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "pros-cons" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "section-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros-list" }));
for (var _s = 0, _t = __VLS_getVForSourceType((__VLS_ctx.advantages)); _s < _t.length; _s++) {
    var pro = _t[_s][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pro-item" }, { key: (pro.title) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pro-icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pro-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (pro.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (pro.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons-list" }));
for (var _u = 0, _v = __VLS_getVForSourceType((__VLS_ctx.disadvantages)); _u < _v.length; _u++) {
    var con = _v[_u][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "con-item" }, { key: (con.title) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "con-icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "con-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (con.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (con.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "optimization-techniques" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "technique-cards" }));
for (var _w = 0, _x = __VLS_getVForSourceType((__VLS_ctx.optimizations)); _w < _x.length; _w++) {
    var tech = _x[_w][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "technique-card" }, { key: (tech.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (tech.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (tech.description);
    if (tech.example) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tech-example" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (tech.example);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "applications" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "section-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-scenarios" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario-cards" }));
for (var _y = 0, _z = __VLS_getVForSourceType((__VLS_ctx.applicationScenarios)); _y < _z.length; _y++) {
    var scenario = _z[_y][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario-card" }, { key: (scenario.title) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario-icon" }));
    (scenario.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (scenario.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (scenario.description);
    if (scenario.example) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario-example" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (scenario.example);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "real-world-examples" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-studies" }));
for (var _0 = 0, _1 = __VLS_getVForSourceType((__VLS_ctx.realWorldCases)); _0 < _1.length; _0++) {
    var caseStudy = _1[_0][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-study" }, { key: (caseStudy.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (caseStudy.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "case-domain" }));
    (caseStudy.domain);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (caseStudy.description);
    if (caseStudy.implementation) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-implementation" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (caseStudy.implementation);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "variants" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "section-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-types" }));
for (var _2 = 0, _3 = __VLS_getVForSourceType((__VLS_ctx.trieVariants)); _2 < _3.length; _2++) {
    var variant = _3[_2][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-card" }, { key: (variant.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (variant.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "variant-tag" }));
    (variant.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (variant.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-pros-cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-pros" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _4 = 0, _5 = __VLS_getVForSourceType((variant.pros)); _4 < _5.length; _4++) {
        var pro = _5[_4][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (pro),
        });
        (pro);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _6 = 0, _7 = __VLS_getVForSourceType((variant.cons)); _6 < _7.length; _6++) {
        var con = _7[_6][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (con),
        });
        (con);
    }
    if (variant.code) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-code" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (variant.code);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "page-footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "footer-note" }));
/** @type {__VLS_StyleScopedClasses['trie-tree-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['trie-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-container']} */ ;
/** @type {__VLS_StyleScopedClasses['trie-tree']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['root-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['node-char']} */ ;
/** @type {__VLS_StyleScopedClasses['children']} */ ;
/** @type {__VLS_StyleScopedClasses['child-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['node-char']} */ ;
/** @type {__VLS_StyleScopedClasses['node-end']} */ ;
/** @type {__VLS_StyleScopedClasses['word-examples']} */ ;
/** @type {__VLS_StyleScopedClasses['word-list']} */ ;
/** @type {__VLS_StyleScopedClasses['word-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-description']} */ ;
/** @type {__VLS_StyleScopedClasses['structure-features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-example']} */ ;
/** @type {__VLS_StyleScopedClasses['node-structure']} */ ;
/** @type {__VLS_StyleScopedClasses['structure-code']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-description']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-demos']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-content']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-code']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['interactive-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-input']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['insert-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['prefix-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-output']} */ ;
/** @type {__VLS_StyleScopedClasses['output-message']} */ ;
/** @type {__VLS_StyleScopedClasses['current-words']} */ ;
/** @type {__VLS_StyleScopedClasses['word-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-description']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-section']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-list']} */ ;
/** @type {__VLS_StyleScopedClasses['pro-item']} */ ;
/** @type {__VLS_StyleScopedClasses['pro-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['pro-content']} */ ;
/** @type {__VLS_StyleScopedClasses['cons-section']} */ ;
/** @type {__VLS_StyleScopedClasses['cons-list']} */ ;
/** @type {__VLS_StyleScopedClasses['con-item']} */ ;
/** @type {__VLS_StyleScopedClasses['con-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['con-content']} */ ;
/** @type {__VLS_StyleScopedClasses['optimization-techniques']} */ ;
/** @type {__VLS_StyleScopedClasses['technique-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['technique-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-example']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-description']} */ ;
/** @type {__VLS_StyleScopedClasses['application-scenarios']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-card']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-example']} */ ;
/** @type {__VLS_StyleScopedClasses['real-world-examples']} */ ;
/** @type {__VLS_StyleScopedClasses['case-studies']} */ ;
/** @type {__VLS_StyleScopedClasses['case-study']} */ ;
/** @type {__VLS_StyleScopedClasses['case-header']} */ ;
/** @type {__VLS_StyleScopedClasses['case-domain']} */ ;
/** @type {__VLS_StyleScopedClasses['case-content']} */ ;
/** @type {__VLS_StyleScopedClasses['case-implementation']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-description']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-types']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-card']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-header']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-content']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-pros']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-code']} */ ;
/** @type {__VLS_StyleScopedClasses['page-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-note']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            activeSection: activeSection,
            activeOperation: activeOperation,
            activeNode: activeNode,
            demoInput: demoInput,
            outputMessage: outputMessage,
            outputType: outputType,
            currentWords: currentWords,
            rootChildren: rootChildren,
            storedWords: storedWords,
            sections: sections,
            structureFeatures: structureFeatures,
            nodeStructureCode: nodeStructureCode,
            operations: operations,
            advantages: advantages,
            disadvantages: disadvantages,
            optimizations: optimizations,
            applicationScenarios: applicationScenarios,
            realWorldCases: realWorldCases,
            trieVariants: trieVariants,
            performInsert: performInsert,
            performSearch: performSearch,
            performPrefix: performPrefix,
            resetDemo: resetDemo,
            performOperation: performOperation,
            highlightNode: highlightNode,
            scrollToSection: scrollToSection,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
