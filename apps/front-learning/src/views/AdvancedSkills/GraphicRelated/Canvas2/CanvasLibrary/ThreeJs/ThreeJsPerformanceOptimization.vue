<template>
  <div class="performance-optimization-container">
    <header class="page-header">
      <h1>Three.js 性能优化指南</h1>
      <p class="subtitle">构建流畅的WebGL体验</p>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="card">
          <h2>为什么需要性能优化?</h2>
          <p>Three.js 应用在复杂场景中容易遇到性能瓶颈，导致帧率下降、内存泄漏和用户体验不佳。通过合理的优化策略，可以在保持视觉效果的同时显著提升性能。</p>
          <div class="performance-metrics">
            <div class="metric">
              <span class="metric-value">60 FPS</span>
              <span class="metric-label">目标帧率</span>
            </div>
            <div class="metric">
              <span class="metric-value">&lt; 16ms</span>
              <span class="metric-label">每帧时间</span>
            </div>
            <div class="metric">
              <span class="metric-value">&lt; 100MB</span>
              <span class="metric-label">内存使用</span>
            </div>
            <div class="metric">
              <span class="metric-value">&lt; 10s</span>
              <span class="metric-label">加载时间</span>
            </div>
          </div>
        </div>
      </section>

      <div class="two-column-layout">
        <section class="optimization-categories">
          <div class="card">
            <h2>优化分类</h2>
            <div class="category-tabs">
              <button
                v-for="category in optimizationCategories"
                :key="category.id"
                @click="activeCategory = category.id"
                class="category-tab"
                :class="{ active: activeCategory === category.id }"
              >
                <span class="category-icon">{{ category.icon }}</span>
                <span class="category-name">{{ category.name }}</span>
              </button>
            </div>
          </div>

          <div class="card">
            <h2>性能监控工具</h2>
            <div class="tools-grid">
              <div class="tool-item">
                <h3>Three.js Stats</h3>
                <p>实时监控FPS、内存和绘制调用</p>
                <pre class="code-small"><code>import Stats from 'three/examples/jsm/libs/stats.module'
