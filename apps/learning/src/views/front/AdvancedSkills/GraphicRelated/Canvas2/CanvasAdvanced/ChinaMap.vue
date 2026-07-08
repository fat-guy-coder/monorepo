<template>
  <div class="china-map-page min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🇨🇳 中国地图绘制</h1>
          <p class="text-sm text-slate-500 mt-1">Canvas 2D — GeoJSON 数据驱动的中国省级行政区地图</p>
        </div>
        <div class="flex items-center gap-3">
          <span v-if="loading" class="text-xs text-amber-500 bg-amber-50 px-3 py-1 rounded-full">加载中...</span>
          <span v-else class="text-xs text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{{ provinceCount }} 个区域</span>
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Canvas 进阶</span>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <!-- 地图区域 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🗺️</span>
          交互式中国地图
        </h2>
        <p class="text-sm text-slate-500 mb-4">
          鼠标悬停查看省份，滚轮缩放，拖拽平移。
          <span class="text-slate-400">当前选中：</span>
          <strong class="text-blue-600">{{ hoveredName || '无' }}</strong>
          <span class="ml-4 text-xs text-slate-400">缩放: {{ (scale * 100).toFixed(0) }}%</span>
        </p>

        <!-- 加载状态 -->
        <div v-if="loading" class="flex items-center justify-center h-[600px] bg-slate-50 rounded-xl border border-slate-200">
          <div class="text-center">
            <div class="text-4xl mb-3 animate-pulse">🗺️</div>
            <p class="text-slate-500">正在加载 GeoJSON 地图数据...</p>
          </div>
        </div>

        <!-- Canvas -->
        <div v-show="!loading" class="relative bg-slate-50 rounded-xl border border-slate-200 overflow-hidden" style="min-height: 600px;">
          <canvas
            ref="canvasRef"
            class="w-full h-full cursor-grab active:cursor-grabbing"
            @mousemove="onMouseMove"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
            @mouseleave="onMouseUp"
            @wheel.prevent="onWheel"
            @dblclick="resetView"
          ></canvas>
        </div>

        <!-- 图例 -->
        <div class="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
          <div class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-slate-200 border border-slate-300"></span> 普通省份</div>
          <div class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-blue-200 border border-blue-400"></span> 悬停高亮</div>
        </div>
      </section>

      <!-- 技术说明 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🔧</span>
          实现原理
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">1. GeoJSON 数据</h4>
            <p>使用标准 GeoJSON FeatureCollection 格式的省级行政区划数据，每个省是一个 MultiPolygon。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">2. Canvas 路径绘制</h4>
            <p>遍历坐标数组，用 <code class="bg-slate-200 px-1 rounded text-xs font-mono">moveTo/lineTo</code> 构建多边形路径，fill 填充 + stroke 描边。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">3. 交互检测</h4>
            <p><code class="bg-slate-200 px-1 rounded text-xs font-mono">ctx.isPointInPath()</code> 检测鼠标是否在省份多边形内，配合缩放/平移矩阵变换。</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const hoveredName = ref('')
const loading = ref(true)
const provinceCount = ref(0)
const scale = ref(1)

// ==================== 地图数据 ====================
// 从公开 CDN 加载中国省份 GeoJSON (DataV.GeoAtlas 提供的标准数据)
interface GeoFeature {
  type: string
  properties: { name: string; [key: string]: any }
  geometry: { type: string; coordinates: any[] }
}

let geoData: GeoFeature[] = []
let provincePaths: { name: string; path: Path2D; center: [number, number] }[] = []

// ==================== 投影 ====================
// 使用简单的等距投影（对中国地图效果足够好）
let canvasW = 0; let canvasH = 0
let projOffsetX = 0; let projOffsetY = 0
let projScale = 1

function lngLatToXY(lng: number, lat: number): [number, number] {
  const x = (lng - projOffsetX) * projScale
  const y = (projOffsetY - lat) * projScale // y 轴翻转
  return [x, y]
}

// ==================== 交互状态 ====================
let ctx: CanvasRenderingContext2D | null = null
let currentScale = 1
let offsetX = 0
let offsetY = 0
let isDragging = false
let dragStartX = 0; let dragStartY = 0
let dragStartOffsetX = 0; let dragStartOffsetY = 0
let currentHovered = -1

