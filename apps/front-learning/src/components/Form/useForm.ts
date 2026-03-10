import { ref, reactive, computed, watch, toRaw } from 'vue';
import type { FormInstance, FormConfig, Rule, ValidateError } from './types';

export function useForm(config?: FormConfig): FormInstance {
  const model = ref(config?.model || {});
  const rules = ref(config?.rules || {});
  
  // 存储表单字段引用
  const fields = new Map<string, any>();
  
  // 注册字段
  const registerField = (name: string, field: any) => {
    fields.set(name, field);
  };
  
  // 注销字段
  const unregisterField = (name: string) => {
    fields.delete(name);
  };
  
  // 获取字段值
  const getFieldValue = (field: string) => {
    return model.value[field];
  };
  
  // 设置字段值
  const setFieldValue = (field: string, value: any) => {
    model.value[field] = value;
  };
  
  // 批量获取字段值
  const getFieldsValue = (fieldList?: string[]) => {
    if (fieldList && fieldList.length > 0) {
      const result: Record<string, any> = {};
      fieldList.forEach(field => {
        if (field in model.value) {
          result[field] = model.value[field];
        }
      });
      return result;
    }
    return { ...model.value };
  };
  
  // 批量设置字段值
  const setFieldsValue = (values: Record<string, any>) => {
    Object.assign(model.value, values);
  };
  
  // 验证字段
  const validateField = async (field: string): Promise<void> => {
    const fieldInstance = fields.get(field);
    if (fieldInstance && fieldInstance.validate) {
      await fieldInstance.validate();
    }
  };
  
  // 验证多个字段
  const validate = async (fieldList?: string | string[]): Promise<any> => {
    const fieldsToValidate: string[] = [];
    
    if (!fieldList) {
      fieldsToValidate.push(...Array.from(fields.keys()));
    } else if (typeof fieldList === 'string') {
      fieldsToValidate.push(fieldList);
    } else {
      fieldsToValidate.push(...fieldList);
    }
    
    const errors: ValidateError[] = [];
    
    for (const fieldName of fieldsToValidate) {
      const fieldInstance = fields.get(fieldName);
      if (fieldInstance && fieldInstance.validate) {
        try {
          await fieldInstance.validate();
        } catch (error: any) {
          errors.push({
            field: fieldName,
            message: error.message || error,
            value: getFieldValue(fieldName),
          });
        }
      }
    }
    
    if (errors.length > 0) {
      return Promise.reject(errors);
    }
    
    return Promise.resolve(getFieldsValue(fieldsToValidate));
  };
  
  // 重置字段
  const resetFields = (fieldList?: string | string[]) => {
    const fieldsToReset = typeof fieldList === 'string' ? [fieldList] : (fieldList || Array.from(fields.keys()));
    
    fieldsToReset.forEach(fieldName => {
      const fieldInstance = fields.get(fieldName);
      if (fieldInstance && fieldInstance.resetField) {
        fieldInstance.resetField();
      }
    });
  };
  
  // 清除验证
  const clearValidate = (fieldList?: string | string[]) => {
    const fieldsToClear = typeof fieldList === 'string' ? [fieldList] : (fieldList || Array.from(fields.keys()));
    
    fieldsToClear.forEach(fieldName => {
      const fieldInstance = fields.get(fieldName);
      if (fieldInstance && fieldInstance.clearValidate) {
        fieldInstance.clearValidate();
      }
    });
  };
  
  // 滚动到字段
  const scrollToField = (field: string) => {
    const fieldInstance = fields.get(field);
    if (fieldInstance && fieldInstance.$el) {
      fieldInstance.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };
  
  // 创建表单实例
  return {
    model,
    rules,
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField,
    getFieldValue,
    setFieldValue,
    getFieldsValue,
    setFieldsValue,
    submit: async (callback?: (values: any) => void) => {
      try {
        const values = await validate();
        if (callback) {
          callback(values);
        }
        return values;
      } catch (errors) {
        if (Array.isArray(errors) && errors.length > 0) {
          scrollToField(errors[0].field);
        }
        throw errors;
      }
    },
  };
}

// 验证工具函数
export const validateRules = async (value: any, rules: Rule[], label?: string): Promise<void> => {
  for (const rule of rules) {
    await validateRule(value, rule, label);
  }
};

const validateRule = async (value: any, rule: Rule, label?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 必填验证
    if (rule.required) {
      if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        return reject(new Error(rule.message || `${label || '字段'}是必填项`));
      }
      
      if (rule.whitespace !== false && typeof value === 'string' && value.trim() === '') {
        return reject(new Error(rule.message || `${label || '字段'}不能为空`));
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
        return reject(new Error(rule.message || `${label || '字段'}必须是${rule.type}类型`));
      }
    }
    
    // 模式验证
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return reject(new Error(rule.message || `${label || '字段'}格式不正确`));
    }
    
    // 长度验证
    if (rule.len !== undefined && String(value).length !== rule.len) {
      return reject(new Error(rule.message || `${label || '字段'}长度必须为${rule.len}个字符`));
    }
    
    if (rule.min !== undefined && String(value).length < rule.min) {
      return reject(new Error(rule.message || `${label || '字段'}长度不能少于${rule.min}个字符`));
    }
    
    if (rule.max !== undefined && String(value).length > rule.max) {
      return reject(new Error(rule.message || `${label || '字段'}长度不能超过${rule.max}个字符`));
    }
    
    // 数值范围验证
    if (rule.min !== undefined && typeof value === 'number' && value < rule.min) {
      return reject(new Error(rule.message || `${label || '字段'}不能小于${rule.min}`));
    }
    
    if (rule.max !== undefined && typeof value === 'number' && value > rule.max) {
      return reject(new Error(rule.message || `${label || '字段'}不能大于${rule.max}`));
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