const stats = new Stats()
document.body.appendChild(stats.dom)</code></pre>
              </div>
              <div class="tool-item">
                <h3>Chrome DevTools</h3>
                <p>性能分析、内存快照和帧分析</p>
                <div class="tool-tags">
                  <span class="tag">Performance</span>
                  <span class="tag">Memory</span>
                </div>
              </div>
              <div class="tool-item">
                <h3>Three.js Inspector</h3>
                <p>场景调试和性能分析</p>
                <div class="tool-tags">
                  <span class="tag">Scene Graph</span>
                  <span class="tag">GPU分析</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="optimization-content">
          <div class="card">
            <h2>{{ getActiveCategory().name }} 优化</h2>
            <p class="category-description">{{ getActiveCategory().description }}</p>

            <div class="optimization-techniques">
              <div
                v-for="technique in getActiveCategory().techniques"
                :key="technique.id"
                class="technique-item"
                :class="{ 'highlighted': technique.highlight}"
              >
                <div class="technique-header">
                  <h3>{{ technique.title }}</h3>
                  <span class="impact-badge" :class="technique.impact">
                    {{ getImpactText(technique.impact) }}
                  </span>
                </div>
                <p class="technique-description">{{ technique.description }}</p>
                <div class="code-example" v-if="technique.code">
                  <pre><code>{{ technique.code }}</code></pre>
                </div>
                <div class="technique-tips" v-if="technique.tips">
                  <strong>提示:</strong> {{ technique.tips }}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="performance-demo">
        <div class="card">
          <h2>性能对比演示</h2>
          <div class="demo-container">
            <div class="demo-controls">
              <div class="control-group">
                <label>场景复杂度:</label>
                <input
                  type="range"
                  v-model="sceneComplexity"
                  min="1"
                  max="100"
                  class="complexity-slider"
                >
                <span class="slider-value">{{ sceneComplexity }}%</span>
              </div>
              <div class="control-group">
                <button
                  @click="toggleOptimization"
                  class="btn"
                  :class="optimizationEnabled ? 'secondary' : 'primary'"
                >
                  {{ optimizationEnabled ? '禁用优化' : '启用优化' }}
                </button>
                <button @click="resetDemo" class="btn outline">重置</button>
              </div>
            </div>

            <div class="demo-visualization">
              <div class="performance-charts">
                <div class="chart">
                  <h4>帧率 (FPS)</h4>
                  <div class="chart-container">
                    <div
                      class="chart-bar fps-bar"
                      :style="{ height: `${currentFPS}%` }"
                    ></div>
                    <div class="chart-target">60</div>
                  </div>
                  <div class="chart-value">{{ Math.round(currentFPS * 0.6) }} FPS</div>
                </div>
                <div class="chart">
                  <h4>内存使用</h4>
                  <div class="chart-container">
                    <div
                      class="chart-bar memory-bar"
                      :style="{ height: `${currentMemory}%` }"
                    ></div>
                    <div class="chart-target">50</div>
                  </div>
                  <div class="chart-value">{{ Math.round(currentMemory * 2) }} MB</div>
                </div>
                <div class="chart">
                  <h4>绘制调用</h4>
                  <div class="chart-container">
                    <div
                      class="chart-bar draw-calls-bar"
                      :style="{ height: `${currentDrawCalls}%` }"
                    ></div>
                    <div class="chart-target">50</div>
                  </div>
                  <div class="chart-value">{{ Math.round(currentDrawCalls * 2) }} 次</div>
                </div>
              </div>

              <div class="scene-info">
                <h4>场景信息</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">网格数量:</span>
                    <span class="info-value">{{ meshCount }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">顶点数量:</span>
                    <span class="info-value">{{ vertexCount }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">纹理数量:</span>
                    <span class="info-value">{{ textureCount }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">优化状态:</span>
                    <span
                      class="info-value status"
                      :class="optimizationEnabled ? 'enabled' : 'disabled'"
                    >
                      {{ optimizationEnabled ? '已启用' : '已禁用' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <div class="card">
          <h2>最佳实践清单</h2>
          <div class="practices-grid">
            <div
              v-for="practice in bestPractices"
              :key="practice.id"
              class="practice-item"
            >
              <div class="practice-checkbox">
                <input type="checkbox" :id="practice.id" v-model="practice.checked">
                <label :for="practice.id"></label>
              </div>
              <div class="practice-content">
                <h3>{{ practice.title }}</h3>
                <p>{{ practice.description }}</p>
                <div class="practice-tags">
                  <span
                    v-for="tag in practice.tags"
                    :key="tag"
                    class="practice-tag"
                    :class="getTagClass(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="advanced-techniques">
        <div class="card">
          <h2>高级优化技术</h2>
          <div class="advanced-grid">
            <div class="advanced-item">
              <h3>Web Workers</h3>
              <p>将繁重计算移到工作线程，避免阻塞主线程。</p>
              <div class="technique-details">
                <div class="detail">
                  <strong>适用场景:</strong> 物理计算、复杂几何生成
                </div>
                <div class="detail">
                  <strong>注意事项:</strong> 数据传输开销
                </div>
              </div>
            </div>
            <div class="advanced-item">
              <h3>GPU Instancing</h3>
              <p>使用实例化渲染大量相似对象，显著减少绘制调用。</p>
              <div class="technique-details">
                <div class="detail">
                  <strong>适用场景:</strong> 森林、人群、粒子系统
                </div>
                <div class="detail">
                  <strong>性能提升:</strong> 10x+ 绘制调用减少
                </div>
              </div>
            </div>
            <div class="advanced-item">
              <h3>Level of Detail (LOD)</h3>
              <p>根据距离动态切换模型细节级别。</p>
              <div class="technique-details">
                <div class="detail">
                  <strong>适用场景:</strong> 复杂模型、大型场景
                </div>
                <div class="detail">
                  <strong>实现方式:</strong> THREE.LOD
                </div>
              </div>
            </div>
            <div class="advanced-item">
              <h3>Frustum Culling</h3>
              <p>只渲染视锥体内的对象，忽略不可见物体。</p>
              <div class="technique-details">
                <div class="detail">
                  <strong>适用场景:</strong> 所有3D场景
                </div>
                <div class="detail">
                  <strong>注意事项:</strong> Three.js 默认启用
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="memory-management">
        <div class="card">
          <h2>内存管理</h2>
          <div class="memory-content">
            <div class="memory-tips">
              <h3>内存泄漏预防</h3>
              <ul>
                <li>及时清理未使用的几何体、材质和纹理</li>
                <li>使用 dispose() 方法释放资源</li>
                <li>避免在动画循环中创建新对象</li>
                <li>定期检查内存使用情况</li>
              </ul>
            </div>
            <div class="code-example">
              <h3>资源清理示例</h3>
              <pre><code>// 清理几何体
geometry.dispose()

// 清理材质
material.dispose()

// 清理纹理
texture.dispose()

// 从场景中移除对象
scene.remove(mesh)
mesh = null</code></pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'

// 响应式数据
const activeCategory = ref('rendering')
const sceneComplexity = ref(50)
const optimizationEnabled = ref(true)
const currentFPS = ref(75)
const currentMemory = ref(30)
const currentDrawCalls = ref(40)

// 模拟数据
const meshCount = computed(() => Math.round(sceneComplexity.value * 2))
const vertexCount = computed(() => Math.round(sceneComplexity.value * 1000))
const textureCount = computed(() => Math.round(sceneComplexity.value / 10))

// 优化分类
const optimizationCategories = reactive([
  {
    id: 'rendering',
    name: '渲染优化',
    icon: '🎨',
    description: '优化渲染管线，减少GPU负载',
    techniques: [
      {
        id: 'frustum-culling',
        title: '视锥体剔除',
        description: '自动剔除视锥体外的物体，减少不必要的渲染。',
        impact: 'high',
        code: `// Three.js 默认启用视锥体剔除
mesh.frustumCulled = true

// 对于需要始终渲染的对象
mesh.frustumCulled = false`,
        tips: '对于UI元素或天空盒等需要始终渲染的对象，可以禁用剔除。'
      },
      {
        id: 'lod',
        title: '细节层次 (LOD)',
        description: '根据相机距离使用不同细节级别的模型。',
        impact: 'high',
        code: `const lod = new THREE.LOD()

// 添加不同距离的细节级别
lod.addLevel(highDetailMesh, 0)
lod.addLevel(mediumDetailMesh, 50)
lod.addLevel(lowDetailMesh, 100)

scene.add(lod)`,
        tips: '适用于复杂模型，如建筑、角色等。'
      },
      {
        id: 'instancing',
        title: '实例化渲染',
        description: '使用实例化渲染大量相似对象，显著减少绘制调用。',
        impact: 'very-high',
        code: `const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial()
const instancedMesh = new THREE.InstancedMesh(geometry, material, 1000)

// 设置每个实例的位置
const matrix = new THREE.Matrix4()
for (let i = 0; i < 1000; i++) {
  matrix.setPosition(Math.random() * 100, Math.random() * 100, Math.random() * 100)
  instancedMesh.setMatrixAt(i, matrix)
}

scene.add(instancedMesh)`,
        tips: '适用于树木、人群、粒子等重复对象。'
      }
    ]
  },
  {
    id: 'geometry',
    name: '几何体优化',
    icon: '📐',
    description: '优化3D模型和几何数据',
    techniques: [
      {
        id: 'merge-geometry',
        title: '几何体合并',
        description: '将多个几何体合并为一个，减少绘制调用。',
        impact: 'high',
        code: `const geometries = [geometry1, geometry2, geometry3]
const mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geometries)
const mergedMesh = new THREE.Mesh(mergedGeometry, material)

scene.add(mergedMesh)`,
        tips: '适用于静态场景中不会移动的物体。'
      },
      {
        id: 'simplify-geometry',
        title: '几何体简化',
        description: '减少顶点数量，降低GPU负载。',
        impact: 'medium',
        code: `import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier'

const modifier = new SimplifyModifier()
const simplifiedGeometry = modifier.modify(originalGeometry, 0.5) // 保留50%顶点

const mesh = new THREE.Mesh(simplifiedGeometry, material)`,
        tips: '在保持视觉质量的前提下尽可能减少顶点。'
      },
      {
        id: 'reuse-geometry',
        title: '几何体重用',
        description: '重复使用几何体实例，减少内存占用。',
        impact: 'medium',
        code: `// 创建可重用的几何体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

// 创建多个使用相同几何体的网格
for (let i = 0; i < 100; i++) {
  const mesh = new THREE.Mesh(boxGeometry, material)
  scene.add(mesh)
}`,
        tips: '适用于大量相同形状的物体。'
      }
    ]
  },
  {
    id: 'materials',
    name: '材质优化',
    icon: '🌟',
    description: '优化着色器和材质性能',
    techniques: [
      {
        id: 'material-reuse',
        title: '材质重用',
        description: '尽可能重复使用材质实例。',
        impact: 'medium',
        code: `// 创建可重用的材质
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })

// 多个网格共享同一个材质
const mesh1 = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)`,
        tips: '避免为每个网格创建新的材质实例。'
      },
      {
        id: 'shader-optimization',
        title: '着色器优化',
        description: '简化着色器代码，减少GPU计算。',
        impact: 'high',
        code: `// 使用更简单的材质类型
// 避免使用:
// new THREE.MeshPhysicalMaterial()
// 优先使用:
// new THREE.MeshBasicMaterial()
// new THREE.MeshLambertMaterial()`,
        tips: '根据需求选择最简单的材质类型。'
      },
      {
        id: 'texture-optimization',
        title: '纹理优化',
        description: '优化纹理大小和格式，减少内存占用。',
        impact: 'high',
        code: `// 使用合适的纹理尺寸
const texture = new THREE.TextureLoader().load('texture.jpg')
texture.generateMipmaps = true
texture.minFilter = THREE.LinearMipmapLinearFilter

// 压缩纹理格式
// 考虑使用 .basis 或 .ktx2 格式`,
        tips: '纹理尺寸应该是2的幂次方，如512x512、1024x1024。'
      }
    ]
  },
  {
    id: 'lighting',
    name: '光照优化',
    icon: '💡',
    description: '优化光照计算和阴影',
    techniques: [
      {
        id: 'light-count',
        title: '光源数量控制',
        description: '限制场景中的光源数量，特别是动态光源。',
        impact: 'high',
        code: `// 避免过多动态光源
// 推荐使用环境光 + 方向光的组合
const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)

scene.add(ambientLight)
scene.add(directionalLight)`,
        tips: '每个额外光源都会显著增加着色器复杂度。'
      },
      {
        id: 'shadow-optimization',
        title: '阴影优化',
        description: '优化阴影质量和性能平衡。',
        impact: 'high',
        code: `// 设置合适的阴影参数
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500

// 只为需要投射阴影的对象启用
mesh.castShadow = true
mesh.receiveShadow = true`,
        tips: '降低阴影贴图分辨率可以显著提升性能。'
      },
      {
        id: 'baked-lighting',
        title: '烘焙光照',
        description: '使用预计算的光照贴图，减少实时计算。',
        impact: 'very-high',
        code: `// 使用光照贴图
const material = new THREE.MeshBasicMaterial({
  map: texture,
  lightMap: lightMapTexture
})`,
        tips: '适用于静态场景，可以完全移除实时光照计算。'
      }
    ]
  }
])

// 最佳实践清单
const bestPractices = reactive([
  {
    id: 'practice-1',
    title: '使用 BufferGeometry',
    description: '始终使用 BufferGeometry 而不是 Geometry，因为前者更高效。',
    tags: ['几何体', '性能'],
    checked: false
  },
  {
    id: 'practice-2',
    title: '合并静态几何体',
    description: '将不会移动的多个几何体合并为一个，减少绘制调用。',
    tags: ['渲染', '优化'],
    checked: false
  },
  {
    id: 'practice-3',
    title: '纹理压缩',
    description: '使用压缩纹理格式如 .basis 或 .ktx2 减少内存占用。',
    tags: ['纹理', '内存'],
    checked: false
  },
  {
    id: 'practice-4',
    title: '实例化渲染',
    description: '对大量相似对象使用 InstancedMesh 而不是单独创建 Mesh。',
    tags: ['渲染', '性能'],
    checked: false
  },
  {
    id: 'practice-5',
    title: '合理使用 LOD',
    description: '为复杂模型实现细节层次，根据距离切换不同细节级别。',
    tags: ['几何体', '优化'],
    checked: false
  },
  {
    id: 'practice-6',
    title: '光源数量控制',
    description: '限制动态光源数量，优先使用环境光和方向光。',
    tags: ['光照', '性能'],
    checked: false
  },
  {
    id: 'practice-7',
    title: '阴影优化',
    description: '合理设置阴影贴图分辨率，只为必要对象启用阴影。',
    tags: ['阴影', '性能'],
    checked: false
  },
  {
    id: 'practice-8',
    title: '资源清理',
    description: '及时清理不再使用的几何体、材质和纹理。',
    tags: ['内存', '管理'],
    checked: false
  }
])

// 方法
const getActiveCategory = () => {
  return optimizationCategories.find(cat => cat.id === activeCategory.value) || optimizationCategories[0]
}

const getImpactText = (impact: string) => {
  const impactMap: { [key: string]: string } = {
    'low': '低影响',
    'medium': '中等影响',
    'high': '高影响',
    'very-high': '极高影响'
  }
  return impactMap[impact] || '未知'
}

const getTagClass = (tag: string) => {
  const tagClassMap: { [key: string]: string } = {
    '几何体': 'geometry',
    '性能': 'performance',
    '渲染': 'rendering',
    '纹理': 'texture',
    '内存': 'memory',
    '光照': 'lighting',
    '阴影': 'shadow',
    '管理': 'management',
    '优化': 'optimization'
  }
  return tagClassMap[tag] || 'default'
}

const toggleOptimization = () => {
  optimizationEnabled.value = !optimizationEnabled.value

  // 模拟优化效果
  if (optimizationEnabled.value) {
    currentFPS.value = Math.min(100, currentFPS.value + 20)
    currentMemory.value = Math.max(10, currentMemory.value - 15)
    currentDrawCalls.value = Math.max(10, currentDrawCalls.value - 20)
  } else {
    currentFPS.value = Math.max(20, currentFPS.value - 20)
    currentMemory.value = Math.min(80, currentMemory.value + 15)
    currentDrawCalls.value = Math.min(80, currentDrawCalls.value + 20)
  }
}

const resetDemo = () => {
  sceneComplexity.value = 50
  optimizationEnabled.value = true
  currentFPS.value = 75
  currentMemory.value = 30
  currentDrawCalls.value = 40
}

// 模拟性能数据变化
onMounted(() => {
  setInterval(() => {
    if (!optimizationEnabled.value) return

    // 轻微波动模拟真实场景
    const complexityFactor = sceneComplexity.value / 100
    currentFPS.value = 75 + (Math.random() - 0.5) * 10 * complexityFactor
    currentMemory.value = 30 + (Math.random() - 0.5) * 5 * complexityFactor
    currentDrawCalls.value = 40 + (Math.random() - 0.5) * 8 * complexityFactor
  }, 1000)
})
</script>

<style lang="less" scoped>
.performance-optimization-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 10px;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    margin: 0;
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 10px;
    font-size: 1.5rem;
  }
}

.intro-section {
  .card {
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
      margin-bottom: 20px;
    }
  }
}

.performance-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.metric {
  text-align: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  .metric-value {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 5px;
  }

  .metric-label {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.category-tabs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-tab {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: #e9ecef;
  }

  &.active {
    background: #667eea;
    color: white;

    .category-icon {
      transform: scale(1.1);
    }
  }

  .category-icon {
    font-size: 1.2rem;
    margin-right: 10px;
    transition: transform 0.2s;
  }

  .category-name {
    font-weight: 500;
  }
}

.category-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.optimization-techniques {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.technique-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  transition: all 0.2s;

  &.highlighted {
    background: #fff3cd;
    border-left-color: #ffc107;
  }

  .technique-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }
  }
}

.impact-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;

  &.low {
    background: #d4edda;
    color: #155724;
  }

  &.medium {
    background: #fff3cd;
    color: #856404;
  }

  &.high {
    background: #f8d7da;
    color: #721c24;
  }

  &.very-high {
    background: #dc3545;
    color: white;
  }
}

