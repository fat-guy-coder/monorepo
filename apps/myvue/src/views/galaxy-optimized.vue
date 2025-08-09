<template>
  <div class="galaxy-container">
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="navigation">
        <button
          v-if="currentPath.length > 0"
          @click="goBack"
          class="back-button"
        >
          ← 返回上一级
        </button>
        <div class="breadcrumb">
          <span v-for="(item, index) in currentPath" :key="index">
            {{ item.label }}
            <span v-if="index < currentPath.length - 1"> > </span>
          </span>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="controls">
        <button @click="toggleAutoRotation" class="control-btn">
          {{ autoRotation ? '🔄 停止旋转' : '🔄 开始旋转' }}
        </button>
        <button @click="resetCamera" class="control-btn">
          🎯 重置视角
        </button>
        <button @click="toggleStarField" class="control-btn">
          {{ showStarField ? '⭐ 隐藏星空' : '⭐ 显示星空' }}
        </button>
        <button @click="togglePerformanceMode" class="control-btn">
          {{ performanceMode ? '⚡ 性能模式' : '🎨 质量模式' }}
        </button>
      </div>

      <!-- 性能监控 -->
      <div class="performance-info">
        <span>FPS: {{ fps }}</span>
        <span>星体数量: {{ starObjects.length }}</span>
        <span>内存使用: {{ memoryUsage }}MB</span>
      </div>
    </div>

    <!-- Three.js 渲染容器 -->
    <div ref="canvasContainer" class="canvas-container"></div>

    <!-- 加载提示 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>正在加载星系...</p>
    </div>

    <!-- 信息面板 -->
    <div v-if="hoveredNode" class="info-panel">
      <h3>{{ hoveredNode.label }}</h3>
      <p v-if="hoveredNode.children && hoveredNode.children.length > 0">
        包含 {{ hoveredNode.children.length }} 个子项目
      </p>
      <p v-else>点击进入详情</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, defineOptions, computed } from 'vue'
      import { Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, PointsMaterial, Points, Mesh, CanvasTexture, SpriteMaterial, Sprite, AmbientLight, PointLight, Raycaster, Vector2, Vector3, Color, SphereGeometry, PCFSoftShadowMap, DirectionalLight, Fog, Material, DoubleSide, RingGeometry, MeshBasicMaterial, BufferAttribute, MeshPhongMaterial       } from 'three'

defineOptions({ name: 'GalaxyViewOptimized' })

// 类型定义
interface GalaxyNode {
  label: string
  name: string
  children?: GalaxyNode[]
}

interface Props {
  data: GalaxyNode[]
  onNodeClick?: (node: GalaxyNode) => void
  flyInDelay?: number
  autoRotationSpeed?: number
  enableHover?: boolean
  maxStars?: number // 新增：最大星体数量限制
}

// Props
const props = withDefaults(defineProps<Props>(), {
  flyInDelay: 10,
  autoRotationSpeed: 0.5,
  enableHover: true,
  maxStars: 100 // 限制最大星体数量
})

// 响应式数据
const canvasContainer = ref<HTMLDivElement>()
const loading = ref(true)
const currentPath = ref<GalaxyNode[]>([])
const currentData = ref<GalaxyNode[]>(props.data)
const hoveredNode = ref<GalaxyNode | null>(null)
const autoRotation = ref(true)
const showStarField = ref(true)
const performanceMode = ref(false)
const fps = ref(60)
const memoryUsage = ref(0)

// Three.js 相关变量
let scene: Scene
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let animationId: number
let flyInTimerId: number | null = null
let starField: Points | null = null
let starObjects: Array<{
  mesh: Mesh
  originalPosition: Vector3
  targetPosition: Vector3
  node: GalaxyNode
  isAnimating: boolean
  isHovered: boolean
  originalScale: Vector3
  lastUpdateTime: number // 新增：上次更新时间
}> = []

