<template>
    <!-- 主题切换按钮组 -->
    <div class="theme-switcher" :class="[
        `direction-${direction}`,
        { 'is-expanded': show }
    ]">
        <!-- 主题按钮 -->
        <transition-group v-if="show" name="theme-item" tag="div" class="theme-buttons">
            <button v-for="(item, index) in themes" :key="item.value" class="theme-btn"
                :class="[`theme-${item.value}`, { active: theme === item.value }]"
                :style="{ '--delay': `${index * 0.05}s` }" @click="switchTheme(item.value)" :title="item.label">
                <span class="theme-icon">{{ item.icon }}</span>
                <span class="theme-label">{{ item.label }}</span>
            </button>
        </transition-group>

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { Themes, Theme } from '@/stores/user'



// 定义方向类型
type Direction = 'horizontal' | 'vertical'

// Props
interface Props {
    // 方向：横向或竖向，默认横向
    direction?: Direction
    // 展开显示：false时不显示，true时展开显示（带动画）
    show?: boolean
    theme: Theme
    themes: Themes
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'horizontal',
    show: false,
    theme: 'light'
})

// Emits
const emit = defineEmits<{
    toggle: [show: boolean]
    themeChange: [theme: Theme]
}>()


// 切换展开/收起
const toggle = () => {
    emit('toggle', !props.show)
}

// 切换主题函数
const switchTheme = (theme: Theme) => {
    // 触发事件
    emit('themeChange', theme)
}

// 初始化主题
onMounted(() => {
    if (props.theme && ['light', 'dark', 'warm', 'cool'].includes(props.theme)) {
        switchTheme(props.theme)
    } else {
        // 如果没有保存的主题，使用系统偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const defaultTheme = prefersDark ? 'dark' : 'light'
        switchTheme(defaultTheme)
    }
})
</script>

<style lang="less" scoped>
/* 主题切换按钮组 */
.theme-switcher {
    position: absolute;
    top: -70px;
    right: -50px;
    display: flex;
    z-index: 1000;
    align-items: center;
    transition: all 0.3s ease;
}

/* 方向样式 */
.theme-switcher.direction-horizontal {
    flex-direction: row;

    .theme-buttons {
        flex-direction: row;
    }
}

.theme-switcher.direction-vertical {
    top: -150px;
    left: -70px;
    position: absolute;
    display: flex;
    z-index: 1000;
    width: 60px;
    align-items: center;
    transition: all 0.3s ease;

    .theme-buttons {
        flex-direction: column;
    }
}

/* 主题按钮容器 */
.theme-buttons {
    display: flex;
    gap: 8px;
}

.theme-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px 12px;
    border: 1px solid var(--element-border);
    border-radius: 8px;
    background: var(--element-background);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 60px;
    font-size: 12px;
    font-weight: 500;
    opacity: 0;
    transform: scale(0.8);
    transition-delay: var(--delay, 0s);

    &:hover {
        background: var(--element-background-soft);
        border-color: var(--element-border-hover);
        transform: translateY(-2px) scale(1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &.active {
        background: var(--color-primary);
        color: var(--color-background);
        border-color: var(--color-primary);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

        .theme-icon {
            transform: scale(1.2);
        }
    }
}

/* 展开状态 */
.theme-switcher.is-expanded {
    .theme-btn {
        opacity: 1;
        transform: scale(1);
    }
}

/* 展开动画 - 横向向右 */
.theme-switcher.direction-horizontal.is-expanded {
    .theme-btn {
        animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        animation-delay: var(--delay, 0s);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(-20px) scale(0.8);
    }

    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

/* 展开动画 - 竖向向下 */
.theme-switcher.direction-vertical.is-expanded {
    .theme-btn {
        animation: slideInDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        animation-delay: var(--delay, 0s);
    }
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.8);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 主按钮 */
.theme-toggle {
    position: relative;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--color-primary);
    color: var(--color-background);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }

    &.is-active {
        background: var(--color-secondary);
        transform: rotate(180deg);
    }
}

/* 图标 */
.toggle-icon {
    position: relative;
    width: 20px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
}

.icon-line {
    width: 16px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
}

.theme-toggle.is-active .icon-line {
    &:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
    }

    &:nth-child(2) {
        opacity: 0;
    }

    &:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
    }
}

.theme-icon {
    font-size: 20px;
    line-height: 1;
    transition: transform 0.3s ease;
}

.theme-label {
    font-size: 11px;
    line-height: 1;
    white-space: nowrap;
}

/* 主题按钮特定样式 */
.theme-light.active {
    background: #f3f4f6;
    color: #111827;
    border-color: #6b7280;
}

.theme-dark.active {
    background: #1f2937;
    color: #f3f4f6;
    border-color: #4b5563;
}

.theme-warm.active {
    background: #d97706;
    color: #fff7ed;
    border-color: #ea580c;
}

.theme-cool.active {
    background: #0284c7;
    color: #f0f9ff;
    border-color: #0369a1;
}

/* 主题项进入/离开动画 */
.theme-item-enter-active,
.theme-item-leave-active {
    transition: all 0.3s ease;
}

.theme-item-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.theme-item-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>