.technique-description {
  margin-bottom: 15px;
  line-height: 1.5;
  color: #555;
}

.code-example {
  margin: 15px 0;

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.4;
    font-size: 0.85rem;
  }
}

.technique-tips {
  padding: 10px;
  background: #e7f3ff;
  border-radius: 4px;
  border-left: 3px solid #3498db;
  font-size: 0.9rem;

  strong {
    color: #2c3e50;
  }
}

.tools-grid {
  display: grid;
  gap: 15px;
}

.tool-item {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #2c3e50;
  }

  p {
    margin-bottom: 10px;
    color: #666;
    font-size: 0.9rem;
  }
}

.code-small {
  background: #2d3748;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.tool-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.tag {
  background: #667eea;
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
}

.performance-demo {
  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.demo-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-weight: 500;
    color: #2c3e50;
    white-space: nowrap;
  }
}

.complexity-slider {
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.slider-value {
  min-width: 40px;
  font-weight: 500;
  color: #667eea;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background-color: #667eea;
    color: white;

    &:hover {
      background-color: #5a6fd8;
    }
  }

  &.secondary {
    background-color: #e74c3c;
    color: white;

    &:hover {
      background-color: #d62c1a;
    }
  }

  &.outline {
    background-color: transparent;
    border: 1px solid #bdc3c7;
    color: #7f8c8d;

    &:hover {
      background-color: #ecf0f1;
    }
  }
}