// 性能优化相关
let lastFrameTime = 0
let frameCount = 0
let lastFpsUpdateTime = 0
let memoryMonitorInterval: number | null = null

// 对象池和缓存
const geometryCache = new Map<string, BufferGeometry>()
const materialCache = new Map<string, Material>()
const objectPool: Mesh[] = []

// 鼠标交互
const raycaster = new Raycaster()
const mouse = new Vector2()
const hoveredObject = ref<Mesh | null>(null)

// 节流函数
const throttle = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
  let lastCall = 0
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

// 计算属性
const optimizedData = computed(() => {
  if (performanceMode.value && props.data.length > props.maxStars) {
    return props.data.slice(0, props.maxStars)
  }
  return props.data
})

// 监听数据变化
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    currentData.value = newData
    if (scene) {
      createGalaxy(optimizedData.value)
    }
  }
}, { immediate: true })

/**
 * 初始化 Three.js 场景
 */
const initThreeJS = async () => {
  if (!canvasContainer.value) return

  // 创建场景
  scene = new Scene()
  scene.fog = new Fog(0x000011, 50, 200)

  // 创建相机
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0, 50)

  // 创建渲染器（性能优化）
  renderer = new WebGLRenderer({
    antialias: !performanceMode.value, // 性能模式下关闭抗锯齿
    alpha: true,
    powerPreference: 'high-performance' // 优先使用高性能GPU
  })
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = !performanceMode.value // 性能模式下关闭阴影
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // 添加环境光
  const ambientLight = new AmbientLight(0x404040, 0.4)
  scene.add(ambientLight)

  // 添加点光源
  const pointLight = new PointLight(0xffffff, 1.2, 100)
  pointLight.position.set(0, 0, 30)
  pointLight.castShadow = !performanceMode.value
  scene.add(pointLight)

  // 添加方向光
        const directionalLight = new DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 10, 10)
  directionalLight.castShadow = !performanceMode.value
  scene.add(directionalLight)

  // 创建星空背景
  createStarField()

  // 添加鼠标事件监听（使用节流）
  const throttledMouseMove = throttle(onMouseMove, 16) // 60fps
  renderer.domElement.addEventListener('click', onMouseClick)
  renderer.domElement.addEventListener('mousemove', throttledMouseMove)
  renderer.domElement.addEventListener('wheel', onMouseWheel)
  window.addEventListener('resize', onWindowResize)

  // 启动性能监控
  startPerformanceMonitoring()

  loading.value = false
}

/**
 * 启动性能监控
 */
const startPerformanceMonitoring = () => {
  // FPS监控
  const updateFPS = () => {
    const now = performance.now()
    frameCount++

    if (now - lastFpsUpdateTime >= 1000) {
      fps.value = Math.round((frameCount * 1000) / (now - lastFpsUpdateTime))
      frameCount = 0
      lastFpsUpdateTime = now
    }

    lastFrameTime = now
  }

  // 内存监控
  memoryMonitorInterval = window.setInterval(() => {
    if ('memory' in performance) {
      const memory = (performance as { memory: { usedJSHeapSize: number } }).memory
      memoryUsage.value = Math.round(memory.usedJSHeapSize / 1024 / 1024)
    }
  }, 2000)

  // 将FPS更新集成到动画循环中
  const originalAnimate = animate
  animate = () => {
    updateFPS()
    originalAnimate()
  }
}

/**
 * 创建星空背景（优化版本）
 */
