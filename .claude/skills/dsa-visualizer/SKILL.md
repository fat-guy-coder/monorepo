---
name: dsa-visualizer
description: 数据结构/算法 Canvas 动画规范。在文档中插入 inline vue-konva 动画，操作按钮必须贴合文档内容，画布展示动态信息（长度/复杂度/指针状态）。
metadata:
  version: "3.0"
  requires: "vue-konva ^3.4.0, konva ^10.3.0"
---

# DSA Canvas 动画 Skill

## 核心原则

1. **按钮贴合文档** — 文档讲什么操作，动画就要有什么按钮（如链表文档讲反转 → 按钮必须有「反转」）
2. **动态信息必展示** — 长度/复杂度/指针状态/容量等随操作实时变化
3. **inline 代码** — 不建共享组件，每个 .vue 文档自己写动画在 `<script setup>` 中
4. **必须有反馈** — 按钮 `active:scale-95`、输入框 `focus:ring`、状态 pill

---

## 通用基础设施

每个动画 section 共享以下代码骨架：

```ts
// ===== 🎬 XXX动画 =====
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H=ref(300), W=ref(700)
const busy=ref(false), status=ref(''), nid=ref(100)
const box=ref<HTMLDivElement>()
const sh=(v:number)=>Math.max(4,v)
const d=(ms:number)=>new Promise(r=>setTimeout(r,ms))

async function act(msg:string, fn:()=>Promise<void>) {
  if(busy.value)return; busy.value=true; status.value=msg
  try{await fn()}catch(_){} finally{await d(250); busy.value=false; status.value=''}
}

// ResizeObserver（必须）
let ro:ResizeObserver|null=null
onMounted(()=>{ init(); if(box.value){ W.value=box.value.clientWidth; layout()
  ro=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>100){W.value=w;layout()}}); ro.observe(box.value) }})
onUnmounted(()=>ro?.disconnect())

// 动态信息标签（必须放在 Canvas 上方）
```

**动态信息栏模板（每个动画都要有）：**

```html
<div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
  <span class="bg-slate-100 px-2 py-1 rounded-full">📏 {{ sizeLabel }}: {{ dynSize }}</span>
  <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
  <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
</div>
```

---

## 模板 A：数组 Bar 图（柱状图）— 数组 / 栈 / 队列

**适用文档**：静态数组、动态数组、双指针、前缀和（部分）、栈、队列

```ts
const BW=54, G=9, MXH=220, BASE=255
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars=reactive<Bar[]>([])
const dynLen=computed(()=>bars.length)

function init(d:number[]=[5,3,8,1,9,4]) { bars.length=0; d.forEach((v,i)=>bars.push({id:i+1,val:v,color:C.cyan,s:1})); layout() }
function layout() {
  const b=Math.min(54,Math.floor((W.value-20)/(bars.length||1)-G))
  const bw=b||BW, total=bars.length*(bw+G)-G, sx=Math.max(10,(W.value-total)/2)
  const maxV=Math.max(...bars.map(x=>x.val),1)
  bars.forEach((b,i)=>{ b._x=sx+i*(bw+G); b._h=Math.max(30,(b.val/maxV)*MXH); b._y=BASE-(b._h||30) })
  // 动态更新 BW 适配宽度
}
function rectCfg(b:any){
  const s=b.s??1, gh=b.color===C.ghost, bw=Math.min(54,Math.floor((W.value-20)/(bars.length||1)-G))
  return {x:b._x+(bw*(1-s))/2, y:b._y, width:bw*s, height:sh(b._h)*s,
    fill:b.color, cornerRadius:[4,4,0,0],
    stroke:gh?'transparent':'#94a3b8', strokeWidth:gh?0:1,
    shadowColor:gh?'transparent':'rgba(0,0,0,.12)', shadowBlur:gh?0:6, shadowOffsetY:gh?0:2,
    opacity:gh?0:1 }
}
function valCfg(b:any){ const s=b.s??1, h=sh(b._h)*s, bw=Math.min(54,Math.floor((W.value-20)/(bars.length||1)-G))
  return {x:b._x+(bw*(1-s))/2, y:b._y+2, width:bw*s, height:h-4, text:h>20?String(b.val):'',
    fontSize:Math.round(Math.min(14,bw*.3)*s), fontFamily:'monospace', fontStyle:'bold',
    fill:h>32?'#fff':C.text, align:'center', verticalAlign:'middle' } }
function idxCfg(i:number){ const bw=Math.min(54,Math.floor((W.value-20)/(bars.length||1)-G))
  return {x:(bars[i]as any)?._x||0, y:BASE+6, width:bw, text:'['+i+']',
    fontSize:Math.min(10,bw*.2), fontFamily:'monospace', fill:C.muted, align:'center' } }

// 必备操作
function doPush() { act('Push  O(1)', async()=>{ const v=~~(Math.random()*90+10)
  const nb:Bar={id:nid.value++,val:v,color:C.green,s:0}; bars.push(nb); layout()
  await d(80); nb.s=1; layout(); await d(450); nb.color=C.cyan })}
function doPop() { if(!bars.length)return; act('Pop  O(1)', async()=>{
  const lb=bars[bars.length-1]; lb.color=C.red; await d(350)
  lb.s=0; layout(); await d(300); bars.pop(); layout() })}
// doInsert(idx,val) / doRemove(idx) / doSearch(val) / doReset() 同上模式
```