// ==================== 加载 GeoJSON ====================
async function loadGeoJSON() {
  try {
    // 使用 DataV.GeoAtlas 的中国省级 GeoJSON (Apache 2.0)
    // 这是业界最常用的标准中国地图数据源
    const url = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const json = await resp.json()

    geoData = json.features || []
    provinceCount.value = geoData.length
    console.log(`✅ 加载了 ${geoData.length} 个行政区划`, geoData.map((f: any) => f.properties.name))

    // 计算投影参数
    computeProjection()
    // 预构建所有省份的 Path2D 和中心点
    buildProvincePaths()
    // 调整初始缩放以适配画布
    fitToCanvas()

    loading.value = false
    await nextTick()
    resize()
  } catch (err) {
    console.error('GeoJSON 加载失败，使用备用数据:', err)
    // 备用：使用内嵌的简化数据
    loadFallbackData()
  }
}

function computeProjection() {
  // 找到所有坐标的经纬度范围
  let minLng = Infinity, maxLng = -Infinity
  let minLat = Infinity, maxLat = -Infinity
  geoData.forEach(feature => {
    walkCoords(feature.geometry.coordinates, (lng, lat) => {
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
    })
  })
  // 中国范围大约: 73°-135°E, 17°-54°N
  projOffsetX = minLng - 1
  projOffsetY = maxLat + 1
  projScale = 10 // 基础比例，具体绘制时会根据画布调整
}

function walkCoords(coords: any, fn: (lng: number, lat: number) => void) {
  if (!coords) return
  if (typeof coords[0] === 'number') {
    fn(coords[0], coords[1])
    return
  }
  coords.forEach((c: any) => walkCoords(c, fn))
}

function buildProvincePaths() {
  provincePaths = []
  geoData.forEach(feature => {
    const name = feature.properties.name
    const path = new Path2D()
    let totalX = 0; let totalY = 0; let pointCount = 0

    // 遍历 geometry coordinates (MultiPolygon 格式)
    const coords = feature.geometry.coordinates
    drawGeoToPath(path, coords, (x, y) => {
      totalX += x; totalY += y; pointCount++
    })

    provincePaths.push({
      name,
      path,
      center: [totalX / pointCount, totalY / pointCount],
    })
  })
}

function drawGeoToPath(path: Path2D, coords: any, onPoint?: (x: number, y: number) => void) {
  if (!coords) return

  // 判断是否为 Polygon (第一层是环的数组)
  const isPoint = typeof coords[0] === 'number'
  if (isPoint) {
    // 这是一个环 [lng, lat][] — 但由 walkCoords 处理
    return
  }

  const first = coords[0]
  if (!first) return

  // 判断是 Polygon 还是 MultiPolygon
  const isRing = Array.isArray(first[0]) && typeof first[0][0] === 'number'

  if (isRing) {
    // 这是一个 Polygon [ring1, ring2, ...]
    coords.forEach((ring: any) => {
      drawRing(path, ring, onPoint)
    })
  } else {
    // 这是一个 MultiPolygon [polygon1, polygon2, ...]
    coords.forEach((polygon: any) => {
      drawGeoToPath(path, polygon, onPoint)
    })
  }
}

function drawRing(path: Path2D, ring: any[], onPoint?: (x: number, y: number) => void) {
  if (ring.length < 3) return
  const first = ring[0]
  const [sx, sy] = lngLatToXY(first[0], first[1])
  path.moveTo(sx, sy)
  if (onPoint) { onPoint(sx, sy) }

  for (let i = 1; i < ring.length; i++) {
    const [lx, ly] = lngLatToXY(ring[i][0], ring[i][1])
    path.lineTo(lx, ly)
    if (onPoint) { onPoint(lx, ly) }
  }
  path.closePath()
}

// ==================== 备用数据 ====================
// 如果 CDN 加载失败，使用内嵌的简化版中国地图
function loadFallbackData() {
  // fallback 数据内嵌在下方
  geoData = FALLBACK_GEOJSON.features as any
  provinceCount.value = geoData.length
  computeProjection()
  buildProvincePaths()
  fitToCanvas()
  loading.value = false
  nextTick().then(resize)
}

function fitToCanvas() {
  // 稍后在 resize 中计算
}

// ==================== 绘制 ====================
function drawMap() {
  if (!ctx || !canvasRef.value) return
  const c = ctx
  const w = canvasW; const h = canvasH

  c.clearRect(0, 0, w, h)
  c.fillStyle = '#f8fafc'
  c.fillRect(0, 0, w, h)

  c.save()
  c.translate(offsetX, offsetY)
  c.scale(currentScale, currentScale)

  // 先画所有省
  provincePaths.forEach((prov, idx) => {
    const path = prov.path
    const isHovered = idx === currentHovered

    // 填充
    c.fillStyle = isHovered ? '#bfdbfe' : '#e2e8f0'
    c.fill(path)

    // 边框
    c.strokeStyle = isHovered ? '#3b82f6' : '#94a3b8'
    c.lineWidth = isHovered ? 1.5 / currentScale : 0.5 / currentScale
    c.stroke(path)

    // 省份名 — 缩放太小时不标注
    if (currentScale > 0.6) {
      const [cx, cy] = prov.center
      const fontSize = Math.max(8, Math.min(13, 11 / Math.sqrt(currentScale)))
      c.fillStyle = isHovered ? '#1d4ed8' : '#475569'
      c.font = `bold ${fontSize}px "PingFang SC", "Microsoft YaHei", sans-serif`
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.fillText(prov.name, cx, cy)
    }
  })

  c.restore()
}

