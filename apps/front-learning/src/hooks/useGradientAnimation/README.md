# useGradientAnimation 渐变动画钩子

一个零依赖、**按需生成 CSS** 的 Vue3 组合式函数（composable），用于为任何元素快速注入炫酷的「线性/径向/文字/荧光阴影」渐变动画效果。它通过 **在运行时动态插入 `<style>` 标签** 的方式工作，不会污染全局样式，也不依赖第三方动画库。

> 适用于 Vue3 + `<script setup>`/普通组合式 API 场景。

---

## 快速开始

```vue
<script setup lang="ts">
import { useGradientAnimation } from '@/hooks/useGradientAnimation'

// 仅需在组件 **setup** 中调用一次即可
useGradientAnimation({
  className: 'ga',                     // 前缀 class，会自动拼接类型/伪类
  gradientTypes: ['linear', 'text'],   // 需要的渐变类型
  triggerTimes: ['hover'],             // 触发时机（hover、active、mounted）
  colors: ['#34d399', '#6366f1', '#ec4899'], // 自定义颜色
  direction: '45deg',                  // 动画方向
})
```

```html
<template>
  <!-- 线性背景渐变，鼠标悬浮触发 -->
  <button class="ga-linear-hover px-4 py-2 rounded text-white font-bold">Hover Me !</button>

  <!-- 文字渐变，鼠标悬浮触发 -->
  <h1 class="ga-text-hover text-4xl mt-6 font-black">Gradient Text</h1>
</template>
```

运行后会看到按钮背景、标题文字在 **hover** 时出现流动渐变动画。

---

## Class 生成规则

调用 `useGradientAnimation()` 后，钩子会根据 `className`、`gradientTypes` 与 `triggerTimes` 组合生成样式，并 **不会主动给元素添加 class** ，需要你在模板中手动使用：

```
.{className}-{type}[-{trigger}]
```

| 占位符        | 说明                                           | 示例                      |
| ------------- | ---------------------------------------------- | ------------------------- | ------- | ----------- | -------- |
| `{className}` | `options.className`，默认 `gradient-animation` | `ga`                      |
| `{type}`      | 渐变类型 `linear                               | radial                    | text    | box-shadow` | `linear` |
| `{trigger}`   | 触发时机 `hover                                | active`（mounted 时省略） | `hover` |

示例：`ga-linear`（页面加载即动）`ga-text-hover`（鼠标悬浮才动）。

---

## API

### `useGradientAnimation(options?: UseGradientAnimationOptions)`

| 参数名               | 类型                                          | 默认值                                          | 说明                                                     |
| -------------------- | --------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| `className`          | `string`                                      | `gradient-animation`                            | 基础类名前缀                                             |
| `usePseudoClassName` | `boolean`                                     | `false`                                         | 是否为 `:hover/:active` 额外生成同名类（通常不需要）     |
| `gradientTypes`      | `GradientType[]`                              | `['linear']`                                    | 需要生成的渐变类型                                       |
| `triggerTimes`       | `TriggerTime[]`                               | `['mounted', 'hover', 'active']`                | 触发时机                                                 |
| `colors`             | `BaseColor[]`                                 | `THEME_SECONDARY_GRADIENT_COLORS`               | 线性/径向渐变颜色源                                      |
| `textGradientColors` | `string[]`                                    | `THEME_FONT_GRADIENT_COLORS`                    | 文字渐变颜色源                                           |
| `boxShadowColors`    | `string[]`                                    | `THEME_HIGH_CONTRAST_NEON_COLORS`               | 荧光阴影颜色源                                           |
| `opacity`            | `number`                                      | `1`                                             | 最终背景透明度                                           |
| `colorsCount`        | `number \| [min,max] \| ColorsSequenceRandom` | `3`                                             | 颜色段数或随机策略（见下文）                             |
| `speed`              | `number`                                      | `15`                                            | 渐变移动速度，越大越快                                   |
| `timeUnit`           | `'s' \| 'ms'`                                 | `'s'`                                           | 速度单位                                                 |
| `direction`          | `Direction`                                   | `'0deg'`                                        | 动画方向，支持 `0deg~360deg`、`to top` 等，或 `'random'` |
| `aspectRatio`        | `number`                                      | `1`                                             | 当元素非 1:1 且需要斜线动画时传入宽高比                  |
| `animation`          | `string \| AnimationType`                     | 见源码                                          | 重写 animation 声明                                      |
| `boxShadowConfig`    | `BoxShadowConfig`                             | `{ x:'0',y:'0',blur:0,spread:0.1,brightness:1}` | 盒阴影专用配置                                           |
| `items`              | `Partial<UseGradientAnimationOptions>[]`      | `[]`                                            | 递归生成多组动画（进阶用法）                             |

### ColorsSequenceRandom

```ts
interface ColorsSequenceRandom {
  allRandom?: boolean // 一键随机（等同开启下面全部）
  randomColorsCount?: boolean | number // 随机取色数量；数字为固定段数
  randomColorsOrder?: boolean // 随机顺序
  randomDirection?: boolean // 随机方向
}
```

示例：

```ts
useGradientAnimation({
  colorsCount: {
    randomColorsCount: [2, 5], // 2~5 段随机
    randomColorsOrder: true,
    randomDirection: true,
  },
})
```

---

## Box-Shadow 模式

`gradientTypes` 包含 `box-shadow` 时，会生成荧光闪烁阴影动画，只需为元素添加对应类：

```html
<div class="ga-box-shadow mt-4 w-40 h-20 rounded bg-gray-800"></div>
```

可通过 `boxShadowConfig` 调整偏移、模糊、亮度等参数。

---

## 进阶：多组动画

```ts
useGradientAnimation({
  // 第一组：按钮背景
  className: 'ga',
  gradientTypes: ['linear'],
  triggerTimes: ['hover'],
  colors: ['#06b6d4', '#3b82f6'],

  // 子项将递归调用钩子，可生成完全独立的 class
  items: [
    {
      className: 'title',
      gradientTypes: ['text'],
      triggerTimes: ['mounted'],
      colorsCount: 4,
    },
  ],
})
```

最终会得到 `.ga-linear-hover` 与 `.title-text` 两套样式，互不影响。

---

## 注意事项

1. **不会自动加 class** —— 请按「Class 生成规则」自行写入模板。
2. 该钩子内部在 `onUnmounted` 自动清理 `<style>` 标签，无内存泄漏之虞。
3. 渐变动画本质为 `background-position`/`box-shadow` 变换，极低性能开销，可放心使用。
4. 如果需要 SSR，请在客户端挂载后再调用（`onMounted` 或 `client-only` 包裹）。

---

## License

MIT