**按钮必须**：
- 添加类按钮（Push/Insert/Enqueue）→ cyan 色系
- 删除类按钮（Pop/Remove/Dequeue）→ red 色系
- 查找类 → amber 色系
- Reset → slate 色系

---

## 模板 B：链表节点图（节点 + 箭头）⭐⭐⭐

**适用文档**：单向链表、双向链表、链表反转、快慢指针、链表交点、LRU Cache

这是最复杂也最重要的模板，必须以箭头连接节点展示链表结构。

### 数据模型

```ts
const NODE_W=56, NODE_H=38, NGAP=110, NY=140, BX=20  // BX=基线左偏移
interface LNode { id:number; val:number; color:string; x:number; y:number; s?:number; highlight?:boolean }
const nodes=reactive<LNode[]>([])
const dynLen=computed(()=>nodes.length)
const ptrs=ref<{name:string; idx:number; color:string; yOffset:number}[]>([])  // 指针标注

// 初始化一个链表（带 head 指针标注）
function initL(vals:number[]=[1,2,3,4,5]) {
  nodes.length=0; ptrs.value=[]
  vals.forEach((v,i)=>nodes.push({id:i+1,val:v,color:C.cyan,x:BX+i*NGAP,y:NY,s:1}))
  ptrs.value.push({name:'head', idx:-1, color:C.cyan, yOffset:-35})
}
function layoutL() {
  nodes.forEach((n,i)=>{ n.x=BX+i*NGAP })
}
```

### 渲染：节点 + 箭头 + 指针标注

```html
<v-stage :config="{width:W,height:H}">
  <v-layer>
    <!-- 箭头：从 node[i] 右边缘 → node[i+1] 左边缘 -->
    <v-arrow v-for="(n,i) in nodes.slice(0,-1)" :key="'arr'+n.id"
      :config="{points:[n.x+NODE_W, n.y+NODE_H/2, nodes[i+1].x, nodes[i+1].y+NODE_H/2],
               fill:'#94a3b8', stroke:'#94a3b8', strokeWidth:2, pointerLength:8, pointerWidth:6}" />
    <!-- 节点 rect -->
    <v-rect v-for="n in nodes" :key="n.id" :config="nodeRect(n)" />
    <!-- 节点文字 -->
    <v-text v-for="n in nodes" :key="'vt'+n.id" :config="nodeText(n)" />
    <!-- 指针标注 -->
    <v-text v-for="(p,i) in ptrs" :key="'ptr'+i" :config="ptrLabel(p)" />
    <!-- 空链表 null 标记 -->
    <v-text v-if="!nodes.length" :config="{x:BX,y:NY,text:'null',fontSize:16,fill:C.muted}" />
  </v-layer>
</v-stage>
```

**nodeRect 和 nodeText 函数**：
```ts
function nodeRect(n:any){ const s=n.s??1
  return {x:n.x+(NODE_W*(1-s))/2, y:n.y+(NODE_H*(1-s))/2, width:NODE_W*s, height:NODE_H*s,
    fill:n.color, cornerRadius:6, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.1)', shadowBlur:4, shadowOffsetY:2, opacity:n.highlight===false?0.3:1 } }
function nodeText(n:any){ const s=n.s??1
  return {x:n.x+(NODE_W*(1-s))/2, y:n.y+(NODE_H*(1-s))/2, width:NODE_W*s, height:NODE_H*s,
    text:String(n.val), fontSize:18, fontFamily:'monospace', fontStyle:'bold', fill:C.text,
    align:'center', verticalAlign:'middle' } }
```