const createStarField = () => {
  if (starField) {
    scene.remove(starField)
    starField.geometry.dispose()
    if (Array.isArray(starField.material)) {
      starField.material.forEach(mat => mat.dispose())
    } else {
      starField.material.dispose()
    }
  }

  const starGeometry = new BufferGeometry()
  const starCount = performanceMode.value ? 1000 : 2000 // 性能模式下减少星星数量

  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)
  const sizes = new Float32Array(starCount)

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 400
    positions[i3 + 1] = (Math.random() - 0.5) * 400
    positions[i3 + 2] = (Math.random() - 0.5) * 400

    const color = new Color()
    color.setHSL(Math.random() * 0.1 + 0.9, 0.8, Math.random() * 0.2 + 0.8)
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    sizes[i] = Math.random() * 2 + 0.5
  }

  starGeometry.setAttribute('position', new BufferAttribute(positions, 3))
  starGeometry.setAttribute('color', new BufferAttribute(colors, 3))
  starGeometry.setAttribute('size', new BufferAttribute(sizes, 1))

  const starMaterial = new PointsMaterial({
    size: 1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  })

  starField = new Points(starGeometry, starMaterial)
  scene.add(starField)
}

/**
 * 获取或创建几何体（使用缓存）
 */
const getGeometry = (size: number, segments: number = 32) => {
  const key = `sphere_${size}_${segments}`
  if (!geometryCache.has(key)) {
    geometryCache.set(key, new SphereGeometry(size, segments, segments))
  }
  return geometryCache.get(key)!
}

/**
 * 获取或创建材质（使用缓存）
 */
const getMaterial = (color: Color, emissive: Color, hasChildren: boolean) => {
  const key = `material_${color.getHex()}_${emissive.getHex()}_${hasChildren}`
  if (!materialCache.has(key)) {
    materialCache.set(key, new MeshPhongMaterial({
      color,
      emissive,
      shininess: 50,
      transparent: true,
      opacity: 0.9
    }))
  }
  return materialCache.get(key)!
}

/**
 * 创建星系对象（优化版本）
 */
const createGalaxy = (data: GalaxyNode[]) => {
  // 清理现有对象
  cleanupStarObjects()

  // 限制星体数量
  const limitedData = data.slice(0, props.maxStars)
  const radius = Math.max(20, limitedData.length * 4)

  limitedData.forEach((node, index) => {
    const angle = (index / limitedData.length) * Math.PI * 2
    const distance = radius + Math.random() * 15 - 7.5

    const hasChildren = node.children && node.children.length > 0
    const starSize = hasChildren ? 3 + Math.random() * 2 : 1.5 + Math.random() * 1

    // 使用缓存的几何体和材质
    const geometry = getGeometry(starSize, performanceMode.value ? 16 : 32)
    const color = hasChildren ?
      new Color().setHSL(0.1 + Math.random() * 0.2, 0.8, 0.6) :
      new Color().setHSL(0.5 + Math.random() * 0.5, 0.7, 0.5)
    const emissive = hasChildren ?
      new Color().setHSL(0.1 + Math.random() * 0.2, 0.3, 0.1) :
      new Color(0x000000)

    const material = getMaterial(color, emissive, hasChildren as boolean)

    // 从对象池获取或创建新的mesh
    let starMesh: Mesh
    if (objectPool.length > 0) {
      starMesh = objectPool.pop()!
      starMesh.geometry = geometry
      starMesh.material = material
    } else {
      starMesh = new Mesh(geometry, material)
    }

    starMesh.castShadow = !performanceMode.value
    starMesh.receiveShadow = !performanceMode.value

    // 设置位置
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance + (Math.random() - 0.5) * 8
    const z = (Math.random() - 0.5) * 15

    const startPosition = new Vector3(
      x + (Math.random() - 0.5) * 150,
      y + (Math.random() - 0.5) * 150,
      z - 150
    )

    const targetPosition = new Vector3(x, y, z)

    starMesh.position.copy(startPosition)
    starMesh.userData = { node, index }

    // 添加标签（性能模式下简化）
    if (!performanceMode.value) {
      createLabel(node.label, starMesh)
    }

    // 添加光环效果（性能模式下简化）
    if (hasChildren && !performanceMode.value) {
      createStarRing(starMesh, starSize * 1.5)
    }

    scene.add(starMesh)

    starObjects.push({
      mesh: starMesh,
      originalPosition: startPosition.clone(),
      targetPosition: targetPosition,
      node: node,
      isAnimating: false,
      isHovered: false,
      originalScale: new Vector3(1, 1, 1),
      lastUpdateTime: 0
    })

    // 轨道行星（性能模式下限制数量）
    if (hasChildren && node.children && !performanceMode.value) {
      createOrbitingPlanets(starMesh, node.children.slice(0, 2)) // 最多2个轨道行星
    }
  })

  // 启动飞入动画
  setTimeout(() => {
    startFlyInAnimation()
  }, 800)

  // 清理定时器
  if (flyInTimerId) {
    clearInterval(flyInTimerId)
  }

  // 性能模式下减少飞入频率
  const interval = performanceMode.value ?
    Math.max(2, props.flyInDelay) * 1000 :
    Math.max(1, props.flyInDelay) * 1000

  flyInTimerId = window.setInterval(() => {
    restartFlyInAnimation()
  }, interval)
}

