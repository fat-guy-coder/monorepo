<template>
  <div class="iterator-container">
    <div class="header">
      <h1>迭代器模式基础介绍</h1>
      <p class="subtitle">遍历集合的艺术 - 解耦集合结构与遍历算法</p>
    </div>

    <div class="pattern-card">
      <div class="card-header">
        <div class="pattern-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            <path
              d="M13 10h-2v2h2v-2zm0 4h-2v2h2v-2zm-4-4H7v2h2v-2zm0 4H7v2h2v-2zm8-6V8h-2v2h-2v2h2v2h2v-2h2v-2h-2zm0 0V8zm0 6h-2v2h2v-2z" />
          </svg>
        </div>
        <div class="pattern-info">
          <h2>迭代器模式 (Iterator Pattern)</h2>
          <div class="pattern-tags">
            <span class="tag">行为型模式</span>
            <span class="tag">遍历集合</span>
            <span class="tag">解耦</span>
          </div>
        </div>
      </div>

      <div class="card-content">
        <div class="section concept">
          <h3>概念定义</h3>
          <p>
            迭代器模式是一种行为设计模式，它提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。
            核心思想是将遍历逻辑从集合对象中分离出来，使得集合可以专注于数据存储，而迭代器专注于遍历算法。
          </p>
          <div class="concept-diagram">
            <div class="iterator-flow">
              <div class="aggregate">
                <div class="aggregate-header">集合对象</div>
                <div class="method">createIterator()</div>
              </div>
              <div class="arrow">→</div>
              <div class="iterator">
                <div class="iterator-header">迭代器</div>
                <div class="methods">
                  <div class="method">next()</div>
                  <div class="method">hasNext()</div>
                  <div class="method">current()</div>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="client">
                <div class="client-header">客户端</div>
                <div class="code">while(hasNext()) {<br>&nbsp;&nbsp;next().doSomething()<br>}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section implementation">
          <h3>实现方式</h3>
          <div class="code-example">
            <div class="code-tabs">
              <button :class="{ active: activeCode === 'structure' }" @click="activeCode = 'structure'">
                结构概览
              </button>
              <button :class="{ active: activeCode === 'custom' }" @click="activeCode = 'custom'">
                自定义集合示例
              </button>
              <button :class="{ active: activeCode === 'typescript' }" @click="activeCode = 'typescript'">
                TypeScript实现
              </button>
            </div>

            <div class="code-block">
              <pre v-if="activeCode === 'structure'"><code>// 迭代器接口
interface Iterator&lt;T> {
  next(): T;
  hasNext(): boolean;
  current(): T;
  reset(): void;
}

// 集合接口
interface Aggregate&lt;T> {
  createIterator(): Iterator&lt;T>;
  add(item: T): void;
  remove(item: T): void;
  size(): number;
  get(index: number): T;
}

// 具体集合
class ConcreteCollection implements Aggregate&lt;string> {
  private items: string[] = [];

  add(item: string): void {
    this.items.push(item);
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  size(): number {
    return this.items.length;
  }

  get(index: number): string {
    return this.items[index];
  }

  createIterator(): Iterator&lt;string> {
    return new ConcreteIterator(this);
  }
}

// 具体迭代器
class ConcreteIterator implements Iterator&lt;string> {
  private collection: ConcreteCollection;
  private position: number = 0;

  constructor(collection: ConcreteCollection) {
    this.collection = collection;
  }

  next(): string {
    const item = this.collection.get(this.position);
    this.position++;
    return item;
  }

  hasNext(): boolean {
    return this.position < this.collection.size();
  }

  current(): string {
    return this.collection.get(this.position);
  }

  reset(): void {
    this.position = 0;
  }
}

// 客户端使用
const collection = new ConcreteCollection();
collection.add("第一项");
collection.add("第二项");
collection.add("第三项");

const iterator = collection.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}</code></pre>

              <pre v-if="activeCode === 'custom'"><code>// 自定义树形结构
class TreeNode {
  constructor(
    public value: any,
    public children: TreeNode[] = []
  ) {}

  addChild(node: TreeNode): void {
    this.children.push(node);
  }
}

