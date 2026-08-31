<template>
  <!-- 展开面板（入口在底部导航 navItems「⏱ 学习计时」，见 App.vue） -->
  <Modal
    :visible="visible"
    title="⏱ 章节学习计时"
    width="460px"
    :show-confirm="false"
    :show-cancel="false"
    @update:visible="onUpdateVisible"
  >
    <div class="study-timer-body">
      <!-- 已确定章节（菜单/Tab 右键进入）→ 直接计时，不重复选章节 -->
      <div v-if="fixedMenu" class="fixed-chapter">📖 {{ currentMenuLabel || '当前章节' }}</div>
      <!-- 未确定章节（从悬浮球进入）→ 先选章节 -->
      <div v-else class="field">
        <label class="field-label">章节</label>
        <Select :model-value="menuId" :options="menuOptions" :filterable="true" placeholder="搜索或选择要计时的章节" @update:model-value="onSelectMenu" />
      </div>

      <template v-if="currentMenuLabel">

        <!-- 进度：已学 vs 建议（建议时长可编辑，有值才显示输入框） -->
        <div class="progress-block">
          <div class="progress-head">
            <span>已学 <b>{{ totalMinutes }}</b> 分钟</span>
            <span v-if="suggestedMinutes && suggestedMinutes > 0" class="suggest-row">
              <span class="text-muted">建议</span>
              <input class="suggest-input" type="number" min="0" :value="suggestedMinutes" @change="onSuggestChange" />
              <span class="text-muted">分钟</span>
            </span>
            <span v-else class="text-muted">未设置建议时长</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progressPercent + '%', background: progressColor }"></div>
          </div>
          <div v-if="hintText" class="hint" :class="hintClass">{{ hintText }}</div>
        </div>

        <!-- 最近学习（一菜单单行：显示最近一次起止；有 startedAt 无 endedAt = 进行中） -->
        <div class="sessions-block">
          <div class="section-title">📅 最近学习</div>
          <div v-if="lastStudyText" class="session-item">
            <span class="session-range">{{ lastStudyText }}</span>
          </div>
          <div v-else class="session-empty">还没有学习记录 —— 打开章节阅读会自动计时，切换或关闭页签自动结算</div>
        </div>
      </template>
      <div v-else class="empty-tip">请先选择要计时的章节</div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Modal from '../Modal/index.vue'
import Select from '../Select/index.vue'

interface MenuOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  visible: boolean
  /** 可选章节列表（value = menuId） */
  menuOptions: MenuOption[]
  menuId?: string
  menuLabel?: string
  suggestedMinutes?: number
  totalMinutes?: number
  /** 最近一次开始时间（有值无 endedAt = 进行中） */
  startedAt?: string
  /** 最近一次结束时间 */
  endedAt?: string
  /** 超出建议时长（分钟，max(0, total - suggested)） */
  overtimeMinutes?: number
  /** 章节已确定（菜单/Tab 右键进入）→ 隐藏章节选择，直接计时；false 则显示选择器 */
  fixedMenu?: boolean
}>(), {
  menuId: '',
  menuLabel: '',
  suggestedMinutes: 0,
  totalMinutes: 0,
  startedAt: '',
  endedAt: '',
  overtimeMinutes: 0,
  fixedMenu: false,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'select-menu', menuId: string): void
  (e: 'update-suggested-minutes', value: number): void
}>()

const currentMenuLabel = computed(() => props.menuLabel)

// ---------- 最近学习时间段格式化（本地时区，跨天显示日期） ----------
function pad2(n: number) {
  return String(n).padStart(2, '0')
}
function fmtRange(startIso: string, endIso: string) {
  const st = new Date(startIso)
  const start = `${pad2(st.getMonth() + 1)}-${pad2(st.getDate())} ${pad2(st.getHours())}:${pad2(st.getMinutes())}`
  const et = new Date(endIso)
  const sameDay = st.toDateString() === et.toDateString()
  const end = sameDay
    ? `${pad2(et.getHours())}:${pad2(et.getMinutes())}`
    : `${pad2(et.getMonth() + 1)}-${pad2(et.getDate())} ${pad2(et.getHours())}:${pad2(et.getMinutes())}`
  return `${start} → ${end}`
}

// 最近学习文案：有 endedAt → 上次学习起止；只有 startedAt → 进行中
const lastStudyText = computed(() => {
  if (!props.startedAt) return ''
  if (!props.endedAt) {
    const st = new Date(props.startedAt)
    return `⏳ 进行中：开始于 ${pad2(st.getMonth() + 1)}-${pad2(st.getDate())} ${pad2(st.getHours())}:${pad2(st.getMinutes())}`
  }
  return `上次学习：${fmtRange(props.startedAt, props.endedAt)}`
})

