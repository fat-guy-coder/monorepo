<template>
  <div class="form-engine-container">
    <header class="page-header">
      <h1 class="title">前端表单引擎</h1>
      <p class="subtitle">动态表单构建与管理的终极解决方案</p>
    </header>

    <main class="content">
      <!-- 概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">表单引擎概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                表单引擎是一种通过配置驱动的方式动态生成和管理表单的系统，它解决了传统表单开发中的重复劳动、维护困难等问题。
              </p>
              <div class="engine-basics">
                <h3>核心价值</h3>
                <div class="value-grid">
                  <div class="value-item">
                    <div class="value-icon">⚡</div>
                    <div class="value-text">
                      <h4>开发效率</h4>
                      <p>通过配置快速生成表单，减少重复代码</p>
                    </div>
                  </div>
                  <div class="value-item">
                    <div class="value-icon">🔧</div>
                    <div class="value-text">
                      <h4>维护性</h4>
                      <p>集中管理表单逻辑，易于维护和扩展</p>
                    </div>
                  </div>
                  <div class="value-item">
                    <div class="value-icon">🎯</div>
                    <div class="value-text">
                      <h4>一致性</h4>
                      <p>统一表单交互和验证体验</p>
                    </div>
                  </div>
                  <div class="value-item">
                    <div class="value-icon">🚀</div>
                    <div class="value-text">
                      <h4>动态性</h4>
                      <p>支持运行时动态调整表单结构</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心概念 -->
      <section class="concepts-section">
        <div class="card">
          <h2 class="card-title">核心概念</h2>
          <div class="card-content">
            <div class="concepts-grid">
              <div class="concept-card">
                <div class="concept-header">
                  <h3 class="concept-name">表单配置</h3>
                  <span class="concept-tag basic">基础</span>
                </div>
                <div class="concept-content">
                  <div class="concept-preview config-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="concept-info">
                    <p>使用JSON或DSL描述表单结构、字段、验证规则等</p>
                    <h4>关键属性：</h4>
                    <ul>
                      <li><strong>fields</strong> - 字段定义</li>
                      <li><strong>layout</strong> - 布局配置</li>
                      <li><strong>rules</strong> - 验证规则</li>
                      <li><strong>actions</strong> - 表单操作</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="concept-card">
                <div class="concept-header">
                  <h3 class="concept-name">字段类型系统</h3>
                  <span class="concept-tag advanced">核心</span>
                </div>
                <div class="concept-content">
                  <div class="concept-preview field-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="concept-info">
                    <p>定义不同类型的表单字段及其对应的渲染组件</p>
                    <h4>常见类型：</h4>
                    <ul>
                      <li>文本输入 (input)</li>
                      <li>选择器 (select)</li>
                      <li>日期选择 (date)</li>
                      <li>文件上传 (upload)</li>
                      <li>富文本 (rich-text)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="concept-card">
                <div class="concept-header">
                  <h3 class="concept-name">验证引擎</h3>
                  <span class="concept-tag advanced">核心</span>
                </div>
                <div class="concept-content">
                  <div class="concept-preview validation-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="concept-info">
                    <p>统一的验证规则管理和错误处理机制</p>
                    <h4>验证方式：</h4>
                    <ul>
                      <li>同步验证</li>
                      <li>异步验证</li>
                      <li>交叉验证</li>
                      <li>自定义验证</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="concept-card">
                <div class="concept-header">
                  <h3 class="concept-name">数据流管理</h3>
                  <span class="concept-tag advanced">核心</span>
                </div>
                <div class="concept-content">
                  <div class="concept-preview dataflow-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="concept-info">
                    <p>管理表单数据的获取、修改、提交等数据流动</p>
                    <h4>数据操作：</h4>
                    <ul>
                      <li>初始值设置</li>
                      <li>数据转换</li>
                      <li>提交处理</li>
                      <li>状态管理</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 工作原理 -->
      <section class="principles-section">
        <div class="card">
          <h2 class="card-title">工作原理</h2>
          <div class="card-content">
            <div class="workflow">
              <div class="workflow-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>配置解析</h4>
                    <p>解析JSON配置，构建表单抽象语法树(AST)</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>组件映射</h4>
                    <p>将字段类型映射到对应的UI组件</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>渲染生成</h4>
                    <p>根据布局配置生成完整的表单UI</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>状态管理</h4>
                    <p>管理表单数据、验证状态和交互逻辑</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <h4>事件处理</h4>
                    <p>处理用户交互和表单操作</p>
                  </div>
                </div>
              </div>

              <div class="architecture-diagram">
                <h3>系统架构图</h3>
                <div class="diagram">
                  <div class="layer">
                    <div class="layer-title">配置层</div>
                    <div class="layer-content">
                      <div class="component">JSON Schema</div>
                      <div class="component">DSL 配置</div>
                    </div>
                  </div>
                  <div class="connector">↓ 解析</div>
                  <div class="layer">
                    <div class="layer-title">引擎核心</div>
                    <div class="layer-content">
                      <div class="component">配置解析器</div>
                      <div class="component">验证引擎</div>
                      <div class="component">数据管理器</div>
                    </div>
                  </div>
                  <div class="connector">↓ 渲染</div>
                  <div class="layer">
                    <div class="layer-title">UI 层</div>
                    <div class="layer-content">
                      <div class="component">字段组件</div>
                      <div class="component">布局组件</div>
                      <div class="component">操作组件</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 简易实现 -->
      <section class="implementation-section">
        <div class="card">
          <h2 class="card-title">简易表单引擎实现</h2>
          <div class="card-content">
            <div class="implementation-content">
              <div class="code-example">
                <h3>基础表单引擎类</h3>
                <pre><code>class FormEngine {
  constructor(config) {
    this.config = config;
    this.fields = new Map();
    this.data = {};
    this.errors = {};
    this.init();
  }

  // 初始化引擎
  init() {
    this.parseConfig();
    this.setupValidation();
    this.setupDataFlow();
  }

  // 解析配置
  parseConfig() {
    const { fields, layout, rules } = this.config;

    this.fields = new Map(
      fields.map(field => [field.name, field])
    );

    this.layout = layout;
    this.rules = rules;
  }

  // 设置验证
  setupValidation() {
    this.validators = new Map();

    for (const [fieldName, rule] of Object.entries(this.rules)) {
      this.validators.set(fieldName, this.createValidator(rule));
    }
  }

  // 创建验证器
  createValidator(rule) {
    return (value) => {
      const errors = [];

      if (rule.required && (!value || value.toString().trim() === '')) {
        errors.push('该字段为必填项');
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        errors.push(`最小长度为 ${rule.minLength}`);
      }

      if (rule.pattern && value && !rule.pattern.test(value)) {
        errors.push('格式不正确');
      }

      return errors;
    };
  }

  // 设置数据流
  setupDataFlow() {
    // 设置初始值
    this.data = { ...this.config.initialValues };
  }

  // 更新字段值
  setFieldValue(name, value) {
    this.data[name] = value;

    // 触发验证
    this.validateField(name);

    // 触发变化事件
    this.emit('change', { name, value, data: this.data });
  }

  // 验证字段
  validateField(name) {
    const validator = this.validators.get(name);
    if (validator) {
      const value = this.data[name];
      const fieldErrors = validator(value);
      this.errors[name] = fieldErrors;

      this.emit('validate', { name, errors: fieldErrors });
    }
  }

  // 验证整个表单
  validateForm() {
    let isValid = true;

    for (const [name] of this.fields) {
      this.validateField(name);
      if (this.errors[name] && this.errors[name].length > 0) {
        isValid = false;
      }
    }

    return isValid;
  }

  // 提交表单
  async submit() {
    const isValid = this.validateForm();

    if (!isValid) {
      this.emit('submitError', this.errors);
      return false;
    }

    try {
      this.emit('submitting', this.data);
      const result = await this.config.onSubmit(this.data);
      this.emit('submitSuccess', result);
      return true;
    } catch (error) {
      this.emit('submitError', error);
      return false;
    }
  }

  // 获取表单数据
  getFormData() {
    return { ...this.data };
  }

  // 重置表单
  reset() {
    this.data = { ...this.config.initialValues };
    this.errors = {};
    this.emit('reset', this.data);
  }

  // 事件系统
  events = new Map();

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(callback);
  }

  off(event, callback) {
    if (this.events.has(event)) {
      this.events.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => {
        callback(data);
      });
    }
  }
}</code></pre>
              </div>

              <div class="code-example">
                <h3>React/Vue 组件封装</h3>
                <pre><code>// React 示例