### 指针标注渲染

```ts
function ptrLabel(p:{name:string; idx:number; color:string; yOffset:number}) {
  const x = p.idx<0 ? BX-30 : nodes[p.idx]?.x??0
  return { x, y: NY + p.yOffset, text: p.name, fontSize: 11, fontFamily: 'monospace',
    fill: p.color, align: 'center', fontStyle: 'bold' }
}
```

### 🔥 链表反转动画（三指针迭代法）

**这是链表动画的核心——必须逐步展示 prev/curr/next 三个指针的变化。**

```ts
async function doReverse() {
  act('🔁 反转  O(n)  指针: prev·curr·next', async () => {
    if (nodes.length < 2) return
    // 显示初始三个指针标注
    ptrs.value = [
      {name:'prev=null', idx:-1, color:'#94a3b8', yOffset:-55},
      {name:'curr', idx:0, color:C.orange, yOffset:-40},
      {name:'next', idx:1, color:'#60a5fa', yOffset:-25},
    ]
    await d(600)

    let prev: LNode|null = null, curr: LNode|null = nodes[0]
    let step = 0
    while (curr) {
      step++
      const next = curr.id < nodes.length ? nodes[curr.id] : null  // curr.id 是原始索引

      // 更新指针标注位置
      ptrs.value = [
        {name:'prev', idx: prev ? nodes.indexOf(prev) : -1, color: C.red, yOffset:-55},
        {name:'curr', idx: nodes.indexOf(curr), color: C.orange, yOffset:-40},
        {name:'next', idx: next ? nodes.indexOf(next) : nodes.length, color: '#60a5fa', yOffset:-25},
      ]
      status.value = `Step ${step}: curr→prev`
      await d(500)

      // 反转：把 curr 移到数组最前面（视觉上反转链表方向）
      curr.color = C.green
      curr.s = 1.1; layoutL(); await d(300)
      curr.s = 1; curr.color = C.cyan

      prev = curr
      curr = next
    }
    // 反转完成：重新排列节点（倒序）
    nodes.reverse()
    layoutL()
    ptrs.value = [{name:'new head', idx:0, color:C.green, yOffset:-35}]
    await d(600)
    ptrs.value = [{name:'head', idx:-1, color:C.cyan, yOffset:-35}]
  })
}
```

**解释**：这里用 `nodes.reverse()` 直观展示最终结果，但中间过程通过 `ptrs` 标注和节点颜色变化展示三指针法的每一步。用户能看到 prev（红）、curr（橙）、next（蓝）三者如何移动。

### 其他链表操作

```ts
// 插入节点（在索引 i 后插入）
async function doInsertAt(i:number, val:number) {
  act('Insert  O(1) 改指针', async()=>{
    const nb:LNode={id:nid.value++,val,color:C.green,x:0,y:NY,s:0}; nodes.splice(i+1,0,nb); layoutL()
    ptrs.value=[{name:'insert', idx:i+1, color:C.green, yOffset:-35}]
    await d(80); nb.s=1; layoutL(); await d(500); nb.color=C.cyan; ptrs.value=[]
  })
}

// 删除节点
async function doRemoveAt(i:number) {
  act('Remove  O(n) 查找 + O(1) 删', async()=>{
    ptrs.value=[{name:'delete', idx:i, color:C.red, yOffset:-35}]
    nodes[i].color=C.red; await d(400)
    nodes[i].color=C.ghost; nodes[i].s=0; layoutL(); await d(350)
    nodes.splice(i,1); layoutL(); ptrs.value=[]
  })
}

// 快慢指针 - 找中点
async function doFindMiddle() {
  act('快慢指针找中点  O(n)', async()=>{
    ptrs.value=[
      {name:'slow', idx:0, color:C.orange, yOffset:-50},
      {name:'fast', idx:1, color:'#60a5fa', yOffset:-35},
    ]
    let s=0, f=0
    while (f < nodes.length-1) {
      s++; f+=2
      if (f>=nodes.length) f=nodes.length-1
      ptrs.value[0].idx=s; ptrs.value[1].idx=f
      nodes[s].color=C.orange; nodes[s].s=1.08
      if(s>0){nodes[s-1].color=C.cyan;nodes[s-1].s=1}
      layoutL(); await d(400)
    }
    nodes[s].color=C.green; nodes[s].s=1.1
    ptrs.value=[{name:'mid', idx:s, color:C.green, yOffset:-40}]
  })
}
```

---

## 模板 C：栈（垂直推入/弹出）