.demo-visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.performance-charts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.chart {
  text-align: center;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
    font-size: 0.9rem;
  }
}

.chart-container {
  position: relative;
  height: 120px;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.chart-bar {
  width: 30px;
  background: #667eea;
  border-radius: 2px 2px 0 0;
  transition: height 0.5s ease;

  &.fps-bar {
    background: #2ecc71;
  }

  &.memory-bar {
    background: #3498db;
  }

  &.draw-calls-bar {
    background: #e74c3c;
  }
}

.chart-target {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -4px;
    width: 8px;
    height: 8px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  }
}

.chart-value {
  font-weight: bold;
  color: #2c3e50;
}

.scene-info {
  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }
}

.info-grid {
  display: grid;
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.info-label {
  color: #7f8c8d;
}

.info-value {
  font-weight: 500;
  color: #2c3e50;

  &.status {
    &.enabled {
      color: #2ecc71;
    }

    &.disabled {
      color: #e74c3c;
    }
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    gap: 15px;
  }
}

.practice-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
  }
}

.practice-checkbox {
  flex-shrink: 0;

  input[type="checkbox"] {
    display: none;

    + label {
      display: block;
      width: 20px;
      height: 20px;
      border: 2px solid #bdc3c7;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      transition: all 0.2s;
    }

    &:checked + label {
      background: #667eea;
      border-color: #667eea;

      &::after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 14px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.practice-content {
  flex: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin-bottom: 10px;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.practice-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.practice-tag {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;

  &.geometry {
    background: #e8f6f3;
    color: #1abc9c;
  }

  &.performance {
    background: #fdedec;
    color: #e74c3c;
  }

  &.rendering {
    background: #ebf5fb;
    color: #3498db;
  }

  &.texture {
    background: #f4ecf7;
    color: #9b59b6;
  }

  &.memory {
    background: #fff3cd;
    color: #f39c12;
  }

  &.lighting {
    background: #fdebd0;
    color: #e67e22;
  }

  &.shadow {
    background: #e8daef;
    color: #8e44ad;
  }

  &.management {
    background: #d5f5e3;
    color: #27ae60;
  }

  &.optimization {
    background: #d6eaf8;
    color: #2980b9;
  }

  &.default {
    background: #f2f3f4;
    color: #7f8c8d;
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.advanced-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  p {
    margin-bottom: 15px;
    color: #555;
    line-height: 1.5;
  }
}

.technique-details {
  .detail {
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #666;

    strong {
      color: #2c3e50;
    }
  }
}

.memory-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.memory-tips {
  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
      color: #555;
    }
  }
}

@media (max-width: 768px) {
  .performance-optimization-container {
    padding: 10px;
  }

  .card {
    padding: 15px;
  }

  .performance-metrics {
    grid-template-columns: 1fr 1fr;
  }

  .performance-charts {
    grid-template-columns: 1fr;
  }

  .demo-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .control-group {
    justify-content: space-between;
  }

  .complexity-slider {
    flex: 1;
  }
}
</style>
