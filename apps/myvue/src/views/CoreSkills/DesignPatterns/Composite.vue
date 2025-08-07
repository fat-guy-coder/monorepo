<template>
  <div class="composite-container">
    <header class="header">
      <h1>组合模式 (Composite Pattern)</h1>
      <p>构建树形结构的对象层次体系</p>
      <div class="pattern-visual">
        <div class="node root">
          <div class="node-icon">🌳</div>
          <div class="node-label">根组件</div>
        </div>
        <div class="branch">
          <div class="node">
            <div class="node-icon">🌿</div>
            <div class="node-label">叶子组件</div>
          </div>
          <div class="node composite">
            <div class="node-icon">🌲</div>
            <div class="node-label">复合组件</div>
            <div class="children">
              <div class="node">
                <div class="node-icon">🍃</div>
                <div class="node-label">叶子组件</div>
              </div>
              <div class="node">
                <div class="node-icon">🍃</div>
                <div class="node-label">叶子组件</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <nav class="sidebar">
        <ul>
          <li v-for="(section, index) in sections" :key="index" :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)">
            <div class="section-icon">{{ section.icon }}</div>
            <span>{{ section.title }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 概念部分 -->
        <section id="concept" class="section-card">
          <h2>组合模式概念</h2>
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">🎯</div>
              <h3>核心思想</h3>
              <p>将对象组合成树形结构以表示"部分-整体"的层次结构，使得用户对单个对象和组合对象的使用具有一致性</p>
            </div>

            <div class="concept-card">
              <div class="concept-icon">🧩</div>
              <h3>关键组件</h3>
              <ul>
                <li><strong>组件接口</strong>：定义所有对象的通用行为</li>
                <li><strong>叶子节点</strong>：没有子组件的简单对象</li>
                <li><strong>复合节点</strong>：包含子组件的容器对象</li>
              </ul>
            </div>

            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>工作方式</h3>
              <p>客户端通过统一的组件接口与树中的所有对象交互，无需区分处理叶子节点和复合节点</p>
            </div>
          </div>

          <div class="pattern-principle">
            <h3>设计原则</h3>
            <p>组合模式遵循<strong>开放-封闭原则</strong>和<strong>单一职责原则</strong>：</p>
            <div class="principle-list">
              <div class="principle">
                <div class="number">1</div>
                <p>通过统一接口操作简单和复杂元素</p>
              </div>
              <div class="principle">
                <div class="number">2</div>
                <p>新增组件类型不影响现有代码</p>
              </div>
              <div class="principle">
                <div class="number">3</div>
                <p>简化客户端代码，减少条件判断</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 结构部分 -->
        <section id="structure" class="section-card">
          <h2>模式结构</h2>
          <div class="structure-visual">
            <div class="uml-class">
              <div class="class-header">Component</div>
              <div class="class-body">
                <div>+ operation()</div>
                <div>+ add(Component)</div>
                <div>+ remove(Component)</div>
                <div>+ getChild(int)</div>
              </div>
            </div>

            <div class="inheritance-arrow">↑</div>

            <div class="class-group">
              <div class="uml-class leaf">
                <div class="class-header">Leaf</div>
                <div class="class-body">
                  <div>+ operation()</div>
                </div>
              </div>

              <div class="uml-class composite">
                <div class="class-header">Composite</div>
                <div class="class-body">
                  <div>- children: Component[]</div>
                  <div>+ operation()</div>
                  <div>+ add(Component)</div>
                  <div>+ remove(Component)</div>
                  <div>+ getChild(int)</div>
                </div>
              </div>
            </div>
          </div>

          <div class="structure-explanation">
            <div class="explanation-item">
              <h3>Component (组件接口)</h3>
              <p>定义所有组件的通用接口，声明操作及其子组件的方法</p>
            </div>
            <div class="explanation-item">
              <h3>Leaf (叶子节点)</h3>
              <p>实现组件接口，表示树中的叶子节点（没有子组件）</p>
            </div>
            <div class="explanation-item">
              <h3>Composite (复合组件)</h3>
              <p>实现组件接口，包含子组件集合，将操作委托给子组件</p>
            </div>
          </div>
        </section>

        <!-- 示例部分 -->
        <section id="example" class="section-card">
          <h2>示例代码</h2>
          <p>文件系统模拟：使用组合模式实现文件和文件夹的统一操作</p>

          <div class="code-tabs">
            <div class="tabs-header">
              <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === tab.id }"
                @click="activeTab = tab.id">
                {{ tab.title }}
              </button>
            </div>

            <div class="tabs-content">
              <!-- Component 接口 -->
              <div v-if="activeTab === 'component'" class="code-block">
                <pre><code class="typescript">// 组件接口：定义文件系统项的统一操作