function DynamicForm({ config }) {
  const [formEngine] = useState(() => new FormEngine(config));
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    formEngine.on('change', ({ data }) => {
      setFormData(data);
    });

    formEngine.on('validate', ({ name, errors }) => {
      setErrors(prev => ({ ...prev, [name]: errors }));
    });

    return () => {
      formEngine.off('change');
      formEngine.off('validate');
    };
  }, [formEngine]);

  const renderField = (field) => {
    const { type, name, label, placeholder, options } = field;
    const value = formData[name] || '';
    const fieldErrors = errors[name] || [];

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          &lt;div key={name} className="form-field"&gt;
            &lt;label&gt;{label}&lt;/label&gt;
            &lt;input
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={(e) => formEngine.setFieldValue(name, e.target.value)}
            /&gt;
            {fieldErrors.map(error => (
              &lt;span key={error} className="error"&gt;{error}&lt;/span&gt;
            ))}
          &lt;/div&gt;
        );

      case 'select':
        return (
          &lt;div key={name} className="form-field"&gt;
            &lt;label&gt;{label}&lt;/label&gt;
            &lt;select
              value={value}
              onChange={(e) => formEngine.setFieldValue(name, e.target.value)}
            &gt;
              {options.map(option => (
                &lt;option key={option.value} value={option.value}&gt;
                  {option.label}
                &lt;/option&gt;
              ))}
            &lt;/select&gt;
            {fieldErrors.map(error => (
              &lt;span key={error} className="error"&gt;{error}&lt;/span&gt;
            ))}
          &lt;/div&gt;
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await formEngine.submit();
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      {config.fields.map(renderField)}
      &lt;button type="submit"&gt;提交&lt;/button&gt;
      &lt;button type="button" onClick={() => formEngine.reset()}"&gt;
        重置
      &lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
              </div>

              <div class="code-example">
                <h3>配置示例</h3>
                <pre><code>const formConfig = {
  fields: [
    {
      name: 'username',
      type: 'text',
      label: '用户名',
      placeholder: '请输入用户名',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱地址',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      required: true
    },
    {
      name: 'gender',
      type: 'select',
      label: '性别',
      options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' }
      ]
    }
  ],
  rules: {
    username: {
      required: true,
      minLength: 3,
      pattern: /^[a-zA-Z0-9_]+$/
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      minLength: 6
    }
  },
  initialValues: {
    gender: 'male'
  },
  layout: {
    type: 'vertical',
    columns: 1
  },
  onSubmit: async (data) => {
    // 提交到后端
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 流行框架 -->
      <section class="frameworks-section">
        <div class="card">
          <h2 class="card-title">流行表单引擎框架</h2>
          <div class="card-content">
            <div class="frameworks-grid">
              <div class="framework-card">
                <div class="framework-header">
                  <h3 class="framework-name">Formik (React)</h3>
                  <span class="framework-tag popular">流行</span>
                </div>
                <div class="framework-content">
                  <div class="framework-info">
                    <h4>特点</h4>
                    <ul>
                      <li>声明式表单构建</li>
                      <li>强大的验证支持</li>
                      <li>丰富的生态系统</li>
                      <li>良好的TypeScript支持</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>复杂的React应用表单需求</p>
                  </div>
                  <div class="framework-code">
                    <pre><code>import { Formik, Field, Form } from 'formik';

&lt;Formik
  :initialValues="{ email: '' }"
  :validate="values => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    return errors;
  }"
  :onSubmit="values => {
    console.log(values);
  }"