/**
 * 清理星体对象
 */
const cleanupStarObjects = () => {
  starObjects.forEach(obj => {
    scene.remove(obj.mesh)
    // 将mesh放回对象池
    objectPool.push(obj.mesh)
  })
  starObjects = []
}

/**
 * 创建标签（优化版本）
 */
const createLabel = (text: string, mesh: Mesh) => {
  // 使用更轻量的标签实现
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  canvas.width = 128 // 减少尺寸
  canvas.height = 32

  context.fillStyle = 'rgba(0, 0, 0, 0.8)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  context.lineWidth = 1
  context.strokeRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'white'
  context.font = 'bold 12px Arial' // 减少字体大小
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new CanvasTexture(canvas)
  const labelMaterial = new SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9
  })
  const label = new Sprite(labelMaterial)
  label.scale.set(5, 1.25, 1) // 减少标签大小

  // 安全获取几何体半径，如果boundingSphere不存在则使用默认值
  let radius = 1.5
  if (mesh.geometry.boundingSphere) {
    radius = mesh.geometry.boundingSphere.radius
  } else {
    // 如果boundingSphere不存在，手动计算或使用默认值
    if (mesh.geometry.attributes.position) {
      const positions = mesh.geometry.attributes.position.array
      if (positions && positions.length > 0) {
        // 计算几何体的最大尺寸作为半径的近似值
        let maxSize = 0
        for (let i = 0; i < positions.length; i += 3) {
          const size = Math.max(Math.abs(positions[i]), Math.abs(positions[i + 1]), Math.abs(positions[i + 2]))
          maxSize = Math.max(maxSize, size)
        }
        radius = maxSize
      }
    }
  }

  label.position.set(0, radius + 1.5, 0)

  mesh.add(label)
}

/**
 * 创建恒星光环（优化版本）
 */
const createStarRing = (star: Mesh, radius: number) => {
  const ringGeometry = new RingGeometry(radius, radius + 0.3, 16) // 减少分段数
  const ringMaterial = new MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.2, // 减少透明度
    side: DoubleSide
  })

  const ring = new Mesh(ringGeometry, ringMaterial)
  ring.rotation.x = Math.PI / 2
  star.add(ring)
}

/**
 * 创建轨道行星（优化版本）
 */
