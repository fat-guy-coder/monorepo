import type { CSSProperties } from 'vue'


type editCodeProps = {
  layout?: 'horizontal' | 'vertical' | 'grid'
  html ?: {
    code: string
    style?:CSSProperties
  }|string
  css : {
    code: string
    language: 'css'
  }
  javascript : {
    code: string
    language: 'javascript'

