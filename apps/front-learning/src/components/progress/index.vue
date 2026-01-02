<template>
  <div
    class="ui-progress"
    :class="[
      `ui-progress--shape-${shape}`,
      { 'has-shine': shine && shape !== 'dots' }
    ]"
  >
    <!-- Bar and Shuttle Shapes -->
    <div v-if="shape === 'bar' || shape === 'shuttle'" class="ui-progress__track">
      <div class="ui-progress__fill" :style="{ width: `${value}%` }"></div>
    </div>

    <!-- Dots Shape -->
    <div v-if="shape === 'dots'" class="ui-progress__dots-container">
      <span
        v-for="i in 10" 
        :key="i"
        class="ui-progress__dot"
        :class="[
          `dot-shape--${dotShape}`,
          { 'is-active': i * 10 <= value }
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'ProgressComponent',
})

withDefaults(
  defineProps<{
    /** 进度值 (0-100) */
    value?: number
    /** 形状: 'bar', 'shuttle', 'dots' */
    shape?: 'bar' | 'shuttle' | 'dots'
    /** 点的形状 (仅当 shape='dots' 时生效): 'circle', 'rect', 'arrow' */
    dotShape?: 'circle' | 'rect' | 'arrow'
    /** 是否显示闪光效果 (对 'dots' 无效) */
    shine?: boolean
  }>(),
  {
    value: 0,
    shape: 'bar',
    dotShape: 'circle',
    shine: false,
  },
)
</script>

<style lang="less" scoped>
.ui-progress {
  // --- 自有 CSS 变量定义 ---
  --progress-height: 0.5rem;
  --progress-bg: var(--color-fill-tertiary);
  --progress-fill-bg: var(--color-primary);
  --progress-radius: var(--border-radius-full);
  --progress-dot-size: 0.625rem;
  --progress-dot-gap: 0.5rem;
  --progress-dot-color: var(--color-border);
  --progress-dot-active-color: var(--color-primary);

  width: 100%;
  position: relative;
}

.ui-progress__track {
  width: 100%;
  height: var(--progress-height);
  background-color: var(--progress-bg);
  border-radius: var(--progress-radius);
  overflow: hidden;
}

.ui-progress__fill {
  height: 100%;
  background-color: var(--progress-fill-bg);
  border-radius: var(--progress-radius);
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

// --- 形状变体 ---
.ui-progress--shape-bar {
  --progress-radius: var(--border-radius-sm);
}

.ui-progress--shape-shuttle {
  --progress-radius: var(--border-radius-full);
}

// --- 闪光效果 ---
.has-shine .ui-progress__fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  animation: progress-shine 1.5s linear infinite;
  opacity: 0.6;
}

@keyframes progress-shine {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 0;
  }
}

// --- 点状样式 ---
.ui-progress--shape-dots {
  .ui-progress__dots-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--progress-dot-gap);
  }

  .ui-progress__dot {
    flex-shrink: 0;
    width: var(--progress-dot-size);
    height: var(--progress-dot-size);
    background-color: var(--progress-dot-color);
    transition: background-color 0.4s ease;

    &.is-active {
      background-color: var(--progress-dot-active-color);
    }
  }

  .dot-shape--circle {
    border-radius: 50%;
  }

  .dot-shape--rect {
    border-radius: 0;
  }

  .dot-shape--arrow {
    background-color: transparent;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--progress-dot-color);
      clip-path: polygon(40% 0%, 100% 50%, 40% 100%, 0% 100%, 60% 50%, 0% 0%);
      transition: background-color 0.4s ease;
    }
    &.is-active::before {
      background-color: var(--progress-dot-active-color);
    }
  }
}
</style>