**适用文档**：单调栈、表达式求值、DFS 栈

```ts
const BW2=60, G2=8, MY=40  // MY=顶部留白
interface StackBar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const stack=reactive<StackBar[]>([])

function layoutStack() {
  const sx=(W.value-BW2)/2  // 居中
  stack.forEach((b,i)=>{
    b._x=sx; b._h=36; b._y=MY + (stack.length-1-i)*44  // 从下往上堆
  })
}
// Push: 新元素从上方落下 (scale 0→1)
// Pop: 顶部元素缩小消失
// 动态信息：📏 栈深度: N
```

---

## 模板 D：队列（水平出入）

**适用文档**：双端队列、单调队列、循环队列

```ts
// 水平排列 bars，Enqueue 从右侧滑入，Dequeue 从左侧滑出
// 动画效果：入队时新 bar 从 scale=0 弹出在右侧
//          出队时最左侧 bar 变红 → ghost → 删除 → 剩余全部左移
// 双端队列：左侧也可插入（slide from left）
// 动态信息：📏 队列长度: N  🚪 front: X  🚪 rear: Y
```

---

## 模板 E：树（节点圆 + 边线）⭐⭐⭐

**适用文档**：二叉树遍历、BST、AVL、红黑树、Treap、Trie、线段树、堆等所有树形结构（模块 4/5）

这是树模块的核心动画模板。节点用 `v-circle`，边用 `v-line` 连父子。

### 数据模型（⚠️ reactive 数组，不要 `.value`）

```ts
const R=24, LEVEL_H=88, TOP=50  // 节点半径 / 层高 / 顶部留白
interface TNode { id:number; val:number|string; x:number; y:number; color:string; s?:number; highlight?:boolean }
const tNodes=reactive<TNode[]>([])                     // ⚠️ reactive：tNodes.push / tNodes.length，不加 .value
const tEdges=reactive<{a:number; b:number}[]>([])      // 边：父 id → 子 id
const tChild=reactive<Record<number,{left:number|null;right:number|null}>>({})
const tCurr=ref<number|null>(null)                     // ref：访问 .value
const tVisited=reactive<number[]>([])                  // ⚠️ reactive：includes 不加 .value
```

**坑（之前出过 runtime bug）**：`reactive<T[]>` 访问元素/长度**不用 `.value`**，只有 `ref<T>` 才用 `.value`。混用会 `Cannot read properties of undefined (reading 'includes')`。

### 固定树布局（遍历/查找用，手工坐标）

```ts
// 层序坐标：根居中，第 k 层第 i 个节点 x 均分
function makeFixedTree(root:number, child:Record<number,{left:number|null;right:number|null}>) {
  tNodes.length=0; tEdges.length=0; Object.keys(tChild).forEach(k=>delete tChild[k])
  // 1) 复制邻接关系
  Object.assign(tChild, child)
  // 2) BFS 层序遍历，分配 x（本层均分）/ y（层高递增）
  let level=[root], y=TOP
  while(level.length) {
    const gap=W.value/(level.length+1)   // 本层节点均分
    level.forEach((id,i)=>{
      tNodes.push({id, val:id, x:gap*(i+1), y, color:C.cyan, s:1})
    })
    // 3) 收集下一层 + 记录边
    const next:number[]=[]
    level.forEach(id=>{
      const {left,right}=child[id]||{}
      if(left!=null){ tEdges.push({a:id,b:left}); next.push(left) }
      if(right!=null){ tEdges.push({a:id,b:right}); next.push(right) }
    })
    level=next; y+=LEVEL_H
  }
}
```

### 渲染：圆 + 边 + 文字

```html
<v-stage :config="{width:W,height:H}">
  <v-layer>
    <!-- 边：父圆下缘 → 子圆上缘 -->
    <v-line v-for="e in tEdges" :key="'e'+e.a+e.b" :config="edgeCfg(e)" />
    <!-- 节点圆 -->
    <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
    <!-- 节点值 -->
    <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
  </v-layer>
</v-stage>
```

```ts
function pos(id:number){ return tNodes.find(n=>n.id===id) ?? {x:0,y:0} }
function edgeCfg(e:{a:number;b:number}) {
  const pa=pos(e.a), pb=pos(e.b)
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 }
}
function circleCfg(n:any){ const s=n.s??1
  return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2, opacity:n.highlight===false?0.3:1 } }
function tTextCfg(n:any){ const s=n.s??1
  return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15,
    fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }
```

