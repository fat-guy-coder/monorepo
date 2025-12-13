<template>
    <form 
      class="form" 
      :class="formClasses" 
      @submit.prevent="handleSubmit"
    >
      <slot></slot>
    </form>
  </template>
  
  <script setup lang="ts">
  import { provide, reactive, ref, computed, watch, toRaw, nextTick } from 'vue';
  import type { Reactive } from 'vue';
  import type { FormConfig, FormInstance, ValidateError, FieldConfig, Rule } from './types.d';
  
  defineOptions({
    name: 'Form',
  });
  
  const props = defineProps<{
    model: Reactive<Record<string, any>>;
    rules: Reactive<Record<string, Rule[]>>;
    labelWidth?: number | string;
    labelPosition?: 'left' | 'right' | 'top';
    size?: 'small' | 'default' | 'large';
    inline?: boolean;
    disabled?: boolean | string[]; // 支持布尔值或字段名数组
    hideRequiredMark?: boolean;
    layout?: 'horizontal' | 'vertical' | 'inline';
    colon?: boolean;
    validateTrigger?: string | string[];
  }>();
  
  const emit = defineEmits<{
    (e: 'validate', name: string | string[], isValid: boolean): void;
    (e: 'submit', values: Record<string, any>): void;
    (e: 'finish', values: Record<string, any>): void;
    (e: 'finishFailed', errors: ValidateError[]): void;
  }>();
  
  // 表单字段集合
  const fields = new Map<string, any>();
  // 校验错误集合
  const validateErrors = reactive<Record<string, string>>({});
  
  // 计算禁用的字段列表
  const disabledFields = computed(() => {
    if (typeof props.disabled === 'boolean') {
      return props.disabled ? new Set(Array.from(fields.keys())) : new Set();
    } else if (Array.isArray(props.disabled)) {
      return new Set(props.disabled);
    }
    return new Set();
  });
  
  // 检查某个字段是否被禁用
  const isFieldDisabled = (fieldName: string): boolean => {
    if (typeof props.disabled === 'boolean') {
      return props.disabled;
    } else if (Array.isArray(props.disabled)) {
      return props.disabled.includes(fieldName);
    }
    return false;
  };
  
  // 批量设置字段禁用状态
  const setFieldsDisabled = (fieldNames: string[], disabled: boolean) => {
    if (Array.isArray(props.disabled)) {
      const currentDisabled = [...props.disabled];
      if (disabled) {
        // 添加禁用字段
        fieldNames.forEach(fieldName => {
          if (!currentDisabled.includes(fieldName)) {
            currentDisabled.push(fieldName);
          }
        });
      } else {
        // 移除禁用字段
        fieldNames.forEach(fieldName => {
          const index = currentDisabled.indexOf(fieldName);
          if (index > -1) {
            currentDisabled.splice(index, 1);
          }
        });
      }
      // 这里需要更新 props.disabled，但由于 props 是只读的，我们需要通过父组件更新
      // 可以 emit 事件让父组件更新
    //   emit('update:disabled', currentDisabled as string[]);
    }
  };
  
  // 注册字段
  const registerField = (name: string, field: any) => {
    fields.set(name, field);
  };
  
  // 注销字段
  const unregisterField = (name: string) => {
    fields.delete(name);
    delete validateErrors[name];
  };
  
  // 设置字段值
  const setFieldValue = (name: string, value: any) => {
    if (props.model && name in props.model) {
      props.model[name] = value;
    }
    // 触发字段重新验证
    if (validateErrors[name]) {
      validateField(name);
    }
  };
  
  // 获取字段值
  const getFieldValue = (name: string) => {
    return props.model?.[name];
  };
  
  // 批量设置字段值
  const setFieldsValue = (values: Record<string, any>) => {
    if (props.model) {
      Object.assign(props.model, values);
    }
    // 清除相关错误
    Object.keys(values).forEach(field => {
      if (validateErrors[field]) {
        delete validateErrors[field];
      }
    });
  };
  
  // 批量获取字段值
  const getFieldsValue = (fieldList?: string[]) => {
    if (!props.model) return {};
    
    if (fieldList && fieldList.length > 0) {
      const result: Record<string, any> = {};
      fieldList.forEach(field => {
        if (field in props.model!) {
          result[field] = props.model[field];
        }
      });
      return result;
    }
    
    return { ...props.model };
  };
  
  // 验证单个字段
  const validateField = async (name: string): Promise<void> => {
    const field = fields.get(name);
    if (!field) return;
    
    try {
      await field.validate();
      if (validateErrors[name]) {
        delete validateErrors[name];
      }
    } catch (error: any) {
      validateErrors[name] = error.message || error;
    }
    
    emit('validate', name, !validateErrors[name]);
  };
  
  // 验证多个字段
  const validate = async (fieldList?: string | string[]): Promise<any> => {
    const fieldsToValidate: string[] = [];
    
    if (!fieldList) {
      // 验证所有字段
      fieldsToValidate.push(...Array.from(fields.keys()));
    } else if (typeof fieldList === 'string') {
      fieldsToValidate.push(fieldList);
    } else {
      fieldsToValidate.push(...fieldList);
    }
    
    const errors: ValidateError[] = [];
    
    for (const fieldName of fieldsToValidate) {
      const field = fields.get(fieldName);
      if (field) {
        try {
          await field.validate();
          if (validateErrors[fieldName]) {
            delete validateErrors[fieldName];
          }
        } catch (error: any) {
          const errorMsg = error.message || error;
          validateErrors[fieldName] = errorMsg;
          errors.push({
            field: fieldName,
            message: errorMsg,
            value: getFieldValue(fieldName),
          });
        }
      }
    }
    
    emit('validate', fieldsToValidate, errors.length === 0);
    
    if (errors.length > 0) {
      return Promise.reject(errors);
    }
    
    return Promise.resolve(getFieldsValue(fieldsToValidate));
  };
  
  // 重置字段
  const resetFields = (fieldList?: string[]) => {
    const fieldsToReset = fieldList || Array.from(fields.keys());
    
    fieldsToReset.forEach(fieldName => {
      const field = fields.get(fieldName);
      if (field) {
        field.resetField();
      }
      if (validateErrors[fieldName]) {
        delete validateErrors[fieldName];
      }
    });
  };
  
  // 清除验证
  const clearValidate = (fieldList?: string[]) => {
    const fieldsToClear = fieldList || Array.from(fields.keys());
    
    fieldsToClear.forEach(fieldName => {
      if (validateErrors[fieldName]) {
        delete validateErrors[fieldName];
      }
      const field = fields.get(fieldName);
      if (field) {
        field.clearValidate();
      }
    });
  };
  
  // 滚动到指定字段
  const scrollToField = (fieldName: string) => {
    const field = fields.get(fieldName);
    if (field && field.$el) {
      field.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };
  
  // 表单提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      emit('submit', values);
      emit('finish', values);
    } catch (errors) {
      emit('finishFailed', errors as ValidateError[]);
      // 滚动到第一个错误字段
      if (Array.isArray(errors) && errors.length > 0) {
        scrollToField(errors[0].field);
      }
    }
  };
  
  // 表单样式类
  const formClasses = computed(() => ({
    [`form--${props.layout}`]: true,
    [`form--${props.size}`]: true,
    'form--inline': props.inline,
    'form--disabled': typeof props.disabled === 'boolean' && props.disabled,
    [`form--label-${props.labelPosition}`]: true,
  }));
  
  // 提供上下文给子组件
  provide('formContext', {
    model: props.model,
    rules: props.rules,
    disabled: computed(() => props.disabled),
    disabledFields: disabledFields,
    isFieldDisabled: isFieldDisabled,
    setFieldsDisabled: setFieldsDisabled,
    size: computed(() => props.size),
    labelWidth: computed(() => props.labelWidth),
    labelPosition: computed(() => props.labelPosition),
    colon: computed(() => props.colon),
    hideRequiredMark: computed(() => props.hideRequiredMark),
    validateTrigger: computed(() => props.validateTrigger),
    validateErrors,
    registerField,
    unregisterField,
    validateField,
    setFieldValue,
    getFieldValue,
  });
  
  // 暴露方法给父组件
  defineExpose({
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField,
    getFieldValue,
    setFieldValue,
    getFieldsValue,
    setFieldsValue,
    setFieldsDisabled,
    isFieldDisabled,
    submit: handleSubmit,
  });
  </script>
  
  <style scoped lang="less">
  .form {
    &--horizontal {
      .form-item {
        display: flex;
        margin-bottom: 1.5rem;
      }
      
      .form-item__label {
        text-align: right;
        padding-right: 0.75rem;
      }
    }
    
    &--vertical {
      .form-item {
        margin-bottom: 1.5rem;
      }
      
      .form-item__label {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
    
    &--inline {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      
      .form-item {
        margin-bottom: 0;
      }
    }
    
    &--small {
      .form-item {
        margin-bottom: 1rem;
      }
      
      .form-item__label {
        font-size: 0.75rem;
      }
    }
    
    &--large {
      .form-item {
        margin-bottom: 2rem;
      }
      
      .form-item__label {
        font-size: 1rem;
      }
    }
    
    &--disabled {
      .form-item__label,
      .form-item__content {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
    
    &--label-left {
      .form-item__label {
        text-align: left;
      }
    }
    
    &--label-top {
      .form-item__label {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  }
  </style>