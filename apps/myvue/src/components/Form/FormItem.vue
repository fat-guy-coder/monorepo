<template>
    <div class="form-item" :class="formItemClasses">
      <label
        v-if="label || $slots.label"
        class="form-item__label"
        :for="prop"
        :style="labelStyle"
      >
        <span class="form-item__label-content">
          <slot name="label">{{ label }}</slot>
          <span v-if="isRequired && !hideRequiredMark" class="form-item__required">*</span>
          <span v-if="colon" class="form-item__colon">:</span>
        </span>
      </label>
      
      <div class="form-item__content" :style="contentStyle">
        <div class="form-item__control">
          <slot :disabled="isDisabled"></slot>
          <transition name="form-item__error-slide">
            <div
              v-if="validateMessage && validateState === 'error'"
              class="form-item__error"
              :class="`form-item__error--${size}`"
            >
              {{ validateMessage }}
            </div>
          </transition>
          <div v-if="extra || $slots.extra" class="form-item__extra">
            <slot name="extra">{{ extra }}</slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { provide, inject, ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
  import type { Rule, FormContext } from './types.d';
  
  defineOptions({
    name: 'FormItem',
  });
  
  const props = defineProps<{
    prop?: string;
    label?: string;
    labelWidth?: number | string;
    rules?: Rule[];
    required?: boolean;
    hideRequiredMark?: boolean;
    validateTrigger?: string | string[];
    extra?: string;
    disabled?: boolean; // FormItem 级别的禁用
  }>()
  
  // 注入表单上下文
  const formContext = inject<FormContext>('formContext');
  
  // 内部状态
  const validateState = ref<'success' | 'error' | 'validating' | ''>('');
  const validateMessage = ref('');
  const initialValue: any = ref(undefined);
  
  // 计算属性：最终禁用状态（支持多层优先级）
  const isDisabled = computed(() => {
    // 1. 组件自身的 disabled 属性优先级最高
    if (props.disabled) return true;
    
    // 2. 检查表单级别的禁用
    if (formContext?.isFieldDisabled && props.prop) {
      const formDisabled = formContext.isFieldDisabled(props.prop);
      if (formDisabled) return true;
    }
    
    // 3. 检查整个表单是否禁用
    const formGlobalDisabled = formContext?.disabled;
    if (typeof formGlobalDisabled === 'boolean' && formGlobalDisabled) {
      return true;
    }
    
    return false;
  });
  
  const size = computed(() => formContext?.size?.value || 'default');
  const labelWidth = computed(() => props.labelWidth || formContext?.labelWidth?.value);
  const labelPosition = computed(() => formContext?.labelPosition?.value || 'right');
  const colon = computed(() => formContext?.colon?.value ?? true);
  const hideRequiredMark = computed(() => props.hideRequiredMark || formContext?.hideRequiredMark?.value);
  const isRequired = computed(() => {
    if (props.required !== undefined) return props.required;
    
    // 从规则中判断是否必填
    const rules = getAllRules();
    return rules.some(rule => rule.required);
  });
  
  const formItemClasses = computed(() => ({
    'form-item': true,
    [`form-item--${size.value}`]: true,
    'form-item--required': isRequired.value,
    'form-item--error': validateState.value === 'error',
    'form-item--validating': validateState.value === 'validating',
    'form-item--success': validateState.value === 'success',
    'form-item--disabled': isDisabled.value,
    [`form-item--label-${labelPosition.value}`]: true,
  }));
  
  const labelStyle = computed(() => {
    const style: Record<string, string> = {};
    if (labelWidth.value) {
      style.width = typeof labelWidth.value === 'number' ? `${labelWidth.value}px` : labelWidth.value;
    }
    return style;
  });
  
  const contentStyle = computed(() => {
    const style: Record<string, string> = {};
    if (labelWidth.value && labelPosition.value !== 'top') {
      style.marginLeft = typeof labelWidth.value === 'number' ? `${labelWidth.value}px` : labelWidth.value;
    }
    return style;
  });
  
  // 获取所有规则
  const getAllRules = (): Rule[] => {
    const rules: Rule[] = [];
    
    // 表单级别的规则
    if (props.prop && formContext?.rules?.value?.[props.prop]) {
      rules.push(...formContext.rules.value[props.prop]);
    }
    
    // 项目级别的规则
    if (props.rules) {
      rules.push(...props.rules);
    }
    
    return rules;
  };
  
  // 获取字段值
  const getFieldValue = () => {
    if (!props.prop) return undefined;
    return formContext?.getFieldValue?.(props.prop);
  };
  
  // 设置字段值
  const setFieldValue = (value: any) => {
    if (!props.prop) return;
    formContext?.setFieldValue?.(props.prop, value);
  };
  
  // 验证字段
  const validate = async (trigger?: string): Promise<void> => {
    // 如果字段被禁用，跳过验证
    if (isDisabled.value) return Promise.resolve();
    
    if (!props.prop) return Promise.resolve();
    
    const rules = getAllRules();
    if (rules.length === 0) return Promise.resolve();
    
    // 过滤触发时机
    const filteredRules = rules.filter(rule => {
      if (!trigger) return true;
      if (!rule.trigger) return true;
      if (typeof rule.trigger === 'string') {
        return rule.trigger === trigger;
      }
      return rule.trigger.includes(trigger as 'change' | 'blur');
    });
    
    if (filteredRules.length === 0) return Promise.resolve();
    
    const value = getFieldValue();
    const currentValue = value === undefined ? '' : value;
    
    // 开始验证
    validateState.value = 'validating';
    
    try {
      for (const rule of filteredRules) {
        await validateRule(currentValue, rule);
      }
      
      // 验证成功
      validateState.value = 'success';
      validateMessage.value = '';
      
      return Promise.resolve();
    } catch (error: any) {
      // 验证失败
      validateState.value = 'error';
      validateMessage.value = error.message || error;
      
      return Promise.reject(new Error(validateMessage.value));
    }
  };
  
  // 验证单个规则
  const validateRule = (value: any, rule: Rule): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 如果字段被禁用，跳过验证
      if (isDisabled.value) {
        return resolve();
      }
      
      // 必填验证
      if (rule.required) {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          return reject(new Error(rule.message || `${props.label || props.prop}是必填项`));
        }
        
        // 检查空格（如果配置了whitespace）
        if (rule.whitespace !== false && typeof value === 'string' && value.trim() === '') {
          return reject(new Error(rule.message || `${props.label || props.prop}不能为空`));
        }
      }
      
      // 类型验证
      if (rule.type) {
        const typeValidators: Record<string, (val: any) => boolean> = {
          string: (val) => typeof val === 'string',
          number: (val) => typeof val === 'number' && !isNaN(val),
          boolean: (val) => typeof val === 'boolean',
          array: (val) => Array.isArray(val),
          object: (val) => typeof val === 'object' && val !== null && !Array.isArray(val),
          email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
          url: (val) => /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(val),
        };
        
        if (typeValidators[rule.type] && !typeValidators[rule.type](value)) {
          return reject(new Error(rule.message || `${props.label || props.prop}必须是${rule.type}类型`));
        }
      }
      
      // 模式验证
      if (rule.pattern && !rule.pattern.test(String(value))) {
        return reject(new Error(rule.message || `${props.label || props.prop}格式不正确`));
      }
      
      // 长度验证
      if (rule.len !== undefined && String(value).length !== rule.len) {
        return reject(new Error(rule.message || `${props.label || props.prop}长度必须为${rule.len}个字符`));
      }
      
      if (rule.min !== undefined && String(value).length < rule.min) {
        return reject(new Error(rule.message || `${props.label || props.prop}长度不能少于${rule.min}个字符`));
      }
      
      if (rule.max !== undefined && String(value).length > rule.max) {
        return reject(new Error(rule.message || `${props.label || props.prop}长度不能超过${rule.max}个字符`));
      }
      
      // 自定义验证器
      if (rule.validator) {
        try {
          const result = rule.validator(value, rule);
          if (result instanceof Promise) {
            return result.then(resolve).catch(reject);
          }
          return resolve();
        } catch (error: any) {
          return reject(new Error(error.message || error || '验证失败'));
        }
      }
      
      resolve();
    });
  };
  
  // 重置字段
  const resetField = () => {
    validateState.value = '';
    validateMessage.value = '';
    
    if (props.prop && formContext?.model?.value) {
      // 重置为初始值
      formContext.model.value[props.prop] = initialValue.value;
    }
  };
  
  // 清除验证
  const clearValidate = () => {
    validateState.value = '';
    validateMessage.value = '';
  };
  
  // 处理字段事件（由子组件调用）
  const handleFieldEvent = (trigger: string) => {
    // 如果字段被禁用，不触发验证
    if (isDisabled.value) return;
    
    const validateTrigger = props.validateTrigger || formContext?.validateTrigger?.value;
    
    if (!validateTrigger) return;
    
    const triggers = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger];
    if (triggers.includes(trigger)) {
      validate(trigger);
    }
  };
  
  // 保存初始值
  onMounted(() => {
    if (props.prop) {
      initialValue.value = getFieldValue();
      
      // 注册到表单
      if (formContext?.registerField) {
        formContext.registerField(props.prop, {
          validate,
          resetField,
          clearValidate,
          $el: document.querySelector(`[data-field="${props.prop}"]`),
        });
      }
    }
  });
  
  onUnmounted(() => {
    if (props.prop && formContext?.unregisterField) {
      formContext.unregisterField(props.prop);
    }
  });
  
  // 监听规则变化
  watch(() => props.rules, () => {
    if (props.prop && validateState.value === 'error') {
      // 重新验证
      nextTick(() => validate());
    }
  });
  
  // 监听禁用状态变化
  watch(isDisabled, (newValue) => {
    // 如果字段被禁用，清除验证状态
    if (newValue && validateState.value === 'error') {
      clearValidate();
    }
  });
  
  // 暴露方法给子组件和父组件
  defineExpose({
    validate,
    resetField,
    clearValidate,
    handleFieldEvent,
    validateState,
    validateMessage,
    isDisabled,
  });
  
  // 提供上下文给子组件（如Input）
  provide('formItemContext', {
    handleFieldEvent,
    disabled: isDisabled, // 将禁用状态传递给子组件
  });
  </script>
  
  <style scoped lang="less">
  .form-item {
    margin-bottom: 1.5rem;
    
    &--small {
      margin-bottom: 1rem;
    }
    
    &--large {
      margin-bottom: 2rem;
    }
    
    &__label {
      display: inline-block;
      vertical-align: middle;
      line-height: 1.5;
      color: var(--color-text);
      font-size: 0.875rem;
      
      &-content {
        display: inline-block;
      }
    }
    
    &__required {
      color: var(--color-error);
      margin-left: 0.25rem;
    }
    
    &__colon {
      margin-left: 0.125rem;
      margin-right: 0.5rem;
    }
    
    &__content {
      position: relative;
      line-height: 1.5;
    }
    
    &__control {
      position: relative;
    }
    
    &__error {
      color: var(--color-error);
      font-size: 0.75rem;
      line-height: 1.5;
      margin-top: 0.25rem;
      
      &--small {
        font-size: 0.6875rem;
      }
      
      &--large {
        font-size: 0.875rem;
      }
    }
    
    &__extra {
      color: var(--color-text-tertiary);
      font-size: 0.75rem;
      line-height: 1.5;
      margin-top: 0.25rem;
    }
    
    // 错误动画
    &__error-slide-enter-active,
    &__error-slide-leave-active {
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    
    &__error-slide-enter-from,
    &__error-slide-leave-to {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
    
    // 验证状态样式
    &--error {
      .search-input {
        border-color: var(--color-error) !important;
        
        &.is-focused {
          box-shadow: 0 0 0 0.125rem rgba(var(--color-error-rgb), 0.1);
        }
      }
    }
    
    // 禁用状态样式
    &--disabled {
      .search-input,
      .search-input__control,
      .search-input__prefix,
      .search-input__clear,
      .search-input__action {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
  </style>