const createOrbitingPlanets = (centerStar: Mesh, childNodes: GalaxyNode[]) => {
  childNodes.forEach((child, index) => {
    const orbitRadius = 4 + index * 2
    const planetSize = 0.3 + Math.random() * 0.2

    const planetGeometry = getGeometry(planetSize, 8) // 使用更少的段数
        const planetMaterial = new MeshPhongMaterial({
      color: new Color().setHSL(Math.random(), 0.6, 0.4),
      transparent: true,
      opacity: 0.8
    })

    const planet = new Mesh(planetGeometry, planetMaterial)
    planet.castShadow = false // 关闭阴影
    planet.userData = {
      orbitRadius,
      orbitSpeed: 0.005 + Math.random() * 0.01, // 减少速度
      orbitAngle: Math.random() * Math.PI * 2,
      centerStar,
      node: child
    }

    if (!performanceMode.value) {
      createLabel(child.label, planet)
    }

    scene.add(planet)
    starObjects.push({
      mesh: planet,
      originalPosition: planet.position.clone(),
      targetPosition: planet.position.clone(),
      node: child,
      isAnimating: false,
      isHovered: false,
      originalScale: new Vector3(1, 1, 1),
      lastUpdateTime: 0
    })
  })
}

/**
 * 启动飞入动画
 */
const startFlyInAnimation = () => {
  starObjects.forEach((obj, index) => {
    setTimeout(() => {
      obj.isAnimating = true
    }, index * (performanceMode.value ? 100 : 150)) // 性能模式下减少延迟
  })
}

/**
 * 重新触发飞入效果
 */
const restartFlyInAnimation = () => {
  starObjects.forEach((obj, index) => {
    const tp = obj.targetPosition
    const startX = tp.x + (Math.random() - 0.5) * 100 // 减少距离
    const startY = tp.y + (Math.random() - 0.5) * 100
    const startZ = tp.z - 100
    obj.originalPosition.set(startX, startY, startZ)
    obj.mesh.position.copy(obj.originalPosition)
    setTimeout(() => {
      obj.isAnimating = true
    }, index * (performanceMode.value ? 80 : 120))
  })
}

/**
 * 动画循环（优化版本）
 */
let animate = () => {
  animationId = requestAnimationFrame(animate)

  const currentTime = performance.now()
  const deltaTime = currentTime - lastFrameTime

  // 星空背景旋转（减少频率）
  if (starField && showStarField.value && deltaTime > 16) {
    starField.rotation.y += 0.0003
  }

  // 更新星体动画（使用时间间隔控制更新频率）
  starObjects.forEach((obj, index) => {
    // 飞入动画
    if (obj.isAnimating) {
      obj.mesh.position.lerp(obj.targetPosition, 0.08)
      if (obj.mesh.position.distanceTo(obj.targetPosition) < 0.1) {
        obj.isAnimating = false
        obj.mesh.position.copy(obj.targetPosition)
      }
    }

    // 轨道行星动画（减少更新频率）
    if (obj.mesh.userData.centerStar && deltaTime > 32) {
      const data = obj.mesh.userData
      data.orbitAngle += data.orbitSpeed
      const centerPos = data.centerStar.position
      obj.mesh.position.set(
        centerPos.x + Math.cos(data.orbitAngle) * data.orbitRadius,
        centerPos.y + Math.sin(data.orbitAngle) * data.orbitRadius * 0.6,
        centerPos.z + Math.sin(data.orbitAngle * 2) * 1.5
      )
    }

    // 恒星自转（减少频率）
    if (obj.node.children && obj.node.children.length > 0 && deltaTime > 64) {
      obj.mesh.rotation.y += 0.005
    }

    // 悬停效果
    if (obj.isHovered) {
        obj.mesh.scale.lerp(new Vector3(1.1, 1.1, 1.1), 0.05) // 减少缩放幅度
    } else {
      obj.mesh.scale.lerp(obj.originalScale, 0.05)
    }
  })

  // 自动旋转
  if (autoRotation.value && deltaTime > 32) {
    scene.rotation.y += props.autoRotationSpeed * 0.008
  }

  renderer.render(scene, camera)
  lastFrameTime = currentTime
}

/**
 * 鼠标移动事件（节流版本）
 */
