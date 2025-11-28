<template>
  <div class="tabs-nav">
    <button v-if="isOverflowing" class="tabs-nav-prev" :disabled="isLeftScrollDisabled"
      @click="handleScroll('left')">&lt;</button>
    <div class="tabs-nav-wrap">
      <div class="tabs-nav-list" ref="navListRef" :style="{ transform: `translateX(${transformOffset}px)` }">
        <!-- <slot name="tab" v-if="$slots.tab" v-for="(pane, index) in items" :key="pane.path" :pane="pane"
          :path="pane.path" :index="index"></slot> -->
        <template>
          <div v-for="pane in items" :key="pane.path" class="tab" :ref="(el) => setTabRef(pane.path, el as HTMLElement)"
            :class="{ 'is-active': modelValue === pane.path, 'is-disabled': pane.disabled }"
            @click="handleTabClick(pane)">
            {{ pane.label }}
          </div>
        </template>
        <div class="tabs-ink-bar" :style="inkBarStyle"></div>
      </div>
    </div>
    <button v-if="isOverflowing" class="tabs-nav-next" :disabled="isRightScrollDisabled"
      @click="handleScroll('right')">&gt;</button>
  </div>
  <div class="tabs-content-holder">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, type VNode, onMounted, onUnmounted, useSlots, provide } from 'vue';
import type { Tab } from '@/stores/tab'

defineOptions({
  name: 'ATabs',
});


type TabItem = Tab & {
  disabled?: boolean;
  index?: number;
}

const props = defineProps<{
  modelValue: string; // The key of the active tab
  items: TabItem[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', key: string): void;
  (event: 'change', item: TabItem): void;
}>();

const slots = useSlots();

// Dynamically get panes from slots
const panes = computed<TabItem[]>(() => {
  const children = slots.default ? slots.default() : [];
  return children
    .filter(node => (node.type as any)?.name === 'ATabPane')
    .map(node => (node.props as any) as TabItem);
});

// Provide active key to child TabPane components
provide('activeKey', computed(() => props.modelValue));

const navListRef = ref<HTMLElement | null>(null);
const tabRefs = ref<Record<string, HTMLElement>>({});
const setTabRef = (key: string, el: HTMLElement) => {
  if (el) {
    tabRefs.value[key] = el;
  }
};

// --- Ink Bar Logic ---
const inkBarStyle = ref<{ width: string; transform: string }>({ width: '0px', transform: 'translateX(0px)' });

const updateInkBar = () => {
  nextTick(() => {
    const activeTab = tabRefs.value[props.modelValue];
    if (activeTab) {
      inkBarStyle.value = {
        width: `${activeTab.offsetWidth}px`,
        transform: `translateX(${activeTab.offsetLeft}px)`,
      };
    }
  });
};

// --- Tab Click Logic ---
const handleTabClick = (item: TabItem) => {
  if (!item.disabled) {
    emit('change', item);
    emit('update:modelValue', item.path);
  }
};

// --- Scrolling Logic ---
const isOverflowing = ref(false);
const transformOffset = ref(0);

const isLeftScrollDisabled = computed(() => transformOffset.value >= 0);
const isRightScrollDisabled = computed(() => {
  if (!navListRef.value) return true;
  const containerWidth = navListRef.value.parentElement!.offsetWidth;
  const listWidth = navListRef.value.scrollWidth;
  return transformOffset.value <= -(listWidth - containerWidth);
});

const checkOverflow = () => {
  if (navListRef.value && navListRef.value.parentElement) {
    const containerWidth = navListRef.value.parentElement.offsetWidth;
    const listWidth = navListRef.value.scrollWidth;
    isOverflowing.value = listWidth > containerWidth;
    // Reset scroll if it's no longer overflowing
    if (!isOverflowing.value) {
      transformOffset.value = 0;
    }
  }
};

const handleScroll = (direction: 'left' | 'right') => {
  if (!navListRef.value) return;
  const containerWidth = navListRef.value.parentElement!.offsetWidth;
  const scrollAmount = containerWidth * 0.8;
  let newOffset = transformOffset.value;

  if (direction === 'right') {
    newOffset -= scrollAmount;
  } else {
    newOffset += scrollAmount;
  }

  const maxOffset = 0;
  const minOffset = -(navListRef.value.scrollWidth - containerWidth);
  transformOffset.value = Math.max(minOffset, Math.min(maxOffset, newOffset));
};

const scrollToActiveTab = () => {
  if (!isOverflowing.value || !navListRef.value) return;
  const activeTab = tabRefs.value[props.modelValue];
  if (!activeTab) return;

  const containerWidth = navListRef.value.parentElement!.offsetWidth;
  const activeTabLeft = activeTab.offsetLeft;
  const activeTabWidth = activeTab.offsetWidth;
  const currentLeft = -transformOffset.value;
  const currentRight = currentLeft + containerWidth;

  if (activeTabLeft < currentLeft) {
    transformOffset.value = -activeTabLeft;
  } else if (activeTabLeft + activeTabWidth > currentRight) {
    transformOffset.value = -(activeTabLeft + activeTabWidth - containerWidth);
  }
};

// --- Watchers & Lifecycle ---
watch(() => props.modelValue, () => {
  updateInkBar();
  scrollToActiveTab();
}, { immediate: true });

watch(panes, () => {
  nextTick(() => {
    updateInkBar();
    checkOverflow();
  });
}, { immediate: true, deep: true });

let observer: ResizeObserver | null = null;

onMounted(() => {
  observer = new ResizeObserver(checkOverflow);
  if (navListRef.value && navListRef.value.parentElement) {
    observer.observe(navListRef.value);
    observer.observe(navListRef.value.parentElement);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

</script>

<style lang="less" scoped>
/* Styles will be implemented in the next step */
</style>