// 树形集合
class TreeCollection implements Aggregate&lt;TreeNode> {
  constructor(public root: TreeNode) {}

  createIterator(): Iterator&lt;TreeNode> {
    return new TreeIterator(this);
  }

  // 其他集合方法...
}

// 树形迭代器 (深度优先)
class TreeIterator implements Iterator&lt;TreeNode> {
  private stack: TreeNode[] = [];

  constructor(private tree: TreeCollection) {
    this.stack.push(tree.root);
  }

  next(): TreeNode {
    if (!this.hasNext()) {
      throw new Error("No more elements");
    }

    const node = this.stack.pop()!;
    // 将子节点逆序压入栈中，保持顺序
    for (let i = node.children.length - 1; i >= 0; i--) {
      this.stack.push(node.children[i]);
    }
    return node;
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }

  current(): TreeNode {
    return this.stack[this.stack.length - 1];
  }

  reset(): void {
    this.stack = [this.tree.root];
  }
}

// 使用示例
const root = new TreeNode("根节点");
const child1 = new TreeNode("子节点1");
const child2 = new TreeNode("子节点2");
const grandchild1 = new TreeNode("孙节点1-1");
const grandchild2 = new TreeNode("孙节点2-1");

child1.addChild(grandchild1);
child2.addChild(grandchild2);
root.addChild(child1);
root.addChild(child2);

const tree = new TreeCollection(root);
const treeIterator = tree.createIterator();

console.log("深度优先遍历:");
while (treeIterator.hasNext()) {
  console.log(treeIterator.next().value);
}</code></pre>

              <pre v-if="activeCode === 'typescript'"><code>// 通用迭代器接口
interface IIterator&lt;T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
  reset(): void;
}

// 通用集合接口
interface IIterableCollection&lt;T> {
  createIterator(): IIterator&lt;T>;
}

// 通用数组迭代器
class ArrayIterator&lt;T> implements IIterator&lt;T> {
  private index = 0;

  constructor(private collection: T[]) {}

  next(): T | null {
    return this.hasNext() ? this.collection[this.index++] : null;
  }

  hasNext(): boolean {
    return this.index < this.collection.length;
  }

  current(): T | null {
    return this.collection[this.index] || null;
  }

  reset(): void {
    this.index = 0;
  }
}

// 通用反转迭代器
class ReverseIterator&lt;T> implements IIterator&lt;T> {
  private index: number;

  constructor(private collection: T[]) {
    this.index = collection.length - 1;
  }

  next(): T | null {
    return this.hasNext() ? this.collection[this.index--] : null;
  }

  hasNext(): boolean {
    return this.index >= 0;
  }

  current(): T | null {
    return this.collection[this.index] || null;
  }

  reset(): void {
    this.index = this.collection.length - 1;
  }
}

// 自定义可迭代集合
class CustomCollection&lt;T> implements IIterableCollection&lt;T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  createIterator(): IIterator&lt;T> {
    return new ArrayIterator(this.items);
  }

  createReverseIterator(): IIterator&lt;T> {
    return new ReverseIterator(this.items);
  }
}

// 使用示例
const customCollection = new CustomCollection&lt;number>();
customCollection.add(10);
customCollection.add(20);
customCollection.add(30);

console.log("正序遍历:");
const iterator = customCollection.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}