const onMouseMove = (event: MouseEvent) => {
  if (!canvasContainer.value || !props.enableHover) return

  const rect = canvasContainer.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(
    starObjects.map(obj => obj.mesh),
    true
  )

  // 重置所有悬停状态
  starObjects.forEach(obj => {
    obj.isHovered = false
  })

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object
    let targetMesh: Mesh | null = null

    if (intersectedObject instanceof Mesh) {
      targetMesh = intersectedObject
    } else if (intersectedObject.parent && intersectedObject.parent instanceof Mesh) {
        targetMesh = intersectedObject.parent as Mesh
    }

    if (targetMesh) {
      const starObj = starObjects.find(obj => obj.mesh === targetMesh)
      if (starObj) {
        starObj.isHovered = true
        hoveredNode.value = starObj.node
        hoveredObject.value = targetMesh
      }
    }
  } else {
    hoveredNode.value = null
    hoveredObject.value = null
  }
}

/**
 * 鼠标滚轮事件
 */
const onMouseWheel = (event: WheelEvent) => {
  event.preventDefault()

  const zoomSpeed = 0.1
  const delta = event.deltaY > 0 ? 1 : -1

  const direction = new Vector3()
  camera.getWorldDirection(direction)

  const newPosition = camera.position.clone().add(direction.multiplyScalar(delta * zoomSpeed))

  const distance = newPosition.length()
  if (distance > 10 && distance < 200) {
    camera.position.copy(newPosition)
  }
}

/**
 * 鼠标点击事件
 */
const onMouseClick = (event: MouseEvent) => {
  if (!canvasContainer.value) return

  const rect = canvasContainer.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(
    starObjects.map(obj => obj.mesh),
    true
  )

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object
    let targetMesh: Mesh | null = null

    if (clickedObject instanceof Mesh) {
      targetMesh = clickedObject
    } else if (clickedObject.parent && clickedObject.parent instanceof Mesh) {
      targetMesh = clickedObject.parent as Mesh
    }

    if (targetMesh) {
      const starObj = starObjects.find(obj => obj.mesh === targetMesh)
      if (starObj) {
        handleNodeClick(starObj.node)
      }
    }
  }
}

/**
 * 处理节点点击
 */
const handleNodeClick = (node: GalaxyNode) => {
  if (node.children && node.children.length > 0) {
    currentPath.value.push(node)
    currentData.value = node.children

    zoomIntoGalaxy(() => {
      createGalaxy(node.children!)
    })
  } else {
    if (props.onNodeClick) {
      props.onNodeClick(node)
    }
  }
}

/**
 * 星系扩大动画
 */
const zoomIntoGalaxy = (callback: () => void) => {
  const startPosition = camera.position.clone()
  const targetPosition = new Vector3(0, 0, 25)
  const duration = 1000 // 减少动画时间
  const startTime = Date.now()

  const animateZoom = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    camera.position.lerpVectors(startPosition, targetPosition, easeProgress)

    if (progress < 1) {
      requestAnimationFrame(animateZoom)
    } else {
      callback()
    }
  }

  animateZoom()
}

/**
 * 返回上一级
 */
const goBack = () => {
  if (currentPath.value.length === 0) return

  zoomOutOfGalaxy(() => {
    currentPath.value.pop()

    if (currentPath.value.length === 0) {
      currentData.value = props.data
    } else {
      const parent = currentPath.value[currentPath.value.length - 1]
      currentData.value = parent.children || []
    }

    createGalaxy(currentData.value)
  })
}

/**
 * 星系缩小动画
 */
const zoomOutOfGalaxy = (callback: () => void) => {
  const startPosition = camera.position.clone()
      const targetPosition = new Vector3(0, 0, 50)
  const duration = 1000
  const startTime = Date.now()

  const animateZoom = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    camera.position.lerpVectors(startPosition, targetPosition, easeProgress)

    if (progress < 1) {
      requestAnimationFrame(animateZoom)
    } else {
      callback()
    }
  }

  animateZoom()
}

/**
 * 切换自动旋转
 */
const toggleAutoRotation = () => {
  autoRotation.value = !autoRotation.value
}