&gt;
  &lt;Form&gt;
    &lt;Field type="email" name="email" /&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
  &lt;/Form&gt;
&lt;/Formik&gt;</code></pre>
                  </div>
                </div>
              </div>

              <div class="framework-card">
                <div class="framework-header">
                  <h3 class="framework-name">React Hook Form</h3>
                  <span class="framework-tag modern">现代</span>
                </div>
                <div class="framework-content">
                  <div class="framework-info">
                    <h4>特点</h4>
                    <ul>
                      <li>基于React Hooks</li>
                      <li>高性能</li>
                      <li>最小重新渲染</li>
                      <li>易于集成</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>性能敏感的大型应用</p>
                  </div>
                  <div class="framework-code">
                    <pre><code>import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    &lt;form onSubmit={handleSubmit(onSubmit)}&gt;
      &lt;input {...register("firstName", { required: true })} /&gt;
      {errors.firstName && &lt;span&gt;This field is required&lt;/span&gt;}
      &lt;input type="submit" /&gt;
    &lt;/form&gt;
  );
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="framework-card">
                <div class="framework-header">
                  <h3 class="framework-name">Vue Formulate</h3>
                  <span class="framework-tag vue">Vue</span>
                </div>
                <div class="framework-content">
                  <div class="framework-info">
                    <h4>特点</h4>
                    <ul>
                      <li>Vue原生支持</li>
                      <li>开箱即用</li>
                      <li>强大的验证系统</li>
                      <li>可扩展的架构</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>Vue.js项目的表单解决方案</p>
                  </div>
                  <div class="framework-code">
                    <pre><code>&lt;FormulateForm
  v-model="values"
  @submit="submitHandler"