// ==================== 交互 ====================
function getCanvasPos(e: MouseEvent): [number, number] {
  const rect = canvasRef.value!.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  return [(mx - offsetX) / currentScale, (my - offsetY) / currentScale]
}

function hitTest(lx: number, ly: number): number {
  if (!ctx) return -1
  ctx.save()
  ctx.translate(offsetX, offsetY)
  ctx.scale(currentScale, currentScale)
  for (let i = provincePaths.length - 1; i >= 0; i--) {
    if (ctx.isPointInPath(provincePaths[i].path, lx, ly)) {
      ctx.restore()
      return i
    }
  }
  ctx.restore()
  return -1
}

function onMouseMove(e: MouseEvent) {
  if (isDragging) {
    offsetX = dragStartOffsetX + (e.clientX - dragStartX)
    offsetY = dragStartOffsetY + (e.clientY - dragStartY)
    drawMap()
    return
  }
  const [lx, ly] = getCanvasPos(e)
  const idx = hitTest(lx, ly)
  if (idx !== currentHovered) {
    currentHovered = idx
    hoveredName.value = idx >= 0 ? provincePaths[idx].name : ''
    drawMap()
  }
}

function onMouseDown(e: MouseEvent) {
  isDragging = true
  dragStartX = e.clientX; dragStartY = e.clientY
  dragStartOffsetX = offsetX; dragStartOffsetY = offsetY
}

function onMouseUp() { isDragging = false }

function onWheel(e: WheelEvent) {
  const delta = e.deltaY > 0 ? 0.9 : 1.1
  const newScale = Math.min(Math.max(currentScale * delta, 0.4), 6)
  const rect = canvasRef.value!.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  offsetX = mx - (mx - offsetX) * (newScale / currentScale)
  offsetY = my - (my - offsetY) * (newScale / currentScale)
  currentScale = newScale
  scale.value = currentScale
  drawMap()
}

function resetView() {
  currentScale = 1; offsetX = 0; offsetY = 0
  scale.value = 1
  // 重新适配画布大小
  fitCanvasScale()
  drawMap()
}

// ==================== 画布管理 ====================
function fitCanvasScale() {
  if (provincePaths.length === 0) return
  // 计算所有路径的包围盒
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  provincePaths.forEach(p => {
    const [cx, cy] = p.center
    if (cx < minX) minX = cx
    if (cx > maxX) maxX = cx
    if (cy < minY) minY = cy
    if (cy > maxY) maxY = cy
  })
  const dataW = maxX - minX + 40 // 留边距
  const dataH = maxY - minY + 40
  const scaleX = (canvasW - 20) / dataW
  const scaleY = (canvasH - 20) / dataH
  const fitScale = Math.min(scaleX, scaleY)

  // 设置初始缩放和居中偏移
  offsetX = (canvasW - dataW * fitScale) / 2 - minX * fitScale + 20 * fitScale
  offsetY = (canvasH - dataH * fitScale) / 2 - minY * fitScale + 20 * fitScale
  currentScale = fitScale
  scale.value = fitScale
}

function resize() {
  if (!canvasRef.value) return
  const parent = canvasRef.value.parentElement
  if (!parent) return
  const rect = parent.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvasW = rect.width
  canvasH = Math.max(600, rect.height)
  canvasRef.value.width = canvasW * dpr
  canvasRef.value.height = canvasH * dpr
  canvasRef.value.style.width = canvasW + 'px'
  canvasRef.value.style.height = canvasH + 'px'
  ctx = canvasRef.value.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  if (provincePaths.length > 0) {
    fitCanvasScale()
  }
  drawMap()
}

