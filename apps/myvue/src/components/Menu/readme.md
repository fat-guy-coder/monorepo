# Menu 菜单组件

这是一个功能丰富、高度可定制的递归菜单组件，支持多种布局模式、异步加载子菜单以及响应式设计。

## 特性

- **两种模式**: 支持 `inline` (内联) 和 `vertical` (垂直) 两种布局模式。
- **无限层级**: 支持无限层级的菜单嵌套。
- **异步加载**: 支持点击父菜单时异步加载子菜单数据。
- **状态管理**: 通过 `v-model` 管理展开和选中的菜单项。
- **可定制**: 可以通过 Props 和 CSS 变量轻松定制外观和动画。
- **响应式**: 能够适应移动端设备。

## 引入

假设您有一个导出 `Menu` 组件的 `index.ts` 文件。

```typescript
import Menu from '@/components/Menu/index.vue';
```

## 数据结构 (`MenuItemType`)

菜单组件接收一个 `items` 数组，数组中每个对象代表一个菜单项，其结构如下：

| 属性        | 说明                                     | 类型          | 是否必需 |
| ----------- | ---------------------------------------- | ------------- | -------- |
| `path`      | 菜单项的唯一标识符，通常是路由路径。     | `string`      | 是       |
| `name`      | 菜单项的显示名称。                       | `string`      | 是       |
| `label`     | 可选的显示名称，如果提供，将优先于 `name`。 | `string`      | 否       |
| `icon`      | 菜单项的图标。                           | `string`      | 否       |
| `children`  | 子菜单项数组。                           | `MenuItem[]`  | 否       |
| `hasChildren` | 指示该菜单项是否有可异步加载的子菜单。   | `boolean`     | 否       |
| `match`     | 用于高亮匹配的菜单项。                   | `boolean`     | 否       |

## 使用示例

```vue
<template>
  <Menu
    :items="menuItems"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :on-load-data="loadData"
    mode="inline"
    :collapsed="isCollapsed"
    @select="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from '@/components/Menu/index.vue';
import type { MenuItem } from '@/components/Menu';

const isCollapsed = ref(false);
const openKeys = ref(['/dashboard']);
const selectedKeys = ref(['/dashboard/analytics']);

const menuItems: MenuItem[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: '📊',
    children: [
      { path: '/dashboard/analytics', name: 'Analytics' },
      { path: '/dashboard/reports', name: 'Reports' },
    ],
  },
  {
    path: '/users',
    name: 'Users',
    icon: '👥',
    hasChildren: true, // 异步加载子菜单
  },
];

const handleMenuSelect = (item: MenuItem) => {
  console.log('Selected:', item.path);
  // router.push(item.path);
};

const loadData = async (item: MenuItem): Promise<MenuItem[]> => {
  if (item.path === '/users') {
    // 模拟 API 请求
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { path: '/users/list', name: 'User List' },
          { path: '/users/roles', name: 'Roles' },
        ]);
      }, 1000);
    });
  }
  return [];
};
</script>
```

## Menu 组件 API

### Props

| 属性                | 说明                                                              | 类型                                                  | 默认值                                                               |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `items`             | 菜单数据源。                                                      | `MenuItemType[]`                                      | `[]` (必需)                                                          |
| `mode`              | 菜单模式，`inline` 或 `vertical`。                                  | `'inline' \| 'vertical'`                             | `'vertical'`                                                         |
| `collapsed`         | 是否收起菜单 (仅在 `inline` 模式下有视觉效果，但会影响两种模式的行为)。 | `boolean`                                             | `false`                                                              |
| `onLoadData`        | 异步加载子菜单数据的函数。                                        | `(item: MenuItemType) => Promise<MenuItemType[] \| void>` | `undefined`                                                          |
| `menuConfig`        | 菜单的样式配置。                                                  | `Object`                                              | `{ labelSize: 14, itemGap: 4, animationDuration: 250 }`              |
| `renderAllChildren` | (暂未完全实现) 是否渲染所有子节点。                               | `boolean`                                             | `false`                                                              |

### v-model

| 名称           | 说明                           | 类型       |
| -------------- | ------------------------------ | ---------- |
| `v-model:openKeys`   | 当前展开的父菜单 `path` 数组。 | `string[]` |
| `v-model:selectedKeys` | 当前选中的菜单项 `path` 数组。 | `string[]` |

### Events

| 事件名   | 说明                       | 回调参数               |
| -------- | -------------------------- | ---------------------- |
| `select` | 当一个菜单项被选中时触发。 | `(item: MenuItemType)` |

