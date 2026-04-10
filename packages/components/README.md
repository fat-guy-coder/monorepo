# Components 工作区组件库

工作区共享的 Vue 3 组件库，供 admin、learning 等项目使用。

## 引入

```typescript
import { Button, Input, Select, Modal, Tree, message } from 'components'
```

## 组件列表

| 组件 | 说明 | 文档 |
|------|------|------|
| [Button](./src/components/Button) | 按钮组件 | 支持 default/primary 类型 |
| [Input](./src/components/Input) | 输入框组件 | 支持搜索框样式 |
| [Select](./src/components/Select) | 选择器组件 | 下拉选择 |
| [Modal](./src/components/Modal) | 模态框组件 | 支持 title/footer 插槽 |
| [Tree](./src/components/Tree) | 树形组件 | 支持展开/折叠/选中事件 |
| [Menu](./src/components/Menu) | 菜单组件 | 支持 inline/vertical 模式 |
| [Table](./src/components/Table) | 表格组件 | 数据展示 |
| [Form](./src/components/Form) | 表单组件 | 配合 FormItem 使用 |
| [FormItem](./src/components/Form) | 表单项组件 | 表单字段封装 |
| [Pagination](./src/components/Pagination) | 分页组件 | 列表分页 |
| [Tabs](./src/components/Tab) | 标签页组件 | 标签导航 |
| [Card](./src/components/Card) | 卡片组件 | 内容容器 |
| [Spin](./src/components/Spin) | 加载组件 | 加载状态 |
| [Tooltip](./src/components/Tooltip) | 气泡提示 | hover 提示 |
| [Progress](./src/components/Progress) | 进度条 | 进度展示 |
| [Switch](./src/components/Switch) | 开关组件 | 开关切换 |
| [Checkbox](./src/components/Checkbox) | 复选框 | 多选 |
| [Radio](./src/components/Radio) | 单选框 | 单选 |
| [Slider](./src/components/Slider) | 滑块组件 | 滑动选择 |
| [InputNumber](./src/components/InputNumber) | 数字输入框 | 数字输入 |
| [Cascader](./src/components/Cascader) | 级联选择器 | 多级联动 |
| [Upload](./src/components/Upload) | 上传组件 | 文件上传 |
| [Transfer](./src/components/Transfer) | 穿梭框 | 左右移动 |
| [TimePicker](./src/components/TimePicker) | 时间选择器 | 时间选择 |
| [List](./src/components/List) | 列表组件 | 列表展示 |
| [Code](./src/components/Code) | 代码高亮 | 代码渲染 |
| [Theme](./src/components/Theme) | 主题切换 | 主题切换 |
| [Link](./src/components/Link) | 链接组件 | 链接展示 |
| [Text](./src/components/Text) | 文本组件 | 文本展示 |
| [Layout](./src/components/Layout) | 布局组件 | Header/SideBar/Content/Footer |
| [PageHeader](./src/components/page/PageHeader.vue) | 页面头部 | 页面标题 |
| [PageFooter](./src/components/page/PageFooter.vue) | 页面底部 | 页面版权 |

## 布局组件

| 组件 | 说明 |
|------|------|
| Header | 顶部布局 |
| SideBar | 侧边栏布局 |
| Content | 内容区域 |
| Footer | 底部布局 |

## 导航组件

| 组件 | 说明 |
|------|------|
| Navigation | 导航组件 |
| Nav | 导航菜单 |
| NavCard | 导航卡片 |
| ScrollNav | 滚动导航 |

## 工具函数

| 导出 | 说明 |
|------|------|
| `message` | 消息提示，支持 success/error/warning/info |

## 使用示例

```vue
<template>
  <div>
    <Button type="primary" @click="handleClick">点击</Button>
    <Input v-model="value" placeholder="请输入" />
    <Select v-model="selected" :options="options" />
    <Modal v-model:visible="visible" title="标题" @confirm="handleConfirm">
      <p>内容</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Select, Modal, message } from 'components'

const value = ref('')
const selected = ref('')
const visible = ref(false)
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]

const handleClick = () => {
  message.success('操作成功')
}

const handleConfirm = () => {
  visible.value = false
}
</script>
```

## Tree 组件

```vue
<Tree
  :data="treeData"
  :default-expanded-keys="['1', '2']"
  @node-click="handleNodeClick"
  @node-expand="handleNodeExpand"
  @node-collapse="handleNodeCollapse"
/>
```

### TreeNode 类型

```typescript
interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  [key: string]: unknown
}
```

## message 消息提示

```typescript
import { message } from 'components'

message.success('操作成功')
message.error('操作失败')
message.warning('警告')
message.info('提示')
```
