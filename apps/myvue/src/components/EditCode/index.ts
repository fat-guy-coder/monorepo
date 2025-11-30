import type { PropType } from 'vue';

// 定义单个代码块的结构
export interface CodeBlock {
  id: string; // 唯一标识符，用于 v-for
  code: string;
  language: 'html' | 'css' | 'javascript' | 'typescript';
  title?: string; // 可选的标题
}

// 定义组件的 props
export const editCodeProps = {
  // 代码块数组，允许多个编辑器
  codes: {
    type: Array as PropType<CodeBlock[]>,
    default: () => [],
  },
  // 编辑器与预览的整体布局
  layout: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal', // 默认左右布局
  },
  // 多个编辑器之间的布局
  editorLayout: {
    type: String as PropType<'row' | 'column'>,
    default: 'column', // 默认上下排列
  },
};
