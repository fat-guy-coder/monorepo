# Layout 智能布局组件使用说明

`Layout` 是一套用于构建页面整体布局的组件，它能够智能地识别子组件并自动构建布局，让您无需关心复杂的插槽和模式配置。

## 核心特性

- **智能识别**: 自动识别 `Header`, `SideBar`, `Content`, `Footer` 和嵌套的 `Layout` 子组件，并将其放置在正确的位置。
- **无插槽 API**: 告别繁琐的具名插槽 (`<template #...>`)，像堆积木一样自然地构建布局。
- **双侧边栏支持**: 支持在布局中同时使用左右两个侧边栏。
- **灵活嵌套**: `Layout` 组件可以轻松地进行嵌套，以构建复杂的页面结构。
- **完全响应式**: `SideBar` 组件内置响应式断点，可在小屏幕设备上自动收起。

## 组件构成

-   `<Layout>`: 布局的根容器，也是主控制器。
-   `<Header>`: 顶栏组件。
-   `<SideBar>`: 侧边栏组件。
-   `<Content>`: 主要内容区域。
-   `<Footer>`: 底栏组件。

## 核心用法

您只需要将 `Header`, `SideBar`, `Content`, `Footer` 等组件作为直接子元素放入 `<Layout>` 中即可。

### 1. 经典后台布局

```vue
<template>
  <Layout>
    <SideBar :collapsible="true" v-model:collapsed="isCollapsed">
      <!-- Sider Menu -->
    </SideBar>
    <Layout>
      <Header>Admin Dashboard</Header>
      <Content>
        <p>Main content area.</p>
      </Content>
      <Footer>Copyright © 2025</Footer>
    </Layout>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import { Layout, Header, SideBar, Content, Footer } from '@/components/Layout';

const isCollapsed = ref(false);
</script>
```

### 2. 双侧边栏布局

在 `Layout` 中放置两个 `<SideBar>` 组件，它们会自动分布在左右两侧。

```vue
<template>
  <Layout>
    <SideBar>Left Sider</SideBar>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
    </Layout>
    <SideBar>Right Sider</SideBar>
  </Layout>
</template>

<script setup>
import { Layout, Header, SideBar, Content } from '@/components/Layout';
</script>
```

### 3. 网站顶部-内容-底部布局

```vue
<template>
  <Layout>
    <Header>My Website Header</Header>
    <Content>
      <p>This is the main content of the page.</p>
    </Content>
    <Footer>Copyright © 2025</Footer>
  </Layout>
</template>

<script setup>
import { Layout, Header, Content, Footer } from '@/components/Layout';
</script>
```

## 子组件 Props 说明

### SideBar Props

| Prop             | 类型                                     | 默认值      | 说明                                                                                                |
| ---------------- | ---------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `collapsed`      | `boolean`                                | `false`     | 控制侧边栏的收起状态，支持 `v-model:collapsed`。                                                        |
| `collapsible`    | `boolean`                                | `false`     | 是否显示可收起/展开的触发器。                                                                       |
| `breakpoint`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `undefined` | 触发响应式收起的断点。当窗口宽度小于该断点时，侧边栏会自动收起。                                  |
| `width`          | `string \| number`                       | `'12.5rem'` | 侧边栏展开时的宽度。                                                                                |
| `collapsedWidth` | `string \| number`                       | `'5rem'`    | 侧边栏收起时的宽度。                                                                                |
| `fixed`          | `boolean`                                | `false`     | 是否将侧边栏固定在视口一侧。                                                                        |
| `align`          | `'left' \| 'right'`                      | `'left'`    | **（自动设置）** 侧边栏的对齐方式。第二个 SideBar 会被自动设置为 `'right'`。                          |
| `css`            | `Record<string, string>`                 | `{}`        | 用于覆盖组件根元素的 CSS 变量。                                                                     |

### Header, Content, Footer Props

这些组件也支持 `fixed` (仅 Header/Footer) 和 `css` props，用法与 `SideBar` 类似。

## 高级用法

### 固定布局

你可以通过为 `Header`, `Footer`, 和 `SideBar` 添加 `fixed` prop 来创建复杂的固定布局。**注意**：当使用 `fixed` 布局时，您需要自行处理主内容区域的 `padding`，以防止内容被遮挡。

**示例：一个全固定的后台界面**

```vue
<template>
  <Layout>
    <SideBar :fixed="true" :collapsible="true" v-model:collapsed="isCollapsed">
      <!-- Fixed Sider Menu -->
    </SideBar>
    <Layout :style="{ paddingLeft: isCollapsed ? '5rem' : '12.5rem' }">
      <Header :fixed="true">Fixed Header</Header>
      <Content :style="{ paddingTop: '4rem' }">
        <!-- 你的内容将不会被遮挡 -->
        <p>Main content with correct padding.</p>
      </Content>
    </Layout>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import { Layout, Header, SideBar, Content } from '@/components/Layout';

const isCollapsed = ref(false);
</script>
```
