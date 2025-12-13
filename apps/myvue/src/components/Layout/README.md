# Layout 布局组件使用说明

`Layout` 是一套用于构建页面整体布局的组件，通过简单的组合即可实现多种常见的页面结构，并内置了强大的响应式和定制化功能。

## 组件构成

-   `<Layout>`: 布局的根容器，也是主控制器。
-   `<Header>`: 顶栏组件（由 `Layout` 内部渲染）。
-   `<SideBar>`: 侧边栏组件（由 `Layout` 内部渲染）。
-   `<Content>`: 主要内容区域（由 `Layout` 内部渲染）。
-   `<Footer>`: 底栏组件（由 `Layout` 内部渲染）。

## 核心用法

你只需要使用 `<Layout>` 组件，并通过 `mode` prop 来选择预设的布局模式，然后使用具名插槽 (`<template #...`) 来填充对应区域的内容。

### 1. 默认布局 (mode: 'tcf')

最常见的网站布局：顶部-内容-底部。

```vue
<template>
  <Layout>
    <template #header>
      <h1>My Website Header</h1>
    </template>
    <template #content>
      <p>This is the main content of the page.</p>
    </template>
    <template #footer>
      <p>Copyright © 2025</p>
    </template>
  </Layout>
</template>

<script setup>
import Layout from '@/components/Layout/index.vue';
</script>
```

### 2. 经典后台布局 (mode: 'tsc')

经典的后台管理布局：顶部-（侧边栏-内容）。

```vue
<template>
  <Layout 
    mode="tsc" 
    v-model:collapsed="isCollapsed" 
    :sider-props="{ collapsible: true, breakpoint: 'lg' }"
  >
    <template #header>
      <h1>Admin Dashboard</h1>
    </template>
    <template #sider>
      <!-- 通常放置 Menu 组件 -->
      <p>Sider Menu</p>
    </template>
    <template #content>
      <p>Main content area.</p>
    </template>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '@/components/Layout/index.vue';

const isCollapsed = ref(false);
</script>
```

### 3. 另一种后台布局 (mode: 'stc')

侧边栏在最外层的后台布局：侧边栏-（顶部-内容）。

```vue
<template>
  <Layout 
    mode="stc" 
    v-model:collapsed="isCollapsed" 
    :sider-props="{ collapsible: true }"
  >
    <template #sider>
      <p>Sider Menu</p>
    </template>
    <template #header>
      <h1>Header</h1>
    </template>
    <template #content>
      <p>Main content area.</p>
    </template>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '@/components/Layout/index.vue';

const isCollapsed = ref(false);
</script>
```

## 主要 Props 说明

### Layout Props

| Prop           | 类型                               | 默认值  | 说明                                                                                                  |
| -------------- | ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `mode`         | `'tcf' \| 'tsc' \| 'stc'`           | `'tcf'` | 指定布局模式。                                                                                        |
| `collapsed`    | `boolean`                          | `false` | 控制侧边栏的收起状态，支持 `v-model:collapsed`。                                                        |
| `siderProps`   | `object`                           | `{}`    | 用于向内部的 `SideBar` 组件传递 props，详见下文。                                                       |
| `headerProps`  | `object`                           | `{}`    | 用于向内部的 `Header` 组件传递 props，例如 `{ fixed: true }`。                                           |
| `footerProps`  | `object`                           | `{}`    | 用于向内部的 `Footer` 组件传递 props，例如 `{ fixed: true }`。                                           |
| `css`          | `Record<string, string>`           | `{}`    | 用于覆盖 `<Layout>` 根容器的 CSS 变量，例如 `{ '--layout-bg': '#f0f2f5' }`。                          |

### SideBar Props (通过 `siderProps` 传递)

| Prop             | 类型                                     | 默认值      | 说明                                                                                                |
| ---------------- | ---------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `collapsible`    | `boolean`                                | `false`     | 是否显示可收起/展开的触发器。                                                                       |
| `breakpoint`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `undefined` | 触发响应式收起的断点。当窗口宽度小于该断点时，侧边栏会自动收起。                                  |
| `width`          | `string \| number`                       | `'12.5rem'` | 侧边栏展开时的宽度。                                                                                |
| `collapsedWidth` | `string \| number`                       | `'5rem'`    | 侧边栏收起时的宽度。                                                                                |
| `fixed`          | `boolean`                                | `false`     | 是否将侧边栏固定在视口一侧。                                                                        |
| `align`          | `'left' \| 'right'`                      | `'left'`    | 侧边栏的对齐方式，靠左或靠右。                                                                      |

## 高级用法

### 固定布局

你可以通过 `headerProps`, `footerProps`, 和 `siderProps` 来创建复杂的固定布局。`Layout` 组件会自动计算这些固定元素占据的空间，并为主内容区域添加 `padding` 以防止内容被遮挡。

**示例：一个全固定的后台界面**

```vue
<template>
  <Layout 
    mode="stc" 
    v-model:collapsed="isCollapsed"
    :headerProps="{ fixed: true }"
    :siderProps="{ fixed: true, collapsible: true, breakpoint: 'lg' }"
  >
    <template #header>
      <h1>Fixed Header</h1>
    </template>
    <template #sider>
      <p>Fixed Sider Menu</p>
    </template>
    <template #content>
      <!-- 你的内容将不会被遮挡 -->
      <p>Main content with correct padding.</p>
    </template>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '@/components/Layout/index.vue';

const isCollapsed = ref(false);
</script>
```

### 样式定制

所有布局组件（`Layout`, `Header`, `Footer`, `SideBar`, `Content`）都支持通过 `css` prop 进行样式覆盖。你可以传递一个包含 CSS 自定义属性的对象来修改组件的内部样式。

**示例：修改 `SideBar` 的背景色和 `Header` 的高度**

```vue
<template>
  <Layout
    mode="stc"
    :headerProps="{ css: { '--header-height': '3.5rem' } }"
    :siderProps="{ css: { '--sider-bg': '#001529' } }"
  >
    <!-- ... -->
  </Layout>
</template>
```