&gt;
  &lt;FormulateInput
    type="text"
    name="name"
    label="Your name"
    validation="required"
  /&gt;
  &lt;FormulateInput
    type="email"
    name="email"
    label="Email address"
    validation="required|email"
  /&gt;
  &lt;FormulateInput type="submit" label="Submit" /&gt;
&lt;/FormulateForm&gt;</code></pre>
                  </div>
                </div>
              </div>

              <div class="framework-card">
                <div class="framework-header">
                  <h3 class="framework-name">Ant Design Form</h3>
                  <span class="framework-tag enterprise">企业级</span>
                </div>
                <div class="framework-content">
                  <div class="framework-info">
                    <h4>特点</h4>
                    <ul>
                      <li>企业级UI组件</li>
                      <li>完整的表单解决方案</li>
                      <li>丰富的表单控件</li>
                      <li>TypeScript友好</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>企业级中后台管理系统</p>
                  </div>
                  <div class="framework-code">
                    <pre><code>import { Form, Input, Button } from 'antd';

const DemoForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    &lt;Form onFinish={onFinish}&gt;
      &lt;Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      &gt;
        &lt;Input /&gt;
      &lt;/Form.Item&gt;
      &lt;Form.Item&gt;
        &lt;Button type="primary" htmlType="submit"&gt;Submit&lt;/Button&gt;
      &lt;/Form.Item&gt;
    &lt;/Form&gt;
  );
};</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices-section">
        <div class="card">
          <h2 class="card-title">最佳实践与设计模式</h2>
          <div class="card-content">
            <div class="practices-grid">
              <div class="practice-item">
                <div class="practice-icon">🏗️</div>
                <div class="practice-content">
                  <h4>分层架构</h4>
                  <p>将配置层、引擎层、UI层分离，提高可维护性</p>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-icon">🎨</div>
                <div class="practice-content">
                  <h4>组件化设计</h4>
                  <p>将表单字段抽象为可复用的组件</p>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-icon">📚</div>
                <div class="practice-content">
                  <h4>配置标准化</h4>
                  <p>制定统一的配置规范，便于团队协作</p>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-icon">🔄</div>
                <div class="practice-content">
                  <h4>状态管理</h4>
                  <p>合理管理表单状态，避免不必要的重新渲染</p>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-icon">🧪</div>
                <div class="practice-content">
                  <h4>测试策略</h4>
                  <p>对表单逻辑、验证规则进行充分测试</p>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-icon">🚀</div>
                <div class="practice-content">
                  <h4>性能优化</h4>
                  <p>使用懒加载、记忆化等技术优化大型表单性能</p>
                </div>
              </div>
            </div>

            <div class="advanced-patterns">
              <h3>高级设计模式</h3>
              <div class="patterns-grid">
                <div class="pattern-item">
                  <h4>动态表单</h4>
                  <p>根据用户输入动态调整表单字段和验证规则</p>
                  <div class="code-block">
                    <pre><code>// 条件字段显示
{
  "field": "company",
  "type": "text",
  "showWhen": {
    "field": "userType",
    "value": "business"
  }
}</code></pre>
                  </div>
                </div>
                <div class="pattern-item">
                  <h4>多步骤表单</h4>
                  <p>将复杂表单分解为多个步骤，提高用户体验</p>
                  <div class="code-block">
                    <pre><code>const multiStepConfig = {
  steps: [
    { title: "基本信息", fields: ["name", "email"] },
    { title: "详细信息", fields: ["address", "phone"] },
    { title: "确认信息", fields: [] }
  ]
};</code></pre>
                  </div>
                </div>
                <div class="pattern-item">
                  <h4>表单数组</h4>
                  <p>支持动态增减的表单项数组</p>
                  <div class="code-block">
                    <pre><code>{
  "field": "experiences",
  "type": "array",
  "itemType": "object",
  "itemFields": [
    { "name": "company", "type": "text" },
    { "name": "position", "type": "text" }
  ]
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加响应式数据或方法
</script>

<style lang="less" scoped>
.form-engine-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf7 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px 0;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0;
    font-weight: 300;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e9ecef;
  }
}

