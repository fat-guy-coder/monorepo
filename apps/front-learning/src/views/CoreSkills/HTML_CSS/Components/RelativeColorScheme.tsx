import { defineComponent } from 'vue'

export const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A10,10 0 0,1 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12.5,7H15.5L10.5,16H7.5L12.5,7M8,14L9,12.5L10,14H8M14,8L13,9.5L12,8H14M9,8L10,9.5L11,8H9M13,14L14,12.5L15,14H13Z" />
  </svg>
)

export const ThemeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20V4Z" />
  </svg>
)

export const ContrastIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
  </svg>
)

export const GradientIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M11,9H13V15H11V9M9,9H7V15H9V9M15,9H17V15H15V9M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19Z" />
  </svg>
)

// 代码块组件
export const CodeBlock = defineComponent({
  setup(_, { slots }) {
    return () => (
      <pre class="code-block">
        <code>{slots.default?.()}</code>
      </pre>
    )
  },
})
