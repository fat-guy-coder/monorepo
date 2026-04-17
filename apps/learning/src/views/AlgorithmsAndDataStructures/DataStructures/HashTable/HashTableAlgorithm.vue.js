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
import { ref } from 'vue';
// 响应式数据
var activeAlgorithm = ref('two-sum');
var activeLanguage = ref('TypeScript');
// 算法标签页
var algorithmTabs = ref([
    { id: 'two-sum', title: '两数之和', icon: '🔢' },
    { id: 'anagram', title: '字母异位词', icon: '🔤' },
    { id: 'subarray', title: '子数组问题', icon: '📊' },
    { id: 'duplicate', title: '重复元素', icon: '🔍' },
    { id: 'lru', title: 'LRU缓存', icon: '💾' }
]);
// 算法数据
var algorithms = ref([
    {
        id: 'two-sum',
        name: '两数之和',
        difficulty: '简单',
        time: 'O(n)',
        space: 'O(n)',
        problem: '给定一个整数数组 nums 和一个目标值 target，在数组中找出和为目标值的两个整数，并返回它们的数组下标。',
        approach: '使用哈希表存储每个数字及其索引，对于每个数字，检查 target - num 是否在哈希表中。',
        steps: [
            '创建一个空的哈希表',
            '遍历数组中的每个元素',
            '对于当前元素 num，计算 complement = target - num',
            '检查 complement 是否在哈希表中',
            '如果存在，返回两个索引',
            '否则将当前元素和索引存入哈希表'
        ],
        implementations: [
            {
                language: 'TypeScript',
                code: "function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n\n    if (map.has(complement)) {\n      return [map.get(complement)!, i];\n    }\n\n    map.set(nums[i], i);\n  }\n\n  return [];\n}"
            },
            {
                language: 'Python',
                code: "def two_sum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []"
            }
        ],
        complexity: {
            time: 'O(n) - 只需要遍历数组一次',
            space: 'O(n) - 最坏情况下需要存储所有元素',
            scenarios: [
                '数组元素查找',
                '配对问题',
                '目标值匹配'
            ]
        },
        example: {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            visualization: '哈希表: {2:0} → 找到7时，检查9-7=2在表中 → 返回[0,1]'
        }
    },
    {
        id: 'anagram',
        name: '有效的字母异位词',
        difficulty: '简单',
        time: 'O(n)',
        space: 'O(1)',
        problem: '给定两个字符串 s 和 t，判断 t 是否是 s 的字母异位词（包含相同的字母，但排列顺序不同）。',
        approach: '使用哈希表统计每个字符的出现次数，比较两个字符串的字符频率。',
        steps: [
            '如果两个字符串长度不同，直接返回 false',
            '创建一个长度为26的数组作为哈希表',
            '遍历第一个字符串，增加字符计数',
            '遍历第二个字符串，减少字符计数',
            '检查所有字符计数是否为零'
        ],
        implementations: [
            {
                language: 'TypeScript',
                code: "function isAnagram(s: string, t: string): boolean {\n  if (s.length !== t.length) return false;\n\n  const counter = new Array(26).fill(0);\n\n  for (let i = 0; i < s.length; i++) {\n    counter[s.charCodeAt(i) - 97]++;\n    counter[t.charCodeAt(i) - 97]--;\n  }\n\n  return counter.every(count => count === 0);\n}"
            },
            {
                language: 'Python',
                code: "def is_anagram(s: str, t: str) -> bool:\n    if len(s) != len(t):\n        return False\n\n    counter = [0] * 26\n\n    for i in range(len(s)):\n        counter[ord(s[i]) - ord('a')] += 1\n        counter[ord(t[i]) - ord('a')] -= 1\n\n    return all(count == 0 for count in counter)"
            }
        ],
        complexity: {
            time: 'O(n) - 需要遍历两个字符串',
            space: 'O(1) - 固定大小的计数数组',
            scenarios: [
                '字符串相似性判断',
                '字符频率统计',
                '密码学应用'
            ]
        },
        example: {
            input: 's = "anagram", t = "nagaram"',
            output: 'true',
            visualization: '字符计数: a:3, n:1, g:1, r:1, m:1 → 两个字符串计数相同'
        }
    },
    {
        id: 'subarray',
        name: '和为K的子数组',
        difficulty: '中等',
        time: 'O(n)',
        space: 'O(n)',
        problem: '给定一个整数数组和一个整数 k，找到该数组中和为 k 的连续子数组的个数。',
        approach: '使用前缀和和哈希表，记录每个前缀和出现的次数，通过计算当前前缀和与目标值的差值来找到子数组。',
        steps: [
            '初始化哈希表，存储前缀和及其出现次数',
            '设置初始前缀和为0，出现次数为1',
            '遍历数组，计算当前前缀和',
            '检查 prefixSum - k 是否在哈希表中',
            '更新结果计数',
            '更新当前前缀和的出现次数'
        ],
        implementations: [
            {
                language: 'TypeScript',
                code: "function subarraySum(nums: number[], k: number): number {\n  const prefixSumMap = new Map<number, number>();\n  prefixSumMap.set(0, 1);\n\n  let prefixSum = 0;\n  let count = 0;\n\n  for (const num of nums) {\n    prefixSum += num;\n\n    if (prefixSumMap.has(prefixSum - k)) {\n      count += prefixSumMap.get(prefixSum - k)!;\n    }\n\n    prefixSumMap.set(prefixSum, (prefixSumMap.get(prefixSum) || 0) + 1);\n  }\n\n  return count;\n}"
            }
        ],
        complexity: {
            time: 'O(n) - 单次遍历数组',
            space: 'O(n) - 存储前缀和映射',
            scenarios: [
                '子数组和统计',
                '连续区间问题',
                '数据分析'
            ]
        },
        example: {
            input: 'nums = [1,1,1], k = 2',
            output: '2',
            visualization: '前缀和: [0,1,2,3] → 找到2-2=0和3-2=1 → 子数组[1,1]和[1,1]'
        }
    },
    {
        id: 'duplicate',
        name: '存在重复元素',
        difficulty: '简单',
        time: 'O(n)',
        space: 'O(n)',
        problem: '给定一个整数数组，判断是否存在重复元素。',
        approach: '使用哈希集合存储已访问的元素，遇到重复元素时返回 true。',
        steps: [
            '创建一个空的哈希集合',
            '遍历数组中的每个元素',
            '如果元素已在集合中，返回 true',
            '否则将元素添加到集合中',
            '遍历结束返回 false'
        ],
        implementations: [
            {
                language: 'TypeScript',
                code: "function containsDuplicate(nums: number[]): boolean {\n  const set = new Set<number>();\n\n  for (const num of nums) {\n    if (set.has(num)) {\n      return true;\n    }\n    set.add(num);\n  }\n\n  return false;\n}"
            }
        ],
        complexity: {
            time: 'O(n) - 需要遍历整个数组',
            space: 'O(n) - 最坏情况下存储所有元素',
            scenarios: [
                '重复数据检测',
                '数据去重',
                '唯一性验证'
            ]
        },
        example: {
            input: 'nums = [1,2,3,1]',
            output: 'true',
            visualization: '集合: {1} → {1,2} → {1,2,3} → 遇到1已在集合中 → 返回true'
        }
    },
    {
        id: 'lru',
        name: 'LRU缓存机制',
        difficulty: '中等',
        time: 'O(1)',
        space: 'O(capacity)',
        problem: '设计和实现一个 LRU (最近最少使用) 缓存机制，支持获取数据 get 和写入数据 put 。',
        approach: '使用哈希表 + 双向链表，哈希表提供O(1)的访问，双向链表维护访问顺序。',
        steps: [
            '定义双向链表节点类',
            '使用哈希表存储键到节点的映射',
            '维护虚拟头尾节点简化操作',
            'get操作：移动节点到头部',
            'put操作：更新或新增节点，维护容量'
        ],
        implementations: [
            {
                language: 'TypeScript',
                code: "class LRUCache {\n  private capacity: number;\n  private cache: Map<number, DLLNode>;\n  private head: DLLNode;\n  private tail: DLLNode;\n\n  constructor(capacity: number) {\n    this.capacity = capacity;\n    this.cache = new Map();\n    this.head = new DLLNode(0, 0);\n    this.tail = new DLLNode(0, 0);\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n\n  get(key: number): number {\n    if (!this.cache.has(key)) return -1;\n\n    const node = this.cache.get(key)!;\n    this.moveToHead(node);\n    return node.value;\n  }\n\n  put(key: number, value: number): void {\n    if (this.cache.has(key)) {\n      const node = this.cache.get(key)!;\n      node.value = value;\n      this.moveToHead(node);\n    } else {\n      const newNode = new DLLNode(key, value);\n      this.cache.set(key, newNode);\n      this.addToHead(newNode);\n\n      if (this.cache.size > this.capacity) {\n        const tail = this.removeTail();\n        this.cache.delete(tail.key);\n      }\n    }\n  }\n\n  private addToHead(node: DLLNode): void {\n    node.prev = this.head;\n    node.next = this.head.next;\n    this.head.next!.prev = node;\n    this.head.next = node;\n  }\n\n  private removeNode(node: DLLNode): void {\n    node.prev!.next = node.next;\n    node.next!.prev = node.prev;\n  }\n\n  private moveToHead(node: DLLNode): void {\n    this.removeNode(node);\n    this.addToHead(node);\n  }\n\n  private removeTail(): DLLNode {\n    const node = this.tail.prev!;\n    this.removeNode(node);\n    return node;\n  }\n}\n\nclass DLLNode {\n  key: number;\n  value: number;\n  prev: DLLNode | null;\n  next: DLLNode | null;\n\n  constructor(key: number, value: number) {\n    this.key = key;\n    this.value = value;\n    this.prev = null;\n    this.next = null;\n  }\n}"
            }
        ],
        complexity: {
            time: 'O(1) - 哈希表和链表操作都是常数时间',
            space: 'O(capacity) - 存储容量大小的节点',
            scenarios: [
                '缓存系统',
                '页面置换',
                '资源管理'
            ]
        },
        example: {
            input: 'capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)',
            output: '1, -1',
            visualization: '缓存: {1:1} → {1:1,2:2} → 访问1 → {2:2,1:1} → 添加3 → {1:1,3:3}'
        }
    }
]);
// 哈希函数数据
var hashFunctions = ref([
    {
        name: '除法哈希法',
        type: '简单哈希',
        description: '使用取模运算将键映射到数组索引，简单高效。',
        code: "function divisionHash(key: number, size: number): number {\n  return key % size;\n}",
        properties: {
            distribution: '良好',
            collision: '中等',
            performance: '优秀'
        }
    },
    {
        name: '乘法哈希法',
        type: '均匀分布',
        description: '利用乘法和小数部分来获得更好的分布特性。',
        code: "function multiplicationHash(key: number, size: number): number {\n  const A = 0.6180339887; // \u9EC4\u91D1\u6BD4\u4F8B\n  return Math.floor(size * ((key * A) % 1));\n}",
        properties: {
            distribution: '优秀',
            collision: '低',
            performance: '良好'
        }
    },
    {
        name: 'DJB2哈希',
        type: '字符串哈希',
        description: '经典的字符串哈希函数，具有良好的分布特性。',
        code: "function djb2Hash(str: string, size: number): number {\n  let hash = 5381;\n  for (let i = 0; i < str.length; i++) {\n    hash = (hash << 5) + hash + str.charCodeAt(i);\n  }\n  return Math.abs(hash) % size;\n}",
        properties: {
            distribution: '优秀',
            collision: '很低',
            performance: '良好'
        }
    }
]);
// 冲突解决方法
var collisionMethods = ref([
    {
        name: '链地址法',
        efficiency: '高效',
        description: '每个哈希桶使用链表存储冲突的元素，简单可靠。',
        visualization: [
            { index: 0, items: ['A'], collision: false },
            { index: 1, items: ['B', 'C'], collision: true },
            { index: 2, items: [], collision: false },
            { index: 3, items: ['D'], collision: false }
        ],
        pros: [
            '实现简单',
            '处理冲突能力强',
            '负载因子可以较高'
        ],
        cons: [
            '需要额外的指针空间',
            '缓存不友好',
            '小对象开销大'
        ]
    },
    {
        name: '线性探测',
        efficiency: '中等',
        description: '发生冲突时，线性查找下一个可用的空槽。',
        visualization: [
            { index: 0, items: ['A'], collision: false },
            { index: 1, items: ['B'], collision: false },
            { index: 2, items: ['C'], collision: true },
            { index: 3, items: [], collision: false }
        ],
        pros: [
            '缓存友好',
            '不需要额外存储',
            '实现简单'
        ],
        cons: [
            '容易产生聚集',
            '删除操作复杂',
            '负载因子要求低'
        ]
    },
    {
        name: '二次探测',
        efficiency: '良好',
        description: '使用二次函数计算下一个探测位置，减少聚集现象。',
        visualization: [
            { index: 0, items: ['A'], collision: false },
            { index: 1, items: ['B'], collision: false },
            { index: 2, items: [], collision: false },
            { index: 3, items: ['C'], collision: true }
        ],
        pros: [
            '减少聚集现象',
            '实现相对简单',
            '性能较好'
        ],
        cons: [
            '可能无法找到空槽',
            '删除操作复杂',
            '计算稍复杂'
        ]
    }
]);
// 应用场景
var applications = ref([
    {
        name: '数据库索引',
        icon: '🗄️',
        description: '哈希表用于快速定位数据库记录，提高查询效率。',
        example: 'MySQL的HASH索引类型'
    },
    {
        name: '缓存系统',
        icon: '⚡',
        description: '使用哈希表实现缓存，提供快速的数据访问。',
        example: 'Redis、Memcached等内存数据库'
    },
    {
        name: '编译器符号表',
        icon: '🔧',
        description: '存储变量名和函数名，用于快速查找和验证。',
        example: 'JavaScript引擎的变量查找'
    },
    {
        name: '密码学',
        icon: '🔐',
        description: '哈希函数用于数据完整性验证和数字签名。',
        example: 'SHA-256、MD5等哈希算法'
    },
    {
        name: '集合操作',
        icon: '📚',
        description: '实现Set数据结构，提供快速的成员检查。',
        example: 'JavaScript的Set对象'
    },
    {
        name: '路由表',
        icon: '🌐',
        description: '网络设备使用哈希表快速路由数据包。',
        example: '路由器MAC地址表'
    }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['header-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-process']} */ ;
/** @type {__VLS_StyleScopedClasses['process-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['method-pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-algorithms" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "stat-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "stat-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "stat-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "intro-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "intro-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-process" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "basics-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "basics-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "basic-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "basic-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "basic-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "time best" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "time best" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "time best" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "time worst" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algorithms-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-tabs" }));
var _loop_1 = function (tab) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgorithm = tab.id;
        } }, { key: (tab.id) }), { class: "algorithm-tab" }), { class: ({ active: __VLS_ctx.activeAlgorithm === tab.id }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "tab-icon" }));
    (tab.icon);
    (tab.title);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithmTabs)); _i < _a.length; _i++) {
    var tab = _a[_i][0];
    _loop_1(tab);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-content" }));
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _b < _c.length; _b++) {
    var algorithm = _c[_b][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (algorithm.id) }, { class: "algorithm-detail" }));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.activeAlgorithm === algorithm.id) }), null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (algorithm.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-meta" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "meta-tag difficulty" }, { class: (algorithm.difficulty) }));
    (algorithm.difficulty);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "meta-tag time" }));
    (algorithm.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "meta-tag space" }));
    (algorithm.space);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-body" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-statement" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (algorithm.problem);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "solution-approach" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (algorithm.approach);
    if (algorithm.steps) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (var _d = 0, _e = __VLS_getVForSourceType((algorithm.steps)); _d < _e.length; _d++) {
            var step = _e[_d][0];
            __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                key: (step),
            });
            (step);
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-implementation" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-tabs" }));
    var _loop_2 = function (lang) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.activeLanguage = lang.language;
            } }, { key: (lang.language) }), { class: "code-tab" }), { class: ({ active: __VLS_ctx.activeLanguage === lang.language }) }));
        (lang.language);
    };
    for (var _f = 0, _g = __VLS_getVForSourceType((algorithm.implementations)); _f < _g.length; _f++) {
        var lang = _g[_f][0];
        _loop_2(lang);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-display" }));
    for (var _h = 0, _j = __VLS_getVForSourceType((algorithm.implementations)); _h < _j.length; _h++) {
        var lang = _j[_h][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
            key: (lang.language),
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.activeLanguage === lang.language) }), null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (lang.code);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-analysis" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "analysis-grid" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "analysis-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (algorithm.complexity.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "analysis-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (algorithm.complexity.space);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "analysis-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _k = 0, _l = __VLS_getVForSourceType((algorithm.complexity.scenarios)); _k < _l.length; _k++) {
        var scenario = _l[_k][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (scenario),
        });
        (scenario);
    }
    if (algorithm.example) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-demo" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-content" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (algorithm.example.input);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (algorithm.example.output);
        if (algorithm.example.visualization) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-visualization" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visualization-content" }));
            (algorithm.example.visualization);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "hash-functions-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-functions-grid" }));
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.hashFunctions)); _m < _o.length; _m++) {
    var func = _o[_m][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (func.name) }, { class: "hash-function-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "func-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (func.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "func-type" }));
    (func.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "func-desc" }));
    (func.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "func-code" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (func.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "func-properties" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (func.properties.distribution);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (func.properties.collision);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (func.properties.performance);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "collision-resolution-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "collision-methods" }));
for (var _p = 0, _q = __VLS_getVForSourceType((__VLS_ctx.collisionMethods)); _p < _q.length; _p++) {
    var method = _q[_p][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (method.name) }, { class: "collision-method" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (method.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "method-efficiency" }, { class: (method.efficiency) }));
    (method.efficiency);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "method-desc" }));
    (method.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-visualization" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-demo" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-table" }));
    for (var _r = 0, _s = __VLS_getVForSourceType((method.visualization)); _r < _s.length; _r++) {
        var slot = _s[_r][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (slot.index) }, { class: "hash-slot" }), { class: ({ collision: slot.collision }) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "slot-index" }));
        (slot.index);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "slot-content" }));
        for (var _t = 0, _u = __VLS_getVForSourceType((slot.items)); _t < _u.length; _t++) {
            var item = _u[_t][0];
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (item) }, { class: "slot-item" }));
            (item);
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-pros-cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _v = 0, _w = __VLS_getVForSourceType((method.pros)); _v < _w.length; _v++) {
        var pro = _w[_v][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (pro),
        });
        (pro);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _x = 0, _y = __VLS_getVForSourceType((method.cons)); _x < _y.length; _x++) {
        var con = _y[_x][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (con),
        });
        (con);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "applications-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications-grid" }));
for (var _z = 0, _0 = __VLS_getVForSourceType((__VLS_ctx.applications)); _z < _0.length; _z++) {
    var app = _0[_z][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (app.name) }, { class: "application-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
    (app.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (app.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (app.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (app.example);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "page-footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-links" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://leetcode.com/tag/hash-table/",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://en.wikipedia.org/wiki/Hash_table",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://visualgo.net/en/hashtable",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://github.com/topics/hash-table",
    target: "_blank",
});
/** @type {__VLS_StyleScopedClasses['hash-algorithms']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['header-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-section']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-process']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-text']} */ ;
/** @type {__VLS_StyleScopedClasses['process-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-text']} */ ;
/** @type {__VLS_StyleScopedClasses['process-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-text']} */ ;
/** @type {__VLS_StyleScopedClasses['process-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-text']} */ ;
/** @type {__VLS_StyleScopedClasses['process-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-text']} */ ;
/** @type {__VLS_StyleScopedClasses['basics-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['basics-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['basic-card']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['basic-card']} */ ;
/** @type {__VLS_StyleScopedClasses['basic-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-table']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['best']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['best']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['best']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['worst']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['difficulty']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['space']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-body']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-statement']} */ ;
/** @type {__VLS_StyleScopedClasses['solution-approach']} */ ;
/** @type {__VLS_StyleScopedClasses['code-implementation']} */ ;
/** @type {__VLS_StyleScopedClasses['code-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['code-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['code-display']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-analysis']} */ ;
/** @type {__VLS_StyleScopedClasses['analysis-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['analysis-card']} */ ;
/** @type {__VLS_StyleScopedClasses['analysis-card']} */ ;
/** @type {__VLS_StyleScopedClasses['analysis-card']} */ ;
/** @type {__VLS_StyleScopedClasses['example-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['example-content']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-functions-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-functions-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-function-card']} */ ;
/** @type {__VLS_StyleScopedClasses['func-header']} */ ;
/** @type {__VLS_StyleScopedClasses['func-type']} */ ;
/** @type {__VLS_StyleScopedClasses['func-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['func-code']} */ ;
/** @type {__VLS_StyleScopedClasses['func-properties']} */ ;
/** @type {__VLS_StyleScopedClasses['property']} */ ;
/** @type {__VLS_StyleScopedClasses['property']} */ ;
/** @type {__VLS_StyleScopedClasses['property']} */ ;
/** @type {__VLS_StyleScopedClasses['collision-resolution-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['collision-methods']} */ ;
/** @type {__VLS_StyleScopedClasses['collision-method']} */ ;
/** @type {__VLS_StyleScopedClasses['method-header']} */ ;
/** @type {__VLS_StyleScopedClasses['method-efficiency']} */ ;
/** @type {__VLS_StyleScopedClasses['method-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['method-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-table']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-slot']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-index']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-content']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-item']} */ ;
/** @type {__VLS_StyleScopedClasses['method-pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-example']} */ ;
/** @type {__VLS_StyleScopedClasses['page-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-info']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            activeAlgorithm: activeAlgorithm,
            activeLanguage: activeLanguage,
            algorithmTabs: algorithmTabs,
            algorithms: algorithms,
            hashFunctions: hashFunctions,
            collisionMethods: collisionMethods,
            applications: applications,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
