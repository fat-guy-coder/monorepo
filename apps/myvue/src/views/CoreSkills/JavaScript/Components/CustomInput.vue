<template>
  <div class="custom-input-wrapper">
    <!-- 自定义输入框 -->
    <input type="text" class="custom-input" :value="modelValue" @input="handleInput" @focus="isFocused = true"
      @blur="isFocused = false" :placeholder="placeholder">
    <!-- 自定义装饰图标 -->
    <span class="input-icon" :class="{ focused: isFocused }">
      <svg v-if="!isFocused" width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z" />
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 组件Props类型定义
interface Props {
  modelValue: string
  placeholder?: string
}

// 组件Emits类型定义
interface Emits {
  (e: 'update:modelValue', value: string): void
}

// 定义Props和Emits
const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入...'
})
const emit = defineEmits<Emits>()

// 输入框聚焦状态
const isFocused = ref(false)

// 处理输入事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="less">
// 使用主文件定义的变量
@primary-color: #409EFF;
@border-color: #dcdfe6;
@transition-time: 0.3s;

.custom-input-wrapper {
  position: relative;
  width: 100%;
  margin: 0.5rem 0;

  .custom-input {
    width: 100%;
    padding: 0.8rem 2.5rem 0.8rem 1rem;
    border: 2px solid @border-color;
    border-radius: 6px;
    font-size: 1rem;
    transition: all @transition-time ease;

    &:focus {
      outline: none;
      border-color: @primary-color;
      box-shadow: 0 0 8px fade(@primary-color, 20%);
    }

    &::placeholder {
      color: lighten(@border-color, 10%);
    }
  }

  .input-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: @border-color;
    transition: color @transition-time ease;

    &.focused {
      color: @primary-color;
    }

    svg {
      vertical-align: middle;
    }
  }
}
</style>