// ---------- 进度条 ----------
const progressPercent = computed(() => {
  const s = props.suggestedMinutes || 0
  const t = props.totalMinutes || 0
  if (s <= 0) return 0
  return Math.min(100, Math.round((t / s) * 100))
})
const isOver = computed(() => (props.suggestedMinutes || 0) > 0 && (props.totalMinutes || 0) > (props.suggestedMinutes || 0))
const isMet = computed(() => (props.suggestedMinutes || 0) > 0 && (props.totalMinutes || 0) >= (props.suggestedMinutes || 0))
const progressColor = computed(() => {
  if (isOver.value) return '#60a5fa' // 蓝：复习巩固（超过建议不是失败，用中性蓝不施压）
  if (isMet.value) return '#22c55e' // 绿：已达标
  return 'var(--color-primary, #3b82f6)'
})
const hintText = computed(() => {
  if (isOver.value) {
    // 与后端 overtimeMinutes 同公式（max(0, total - suggested)），不依赖 props.overtimeMinutes 是否传入
    const over = Math.max(0, (props.totalMinutes || 0) - (props.suggestedMinutes || 0))
    return `🔁 已超过建议 ${over} 分钟，进入复习巩固。要反复看很正常，慢慢来，不着急`
  }
  if (isMet.value) return '✅ 已达建议时长，可以进入下一章了'
  return ''
})
const hintClass = computed(() => (isOver.value ? 'text-info' : 'text-success'))

// ---------- 面板开关 ----------
function onUpdateVisible(v: boolean) {
  emit('update:visible', v)
}

// ---------- 建议时长可编辑（change 时提交，父组件 PUT 落库后回刷） ----------
function onSuggestChange(e: Event) {
  const el = e.target as HTMLInputElement
  const v = Math.max(0, Math.floor(Number(el.value) || 0))
  if (v === props.suggestedMinutes) return
  emit('update-suggested-minutes', v)
}

// ---------- 章节切换 ----------
function onSelectMenu(id: string) {
  emit('select-menu', id)
}
</script>

<style lang="less" scoped>
.study-timer-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  .field-label {
    font-size: var(--font-size-xs, 0.75rem);
    color: var(--color-text-secondary, #666);
  }
}

.current-chapter {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary, #3b82f6);
}

.fixed-chapter {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  background: color-mix(in srgb, var(--color-primary, #3b82f6) 10%, transparent);
  color: var(--color-primary, #3b82f6);
  font-size: 0.875rem;
  font-weight: 600;
}

// 进度条
.progress-block {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  .progress-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8125rem;
    color: var(--color-text, #303133);

    .text-muted {
      color: var(--color-text-secondary, #909399);
    }
  }

  // 建议时长可编辑输入框
  .suggest-row {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;

    .suggest-input {
      width: 3.5rem;
      padding: 0.125rem 0.375rem;
      border: 1px solid var(--color-border, #dcdfe6);
      border-radius: 0.375rem;
      font-size: 0.8125rem;
      font-family: inherit;
      color: var(--color-text, #303133);
      background: var(--color-background, #fff);
      outline: none;

      &:focus {
        border-color: var(--color-primary, #3b82f6);
      }
    }
  }

  .progress-track {
    height: 0.5rem;
    border-radius: 9999px;
    background: var(--color-background-soft, #eef2f7);
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.4s ease, background 0.4s ease;
  }

  .hint {
    font-size: 0.75rem;
    font-weight: 500;
  }
}

// 学习记录列表（自动计时的起止时间段）
.sessions-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border, #dcdfe6);
  border-radius: 0.5rem;

  .section-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text, #303133);
  }

  .session-list {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    max-height: 12rem;
    overflow-y: auto;
  }

  .session-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem;
    border-radius: 0.375rem;
    background: var(--color-background-soft, #f5f7fa);
    font-size: 0.75rem;
    color: var(--color-text, #303133);

    .session-range {
      font-family: var(--font-mono, ui-monospace, monospace);
    }
    .session-dur {
      flex-shrink: 0;
      font-weight: 600;
      color: var(--color-primary, #3b82f6);
    }
  }

  .session-empty {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #909399);
  }
}

.text-success {
  color: #22c55e;
}
.text-info {
  color: #60a5fa;
}
.text-warning {
  color: #f59e0b;
}
.text-muted {
  color: var(--color-text-secondary, #909399);
}
.empty-tip {
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-secondary, #909399);
}
</style>
