<template>
  <div :class="colClasses" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

// 新增 flex 属性支持
const props = defineProps({
  span: {
    type: [Number, String],
    default: 24,
  },
  offset: {
    type: [Number, String],
    default: 0,
  },
  pull: {
    type: [Number, String],
    default: 0,
  },
  push: {
    type: [Number, String],
    default: 0,
  },
  order: {
    // 新增 order 属性
    type: [Number, String],
    default: undefined,
  },
  flex: {
    // 新增 flex 属性
    type: [String, Number],
    default: undefined,
  },
  xs: { type: [Number, Object] },
  sm: { type: [Number, Object] },
  md: { type: [Number, Object] },
  lg: { type: [Number, Object] },
  xl: { type: [Number, Object] },
  xxl: { type: [Number, Object] },
  justify: {
    type: String,
    default: undefined,
    validator: (value: string) => ['start', 'center', 'end', 'space-between', 'space-around', undefined].includes(value)
  },
  align: {
    type: String,
    default: undefined,
    validator: (value: string) =>
      ['top', 'middle', 'bottom', 'stretch', undefined].includes(value)
  }
})

const gutter = inject('gutter', computed(() => ({ horizontal: 0, vertical: 0 })))
const justify = inject('justify', props.justify)
const align = inject('align', props.align)

// 处理 flex 字符串/数字传入的格式
function parseFlex(flex: string | number | undefined) {
  if (typeof flex === 'number') return `${flex} ${flex} auto`
  if (typeof flex === 'string') {
    // 如果是有效的 css flex 值就直接用
    if (
      flex === 'auto' ||
      flex === 'initial' ||
      flex === 'none' ||
      /^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)
    ) {
      return `0 0 ${flex}`
    }
    return flex
  }
  return undefined
}

const colStyle = computed(() => {
  let style: Record<string, string | number> = {
    paddingLeft: `${gutter.value.horizontal / 2}px`,
    paddingRight: `${gutter.value.horizontal / 2}px`,
    paddingTop: `${gutter.value.vertical / 2}px`,
    paddingBottom: `${gutter.value.vertical / 2}px`,
  }

  // 支持 align（子元素对齐方式）单独控制（可选），让 align 直接应用到本列
  if (align) {
    switch (align) {
      case 'top':
        style.alignSelf = 'flex-start'
        break
      case 'middle':
        style.alignSelf = 'center'
        break
      case 'bottom':
        style.alignSelf = 'flex-end'
        break
      case 'stretch':
        style.alignSelf = 'stretch'
        break
    }
  }
  // 支持 order 属性
  if (props.order !== undefined && props.order !== null) {
    style.order = props.order
  }
  // 支持 flex 属性
  if (props.flex !== undefined && props.flex !== null) {
    style.flex = parseFlex(props.flex) as string | number
  }
  return style
})

const colClasses = computed(() => {
  const classes: string[] = ['col']
  const pos: Array<'span' | 'offset' | 'pull' | 'push'> = ['span', 'offset', 'pull', 'push']
  const screens: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'> = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
  ]

  pos.forEach((prop) => {
    const value = props[prop]
    if (value || value === 0) {
      classes.push(`col-${prop}-${value}`)
    }
  })

  screens.forEach((screen) => {
    const screenProp = props[screen as keyof typeof props]
    if (typeof screenProp === 'number') {
      classes.push(`col-${screen}-span-${screenProp}`)
    } else if (typeof screenProp === 'object' && screenProp !== null) {
      Object.keys(screenProp).forEach((key) => {
        classes.push(`col-${screen}-${key}-${screenProp[key]}`)
      })
    }
  })

  // Add justify class if known
  if (justify) {
    classes.push(`col-justify-${justify}`)
  }
  // Add align class if known
  if (align) {
    classes.push(`col-align-${align}`)
  }

  // Add order class if present
  if (props.order !== undefined && props.order !== null) {
    classes.push(`col-order-${props.order}`)
  }

  // Add flex class as标记（可以不加样式，主要由行内 style 控制）
  if (props.flex !== undefined && props.flex !== null) {
    classes.push('col-has-flex')
  }

  return classes
})
</script>

<style scoped lang="less">
.col {
  box-sizing: border-box;
}

/* 支持order排序，样式辅助，可以和 style 结合 */
[class*="col-order-"] {
  /* 提示：order 主要建议由 style 控制 */
  display: block;
  position: relative;
  z-index: 1;
}