.overview-content {
  .intro-text {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 24px;
    text-align: center;
  }
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.value-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .value-icon {
    font-size: 2rem;
    margin-right: 16px;
  }

  .value-text {
    h4 {
      margin: 0 0 4px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.concept-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.concept-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .concept-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .concept-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.basic {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.advanced {
      background: #fff3e0;
      color: #f57c00;
    }
  }
}

.concept-content {
  padding: 20px;
}

.concept-preview {
  height: 80px;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .preview-object {
    width: 60px;
    height: 60px;
    border-radius: 6px;
  }
}

.config-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .preview-object {
    background:
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 5px,
        rgba(255,255,255,0.1) 5px,
        rgba(255,255,255,0.1) 10px
      );
    border: 2px dashed rgba(255,255,255,0.3);
  }
}

.field-preview {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

  .preview-object {
    background:
      linear-gradient(45deg,
        rgba(255,255,255,0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255,255,255,0.2) 50%,
        rgba(255,255,255,0.2) 75%,
        transparent 75%
      );
    background-size: 10px 10px;
  }
}

.validation-preview {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

  .preview-object {
    background:
      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(255,255,255,0.6) 0%, transparent 50%);
    border: 2px solid rgba(255,255,255,0.5);
  }
}

.dataflow-preview {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

  .preview-object {
    background:
      conic-gradient(from 0deg, #fff, #aaa, #fff);
    animation: rotate 3s linear infinite;
  }
}

.concept-info {
  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
      color: #555;
      font-size: 0.9rem;

      strong {
        color: #2c3e50;
      }
    }
  }
}

.workflow {
  .workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }
}

.step {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    font-weight: 600;
    font-size: 1.1rem;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .step-content {
    h4 {
      margin: 0 0 4px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.architecture-diagram {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
    text-align: center;
  }
}

.diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.layer {
  width: 100%;
  max-width: 400px;

  .layer-title {
    text-align: center;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  .layer-content {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
}

.component {
  background: #667eea;
  color: white;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  flex: 1;
  max-width: 120px;
}

.connector {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.implementation-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.code-example {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.code-block {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.frameworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.framework-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.framework-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .framework-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .framework-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.popular {
      background: #e8f5e8;
      color: #2e7d32;
    }

    &.modern {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.vue {
      background: #e8f5e9;
      color: #4caf50;
    }

    &.enterprise {
      background: #fce4ec;
      color: #c2185b;
    }
  }
}

.framework-content {
  padding: 20px;
}

.framework-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  ul {
    margin: 0 0 12px 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
      color: #555;
      font-size: 0.9rem;
    }
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.framework-code {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.practice-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .practice-icon {
    font-size: 1.5rem;
    margin-right: 16px;
  }

  .practice-content {
    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.advanced-patterns {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.pattern-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
  }
}

// 动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .form-engine-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .value-grid,
  .concepts-grid,
  .frameworks-grid,
  .practices-grid,
  .patterns-grid {
    grid-template-columns: 1fr;
  }

  .step {
    flex-direction: column;
    align-items: flex-start;

    .step-number {
      margin-bottom: 12px;
    }
  }

  .layer-content {
    flex-direction: column;
    align-items: center;
  }

  .component {
    max-width: none;
    width: 100%;
  }
}
</style>
