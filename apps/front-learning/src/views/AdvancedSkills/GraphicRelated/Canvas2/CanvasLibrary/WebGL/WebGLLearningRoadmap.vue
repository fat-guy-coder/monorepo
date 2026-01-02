<template>
  <div class="webgl-roadmap">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">WebGL 学习路线</h1>
        <p class="subtitle">从零开始掌握WebGL和3D图形编程</p>
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressWidth }"></div>
          </div>
          <span class="progress-text">{{ currentProgress }}% 完成</span>
        </div>
      </div>
    </header>

    <!-- 学习路线内容 -->
    <main class="roadmap-content">
      <!-- 前置知识阶段 -->
      <section class="learning-phase" ref="phase1">
        <div class="phase-header" @click="togglePhase(0)">
          <div class="phase-icon">🎯</div>
          <div class="phase-info">
            <h2 class="phase-title">阶段一：前置知识</h2>
            <p class="phase-description">掌握必要的基础概念和工具</p>
          </div>
          <div class="phase-status">
            <span class="phase-badge">基础</span>
            <span class="toggle-icon">{{ phases[0].expanded ? '−' : '+' }}</span>
          </div>
        </div>

        <div class="phase-content" v-show="phases[0].expanded">
          <div class="concept-grid">
            <div class="concept-card" v-for="concept in prerequisites" :key="concept.id">
              <div class="concept-header">
                <h3 class="concept-title">{{ concept.title }}</h3>
                <div class="concept-level" :class="concept.level">{{ concept.level }}</div>
              </div>
              <p class="concept-description">{{ concept.description }}</p>
              <div class="concept-resources">
                <h4>学习资源:</h4>
                <ul>
                  <li v-for="resource in concept.resources" :key="resource.name">
                    <a :href="resource.url" target="_blank">{{ resource.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="concept-checkbox">
                <label>
                  <input type="checkbox" v-model="concept.completed" @change="updateProgress">
                  <span class="checkmark"></span>
                  已完成学习
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- WebGL基础阶段 -->
      <section class="learning-phase" ref="phase2">
        <div class="phase-header" @click="togglePhase(1)">
          <div class="phase-icon">🔰</div>
          <div class="phase-info">
            <h2 class="phase-title">阶段二：WebGL基础</h2>
            <p class="phase-description">理解WebGL核心概念和渲染管线</p>
          </div>
          <div class="phase-status">
            <span class="phase-badge">核心</span>
            <span class="toggle-icon">{{ phases[1].expanded ? '−' : '+' }}</span>
          </div>
        </div>

        <div class="phase-content" v-show="phases[1].expanded">
          <div class="concept-grid">
            <div class="concept-card" v-for="concept in webglBasics" :key="concept.id">
              <div class="concept-header">
                <h3 class="concept-title">{{ concept.title }}</h3>
                <div class="concept-level" :class="concept.level">{{ concept.level }}</div>
              </div>
              <p class="concept-description">{{ concept.description }}</p>
              <div class="code-example" v-if="concept.code">
                <div class="code-header">示例代码</div>
                <pre><code>{{ concept.code }}</code></pre>
              </div>
              <div class="concept-resources">
                <h4>学习资源:</h4>
                <ul>
                  <li v-for="resource in concept.resources" :key="resource.name">
                    <a :href="resource.url" target="_blank">{{ resource.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="concept-checkbox">
                <label>
                  <input type="checkbox" v-model="concept.completed" @change="updateProgress">
                  <span class="checkmark"></span>
                  已完成学习
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3D图形概念阶段 -->
      <section class="learning-phase" ref="phase3">
        <div class="phase-header" @click="togglePhase(2)">
          <div class="phase-icon">🎨</div>
          <div class="phase-info">
            <h2 class="phase-title">阶段三：3D图形概念</h2>
            <p class="phase-description">掌握3D图形编程的核心数学和概念</p>
          </div>
          <div class="phase-status">
            <span class="phase-badge">进阶</span>
            <span class="toggle-icon">{{ phases[2].expanded ? '−' : '+' }}</span>
          </div>
        </div>

        <div class="phase-content" v-show="phases[2].expanded">
          <div class="concept-grid">
            <div class="concept-card" v-for="concept in graphicsConcepts" :key="concept.id">
              <div class="concept-header">
                <h3 class="concept-title">{{ concept.title }}</h3>
                <div class="concept-level" :class="concept.level">{{ concept.level }}</div>
              </div>
              <p class="concept-description">{{ concept.description }}</p>
              <div class="concept-visual" v-if="concept.visual">
                <div class="visual-placeholder">
                  {{ concept.visual }}
                </div>
              </div>
              <div class="concept-resources">
                <h4>学习资源:</h4>
                <ul>
                  <li v-for="resource in concept.resources" :key="resource.name">
                    <a :href="resource.url" target="_blank">{{ resource.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="concept-checkbox">
                <label>
                  <input type="checkbox" v-model="concept.completed" @change="updateProgress">
                  <span class="checkmark"></span>
                  已完成学习
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级主题阶段 -->
      <section class="learning-phase" ref="phase4">
        <div class="phase-header" @click="togglePhase(3)">
          <div class="phase-icon">🚀</div>
          <div class="phase-info">
            <h2 class="phase-title">阶段四：高级主题</h2>
            <p class="phase-description">探索WebGL的高级特性和优化技巧</p>
          </div>
          <div class="phase-status">
            <span class="phase-badge">专家</span>
            <span class="toggle-icon">{{ phases[3].expanded ? '−' : '+' }}</span>
          </div>
        </div>

        <div class="phase-content" v-show="phases[3].expanded">
          <div class="concept-grid">
            <div class="concept-card" v-for="concept in advancedTopics" :key="concept.id">
              <div class="concept-header">
                <h3 class="concept-title">{{ concept.title }}</h3>
                <div class="concept-level" :class="concept.level">{{ concept.level }}</div>
              </div>
              <p class="concept-description">{{ concept.description }}</p>
              <div class="concept-tips" v-if="concept.tips">
                <h4>实用技巧:</h4>
                <ul>
                  <li v-for="tip in concept.tips" :key="tip">{{ tip }}</li>
                </ul>
              </div>
              <div class="concept-resources">
                <h4>学习资源:</h4>
                <ul>
                  <li v-for="resource in concept.resources" :key="resource.name">
                    <a :href="resource.url" target="_blank">{{ resource.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="concept-checkbox">
                <label>
                  <input type="checkbox" v-model="concept.completed" @change="updateProgress">
                  <span class="checkmark"></span>
                  已完成学习
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习建议 -->
      <section class="tips-section">
        <h2 class="tips-title">学习建议与最佳实践</h2>
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-icon">📚</div>
            <h3>理论与实践结合</h3>
            <p>学习每个概念后立即动手实践，通过编写代码来加深理解。</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">🔍</div>
            <h3>阅读优秀源码</h3>
            <p>研究Three.js等库的源代码，理解其实现原理和设计模式。</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">🎯</div>
            <h3>循序渐进</h3>
            <p>按照学习路线逐步深入，不要跳过基础概念直接学习高级主题。</p>
          </div>
          <div class="tip-card">
            <div class="tip-icon">🛠️</div>
            <h3>工具辅助</h3>
            <p>使用WebGL调试工具和性能分析工具来优化你的应用。</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 页面底部 -->
    <footer class="page-footer">
      <div class="footer-content">
        <p class="footer-text">
          WebGL学习是一个循序渐进的过程，保持耐心和持续的实践是成功的关键。
          <br>每个阶段都建立在前一阶段的基础上，确保完全理解每个概念后再继续前进。
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 阶段展开状态
const phases = ref([
  { expanded: true },
  { expanded: false },
  { expanded: false },
  { expanded: false }
])

// 切换阶段展开状态
const togglePhase = (index: number) => {
  phases.value[index].expanded = !phases.value[index].expanded
}

// 前置知识
const prerequisites = ref([
  {
    id: 1,
    title: 'HTML5与Canvas',
    description: '理解HTML5 Canvas API是学习WebGL的基础，Canvas提供了2D绘图上下文，而WebGL提供了3D绘图上下文。',
    level: 'beginner',
    resources: [
      { name: 'MDN Canvas文档', url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API' },
      { name: 'Canvas教程', url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial' }
    ],
    completed: false
  },
  {
    id: 2,
    title: 'JavaScript基础',
    description: '熟练掌握ES6+语法，包括模块化、Promise、async/await等，这些在WebGL编程中会频繁使用。',
    level: 'beginner',
    resources: [
      { name: '现代JavaScript教程', url: 'https://zh.javascript.info/' },
      { name: 'MDN JavaScript指南', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide' }
    ],
    completed: false
  },
  {
    id: 3,
    title: '线性代数基础',
    description: '向量、矩阵、变换等线性代数概念是3D图形编程的数学基础，需要重点掌握。',
    level: 'intermediate',
    resources: [
      { name: '可汗学院线性代数', url: 'https://www.khanacademy.org/math/linear-algebra' },
      { name: '3D数学基础', url: 'https://learnopengl.com/Getting-started/Transformations' }
    ],
    completed: false
  },
  {
    id: 4,
    title: '开发工具',
    description: '熟悉浏览器开发者工具，特别是性能分析、内存管理和WebGL调试功能。',
    level: 'beginner',
    resources: [
      { name: 'Chrome DevTools', url: 'https://developers.google.com/web/tools/chrome-devtools' },
      { name: 'WebGL Inspector', url: 'https://benvanik.github.io/WebGL-Inspector/' }
    ],
    completed: false
  }
])

// WebGL基础概念
const webglBasics = ref([
  {
    id: 5,
    title: 'WebGL渲染管线',
    description: '理解WebGL的渲染流程，从顶点数据到最终像素的完整过程，包括顶点着色器和片元着色器的作用。',
    level: 'core',
    code: `// 初始化WebGL上下文
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// 创建着色器程序
const program = gl.createProgram();
// ... 编译和链接着色器`,
    resources: [
      { name: 'WebGL基础教程', url: 'https://webglfundamentals.org/' },
      { name: 'MDN WebGL指南', url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API' }
    ],
    completed: false
  },
  {
    id: 6,
    title: '着色器编程',
    description: '学习GLSL(OpenGL着色语言)，编写顶点着色器和片元着色器，控制3D物体的外观和渲染效果。',
    level: 'core',
    code: `// 顶点着色器
attribute vec4 a_position;
void main() {
  gl_Position = a_position;
}

// 片元着色器
precision mediump float;
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`,
    resources: [
      { name: 'GLSL参考', url: 'https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)' },
      { name: '着色器教程', url: 'https://thebookofshaders.com/' }
    ],
    completed: false
  },
  {
    id: 7,
    title: '缓冲区对象',
    description: '使用缓冲区对象(VBO)高效地向GPU传递顶点数据，包括位置、颜色、法线等属性。',
    level: 'core',
    code: `// 创建缓冲区
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);`,
    resources: [
      { name: '缓冲区对象详解', url: 'https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-how-it-works.html' }
    ],
    completed: false
  },
  {
    id: 8,
    title: '绘制第一个三角形',
    description: '结合所有基础知识，创建第一个WebGL程序，绘制一个简单的彩色三角形。',
    level: 'core',
    code: `// 设置视口
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// 清除画布
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 绘制三角形
gl.drawArrays(gl.TRIANGLES, 0, 3);`,
    resources: [
      { name: '第一个三角形教程', url: 'https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-fundamentals.html' }
    ],
    completed: false
  }
])

// 3D图形概念
const graphicsConcepts = ref([
  {
    id: 9,
    title: '变换矩阵',
    description: '学习模型矩阵、视图矩阵和投影矩阵，理解它们如何共同作用将3D坐标转换为2D屏幕坐标。',
    level: 'advanced',
    visual: '模型 → 视图 → 投影 → 屏幕坐标',
    resources: [
      { name: '变换矩阵详解', url: 'https://learnopengl.com/Getting-started/Transformations' },
      { name: '矩阵数学', url: 'https://www.songho.ca/opengl/gl_transform.html' }
    ],
    completed: false
  },
  {
    id: 10,
    title: '纹理映射',
    description: '将2D图像映射到3D物体表面，学习纹理坐标、纹理过滤和纹理包装等概念。',
    level: 'advanced',
    visual: 'UV坐标 → 纹理采样 → 表面着色',
    resources: [
      { name: '纹理教程', url: 'https://learnopengl.com/Getting-started/Textures' },
      { name: 'WebGL纹理', url: 'https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-textures.html' }
    ],
    completed: false
  },
  {
    id: 11,
    title: '光照模型',
    description: '实现Phong光照模型，包含环境光、漫反射和高光反射，创建逼真的光照效果。',
    level: 'advanced',
    visual: '环境光 + 漫反射 + 镜面光 = 最终颜色',
    resources: [
      { name: '光照基础', url: 'https://learnopengl.com/Lighting/Basic-Lighting' },
      { name: 'Phong模型', url: 'https://en.wikipedia.org/wiki/Phong_reflection_model' }
    ],
    completed: false
  },
  {
    id: 12,
    title: '相机系统',
    description: '创建可交互的相机系统，实现第一人称、第三人称和轨道相机等不同类型的相机控制。',
    level: 'advanced',
    visual: '相机位置 + 观察方向 + 上向量 = 视图矩阵',
    resources: [
      { name: '相机系统教程', url: 'https://learnopengl.com/Getting-started/Camera' },
      { name: 'WebGL相机', url: 'https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-camera.html' }
    ],
    completed: false
  }
])

// 高级主题
const advancedTopics = ref([
  {
    id: 13,
    title: '帧缓冲区与后期处理',
    description: '使用帧缓冲区实现离屏渲染，创建模糊、Bloom、色彩校正等后期处理效果。',
    level: 'expert',
    tips: [
      '使用多个帧缓冲区实现复杂效果',
      '注意帧缓冲区的内存管理',
      '合理使用浮点纹理提高精度'
    ],
    resources: [
      { name: '帧缓冲区教程', url: 'https://learnopengl.com/Advanced-OpenGL/Framebuffers' },
      { name: '后期处理效果', url: 'https://webgl2fundamentals.org/webgl/lessons/webgl-post-processing.html' }
    ],
    completed: false
  },
  {
    id: 14,
    title: '阴影映射',
    description: '实现阴影映射技术，为3D场景添加逼真的动态阴影效果。',
    level: 'expert',
    tips: [
      '使用深度纹理存储深度信息',
      '解决阴影锯齿问题',
      '优化阴影映射性能'
    ],
    resources: [
      { name: '阴影映射教程', url: 'https://learnopengl.com/Advanced-Lighting/Shadows/Shadow-Mapping' },
      { name: 'WebGL阴影', url: 'https://webgl2fundamentals.org/webgl/lessons/webgl-shadows.html' }
    ],
    completed: false
  },
  {
    id: 15,
    title: '性能优化',
    description: '学习WebGL性能优化技巧，包括批处理、实例化渲染、LOD等技术。',
    level: 'expert',
    tips: [
      '减少WebGL状态切换',
      '使用顶点数组对象',
      '实现视锥体剔除'
    ],
    resources: [
      { name: 'WebGL性能优化', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices' },
      { name: '优化技巧', url: 'https://webglfundamentals.org/webgl/lessons/webgl-optimization.html' }
    ],
    completed: false
  },
  {
    id: 16,
    title: 'Three.js与引擎',
    description: '学习使用Three.js等高级库，理解其架构设计并能够进行定制开发。',
    level: 'expert',
    tips: [
      '理解Three.js的渲染循环',
      '学习自定义着色器材质',
      '掌握场景图管理'
    ],
    resources: [
      { name: 'Three.js文档', url: 'https://threejs.org/docs/' },
      { name: 'Three.js示例', url: 'https://threejs.org/examples/' }
    ],
    completed: false
  }
])

// 计算学习进度
const currentProgress = computed(() => {
  const allConcepts = [
    ...prerequisites.value,
    ...webglBasics.value,
    ...graphicsConcepts.value,
    ...advancedTopics.value
  ]
  const completedCount = allConcepts.filter(concept => concept.completed).length
  return Math.round((completedCount / allConcepts.length) * 100)
})

const progressWidth = computed(() => `${currentProgress.value}%`)

// 更新进度
const updateProgress = () => {
  // 进度自动保存到localStorage
  const progress = {
    prerequisites: prerequisites.value.map(c => c.completed),
    webglBasics: webglBasics.value.map(c => c.completed),
    graphicsConcepts: graphicsConcepts.value.map(c => c.completed),
    advancedTopics: advancedTopics.value.map(c => c.completed)
  }
  localStorage.setItem('webgl-roadmap-progress', JSON.stringify(progress))
}


// 加载保存的进度
onMounted(() => {
  const savedProgress = localStorage.getItem('webgl-roadmap-progress')
  if (savedProgress) {
    try {
      const progress = JSON.parse(savedProgress)

      prerequisites.value.forEach((concept, index) => {
        concept.completed = progress.prerequisites[index] || false
      })

      webglBasics.value.forEach((concept, index) => {
        concept.completed = progress.webglBasics[index] || false
      })

      graphicsConcepts.value.forEach((concept, index) => {
        concept.completed = progress.graphicsConcepts[index] || false
      })

      advancedTopics.value.forEach((concept, index) => {
        concept.completed = progress.advancedTopics[index] || false
      })
    } catch (e) {
      console.error('加载进度失败:', e)
    }
  }
})
</script>

<style lang="less" scoped>
.webgl-roadmap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #2d3748;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  padding: 3rem 0 2rem;

  .header-content {
    position: relative;
  }

  .title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #718096;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  .progress-indicator {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .progress-bar {
    width: 200px;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #48bb78, #38a169);
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: #4a5568;
    min-width: 80px;
  }
}

.roadmap-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 3rem;
}

.learning-phase {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  .phase-header {
    display: flex;
    align-items: center;
    padding: 1.5rem 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: #f7fafc;
    }
  }

  .phase-icon {
    font-size: 2rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .phase-info {
    flex: 1;
  }

  .phase-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 0.25rem 0;
  }

  .phase-description {
    color: #718096;
    margin: 0;
    font-size: 1rem;
  }

  .phase-status {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .phase-badge {
    background: #667eea;
    color: white;
    padding: 0.375rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .toggle-icon {
    font-size: 1.25rem;
    font-weight: 600;
    color: #a0aec0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .phase-content {
    padding: 0 2rem 2rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  background: #f7fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .concept-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .concept-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
    flex: 1;
  }

  .concept-level {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.beginner {
      background: #c6f6d5;
      color: #276749;
    }

    &.intermediate {
      background: #bee3f8;
      color: #2c5aa0;
    }

    &.core {
      background: #fefcbf;
      color: #744210;
    }

    &.advanced {
      background: #fed7d7;
      color: #c53030;
    }

    &.expert {
      background: #e9d8fd;
      color: #6b46c1;
    }
  }

  .concept-description {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .code-example {
    background: #2d3748;
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0;

    .code-header {
      background: #4a5568;
      color: #cbd5e0;
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    pre {
      margin: 0;
      padding: 1rem;
      overflow-x: auto;
    }

    code {
      font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
      color: #e2e8f0;
    }
  }

  .concept-visual {
    margin: 1rem 0;

    .visual-placeholder {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
    }
  }

  .concept-tips,
  .concept-resources {
    margin: 1rem 0;

    h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #718096;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 0.25rem 0;
      color: #4a5568;
      font-size: 0.9rem;

      &::before {
        content: '•';
        color: #667eea;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }

  .concept-resources {
    a {
      color: #667eea;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .concept-checkbox {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      color: #4a5568;

      input[type="checkbox"] {
        display: none;
      }

      .checkmark {
        width: 18px;
        height: 18px;
        border: 2px solid #cbd5e0;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;

        &::after {
          content: '✓';
          color: white;
          font-size: 12px;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
      }

      input[type="checkbox"]:checked + .checkmark {
        background: #48bb78;
        border-color: #48bb78;

        &::after {
          opacity: 1;
        }
      }
    }
  }
}

.tips-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .tips-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2d3748;
    text-align: center;
    margin-bottom: 2rem;
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .tip-card {
    text-align: center;
    padding: 1.5rem;

    .tip-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 0.75rem 0;
    }

    p {
      color: #718096;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.page-footer {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .footer-content {
    text-align: center;
  }

  .footer-text {
    color: #4a5568;
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
    line-height: 1.7;
  }

  .footer-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &.reset-btn {
        background: #fed7d7;
        color: #c53030;

        &:hover {
          background: #feb2b2;
        }
      }

      &.export-btn {
        background: #c6f6d5;
        color: #276749;

        &:hover {
          background: #9ae6b4;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .webgl-roadmap {
    padding: 0 1rem;
  }

  .page-header .title {
    font-size: 2.25rem;
  }

  .progress-indicator {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }

  .learning-phase .phase-header {
    padding: 1.25rem;
  }

  .phase-icon {
    font-size: 1.5rem;
  }

  .phase-title {
    font-size: 1.25rem;
  }

  .concept-grid {
    grid-template-columns: 1fr;
  }

  .concept-card {
    padding: 1.25rem;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .footer-actions {
    flex-direction: column;
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