console.log("\n逆序遍历:");
const reverseIterator = customCollection.createReverseIterator();
while (reverseIterator.hasNext()) {
  console.log(reverseIterator.next());
}</code></pre>
            </div>
          </div>
        </div>

        <div class="section use-cases">
          <h3>使用场景</h3>
          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon" style="background-color: #FF6B6B;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>集合框架</h4>
              <p>为各种数据结构提供统一的遍历接口</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #4ECDC4;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
              </div>
              <h4>树形结构</h4>
              <p>实现深度优先、广度优先等遍历算法</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #118AB2;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>数据库查询</h4>
              <p>遍历查询结果集，隐藏底层数据源细节</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #FFD166;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <h4>文件系统</h4>
              <p>递归遍历目录结构中的文件和文件夹</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #9B5DE5;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
              </div>
              <h4>分页数据</h4>
              <p>实现大型数据集的分页遍历</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #06D6A0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>图形算法</h4>
              <p>遍历图的节点和边，实现不同搜索策略</p>
            </div>
          </div>
        </div>

        <div class="section pros-cons">
          <h3>优缺点分析</h3>
          <div class="comparison">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li><strong>单一职责原则</strong>：分离集合存储和遍历逻辑</li>
                <li><strong>开闭原则</strong>：可添加新迭代器而不修改集合</li>
                <li><strong>并行遍历</strong>：可同时使用多个迭代器遍历同一集合</li>
                <li><strong>延迟遍历</strong>：按需获取元素，节省资源</li>
                <li><strong>统一接口</strong>：为不同集合提供统一遍历方式</li>
                <li><strong>封装性</strong>：隐藏集合内部实现细节</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li><strong>过度设计</strong>：简单集合使用迭代器可能增加复杂度</li>
                <li><strong>性能开销</strong>：相比直接访问，迭代器有额外调用开销</li>
                <li><strong>访问限制</strong>：迭代器通常只提供顺序访问，不支持随机访问</li>
                <li><strong>修改集合</strong>：遍历时修改集合可能导致异常</li>
                <li><strong>实现复杂度</strong>：复杂数据结构需要复杂迭代器实现</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-number">1</div>
              <h4>使用语言内置迭代</h4>
              <p>优先使用JavaScript的Symbol.iterator和生成器</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">2</div>
              <h4>实现可迭代接口</h4>
              <p>自定义集合实现[Symbol.iterator]方法</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">3</div>
              <h4>提供多种迭代器</h4>
              <p>为集合提供不同遍历方式的迭代器</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">4</div>
              <h4>处理并发修改</h4>
              <p>实现机制检测遍历过程中的集合修改</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">5</div>
              <h4>惰性求值</h4>
              <p>在迭代器中实现按需计算，提高性能</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">6</div>
              <h4>组合迭代器</h4>
              <p>实现组合迭代器遍历嵌套集合</p>
            </div>
          </div>
        </div>

        <div class="section javascript-features">
          <h3>JavaScript迭代器特性</h3>
          <div class="features">
            <div class="feature">
              <h4>Symbol.iterator</h4>
              <p>定义对象的默认迭代器方法</p>
              <div class="code-example">
                <pre><code>class Range {
  constructor(public start: number, public end: number) {}

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

// 使用
const range = new Range(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}</code></pre>
              </div>
            </div>

            <div class="feature">
              <h4>生成器函数</h4>
              <p>使用function*创建迭代器生成器</p>
              <div class="code-example">
                <pre><code>function* fibonacci(limit: number) {
  let a = 0, b = 1;
  while (a <= limit) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// 使用
for (const num of fibonacci(100)) {
  console.log(num); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
}</code></pre>
              </div>
            </div>

            <div class="feature">
              <h4>迭代器协议</h4>
              <p>实现next()方法返回{done, value}对象</p>
              <div class="code-example">
                <pre><code>class MatrixIterator {
  constructor(private matrix: number[][]) {
    this.x = 0;
    this.y = 0;
  }

  next() {
    if (this.y === this.matrix.length) {
      return { done: true };
    }

    const value = this.matrix[this.y][this.x];
    this.x++;
    if (this.x === this.matrix[this.y].length) {
      this.x = 0;
      this.y++;
    }

    return { value, done: false };
  }
}

const matrix = [[1, 2], [3, 4]];
const iterator = new MatrixIterator(matrix);
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // 4</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>设计模式 | 行为型模式 | 迭代器模式 </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeCode = ref<'structure' | 'custom' | 'typescript'>('structure');
</script>

<style scoped lang="less">


.iterator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.2rem;
      color: #4b5563;
      margin-top: 0;
      font-weight: 500;
    }
  }

  .pattern-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    .card-header {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;

      .pattern-icon {
        width: 70px;
        height: 70px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;

        svg {
          width: 40px;
          height: 40px;
        }
      }

      .pattern-info {
        flex-grow: 1;

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
        }
      }

      .pattern-tags {
        display: flex;
        gap: 0.8rem;

        .tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }

    .card-content {
      padding: 2rem;

      .section {
        margin-bottom: 2.5rem;

        h3 {
          color: #1971c2;
          border-bottom: 2px solid #4dabf7;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          display: flex;
          align-items: center;

          &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #4dabf7;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        p,
        li {
          line-height: 1.7;
          color: #4b5563;
          font-size: 1.05rem;
        }

        li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: "•";
            color: #4dabf7;
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }
      }

      .concept-diagram {
        display: flex;
        justify-content: center;
        margin: 2rem 0;
        padding: 2rem;
        background: #e7f5ff;
        border-radius: 8px;

        .iterator-flow {
          display: flex;
          align-items: center;
          gap: 1.5rem;

          .aggregate,
          .iterator,
          .client {
            border: 2px solid #4dabf7;
            border-radius: 8px;
            padding: 1.5rem;
            background: white;
            min-width: 200px;
            box-shadow: 0 4px 8px rgba(77, 171, 247, 0.2);

            .aggregate-header,
            .iterator-header,
            .client-header {
              text-align: center;
              font-weight: bold;
              margin-bottom: 1rem;
              color: #1971c2;
            }

            .method,
            .code {
              padding: 0.8rem;
              background: #edf7ff;
              border-radius: 6px;
              margin-bottom: 0.5rem;
              text-align: center;
              font-family: 'Source Code Pro', monospace;
              font-size: 0.9rem;
            }

            .methods {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }
          }

          .arrow {
            color: #4dabf7;
            font-size: 1.5rem;
            font-weight: bold;
          }
        }
      }

      .code-example {
        .code-tabs {
          display: flex;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e5e7eb;

          button {
            padding: 0.8rem 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            color: #6b7280;
            position: relative;
            transition: all 0.3s;

            &:hover {
              color: #4dabf7;
            }

            &.active {
              color: #4dabf7;
              font-weight: 600;

              &::after {
                content: "";
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 3px;
                background: #4dabf7;
                border-radius: 3px 3px 0 0;
              }
            }
          }
        }

        .code-block {
          background: #1e293b;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

          pre {
            margin: 0;
            padding: 1.5rem;
            overflow-x: auto;

            code {
              font-family: 'Source Code Pro', monospace;
              font-size: 0.95rem;
              color: #e2e8f0;
              line-height: 1.6;
            }
          }
        }
      }

      .case-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .case-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            border-color: #4dabf7;
          }

          .case-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;

            svg {
              width: 24px;
              height: 24px;
            }
          }

          h4 {
            margin: 0 0 0.8rem 0;
            font-size: 1.2rem;
            color: #1e293b;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .pros-cons {
        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .pros,
          .cons {
            padding: 1.5rem;
            border-radius: 8px;

            h4 {
              margin-top: 0;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid;
            }
          }

          .pros {
            background: rgba(77, 171, 247, 0.05);
            border: 1px solid rgba(77, 171, 247, 0.2);

            h4 {
              color: #1971c2;
              border-color: #1971c2;
            }
          }

          .cons {
            background: rgba(255, 107, 107, 0.05);
            border: 1px solid rgba(255, 107, 107, 0.2);

            h4 {
              color: #ff6b6b;
              border-color: #ff6b6b;
            }
          }
        }
      }

      .practices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .practice-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;

          .practice-number {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 30px;
            height: 30px;
            background: #d0ebff;
            color: #1971c2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
          }

          h4 {
            margin: 0.5rem 0 0.8rem 0;
            color: #1971c2;
            font-size: 1.15rem;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .javascript-features {
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;

          .feature {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;

            h4 {
              margin: 0 0 0.8rem 0;
              color: #1971c2;
              font-size: 1.2rem;
            }

            p {
              margin: 0 0 1rem 0;
              color: #4b5563;
              line-height: 1.6;
            }

            .code-example {
              background: #1e293b;
              border-radius: 8px;
              overflow: hidden;

              pre {
                margin: 0;
                padding: 1rem;
                overflow-x: auto;

                code {
                  font-family: 'Source Code Pro', monospace;
                  font-size: 0.9rem;
                  color: #e2e8f0;
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    color: #6b7280;
    font-size: 0.9rem;
    padding: 1.5rem;
  }
}
</style>