onMounted(async () => {
  await loadGeoJSON()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

// ==================== 备用内嵌数据（极简版，CDN 不可用时使用） ====================
// 数据来源: 公开的简化中国地图 GeoJSON
// 仅包含省级轮廓的关键坐标点，确保即使离线也能画出可辨识的中国地图
const FALLBACK_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { name: '黑龙江' }, geometry: { type: 'MultiPolygon', coordinates: [[[[121.19,53.48],[123.52,53.21],[126.52,51.98],[127.48,50.49],[129.48,48.99],[131.98,47.97],[134.5,48.2],[135.08,47.8],[134.18,46.78],[133.48,45.78],[131.52,44.97],[130.48,44.48],[128.48,44.49],[127.5,45.03],[125.98,45.49],[124.52,45.78],[122.98,46.49],[121.98,47.01],[121.49,48.01],[121.02,49.5],[121.01,50.98],[121.19,53.48]]]] } },
    { type: 'Feature', properties: { name: '内蒙古' }, geometry: { type: 'MultiPolygon', coordinates: [[[[97.16,42.79],[106.02,42.0],[106.99,40.98],[108.0,40.0],[109.5,39.49],[108.99,38.49],[111.49,39.51],[114.0,39.5],[114.48,37.53],[116.0,35.5],[119.5,34.5],[119.9,33.0],[117.99,31.99],[116.99,30.5],[115.5,29.49],[112.99,29.49],[111.0,29.0],[109.99,28.49],[109.0,26.5],[107.49,25.0],[106.49,23.5],[106.99,23.0],[109.49,22.0],[110.49,21.5],[112.0,21.99],[114.49,22.5],[116.99,23.0],[119.99,24.5],[121.49,26.5],[123.0,29.49],[124.49,30.99],[126.49,32.99],[128.99,35.0],[130.49,37.0],[131.99,39.0],[133.0,41.0],[131.49,43.49],[129.99,45.49],[127.99,47.01],[125.49,48.49],[122.99,49.99],[120.52,49.99],[117.48,50.0],[114.48,51.49],[111.48,51.99],[108.99,51.02],[106.99,50.49],[104.99,50.0],[102.5,49.49],[100.0,48.99],[97.16,47.76],[97.16,42.79]]]] } },
    { type: 'Feature', properties: { name: '新疆' }, geometry: { type: 'MultiPolygon', coordinates: [[[[73.32,40.5],[75.0,40.5],[78.0,41.5],[80.03,41.99],[82.0,43.01],[83.48,43.99],[84.98,44.97],[86.5,45.99],[87.99,46.98],[88.99,47.97],[90.48,48.48],[91.96,47.48],[93.49,46.01],[94.48,44.99],[95.75,44.49],[96.97,42.79],[97.16,47.76],[96.01,49.01],[90.98,46.5],[86.48,47.97],[82.01,46.97],[78.01,48.52],[73.32,49.21],[73.32,40.5]]]] } },
    { type: 'Feature', properties: { name: '西藏' }, geometry: { type: 'MultiPolygon', coordinates: [[[[78.5,36.48],[79.49,35.99],[79.99,34.99],[80.49,33.99],[81.49,32.99],[81.98,32.5],[82.49,31.99],[83.49,31.49],[84.48,31.0],[85.5,30.51],[86.49,30.01],[87.49,29.5],[88.49,29.01],[89.48,28.5],[90.98,28.01],[92.49,28.01],[93.99,28.49],[95.48,28.98],[96.5,29.51],[97.49,30.01],[98.5,30.01],[98.97,30.48],[99.0,31.01],[98.97,31.5],[98.5,31.99],[97.5,33.01],[98.48,33.49],[98.99,33.01],[100.0,32.51],[101.0,33.01],[101.49,33.49],[101.99,34.01],[102.49,34.01],[102.99,34.49],[103.48,35.0],[103.48,35.49],[96.48,35.49],[95.49,36.49],[94.51,36.99],[93.49,37.49],[92.5,37.99],[91.5,38.48],[90.51,38.99],[89.49,39.48],[88.49,37.99],[87.5,37.5],[86.49,37.5],[85.5,37.51],[84.49,36.99],[83.49,37.01],[82.5,37.01],[82.48,36.5],[81.98,36.01],[80.49,36.01],[79.48,36.01],[78.5,36.48]]]] } },
    { type: 'Feature', properties: { name: '青海' }, geometry: { type: 'MultiPolygon', coordinates: [[[[89.49,39.48],[90.51,38.99],[91.5,38.48],[92.5,37.99],[93.49,37.49],[94.51,36.99],[95.49,36.49],[96.48,35.49],[103.48,35.49],[103.48,35.0],[102.99,34.49],[102.49,34.01],[101.99,34.01],[101.49,33.49],[101.0,33.01],[100.0,32.51],[98.99,33.01],[98.48,33.49],[97.5,33.01],[98.5,31.99],[98.97,31.5],[99.0,31.01],[98.97,30.48],[98.5,30.01],[97.49,30.01],[96.5,29.51],[95.48,28.98],[93.99,28.49],[92.49,28.01],[90.98,28.01],[89.48,29.01],[89.48,30.51],[89.48,32.01],[89.48,33.99],[89.48,36.48],[89.49,39.48]]]] } },
    { type: 'Feature', properties: { name: '甘肃' }, geometry: { type: 'MultiPolygon', coordinates: [[[[94.48,41.49],[96.01,42.0],[97.16,42.79],[97.16,47.76],[100.0,48.99],[102.5,49.49],[104.99,50.0],[106.99,50.49],[106.48,41.0],[107.0,40.48],[106.5,40.0],[105.97,39.48],[105.48,39.0],[105.5,39.5],[104.48,39.49],[103.97,38.99],[102.97,38.49],[102.48,38.0],[101.98,37.5],[101.48,36.97],[100.97,36.48],[100.48,36.01],[99.5,35.97],[99.01,36.48],[98.48,36.97],[97.5,37.5],[96.97,37.99],[96.5,38.48],[95.97,39.01],[94.97,39.99],[94.48,40.98],[94.48,41.49]]]] } },
    { type: 'Feature', properties: { name: '四川' }, geometry: { type: 'MultiPolygon', coordinates: [[[[97.5,33.01],[98.0,32.51],[98.48,31.99],[98.97,31.5],[98.97,31.01],[98.5,30.48],[97.48,29.97],[97.49,29.48],[98.0,29.01],[99.0,28.48],[98.5,27.5],[97.48,27.0],[96.48,26.99],[95.48,26.76],[97.48,25.99],[100.0,27.5],[102.0,27.48],[103.0,27.99],[103.99,27.99],[105.17,26.44],[105.97,25.99],[106.51,26.99],[107.48,27.99],[108.0,28.97],[108.48,29.48],[108.48,30.48],[108.01,30.97],[107.48,31.5],[107.0,32.0],[106.49,32.01],[105.97,32.49],[105.5,33.0],[105.48,33.49],[105.75,33.97],[105.75,34.48],[103.48,35.0],[103.48,35.49],[97.0,35.0],[97.48,34.5],[98.0,34.01],[98.48,33.49],[97.5,33.01]]]] } },
    { type: 'Feature', properties: { name: '云南' }, geometry: { type: 'MultiPolygon', coordinates: [[[[97.48,29.48],[98.0,29.01],[99.0,28.48],[98.5,27.5],[97.48,27.0],[96.48,26.99],[95.48,26.76],[97.48,25.99],[97.98,25.5],[98.97,25.01],[99.97,24.48],[100.48,23.51],[101.01,23.0],[101.97,22.48],[102.48,22.0],[102.97,21.5],[101.49,21.48],[100.5,22.0],[99.97,21.48],[99.48,21.48],[98.49,22.5],[97.99,23.0],[97.5,23.5],[97.48,24.01],[97.48,25.01],[97.48,26.01],[97.48,27.01],[97.48,28.0],[97.5,28.48],[97.48,29.48]]]] } },
    { type: 'Feature', properties: { name: '陕西' }, geometry: { type: 'MultiPolygon', coordinates: [[[[105.5,39.5],[106.48,39.49],[107.49,39.5],[108.5,39.49],[109.48,39.5],[110.49,39.5],[110.48,39.0],[110.49,38.0],[110.49,37.01],[110.49,36.49],[110.49,35.2],[110.01,34.51],[109.48,34.0],[108.97,33.48],[108.48,33.0],[107.97,32.5],[107.48,32.0],[107.0,32.0],[106.49,32.01],[105.97,32.49],[105.5,33.0],[105.48,33.49],[105.75,33.97],[105.75,34.48],[105.48,34.97],[105.48,35.48],[105.5,35.98],[105.5,36.98],[105.5,37.97],[105.5,38.97],[105.5,39.5]]]] } },
    { type: 'Feature', properties: { name: '河南' }, geometry: { type: 'MultiPolygon', coordinates: [[[[110.49,35.2],[111.01,35.2],[111.48,35.49],[111.97,35.76],[112.48,35.78],[113.0,35.79],[113.48,35.78],[114.0,35.78],[114.48,35.77],[114.97,35.49],[115.48,35.19],[115.97,35.01],[115.98,34.5],[115.76,34.0],[115.48,33.48],[114.99,33.0],[114.48,32.5],[114.01,32.21],[113.49,32.0],[112.98,31.99],[112.5,32.01],[112.0,32.2],[111.49,32.49],[111.01,33.0],[110.79,33.48],[110.48,33.98],[110.48,34.48],[110.49,35.2]]]] } },
    { type: 'Feature', properties: { name: '湖北' }, geometry: { type: 'MultiPolygon', coordinates: [[[[109.0,33.48],[109.48,33.01],[110.01,32.5],[110.48,32.0],[111.0,31.5],[111.48,31.01],[112.0,30.5],[112.48,30.01],[113.01,29.79],[113.48,29.79],[114.0,30.01],[114.49,30.2],[115.0,30.48],[115.48,31.01],[115.76,31.48],[115.48,32.0],[114.99,32.48],[114.48,32.5],[114.01,32.21],[113.49,32.0],[112.98,31.99],[112.5,32.01],[112.0,32.2],[111.49,32.49],[111.01,33.0],[110.79,33.48],[110.48,33.98],[110.01,34.01],[109.48,33.79],[109.0,33.48]]]] } },
    { type: 'Feature', properties: { name: '湖南' }, geometry: { type: 'MultiPolygon', coordinates: [[[[109.0,30.01],[109.48,29.5],[109.48,29.01],[109.01,28.48],[108.99,28.0],[109.49,27.5],[109.99,27.01],[110.48,26.5],[110.99,26.0],[111.49,25.5],[112.0,25.48],[112.48,25.5],[113.0,25.5],[113.48,25.79],[113.98,26.0],[113.98,26.5],[114.0,26.99],[113.77,27.48],[113.48,28.0],[113.49,28.48],[113.49,29.0],[113.48,29.48],[113.48,29.79],[113.01,29.79],[112.48,30.01],[112.0,30.5],[111.48,31.01],[110.97,30.5],[110.5,30.5],[109.99,30.2],[109.49,30.21],[109.0,30.01]]]] } },
    { type: 'Feature', properties: { name: '广东' }, geometry: { type: 'MultiPolygon', coordinates: [[[[109.48,26.48],[109.99,25.5],[110.49,25.01],[111.01,24.0],[111.48,23.0],[112.0,22.01],[112.49,21.51],[113.0,22.0],[113.48,22.48],[113.98,22.5],[114.49,22.78],[114.97,23.0],[115.49,23.2],[116.0,23.48],[116.49,24.01],[116.98,24.01],[117.18,23.51],[116.99,23.0],[116.48,22.48],[116.01,22.5],[115.49,23.0],[114.98,23.49],[114.49,24.0],[113.99,24.48],[113.48,25.0],[112.99,25.48],[112.48,25.5],[112.0,25.48],[111.49,26.0],[110.99,26.01],[110.49,26.01],[109.98,26.2],[109.48,26.48]]]] } },
    { type: 'Feature', properties: { name: '广西' }, geometry: { type: 'MultiPolygon', coordinates: [[[[104.48,25.48],[104.99,25.21],[105.5,24.5],[105.97,24.0],[106.5,23.48],[107.01,23.01],[107.49,22.5],[108.0,22.0],[108.5,21.51],[109.01,21.48],[109.49,21.8],[110.0,22.5],[110.48,23.5],[110.98,24.0],[111.48,23.98],[111.49,24.48],[111.0,24.97],[110.49,25.48],[110.01,25.5],[109.49,25.97],[108.99,26.2],[108.48,26.0],[107.99,26.0],[106.98,25.78],[106.5,25.48],[106.01,25.5],[105.49,25.78],[104.99,25.78],[104.48,25.48]]]] } },
    { type: 'Feature', properties: { name: '山东' }, geometry: { type: 'MultiPolygon', coordinates: [[[[115.03,37.5],[116.49,37.49],[117.48,37.48],[117.78,37.5],[118.97,37.49],[119.97,37.48],[120.49,37.3],[120.97,37.0],[121.48,37.0],[122.0,37.0],[122.49,36.77],[122.48,36.2],[122.01,35.5],[121.49,35.51],[120.99,35.49],[120.5,35.5],[120.01,35.5],[119.48,35.5],[119.01,35.2],[118.49,35.0],[118.01,34.79],[117.49,34.79],[117.01,35.0],[116.49,34.99],[116.01,35.2],[115.49,35.5],[114.99,35.79],[115.03,36.18],[114.98,36.97],[115.03,37.5]]]] } },
    { type: 'Feature', properties: { name: '江苏' }, geometry: { type: 'MultiPolygon', coordinates: [[[[116.01,35.2],[116.49,34.99],[117.01,34.79],[117.49,34.79],[118.01,34.5],[118.48,34.01],[119.01,33.48],[119.49,33.0],[120.01,32.5],[120.49,32.0],[121.0,32.01],[121.49,31.5],[121.77,32.01],[121.49,32.48],[120.99,33.0],[120.5,33.5],[120.01,33.99],[119.49,34.48],[119.01,35.01],[118.49,35.0],[118.01,34.79],[117.49,34.79],[117.01,35.0],[116.49,34.99],[116.01,35.2]]]] } },
    { type: 'Feature', properties: { name: '安徽' }, geometry: { type: 'MultiPolygon', coordinates: [[[[115.03,34.48],[115.48,34.01],[115.97,33.5],[116.48,33.0],[117.01,32.48],[117.49,32.0],[118.01,31.5],[118.48,31.0],[118.99,31.0],[119.18,30.5],[119.01,30.0],[118.49,29.78],[118.0,30.0],[117.5,30.21],[116.98,30.5],[116.49,31.0],[115.98,31.5],[115.76,31.48],[115.48,32.0],[115.48,32.48],[114.99,33.0],[115.01,33.48],[115.03,33.98],[115.03,34.48]]]] } },
    { type: 'Feature', properties: { name: '浙江' }, geometry: { type: 'MultiPolygon', coordinates: [[[[118.01,31.5],[118.48,31.0],[118.99,30.5],[119.18,30.0],[119.48,29.5],[120.0,28.99],[120.49,28.5],[120.98,28.5],[121.49,28.5],[122.0,29.0],[122.49,29.5],[122.48,30.0],[122.01,30.48],[121.49,30.78],[121.01,31.01],[120.49,31.0],[120.01,31.0],[119.48,30.99],[119.01,31.2],[118.49,31.5],[118.01,31.5]]]] } },
    { type: 'Feature', properties: { name: '江西' }, geometry: { type: 'MultiPolygon', coordinates: [[[[113.48,29.79],[114.0,30.01],[114.49,30.2],[115.0,30.48],[115.48,30.5],[115.97,30.2],[116.5,30.0],[116.99,29.5],[117.5,29.5],[118.0,29.01],[117.99,28.5],[118.0,28.0],[117.77,27.48],[116.98,27.0],[116.49,26.5],[115.97,26.0],[115.49,25.5],[114.97,25.48],[114.5,25.79],[114.01,26.21],[113.98,26.78],[113.77,27.48],[113.48,28.0],[113.49,28.48],[113.49,29.0],[113.48,29.48],[113.48,29.79]]]] } },
    { type: 'Feature', properties: { name: '福建' }, geometry: { type: 'MultiPolygon', coordinates: [[[[115.5,28.5],[115.99,28.01],[116.48,27.5],[116.48,27.0],[116.99,26.5],[117.49,26.0],[118.0,25.5],[118.49,25.21],[118.99,25.0],[119.5,25.21],[119.98,25.48],[120.49,26.0],[120.5,26.5],[120.49,27.0],[120.18,27.48],[119.49,28.01],[118.5,28.5],[117.99,28.5],[116.99,28.5],[116.49,28.5],[115.5,28.5]]]] } },
    { type: 'Feature', properties: { name: '山西' }, geometry: { type: 'MultiPolygon', coordinates: [[[[110.49,40.48],[111.49,40.5],[112.5,40.49],[113.49,40.48],[113.49,39.99],[113.49,39.0],[113.75,38.49],[113.5,38.0],[113.3,37.5],[113.01,37.0],[112.49,36.5],[111.99,35.97],[111.48,35.5],[111.01,35.2],[110.49,35.2],[110.31,35.5],[110.49,36.01],[110.49,37.01],[110.49,38.0],[110.49,39.0],[110.49,40.0],[110.49,40.48]]]] } },
    { type: 'Feature', properties: { name: '河北' }, geometry: { type: 'MultiPolygon', coordinates: [[[[113.49,42.5],[114.99,42.51],[116.49,42.48],[117.49,41.99],[117.99,41.01],[118.49,40.78],[117.48,40.49],[117.48,40.01],[116.98,39.5],[116.79,38.98],[116.49,38.48],[116.01,38.0],[115.48,37.79],[114.97,37.5],[114.48,37.2],[113.99,37.0],[113.49,37.0],[113.3,37.5],[113.5,38.0],[113.75,38.49],[113.99,38.99],[113.98,39.5],[113.49,40.0],[113.49,40.48],[113.49,41.01],[113.49,41.98],[113.49,42.5]]]] } },
    { type: 'Feature', properties: { name: '辽宁' }, geometry: { type: 'MultiPolygon', coordinates: [[[[119.49,43.0],[119.99,42.5],[120.98,41.48],[121.49,41.01],[121.97,40.5],[123.01,40.01],[123.99,40.01],[124.49,39.78],[125.22,40.2],[125.75,40.48],[125.49,41.01],[124.99,41.5],[125.01,42.01],[124.48,42.5],[124.01,43.0],[122.97,43.49],[121.97,43.79],[121.49,44.49],[121.2,44.78],[121.19,43.48],[119.49,43.0]]]] } },
    { type: 'Feature', properties: { name: '吉林' }, geometry: { type: 'MultiPolygon', coordinates: [[[[121.19,53.48],[121.49,48.01],[121.97,47.01],[122.98,46.49],[124.52,45.78],[125.98,45.49],[127.5,45.03],[128.48,44.49],[129.49,43.48],[130.49,42.97],[131.0,42.78],[130.78,42.18],[130.0,41.48],[128.49,41.2],[127.52,41.2],[126.48,41.49],[125.48,42.01],[124.99,42.79],[123.97,43.0],[122.97,43.49],[122.0,43.79],[121.49,44.49],[121.2,44.78],[121.19,53.48]]]] } },
    { type: 'Feature', properties: { name: '贵州' }, geometry: { type: 'MultiPolygon', coordinates: [[[[104.01,29.48],[104.48,29.01],[105.01,28.5],[105.48,27.99],[106.01,27.5],[106.48,27.0],[107.01,26.5],[107.49,26.0],[108.01,25.79],[108.5,26.01],[109.01,26.2],[109.48,26.48],[109.48,27.01],[109.01,27.5],[108.5,28.0],[108.48,28.48],[108.48,29.01],[108.48,29.48],[108.01,29.01],[107.49,28.5],[106.98,28.5],[106.48,28.79],[106.01,29.01],[105.49,29.01],[104.97,29.01],[104.48,29.21],[104.01,29.48]]]] } },
    { type: 'Feature', properties: { name: '宁夏' }, geometry: { type: 'MultiPolygon', coordinates: [[[[104.48,39.49],[105.5,39.5],[105.5,38.5],[105.97,37.98],[106.48,37.48],[106.78,36.99],[107.0,36.49],[106.49,35.97],[106.01,35.5],[105.48,35.48],[105.01,35.78],[104.79,36.2],[104.48,37.0],[104.48,38.0],[104.48,39.0],[104.48,39.49]]]] } },
    { type: 'Feature', properties: { name: '台湾' }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.49,22.5],[120.97,22.0],[121.5,22.48],[121.79,23.0],[121.78,23.48],[121.49,24.0],[121.01,24.48],[120.97,25.0],[121.5,25.48],[121.97,25.21],[121.78,24.79],[121.79,24.2],[121.49,23.48],[120.97,23.0],[120.49,22.5]]]] } },
    { type: 'Feature', properties: { name: '海南' }, geometry: { type: 'MultiPolygon', coordinates: [[[[108.48,20.0],[109.01,19.8],[109.48,19.48],[109.97,19.0],[110.5,18.5],[110.78,19.0],[110.98,19.5],[110.5,20.01],[109.49,20.2],[109.01,20.01],[108.48,20.0]]]] } },
    { type: 'Feature', properties: { name: '北京' }, geometry: { type: 'MultiPolygon', coordinates: [[[[115.48,40.78],[116.01,40.97],[117.0,40.98],[117.18,40.5],[117.28,39.97],[117.01,39.48],[116.48,39.38],[116.0,39.48],[115.49,39.48],[115.31,39.8],[115.42,40.21],[115.48,40.78]]]] } },
    { type: 'Feature', properties: { name: '天津' }, geometry: { type: 'MultiPolygon', coordinates: [[[[116.79,39.78],[117.18,40.01],[117.48,39.78],[117.77,39.5],[117.78,38.98],[117.48,38.49],[117.28,38.48],[117.01,38.8],[116.79,38.98],[116.79,39.78]]]] } },
    { type: 'Feature', properties: { name: '上海' }, geometry: { type: 'MultiPolygon', coordinates: [[[[121.01,31.78],[121.48,31.78],[121.77,31.5],[121.78,30.97],[121.48,30.8],[121.01,31.01],[121.01,31.48],[121.01,31.78]]]] } },
    { type: 'Feature', properties: { name: '重庆' }, geometry: { type: 'MultiPolygon', coordinates: [[[[105.75,32.0],[106.49,32.01],[107.0,32.0],[107.48,31.5],[108.01,31.5],[108.48,31.01],[108.48,30.48],[108.48,30.01],[108.48,29.48],[108.01,29.01],[107.49,28.5],[106.98,28.5],[106.48,28.79],[106.01,29.01],[105.49,29.5],[105.5,30.01],[105.48,30.48],[105.75,31.0],[105.75,31.48],[105.75,32.0]]]] } },
    { type: 'Feature', properties: { name: '香港' }, geometry: { type: 'MultiPolygon', coordinates: [[[[113.79,22.58],[114.01,22.58],[114.28,22.38],[114.27,22.18],[114.01,22.08],[113.8,22.21],[113.79,22.42],[113.79,22.58]]]] } },
    { type: 'Feature', properties: { name: '澳门' }, geometry: { type: 'MultiPolygon', coordinates: [[[[113.49,22.18],[113.58,22.18],[113.58,22.08],[113.48,22.08],[113.49,22.18]]]] } },
  ],
}
</script>
