<template>
  <div class="image-magnifier">
    <div class="preview-container">
      <img ref="imageRef" :src="src" :alt="alt" class="original-image" @mouseenter="showMagnified"
        @mousemove="updateMagnifierPosition" @mouseleave="hideMagnified" />

      <div v-show="showLens" class="zoom-lens" :style="{ left: lensPosition.x + 'px', top: lensPosition.y + 'px' }">
      </div>
    </div>

    <div v-show="showMagnifier" class="magnified-container" :style="{
      backgroundImage: `url(${magnifiedSrc || src})`,
      backgroundPosition: `${-backgroundPosition.x}px ${-backgroundPosition.y}px`,
      backgroundSize: `${naturalWidth * zoomLevel}px ${naturalHeight * zoomLevel}px`,
      width: magnifiedWidth + 'px',
      height: magnifiedHeight + 'px',
    }">
      <div class="zoom-level-indicator">放大: {{ zoomLevel }}x</div>
    </div>

    <div class="controls" v-if="showControls">
      <div class="zoom-controls">
        <button @click="zoomOut" :disabled="zoomLevel <= minZoom">
          <svg viewBox="0 0 24 24">
            <path d="M19,13H5V11H19V13Z" />
          </svg>
        </button>
        <div class="zoom-value">{{ zoomLevel }}x</div>
        <button @click="zoomIn" :disabled="zoomLevel >= maxZoom">
          <svg viewBox="0 0 24 24">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  src: string; // 原始图片URL
  alt?: string; // 图片替代文本
  magnifiedSrc?: string; // 高清放大图片URL (可选)
  zoomLevel?: number; // 初始缩放级别
  magnifiedWidth?: number; // 放大区域宽度
  magnifiedHeight?: number; // 放大区域高度
  lensSize?: number; // 放大镜尺寸
  showControls?: boolean; // 是否显示控制条
  minZoom?: number; // 最小缩放级别
  maxZoom?: number; // 最大缩放级别
}

const props = withDefaults(defineProps<Props>(), {
  alt: '放大预览图片',
  zoomLevel: 2,
  magnifiedWidth: 300,
  magnifiedHeight: 300,
  lensSize: 120,
  showControls: true,
  minZoom: 1.5,
  maxZoom: 5,
});

// DOM引用
const imageRef = ref<HTMLImageElement | null>(null);

// 放大镜状态
const showMagnifier = ref(false);
const showLens = ref(false);
const naturalWidth = ref(0);
const naturalHeight = ref(0);
const zoomLevel = ref(props.zoomLevel);

// 位置坐标
const lensPosition = ref({ x: 0, y: 0 });
const backgroundPosition = ref({ x: 0, y: 0 });

// 显示放大镜
const showMagnified = () => {
  if (!imageRef.value) return;

  // 确保图片已完成加载
  if (naturalWidth.value === 0) {
    naturalWidth.value = imageRef.value.naturalWidth;
    naturalHeight.value = imageRef.value.naturalHeight;
  }

  showMagnifier.value = true;
  showLens.value = true;
};

// 隐藏放大镜
const hideMagnified = () => {
  showMagnifier.value = false;
  showLens.value = false;
};

// 更新放大镜位置
const updateMagnifierPosition = (e: MouseEvent) => {
  if (!imageRef.value || !showMagnifier.value) return;

  const img = imageRef.value;
  const rect = img.getBoundingClientRect();

  // 计算鼠标在图片上的相对位置
  const x = e.pageX - rect.left - window.scrollX;
  const y = e.pageY - rect.top - window.scrollY;

  // 确保放大镜在图片范围内
  const maxX = img.clientWidth - props.lensSize;
  const maxY = img.clientHeight - props.lensSize;

  // 更新放大镜位置
  lensPosition.value = {
    x: Math.max(0, Math.min(x - props.lensSize / 2, maxX)),
    y: Math.max(0, Math.min(y - props.lensSize / 2, maxY))
  };

  // 计算背景位置 (考虑缩放级别)
  const bgX = (lensPosition.value.x / img.clientWidth) * naturalWidth.value * zoomLevel.value;
  const bgY = (lensPosition.value.y / img.clientHeight) * naturalHeight.value * zoomLevel.value;

  backgroundPosition.value = { x: bgX, y: bgY };
};

// 放大功能
const zoomIn = () => {
  if (zoomLevel.value < props.maxZoom) {
    zoomLevel.value += 0.5;
  }
};

// 缩小功能
const zoomOut = () => {
  if (zoomLevel.value > props.minZoom) {
    zoomLevel.value -= 0.5;
  }
};

// 响应式处理 (监听窗口变化)
const handleResize = () => {
  if (!imageRef.value) return;

  naturalWidth.value = imageRef.value.naturalWidth;
  naturalHeight.value = imageRef.value.naturalHeight;
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('resize', handleResize);

  // 确保图片加载完成后获取尺寸
  if (imageRef.value?.complete) {
    naturalWidth.value = imageRef.value.naturalWidth;
    naturalHeight.value = imageRef.value.naturalHeight;
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

// 颜色变量
@magnifier-bg: #ffffff;
@border-color: #e0e0e0;
@shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
@primary-color: #4361ee;
@primary-light: rgba(67, 97, 238, 0.15);
@text-color: #333333;
@text-light: #777777;

.image-magnifier {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Inter', sans-serif;
  max-width: fit-content;
}

.preview-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: @shadow;
  cursor: zoom-in;
}

.original-image {
  display: block;
  max-width: 100%;
  height: auto;
  transition: transform 0.2s ease;
  border-radius: 8px;

  &:hover {
    transform: scale(1.01);
  }
}

.zoom-lens {
  position: absolute;
  width: v-bind('props.lensSize + "px"');
  height: v-bind('props.lensSize + "px"');
  border: 2px solid @primary-color;
  border-radius: 50%;
  background-color: @primary-light;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 10;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
}

.magnified-container {
  position: absolute;
  left: calc(100% + 20px);
  top: 0;
  border-radius: 8px;
  border: 1px solid @border-color;
  overflow: hidden;
  box-shadow: @shadow;
  background-color: @magnifier-bg;
  background-repeat: no-repeat;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid @border-color;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: -9px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid @magnifier-bg;
  }
}

.zoom-level-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.65);
  color: white;
  font-size: 0.85rem;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
  z-index: 5;
}

.controls {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: lighten(@magnifier-bg, 1%);
  border: 1px solid @border-color;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.zoom-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid @border-color;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;

    svg {
      width: 20px;
      height: 20px;
      fill: @text-color;
    }

    &:hover:not(:disabled) {
      background-color: @primary-light;
      border-color: @primary-color;

      svg {
        fill: @primary-color;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.zoom-value {
  min-width: 60px;
  text-align: center;
  font-weight: 600;
  color: @text-color;
}

// 响应式设计
@media (max-width: 768px) {
  .image-magnifier {
    flex-direction: column;
  }

  .magnified-container {
    position: relative;
    left: 0;
    top: 20px;
    width: 100% !important;
    height: 300px;

    &::before,
    &::after {
      display: none;
    }
  }
}
</style>