interface FileSystemComponent {
  // 获取名称
  getName(): string;

  // 获取大小（文件返回实际大小，文件夹返回所有子项大小之和）
  getSize(): number;

  // 显示项目信息（递归显示所有内容）
  display(indentation?: string): void;

  // 添加子项（仅文件夹有效）
  add(component: FileSystemComponent): void;

  // 移除子项（仅文件夹有效）
  remove(component: FileSystemComponent): void;
}</code></pre>
              </div>

              <!-- Leaf 实现 -->
              <div v-if="activeTab === 'leaf'" class="code-block">
                <pre><code class="typescript">// 文件类（叶子节点）
class File implements FileSystemComponent {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  display(indentation: string = ''): void {
    console.log(`${indentation}📄 ${this.name} (${this.size} bytes)`);
  }

  // 叶子节点不支持添加/移除操作
  add(component: FileSystemComponent): void {
    throw new Error('Cannot add to a file');
  }

  remove(component: FileSystemComponent): void {
    throw new Error('Cannot remove from a file');
  }
}</code></pre>
              </div>

              <!-- Composite 实现 -->
              <div v-if="activeTab === 'composite'" class="code-block">
                <pre><code class="typescript">// 文件夹类（复合组件）
class Folder implements FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    // 计算所有子项大小之和
    return this.children.reduce(
      (total, child) => total + child.getSize(), 0
    );
  }

  display(indentation: string = ''): void {
    console.log(`${indentation}📁 ${this.name}/`);

    // 递归显示所有子项
    this.children.forEach(child => {
      child.display(indentation + '  ');
    });
  }

  add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  remove(component: FileSystemComponent): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
}</code></pre>
              </div>

              <!-- 使用示例 -->
              <div v-if="activeTab === 'usage'" class="code-block">
                <pre><code class="typescript">// 使用组合模式创建文件系统结构
const root = new Folder('Root');

const documents = new Folder('Documents');
documents.add(new File('report.pdf', 1500));
documents.add(new File('budget.xlsx', 800));

const images = new Folder('Images');
images.add(new File('photo1.jpg', 3200));
images.add(new File('photo2.jpg', 2800));

const project = new Folder('Project');
project.add(new File('main.ts', 1200));
project.add(new File('config.json', 600));

// 构建文件系统层次结构
root.add(documents);
root.add(images);
root.add(project);

// 添加嵌套文件夹
const secret = new Folder('Secret');
secret.add(new File('passwords.txt', 400));
project.add(secret);

// 统一操作整个结构
console.log(`Total size: ${root.getSize()} bytes`);
root.display();

