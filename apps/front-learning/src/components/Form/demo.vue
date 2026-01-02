<template>
    <div class="form-demo">
      <h1>表单组件演示</h1>
      
      <!-- 控制面板 -->
      <div class="control-panel">
        <h2>控制面板</h2>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="formDisabled" />
            表单整体禁用
          </label>
          <label>
            <input type="checkbox" v-model="field1Disabled" />
            Field1 单独禁用
          </label>
          <label>
            <input type="checkbox" v-model="usePartialDisable" />
            部分字段禁用
          </label>
        </div>
        
        <div class="control-buttons">
          <button @click="disableAllFields">禁用所有字段</button>
          <button @click="enableAllFields">启用所有字段</button>
          <button @click="disableFields(['field1', 'field3'])">禁用 Field1 和 Field3</button>
          <button @click="enableFields(['field1', 'field3'])">启用 Field1 和 Field3</button>
          <button @click="resetForm">重置表单</button>
          <button @click="clearValidation">清除验证</button>
        </div>
        
        <div class="form-data">
          <h3>表单数据：</h3>
          <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
      
      <!-- 表单示例 -->
      <div class="form-example">
        <h2>表单示例</h2>
        
        <VForm
          ref="formRef"
          :model="formData"
       
          :disabled="getDisabledConfig"
          label-width="100px"
          @submit="handleSubmit"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
        >
          <!-- Field 1: 用户名 -->
          <VFormItem
            label="用户名"
            prop="field1"
            :disabled="field1Disabled"
            required
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <SearchInput
              v-model:value="formData.field1"
              placeholder="请输入用户名"
              name="field1"
              show-default-prefix
              :css="{
                '--_input-height': '40px'
              }"
            />
          </VFormItem>
          
          <!-- Field 2: 邮箱 -->
          <VFormItem
            label="邮箱"
            prop="field2"
            required
          >
            <SearchInput
              v-model:value="formData.field2"
              placeholder="请输入邮箱"
              name="field2"
              show-search-button
              search-text="验证"
              :css="{
                '--_input-height': '36px'
              }"
            />
          </VFormItem>
          
          <!-- Field 3: 密码 -->
          <VFormItem
            label="密码"
            prop="field3"
            required
          >
            <SearchInput
              v-model:value="formData.field3"
              placeholder="请输入密码"
              name="field3"
              type="password"
              :allow-clear="false"
              :css="{
                '--_input-height': '36px'
              }"
            />
          </VFormItem>
          
          <!-- Field 4: 年龄 -->
          <VFormItem
            label="年龄"
            prop="field4"
          >
            <SearchInput
              v-model:value="formData.field4"
              placeholder="请输入年龄"
              name="field4"
              :disabled="ageDisabled"
              :css="{
                '--_input-height': '32px'
              }"
            />
          </VFormItem>
          
          <!-- Field 5: 手机号 -->
          <VFormItem
            label="手机号"
            prop="field5"
            :rules="[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
            ]"
          >
            <SearchInput
              v-model:value="formData.field5"
              placeholder="请输入手机号"
              name="field5"
              :maxlength="11"
              :css="{
                '--_input-height': '36px',
                '--_input-border-color-hover': '#52c41a'
              }"
            />
          </VFormItem>
          
          <!-- Field 6: 自定义验证 -->
          <VFormItem
            label="验证码"
            prop="field6"
            :rules="customRules"
          >
            <div class="captcha-input">
              <SearchInput
                v-model:value="formData.field6"
                placeholder="请输入验证码"
                name="field6"
                :css="{
                  '--_input-height': '36px'
                }"
              />
              <button 
                class="captcha-btn" 
                :disabled="captchaLoading"
                @click="sendCaptcha"
              >
                {{ captchaLoading ? '发送中...' : '获取验证码' }}
              </button>
            </div>
          </VFormItem>
          
          <!-- 动态添加的字段 -->
          <VFormItem
            v-for="field in dynamicFields"
            :key="field.name"
            :label="field.label"
            :prop="field.name"
            :rules="field.rules"
          >
            <SearchInput
              v-model:value="formData[field.name]"
              :placeholder="field.placeholder"
              :name="field.name"
            />
            <button 
              class="remove-btn"
              @click="removeDynamicField(field.name)"
            >
              删除
            </button>
          </VFormItem>
          
          <!-- 操作按钮 -->
          <VFormItem class="form-actions">
            <button type="submit" class="submit-btn" :disabled="submitting">
              {{ submitting ? '提交中...' : '提交表单' }}
            </button>
            <button type="button" class="validate-btn" @click="validateForm">
              验证表单
            </button>
            <button type="button" class="add-field-btn" @click="addDynamicField">
              添加字段
            </button>
            <button type="button" class="toggle-layout-btn" @click="toggleLayout">
              {{ layout === 'horizontal' ? '垂直布局' : '水平布局' }}
            </button>
          </VFormItem>
        </VForm>
        
        <!-- 表单状态 -->
        <div class="form-status">
          <h3>表单状态：</h3>
          <div class="status-item">
            <span class="status-label">是否验证通过：</span>
            <span :class="['status-value', validationStatus ? 'success' : 'error']">
              {{ validationStatus ? '是' : '否' }}
            </span>
          </div>
          <div class="status-item">
            <span class="status-label">禁用字段：</span>
            <span class="status-value">
              {{ getDisabledConfig === true ? '全部' : getDisabledConfig?.join(', ') || '无' }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 验证结果 -->
      <div v-if="validationResult" class="validation-result">
        <h3>验证结果：</h3>
        <div v-if="validationResult.success" class="result-success">
          ✅ 验证通过！数据：{{ JSON.stringify(validationResult.data) }}
        </div>
        <div v-else class="result-error">
          ❌ 验证失败！错误：
          <ul>
            <li v-for="error in validationResult.errors" :key="error.field">
              {{ error.field }}: {{ error.message }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, nextTick } from 'vue';
  import VForm from './Form.vue';
  import VFormItem from './FormItem.vue';
  import SearchInput from '../Input/input2.vue';
  import type { Rule } from './types';
  
  // 表单数据
  const formData = reactive({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
  });
  
  // 表单引用
  const formRef = ref<any>();
  
  // 控制状态
  const formDisabled = ref(false);
  const field1Disabled = ref(false);
  const usePartialDisable = ref(false);
  const partialDisabledFields = ref<string[]>(['field2', 'field4']);
  const layout = ref<'horizontal' | 'vertical'>('horizontal');
  const ageDisabled = ref(false);
  const captchaLoading = ref(false);
  const submitting = ref(false);
  const validationStatus = ref<boolean | null>(null);
  const validationResult = ref<{
    success: boolean;
    data?: any;
    errors?: Array<{ field: string; message: string }>;
  } | null>(null);
  
  // 动态字段
  const dynamicFields = ref<Array<{
    name: string;
    label: string;
    placeholder: string;
    rules: Rule[];
  }>>([]);
  let dynamicFieldCount = 0;
  
  // 验证规则
  const rules = computed(() => ({
    field2: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ],
    field3: [
      { required: true, message: '请输入密码' },
      { min: 6, max: 20, message: '密码长度6-20位' },
      {
        validator: (value: string) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (/[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value)) {
                resolve();
              } else {
                reject(new Error('必须包含大小写字母和数字'));
              }
            }, 300);
          });
        },
      },
    ],
    field4: [
      { type: 'number', message: '年龄必须是数字' },
      { min: 0, max: 150, message: '年龄必须在0-150之间' },
    ],
  }));
  
  // 自定义验证规则
  const customRules = [
    {
      validator: (value: string) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (value === '123456') {
              resolve();
            } else {
              reject(new Error('验证码错误，请输入123456'));
            }
          }, 500);
        });
      },
      trigger: 'blur',
    },
  ];
  
  // 计算禁用的配置
  const getDisabledConfig = computed(() => {
    if (formDisabled.value) {
      return true; // 全部禁用
    }
    
    if (usePartialDisable.value) {
      return partialDisabledFields.value; // 部分禁用
    }
    
    return false; // 不禁用
  });
  
  // 表单提交
  const handleSubmit = (values: any) => {
    console.log('表单提交:', values);
    submitting.value = true;
    
    // 模拟API请求
    setTimeout(() => {
      submitting.value = false;
      alert(`表单提交成功！\n数据：${JSON.stringify(values, null, 2)}`);
    }, 1500);
  };
  
  // 表单验证完成
  const handleFinish = (values: any) => {
    console.log('表单验证完成:', values);
    validationStatus.value = true;
    validationResult.value = {
      success: true,
      data: values,
    };
  };
  
  // 表单验证失败
  const handleFinishFailed = (errors: any[]) => {
    console.log('表单验证失败:', errors);
    validationStatus.value = false;
    validationResult.value = {
      success: false,
      errors: errors,
    };
    
    // 滚动到第一个错误字段
    if (errors.length > 0 && formRef.value) {
      formRef.value.scrollToField(errors[0].field);
    }
  };
  
  // 验证表单
  const validateForm = async () => {
    if (!formRef.value) return;
    
    try {
      const values = await formRef.value.validate();
      handleFinish(values);
    } catch (errors) {
      handleFinishFailed(errors);
    }
  };
  
  // 重置表单
  const resetForm = () => {
    if (formRef.value) {
      formRef.value.resetFields();
      validationStatus.value = null;
      validationResult.value = null;
      console.log('表单已重置');
    }
  };
  
  // 清除验证
  const clearValidation = () => {
    if (formRef.value) {
      formRef.value.clearValidate();
      validationStatus.value = null;
      validationResult.value = null;
      console.log('验证状态已清除');
    }
  };
  
  // 禁用所有字段
  const disableAllFields = () => {
    formDisabled.value = true;
    usePartialDisable.value = false;
    console.log('所有字段已禁用');
  };
  
  // 启用所有字段
  const enableAllFields = () => {
    formDisabled.value = false;
    usePartialDisable.value = false;
    partialDisabledFields.value = [];
    console.log('所有字段已启用');
  };
  
  // 禁用指定字段
  const disableFields = (fields: string[]) => {
    usePartialDisable.value = true;
    fields.forEach(field => {
      if (!partialDisabledFields.value.includes(field)) {
        partialDisabledFields.value.push(field);
      }
    });
    console.log(`已禁用字段: ${fields.join(', ')}`);
  };
  
  // 启用指定字段
  const enableFields = (fields: string[]) => {
    fields.forEach(field => {
      const index = partialDisabledFields.value.indexOf(field);
      if (index > -1) {
        partialDisabledFields.value.splice(index, 1);
      }
    });
    console.log(`已启用字段: ${fields.join(', ')}`);
    
    // 如果没有禁用字段了，关闭部分禁用模式
    if (partialDisabledFields.value.length === 0) {
      usePartialDisable.value = false;
    }
  };
  
  // 发送验证码
  const sendCaptcha = () => {
    captchaLoading.value = true;
    
    // 模拟发送验证码
    setTimeout(() => {
      captchaLoading.value = false;
      alert('验证码已发送：123456');
    }, 1000);
  };
  
  // 添加动态字段
  const addDynamicField = () => {
    dynamicFieldCount++;
    const fieldName = `dynamic${dynamicFieldCount}`;
    
    dynamicFields.value.push({
      name: fieldName,
      label: `动态字段${dynamicFieldCount}`,
      placeholder: `请输入动态字段${dynamicFieldCount}`,
      rules: [
        { required: true, message: `动态字段${dynamicFieldCount}是必填项` },
      ],
    });
    
    // 初始化表单数据
    formData[fieldName] = '';
    
    console.log(`添加了动态字段: ${fieldName}`);
  };
  
  // 删除动态字段
  const removeDynamicField = (fieldName: string) => {
    const index = dynamicFields.value.findIndex(f => f.name === fieldName);
    if (index > -1) {
      dynamicFields.value.splice(index, 1);
      delete formData[fieldName];
      console.log(`删除了动态字段: ${fieldName}`);
      
      // 清除该字段的验证
      if (formRef.value) {
        formRef.value.clearValidate([fieldName]);
      }
    }
  };
  
  // 切换布局
  const toggleLayout = () => {
    layout.value = layout.value === 'horizontal' ? 'vertical' : 'horizontal';
  };
  </script>
  
  <style scoped lang="less">
  .form-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }
  }
  
  .control-panel {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #e9ecef;
    
    h2 {
      margin-top: 0;
      color: #495057;
      font-size: 1.25rem;
    }
  }
  
  .control-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    
    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      color: #495057;
      
      input[type="checkbox"] {
        width: 18px;
        height: 18px;
      }
    }
  }
  
  .control-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    
    button {
      padding: 0.5rem 1rem;
      border: 1px solid #1890ff;
      background: white;
      color: #1890ff;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875rem;
      
      &:hover:not(:disabled) {
        background: #1890ff;
        color: white;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  
  .form-data {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 1rem;
    
    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    
    pre {
      margin: 0;
      font-size: 0.875rem;
      color: #666;
      background: #f8f9fa;
      padding: 0.75rem;
      border-radius: 4px;
      overflow: auto;
      max-height: 200px;
    }
  }
  
  .form-example {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    border: 1px solid #e9ecef;
    
    h2 {
      margin-top: 0;
      color: #495057;
      font-size: 1.25rem;
    }
  }
  
  .captcha-input {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    
    .captcha-btn {
      padding: 0 1rem;
      height: 36px;
      border: 1px solid #1890ff;
      background: white;
      color: #1890ff;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      
      &:hover:not(:disabled) {
        background: #1890ff;
        color: white;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  
  .remove-btn {
    margin-left: 0.75rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid #ff4d4f;
    background: white;
    color: #ff4d4f;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.75rem;
    
    &:hover {
      background: #ff4d4f;
      color: white;
    }
  }
  
  .form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
    
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
    }
  }
  
  .submit-btn {
    background: #1890ff;
    color: white;
    
    &:hover:not(:disabled) {
      background: #40a9ff;
    }
    
    &:disabled {
      background: #8bc7ff;
      cursor: not-allowed;
    }
  }
  
  .validate-btn {
    background: #52c41a;
    color: white;
    
    &:hover {
      background: #73d13d;
    }
  }
  
  .add-field-btn {
    background: #faad14;
    color: white;
    
    &:hover {
      background: #ffc53d;
    }
  }
  
  .toggle-layout-btn {
    background: #722ed1;
    color: white;
    
    &:hover {
      background: #9254de;
    }
  }
  
  .form-status {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 6px;
    
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
  
  .status-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    
    .status-label {
      font-weight: 500;
      color: #495057;
      min-width: 120px;
    }
    
    .status-value {
      &.success {
        color: #52c41a;
        font-weight: 500;
      }
      
      &.error {
        color: #ff4d4f;
        font-weight: 500;
      }
    }
  }
  
  .validation-result {
    margin-top: 2rem;
    padding: 1.5rem;
    border-radius: 6px;
    
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
  
  .result-success {
    padding: 1rem;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 4px;
    color: #52c41a;
  }
  
  .result-error {
    padding: 1rem;
    background: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 4px;
    color: #ff4d4f;
    
    ul {
      margin: 0.5rem 0 0 1rem;
      padding: 0;
      
      li {
        margin-bottom: 0.25rem;
      }
    }
  }
  </style>