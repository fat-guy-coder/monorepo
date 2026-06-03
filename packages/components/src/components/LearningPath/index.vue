<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">{{ title }}</h1>
        <p class="mt-4 text-xl text-gray-500">{{ description }}</p>
        <div v-if="tags?.length" class="mt-6 flex flex-wrap justify-center gap-3">
          <span v-for="t in tags" :key="t.label" class="px-4 py-1.5 rounded-full text-sm font-medium border"
            :class="tagStyle(t.color)">
            {{ t.label }}
          </span>
        </div>
      </div>

      <!-- 时间轴 -->
      <div class="relative">
        <div class="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>
        <ul class="flex flex-col gap-12">
          <li v-for="phase in phases" :key="phase.id" class="relative pl-12 sm:pl-16">
            <!-- 圆点 -->
            <div
              class="absolute left-0 sm:left-2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white text-sm font-bold"
              :class="phase.color">
              {{ phase.icon }}
            </div>

            <!-- 卡片 -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div class="p-6 sm:p-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 class="text-2xl font-bold text-gray-900">{{ phase.title }}</h2>
                  <span class="mt-2 sm:mt-0 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    ⏱ {{ phase.period }}
                  </span>
                </div>
                <p class="text-gray-600 mb-5 leading-relaxed">{{ phase.desc }}</p>

                <!-- 模块分组 -->
                <div v-for="mod in phase.modules" :key="mod.name" class="mb-4">
                  <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ mod.label }}</h3>
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <li v-for="t in mod.topics" :key="t.name" class="flex items-baseline gap-2 text-sm">
                      <span class="text-cyan-500 mt-1 shrink-0">▸</span>
                      <Link v-if="t.name" :route="t.name" :text="t.label" animation="none" size="small"
                        class="p-0! text-sm! font-normal! text-gray-700! hover:text-cyan-600! bg-transparent! border-none! inline!" />
                      <span v-else class="text-gray-700">{{ t.label }}</span>
                    </li>
                  </ul>
                </div>

                <!-- 实战提示 -->
                <div v-if="phase.practice"
                  class="mt-4 p-4 rounded-xl border-2 border-dashed bg-gray-50 border-gray-200">
                  <p class="text-sm font-semibold text-gray-800">{{ phase.practice }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 底部 -->
      <div v-if="footerText" class="mt-16 text-center text-sm text-gray-400">
        {{ footerText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Link from '../Link/index.vue'

export interface Topic {
  name: string
  label: string
}

export interface Module {
  name: string
  label: string
  topics: Topic[]
}

export interface Phase {
  id: number
  icon: string
  title: string
  period: string
  desc: string
  color: string
  modules: Module[]
  practice?: string
}

export interface PathTag {
  label: string
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'amber' | 'pink' | 'indigo' | 'cyan' | 'emerald' | 'lime' | 'rose' | 'violet'
}

const props = withDefaults(defineProps<{
  title: string
  description?: string
  tags?: PathTag[]
  phases: Phase[]
  footerText?: string
}>(), {})

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  pink: 'bg-pink-50 text-pink-700 border-pink-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  lime: 'bg-lime-50 text-lime-700 border-lime-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
}

function tagStyle(color: string) {
  return colorMap[color] || colorMap.blue
}
</script>