// 输出:
// 📁 Root/
//   📁 Documents/
//     📄 report.pdf (1500 bytes)
//     📄 budget.xlsx (800 bytes)
//   📁 Images/
//     📄 photo1.jpg (3200 bytes)
//     📄 photo2.jpg (2800 bytes)
//   📁 Project/
//     📄 main.ts (1200 bytes)
//     📄 config.json (600 bytes)
//     📁 Secret/
//       📄 passwords.txt (400 bytes)</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 场景部分 -->
        <section id="scenarios" class="section-card">
          <h2>使用场景</h2>
          <div class="scenarios-grid">
            <div class="scenario-card">
              <div class="scenario-icon">📂</div>
              <h3>文件系统</h3>
              <p>表示文件和文件夹的层次结构，统一处理文件和文件夹操作</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🌐</div>
              <h3>UI组件库</h3>
              <p>构建复杂UI界面，容器组件可以包含叶子组件或其他容器组件</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🎮</div>
              <h3>游戏开发</h3>
              <p>管理游戏对象层次结构，如场景图、实体组件系统等</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h3>组织结构</h3>
              <p>表示公司部门与员工的层次关系，统一计算部门成本等</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🛒</div>
              <h3>电子商务</h3>
              <p>实现商品分类系统，处理嵌套类别的统一操作</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🤖</div>
              <h3>AI行为树</h3>
              <p>构建复杂AI行为，组合节点控制行为执行流程</p>
            </div>
          </div>
        </section>

        <!-- 优缺点部分 -->
        <section id="pros-cons" class="section-card">
          <h2>优缺点分析</h2>
          <div class="pros-cons-grid">
            <div class="pros">
              <h3>✅ 优点</h3>
              <ul>
                <li>
                  <strong>统一处理简单和复杂元素</strong>
                  <p>客户端代码可以一致地处理单个对象和组合对象</p>
                </li>
                <li>
                  <strong>开闭原则</strong>
                  <p>新增组件类型无需修改现有代码，扩展性好</p>
                </li>
                <li>
                  <strong>简化客户端代码</strong>
                  <p>减少条件判断，客户端无需关心对象类型</p>
                </li>
                <li>
                  <strong>易于添加新组件</strong>
                  <p>新的叶子节点和复合节点可以轻松集成到现有结构中</p>
                </li>
              </ul>
            </div>

            <div class="cons">
              <h3>❌ 缺点</h3>
              <ul>
                <li>
                  <strong>过度一般化</strong>
                  <p>组件接口需要支持所有操作，可能导致叶子节点实现不必要的方法</p>
                </li>
                <li>
                  <strong>类型检查困难</strong>
                  <p>在需要特定类型操作时，可能需要运行时类型检查</p>
                </li>
                <li>
                  <strong>设计复杂性</strong>
                  <p>递归结构可能导致设计复杂，特别是处理循环引用时</p>
                </li>
                <li>
                  <strong>性能考虑</strong>
                  <p>遍历大型树结构可能影响性能，需要合理设计缓存机制</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 当前激活的部分
const activeSection = ref('concept');
const activeTab = ref('component');

// 导航部分
const sections = ref([
  { id: 'concept', title: '模式概念', icon: '🧠' },
  { id: 'structure', title: '模式结构', icon: '🏗️' },
  { id: 'example', title: '代码示例', icon: '💻' },
  { id: 'scenarios', title: '使用场景', icon: '📍' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' }
]);

// 标签页
const tabs = ref([
  { id: 'component', title: 'Component接口' },
  { id: 'leaf', title: 'Leaf实现' },
  { id: 'composite', title: 'Composite实现' },
  { id: 'usage', title: '使用示例' }
]);

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

// 监听滚动事件
onMounted(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection.value = section.id;
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // 初始触发一次
  handleScroll();
});
</script>

<style lang="less" scoped>


:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3f37c9;
  --accent: #4cc9f0;
  --success: #2ecc71;
  --warning: #f39c12;
  --dark: #2b2d42;
  --light: #f8f9fa;
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --border-radius: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.composite-container {
  font-family: 'Inter', sans-serif;
  color: var(--dark);
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f4 100%);
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  color: white;
  padding: 3rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 30%);
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 2rem;
  }
}

.pattern-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  position: relative;
}

.node {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  min-width: 180px;
  position: relative;
  z-index: 1;
  margin: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.25);
  }

  .node-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .node-label {
    font-weight: 500;
    font-size: 0.95rem;
  }
}

