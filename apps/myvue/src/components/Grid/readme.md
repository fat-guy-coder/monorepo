# Grid 栅格组件

这是一个基于 Flex 布局的响应式栅格系统，用于创建灵活的页面布局。它由 `Row` 和 `Col` 两个组件组成。

## 引入

```typescript
import { Row, Col } from '@/components/Grid';
```

## Row 组件

`Row` 是行容器，用于包裹 `Col` 组件。

### Props

| 属性   | 说明             | 类型   | 默认值 |
| ------ | ---------------- | ------ | ------ |
| gutter | 栅格间隔，单位 px | Number | 0      |

## Col 组件

`Col` 是列容器，必须作为 `Row` 的直接子元素。

### Props

| 属性   | 说明                                   | 类型                | 默认值 |
| ------ | -------------------------------------- | ------------------- | ------ |
| span   | 栅格占据的列数（总共 24 列）           | Number / String     | 24     |
| offset | 栅格左侧的间隔格数                     | Number / String     | 0      |
| xs     | `<576px` 响应式栅格数或栅格属性对象   | Number / Object     | -      |
| sm     | `≥576px` 响应式栅格数或栅格属性对象  | Number / Object     | -      |
| md     | `≥768px` 响应式栅格数或栅格属性对象  | Number / Object     | -      |
| lg     | `≥992px` 响应式栅格数或栅格属性对象  | Number / Object     | -      |
| xl     | `≥1200px` 响应式栅格数或栅格属性对象 | Number / Object     | -      |

`xs`, `sm`, `md`, `lg`, `xl` 支持传入一个对象，例如 `{ span: 4, offset: 4 }`。

## 使用示例

### 基础布局

```vue
<template>
  <Row>
    <Col :span="12"><div>col-12</div></Col>
    <Col :span="12"><div>col-12</div></Col>
  </Row>
  <Row>
    <Col :span="8"><div>col-8</div></Col>
    <Col :span="8"><div>col-8</div></Col>
    <Col :span="8"><div>col-8</div></Col>
  </Row>
</template>
```

### 分栏间隔

使用 `gutter` 属性为分栏添加间隔。

```vue
<template>
  <Row :gutter="20">
    <Col :span="6"><div>col-6</div></Col>
    <Col :span="6"><div>col-6</div></Col>
    <Col :span="6"><div>col-6</div></Col>
    <Col :span="6"><div>col-6</div></Col>
  </Row>
</template>
```

### 分栏偏移

使用 `offset` 属性将分栏向右偏移指定的格数。

```vue
<template>
  <Row :gutter="20">
    <Col :span="6"><div>col-6</div></Col>
    <Col :span="6" :offset="6"><div>col-6, offset-6</div></Col>
  </Row>
</template>
```

### 响应式布局

预设了五个响应尺寸：`xs`, `sm`, `md`, `lg`, `xl`。

```vue
<template>
  <Row :gutter="10">
    <Col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>Responsive Col</div></Col>
    <Col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div>Responsive Col</div></Col>
    <Col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div>Responsive Col</div></Col>
    <Col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>Responsive Col</div></Col>
  </Row>
</template>
```