### 🔥 遍历动画（前序为例）

```ts
async function doPreorder() {
  act('前序遍历  根→左→右  O(n)', async()=>{
    resetTreeColor()
    const order:number[]=[]
    const stack:number[]=[rootId]
    while(stack.length) {
      const id=stack.pop()!
      const n=pos(id)
      order.push(id)
      // 当前节点变橙
      n.color=C.orange; status.value=`访问 ${id}`; await d(420)
      // 已访问变绿
      n.color=C.green; await d(120)
      // 右先入栈、左后入栈（弹栈时先访问左）
      const {left,right}=tChild[id]||{}
      if(right!=null) stack.push(right)
      if(left!=null) stack.push(left)
    }
    status.value=`前序: ${order.join(' → ')}`
    await d(600)
  })
}
// 中序 / 后序：调整「变色时刻」——中序在左子树返回后、右子树前变色；后序在左右子树返回后变色
// 层序：用 queue（shift）代替 stack
```

**遍历三种顺序的变色时机**（这是讲解重点，务必准确）：
- **前序**：进栈时（第一次遇到）变色
- **中序**：左子树处理完、即将处理右子树时变色
- **后序**：左右子树都处理完时变色
- **层序**：出队时变色

### BST 查找 / 插入

```ts
// 查找：沿根→叶路径高亮（当前橙，已比较变灰）
async function doSearch(key:number) {
  act(`查找 ${key}  O(h)`, async()=>{
    let id:number|null=rootId
    while(id!=null) {
      const n=pos(id)
      n.color=C.orange; status.value=`比较 ${id} vs ${key}`; await d(400)
      if(n.val===key){ n.color=C.green; status.value=`找到 ${key}`; return }
      n.color=C.ghost  // 已比较，非目标
      id = key < n.val ? tChild[id]?.left??null : tChild[id]?.right??null
    }
    status.value=`未找到 ${key}`
  })
}

// 插入：沿路径找位置，新节点绿色弹出
async function doInsert(key:number) {
  act(`插入 ${key}  O(h)`, async()=>{
    // 先找插入位置（高亮路径），再新建节点 scale 0→1
    // 完成后重新布局（makeFixedTree 或局部更新），保持层序
  })
}
```

### AVL / 平衡树旋转（LL/RR/LR/RL）

旋转动画要点：**高亮失衡节点 + 三个相关节点变色 → 边断开 → 节点移动到新位置 → 重连边**。

```ts
async function doRotate(type:'LL'|'RR'|'LR'|'RL') {
  act(`旋转 ${type}  O(1)`, async()=>{
    // 1) 高亮失衡节点（红）+ 旋转轴三节点（橙）
    // 2) 短暂停顿，展示失衡高度差
    // 3) 移动节点坐标（LL：x 右移 y 下移；RR：x 左移 y 下移）——用 tween 或分步 d()
    // 4) 重连边（更新 tChild），重新布局
  })
}
```

**平衡树旋转的视觉核心**：让读者看到「某个节点『转』到了根的位置」。用分步移动 + 颜色渐变即可，不必真的做弧形路径。

### 动态信息标签

树动画信息栏：`📏 节点数: N`、`🌳 高度: H`、`⏱️ O(h)`、`🔍 状态: ...`（遍历顺序 / 比较过程 / 旋转类型）。

---

## 按钮配色速查

| 操作类型 | Tailwind class |
|----------|---------------|
| 添加/插入 | `bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm` |
| 删除/弹出 | `bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm` |
| 搜索/查找 | `bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300` |
| 算法操作（反转/排序） | `bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100` |
| 重置 | `bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100` |

所有按钮必须加：`transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100`

---

## 动态信息展示规范

Canvas 上方必须有一行信息标签，包含：

| 标签 | 示例 | 何时显示 |
|------|------|----------|
| 📏 长度/深度 | `📏 长度: 5` / `📏 栈深度: 3` | 始终 |
| ⏱️ 复杂度 | `⏱️ O(1)` / `⏱️ 均摊 O(1)` | 操作期间 |
| 🔍 状态 | `🔁 反转 Step 2/5` | 操作期间 |
| 🏷️ 指针 | `prev=null curr=① next=②` | 链表操作期间 |
| 📐 容量 | `容量: 6 / 12` | 动态数组 |

---

## 参考实现

- `dsa-2-1-1-static.vue` — 数组 bar 动画（完整模板 A）
- `dsa-2-1-2-dynamic.vue` — 扩容动画（带容量动态信息）
