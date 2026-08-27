<template>
  <!-- 悬浮球（常驻右下角，点击展开面板） -->
  <div class="study-timer-ball" @click="togglePanel">
    <span class="ball-icon">⏱</span>
    <span class="ball-label">学习计时</span>
  </div>

  <!-- 展开面板 -->
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

        <!-- 进度：已学 vs 建议 -->
        <div class="progress-block">
          <div class="progress-head">
            <span>已学 <b>{{ totalMinutes }}</b> 分钟</span>
            <span v-if="suggestedMinutes && suggestedMinutes > 0" class="text-muted">建议 {{ suggestedMinutes }} 分钟</span>
            <span v-else class="text-muted">未设置建议时长</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progressPercent + '%', background: progressColor }"></div>
          </div>
          <div v-if="hintText" class="hint" :class="hintClass">{{ hintText }}</div>
        </div>

        <!-- 新增学习记录（日志式：填开始/结束时间，自动算时长） -->
        <div class="log-block">
          <div class="section-title">📝 新增学习记录</div>
          <div class="log-row">
            <label class="log-label">开始时间</label>
            <input class="datetime-input" type="datetime-local" v-model="recordStart" />
          </div>
          <div class="log-row">
            <label class="log-label">结束时间</label>
            <input class="datetime-input" type="datetime-local" v-model="recordEnd" />
          </div>
          <div class="log-preview">
            <span v-if="durationPreview > 0" class="text-success">本次学习 {{ durationPreview }} 分钟</span>
            <span v-else-if="started && ended" class="text-warning">结束时间必须晚于开始时间</span>
            <span v-else class="text-muted">填好起止时间后自动计算时长</span>
          </div>
          <Button size="sm" type="primary" :disabled="!canSubmit" @click="onAddRecord">保存记录</Button>
        </div>
      </template>
      <div v-else class="empty-tip">请先选择要计时的章节</div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Modal from '../Modal/index.vue'
import Button from '../Button/index.vue'
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
  /** 章节已确定（菜单/Tab 右键进入）→ 隐藏章节选择，直接计时；false 则显示选择器 */
  fixedMenu?: boolean
}>(), {
  menuId: '',
  menuLabel: '',
  suggestedMinutes: 0,
  totalMinutes: 0,
  fixedMenu: false,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'ball-click'): void
  (e: 'select-menu', menuId: string): void
  (e: 'add-record', payload: { menuId: string; startedAt: string; endedAt: string }): void
}>()

const currentMenuLabel = computed(() => props.menuLabel)

// ---------- 新增学习记录（datetime-local → ISO） ----------
const recordStart = ref('') // 形如 2026-08-27T09:00
const recordEnd = ref('')

// 解析 datetime-local 字符串为毫秒时间戳（new Date 按本地时区解析，与 toISOString 对应）
function parseLocalMs(v: string): number {
  const t = new Date(v).getTime()
  return Number.isNaN(t) ? 0 : t
}
// datetime-local → ISO 8601（后端按 UTC 落库，读取展示时前端再转回本地）
function toISO(v: string): string {
  return new Date(v).toISOString()
}

const started = computed(() => !!recordStart.value)
const ended = computed(() => !!recordEnd.value)
const durationPreview = computed(() => {
  if (!started.value || !ended.value) return 0
  const diff = Math.round((parseLocalMs(recordEnd.value) - parseLocalMs(recordStart.value)) / 60000)
  return diff > 0 ? diff : 0
})
const canSubmit = computed(() => started.value && ended.value && durationPreview.value > 0)

function onAddRecord() {
  if (!props.menuId) return
  if (!canSubmit.value) return
  emit('add-record', {
    menuId: props.menuId,
    startedAt: toISO(recordStart.value),
    endedAt: toISO(recordEnd.value),
  })
  recordStart.value = ''
  recordEnd.value = ''
}

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
  if (isOver.value) return '#f59e0b' // 黄：已超时
  if (isMet.value) return '#22c55e' // 绿：已达标
  return 'var(--color-primary, #3b82f6)'
})
const hintText = computed(() => {
  if (isOver.value) return `⚠️ 已超出建议时长 ${(props.totalMinutes || 0) - (props.suggestedMinutes || 0)} 分钟`
  if (isMet.value) return '✅ 已达建议时长，可以进入下一章了'
  return ''
})
const hintClass = computed(() => (isOver.value ? 'text-warning' : 'text-success'))

// ---------- 悬浮球 / 面板开关 ----------
// 悬浮球是没有上下文章节的入口：通知父组件切回「可切换章节」模式
function togglePanel() {
  emit('ball-click')
  emit('update:visible', !props.visible)
}
function onUpdateVisible(v: boolean) {
  emit('update:visible', v)
}

// ---------- 章节切换 ----------
function onSelectMenu(id: string) {
  emit('select-menu', id)
}
</script>

<style lang="less" scoped>
.study-timer-ball {
  position: fixed;
  bottom: 5.5rem; // 避开右下角导航
  right: 0.5rem;
  z-index: 999;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 9999px;
  background: var(--color-primary, #3b82f6);
  color: #fff;
  font-size: 0.8125rem;
  cursor: pointer;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.25);
  user-select: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.35);
  }
  &:active {
    transform: scale(0.95);
  }

  .ball-icon {
    line-height: 1;
  }
  .ball-label {
    white-space: nowrap;
  }
}

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
    font-size: 0.8125rem;
    color: var(--color-text, #303133);

    .text-muted {
      color: var(--color-text-secondary, #909399);
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

// 新增学习记录（日志式）
.log-block {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border, #dcdfe6);
  border-radius: 0.5rem;

  .section-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text, #303133);
  }

  .log-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .log-label {
      flex-shrink: 0;
      width: 4rem;
      font-size: 0.8125rem;
      color: var(--color-text-secondary, #666);
    }

    .datetime-input {
      flex: 1;
      min-width: 0;
      padding: 0.375rem 0.5rem;
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

  .log-preview {
    font-size: 0.75rem;
    min-height: 1rem;
  }
}

.text-success {
  color: #22c55e;
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