.root {
  background: rgba(255, 255, 255, 0.25);
  padding: 1.5rem;
  margin-bottom: 2rem;

  .node-icon {
    font-size: 3rem;
  }
}

.composite {
  background: rgba(52, 152, 219, 0.3);
}

.branch {
  display: flex;
  justify-content: center;
}

.children {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding-top: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 1rem;
    background: rgba(255, 255, 255, 0.5);
  }
}

.content-wrapper {
  display: flex;
  max-width: 1400px;
  margin: -3rem auto 3rem;
  padding: 0 2rem;
  gap: 2rem;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.8rem 1rem;
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.sidebar ul {
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 0.9rem 1.2rem;
    border-radius: 10px;
    margin-bottom: 0.6rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      background: rgba(67, 97, 238, 0.08);
      color: var(--primary);
    }

    &.active {
      background: var(--primary);
      color: white;
      box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
    }

    .section-icon {
      margin-right: 1rem;
      font-size: 1.2rem;
      width: 30px;
      text-align: center;
    }
  }
}

.main-content {
  flex-grow: 1;
}

.section-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2.5rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    color: var(--secondary);
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.8rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
    }
  }

  p {
    margin-bottom: 1.5rem;
    color: #555;
    font-size: 1.05rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.concept-card {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.8rem;
  border: 1px solid #eef0ff;

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: var(--primary);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  ul {
    list-style: none;

    li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        top: 0.5rem;
        color: var(--primary);
      }
    }
  }
}

.pattern-principle {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed #eee;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    color: var(--dark);
  }
}

.principle-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.principle {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .number {
    width: 36px;
    height: 36px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  p {
    margin-bottom: 0;
  }
}

.structure-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
}

.uml-class {
  background: white;
  border: 2px solid #4361ee;
  border-radius: 8px;
  overflow: hidden;
  min-width: 280px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .class-header {
    background: #4361ee;
    color: white;
    padding: 0.8rem 1.2rem;
    font-weight: 600;
    text-align: center;
  }

  .class-body {
    padding: 1.2rem;

    div {
      padding: 0.5rem 0;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
    }
  }
}

.leaf {
  border-color: #2ecc71;

  .class-header {
    background: #2ecc71;
  }
}

.composite {
  border-color: #f39c12;

  .class-header {
    background: #f39c12;
  }
}

.inheritance-arrow {
  font-size: 2rem;
  margin: 1rem 0;
  color: var(--primary);
}

.class-group {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.structure-explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.explanation-item {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid var(--primary);

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: var(--dark);
  }
}

.code-tabs {
  background: #f8fafc;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 1.5rem;
  border: 1px solid #e2e8f0;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  background: #f1f5f9;
  overflow-x: auto;

  button {
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #64748b;
    white-space: nowrap;

    &:hover {
      background: rgba(67, 97, 238, 0.05);
      color: var(--primary);
    }

    &.active {
      background: white;
      color: var(--primary);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--primary);
      }
    }
  }
}

.tabs-content {
  padding: 2rem;
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    margin: 0;
  }

  code {
    display: block;
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  border: 1px solid #edf2f7;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(67, 97, 238, 0.1);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.8rem;
    color: var(--dark);
  }

  p {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 0;
  }
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  padding: 1.5rem;
  border-radius: 12px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      border-radius: 2px;
    }
  }
}

.pros {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #bbf7d0;

  h3::after {
    background: #22c55e;
  }
}

.cons {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;

  h3::after {
    background: #ef4444;
  }
}

ul {
  list-style: none;

  li {
    padding: 1rem 0;
    border-bottom: 1px dashed #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    strong {
      display: block;
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 0;
      font-size: 0.95rem;
      color: #555;
    }
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .branch {
    flex-direction: column;
    align-items: center;
  }

  .class-group {
    flex-direction: column;
  }
}
</style>