/**
 * 重置相机视角
 */
const resetCamera = () => {
  camera.position.set(0, 0, 50)
  camera.lookAt(0, 0, 0)
  scene.rotation.set(0, 0, 0)
}

/**
 * 切换星空显示
 */
const toggleStarField = () => {
  showStarField.value = !showStarField.value
  if (starField) {
    starField.visible = showStarField.value
  }
}

/**
 * 切换性能模式
 */
const togglePerformanceMode = () => {
  performanceMode.value = !performanceMode.value

  // 重新创建场景以应用性能设置
  if (scene) {
    createGalaxy(optimizedData.value)
    createStarField()
  }
}

/**
 * 窗口大小调整
 */
const onWindowResize = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// 生命周期
onMounted(async () => {
  await nextTick()
  await initThreeJS()
  createGalaxy(optimizedData.value)
  animate()
})

onUnmounted(() => {
  // 清理所有资源
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (flyInTimerId) {
    clearInterval(flyInTimerId)
    flyInTimerId = null
  }
  if (memoryMonitorInterval) {
    clearInterval(memoryMonitorInterval)
    memoryMonitorInterval = null
  }

  // 清理Three.js资源
  if (renderer) {
    renderer.dispose()
  }

  // 清理几何体和材质缓存
  geometryCache.forEach(geometry => geometry.dispose())
  materialCache.forEach(material => (material as any).dispose())
  geometryCache.clear()
  materialCache.clear()

  // 清理对象池
  objectPool.forEach(mesh => {
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) (mesh.material as any).dispose()
  })
  objectPool.length = 0

  // 清理星体对象
  starObjects.forEach(obj => {
    if (obj.mesh.geometry) obj.mesh.geometry.dispose()
    if (obj.mesh.material) (obj.mesh.material as any).dispose()
  })
  starObjects = []

  // 清理星空背景
  if (starField) {
    if (starField.geometry) starField.geometry.dispose()
    if (starField.material) (starField.material as any).dispose()
  }

  window.removeEventListener('resize', onWindowResize)
})
</script>

<style lang="less" scoped>
.galaxy-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #000011 0%, #001122 50%, #000011 100%);
  overflow: hidden;
}

.control-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;

  .navigation {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;

    .back-button {
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 25px;
      color: white;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
      }
    }

    .breadcrumb {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      font-weight: 300;

      span {
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    .control-btn {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      color: white;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-1px);
      }
    }
  }

  .performance-info {
    display: flex;
    gap: 15px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(0, 0, 0, 0.3);
    padding: 8px 12px;
    border-radius: 15px;
    backdrop-filter: blur(10px);

    span {
      white-space: nowrap;
    }
  }
}

.canvas-container {
  width: 100%;
  height: 100%;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 200;

  .loading-spinner {
    width: 40px;
  height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  p {
    font-size: 16px;
    margin: 0;
    opacity: 0.8;
  }
}

.info-panel {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  color: white;
  max-width: 250px;
  backdrop-filter: blur(10px);
  z-index: 100;

  h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #ffff00;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    opacity: 0.8;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// 响应式设计
@media (max-width: 768px) {
  .control-panel {
    top: 10px;
    left: 10px;
    right: 10px;

    .navigation {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 10px;

      .back-button {
        padding: 10px 20px;
        font-size: 12px;
      }

      .breadcrumb {
        font-size: 12px;
      }
    }

    .controls {
      flex-wrap: wrap;

      .control-btn {
        padding: 6px 12px;
        font-size: 11px;
      }
    }

    .performance-info {
      flex-direction: column;
      gap: 5px;
      font-size: 10px;
    }
  }

  .info-panel {
    bottom: 10px;
    right: 10px;
    left: 10px;
    max-width: none;

    h3 {
      font-size: 14px;
    }

    p {
      font-size: 12px;
    }
  }
}
</style>