/* Flex支持占位样式（可选/主要看 style.flex） */
.col-has-flex {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

/* justify classes (affects flex alignment in parent row) */
.col-justify-start {
  justify-self: flex-start;
  align-self: auto;
}
.col-justify-center {
  justify-self: center;
  align-self: auto;
}
.col-justify-end {
  justify-self: flex-end;
  align-self: auto;
}
.col-justify-space-between {
  justify-self: stretch;
  align-self: auto;
}
.col-justify-space-around {
  justify-self: stretch;
  align-self: auto;
}

/* align classes (控制子元素垂直对齐方式) */
.col-align-top {
  align-self: flex-start;
}
.col-align-middle {
  align-self: center;
}
.col-align-bottom {
  align-self: flex-end;
}
.col-align-stretch {
  align-self: stretch;
}

/*
  Note: justify-self/align-self only work if the parent has display: grid or flex respectively
  justify: 用于主轴方向对齐
  align: 用于交叉轴方向对齐，通常建议在 Row 行级容器设置 align-items，更常用
  这里为 Col 也提供 align 修饰，支持单个列个性对齐
*/

.generate-columns(@n, @i: 0) when (@i =< @n) {
  .col-span-@{i} {
    width: (@i / 24) * 100%;
  }
  .col-offset-@{i} {
    margin-left: (@i / 24) * 100%;
  }
  .col-pull-@{i} {
    right: (@i / 24) * 100%;
    position: relative;
  }
  .col-push-@{i} {
    left: (@i / 24) * 100%;
    position: relative;
  }
  .generate-columns(@n, (@i + 1));
}
.generate-columns(24);

// Responsive breakpoints (example values)
@media (min-width: 576px) {
  // sm
  .generate-columns-sm(@n, @i: 0) when (@i =< @n) {
    .col-sm-span-@{i} {
      width: (@i / 24) * 100%;
    }
    .col-sm-offset-@{i} {
      margin-left: (@i / 24) * 100%;
    }
    .col-sm-pull-@{i} {
      right: (@i / 24) * 100%;
      position: relative;
    }
    .col-sm-push-@{i} {
      left: (@i / 24) * 100%;
      position: relative;
    }
    .generate-columns-sm(@n, (@i + 1));
  }
  .generate-columns-sm(24);
}

@media (min-width: 768px) {
  // md
  .generate-columns-md(@n, @i: 0) when (@i =< @n) {
    .col-md-span-@{i} {
      width: (@i / 24) * 100%;
    }
    .col-md-offset-@{i} {
      margin-left: (@i / 24) * 100%;
    }
    .col-md-pull-@{i} {
      right: (@i / 24) * 100%;
      position: relative;
    }
    .col-md-push-@{i} {
      left: (@i / 24) * 100%;
      position: relative;
    }
    .generate-columns-md(@n, (@i + 1));
  }
  .generate-columns-md(24);
}

@media (min-width: 992px) {
  // lg
  .generate-columns-lg(@n, @i: 0) when (@i =< @n) {
    .col-lg-span-@{i} {
      width: (@i / 24) * 100%;
    }
    .col-lg-offset-@{i} {
      margin-left: (@i / 24) * 100%;
    }
    .col-lg-pull-@{i} {
      right: (@i / 24) * 100%;
      position: relative;
    }
    .col-lg-push-@{i} {
      left: (@i / 24) * 100%;
      position: relative;
    }
    .generate-columns-lg(@n, (@i + 1));
  }
  .generate-columns-lg(24);
}

@media (min-width: 1200px) {
  // xl
  .generate-columns-xl(@n, @i: 0) when (@i =< @n) {
    .col-xl-span-@{i} {
      width: (@i / 24) * 100%;
    }
    .col-xl-offset-@{i} {
      margin-left: (@i / 24) * 100%;
    }
    .col-xl-pull-@{i} {
      right: (@i / 24) * 100%;
      position: relative;
    }
    .col-xl-push-@{i} {
      left: (@i / 24) * 100%;
      position: relative;
    }
    .generate-columns-xl(@n, (@i + 1));
  }
  .generate-columns-xl(24);
}

@media (min-width: 1400px) {
  // xxl
  .generate-columns-xxl(@n, @i: 0) when (@i =< @n) {
    .col-xxl-span-@{i} {
      width: (@i / 24) * 100%;
    }
    .col-xxl-offset-@{i} {
      margin-left: (@i / 24) * 100%;
    }
    .col-xxl-pull-@{i} {
      right: (@i / 24) * 100%;
      position: relative;
    }
    .col-xxl-push-@{i} {
      left: (@i / 24) * 100%;
      position: relative;
    }
    .generate-columns-xxl(@n, (@i + 1));
  }
  .generate-columns-xxl(24);
}
</style>
