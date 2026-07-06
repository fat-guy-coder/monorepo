<template>
  <div class="es-overview min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-6 py-6 text-center">
        <h1 class="text-2xl font-bold text-slate-800 mb-2">📜 ECMAScript 新特性演进</h1>
        <p class="text-sm text-slate-500">从 ES5 到 ES2025 — 一张图看尽 JavaScript 进化史</p>
        <p class="text-xs text-slate-400 mt-1">点击特性名称可跳转到对应的详细文档</p>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <ScrollNav :list="versions" :keyMap="{ children: 'features' }" :showChild="true" />

      <div class="space-y-5">
        <section
          v-for="version in versions"
          :key="version.year"
          :id="version.id"
          class="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden"
        >
          <!-- 版本标题栏 -->
          <div class="px-6 py-4 border-b border-slate-100 flex items-center gap-3"
            :class="[
              version.year === '5' ? 'bg-blue-50' :
              version.year === '2015 (ES6)' ? 'bg-pink-50' :
              version.year === '2016' ? 'bg-emerald-50' :
              version.year === '2017' ? 'bg-amber-50' :
              version.year === '2018' ? 'bg-violet-50' :
              version.year === '2019' ? 'bg-rose-50' :
              version.year === '2020' ? 'bg-teal-50' :
              version.year === '2021' ? 'bg-yellow-50' :
              version.year === '2022' ? 'bg-indigo-50' :
              version.year === '2023' ? 'bg-pink-50' :
              version.year === '2024' ? 'bg-emerald-50' :
              'bg-purple-50'
            ]"
          >
            <span class="shrink-0 w-3 h-3 rounded-full"
              :class="[
                version.year === '5' ? 'bg-blue-500' :
                version.year === '2015 (ES6)' ? 'bg-pink-500' :
                version.year === '2016' ? 'bg-emerald-500' :
                version.year === '2017' ? 'bg-amber-500' :
                version.year === '2018' ? 'bg-violet-500' :
                version.year === '2019' ? 'bg-rose-500' :
                version.year === '2020' ? 'bg-teal-500' :
                version.year === '2021' ? 'bg-yellow-500' :
                version.year === '2022' ? 'bg-indigo-500' :
                version.year === '2023' ? 'bg-pink-500' :
                version.year === '2024' ? 'bg-emerald-500' :
                'bg-purple-500'
              ]"
            ></span>
            <h2 class="text-lg font-bold text-slate-800">
              {{ version.name }}
              <span class="text-sm font-normal text-slate-500 ml-2">{{ version.year }}</span>
            </h2>
          </div>

          <!-- 特性网格 -->
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="feature in version.features"
                :key="feature.id"
                :id="feature.id"
                class="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-cyan-300 hover:shadow-sm transition-all group"
              >
                <h3 class="text-sm font-semibold text-slate-700 mb-2">
                  <a
                    @click="handleClick(feature.route)"
                    class="text-cyan-700 hover:text-cyan-500 hover:underline cursor-pointer transition-colors"
                  >
                    {{ feature.name }}
                  </a>
                </h3>
                <p class="text-xs text-slate-500 mb-3 leading-relaxed">{{ feature.description }}</p>
                <div class="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                  <pre class="text-xs text-green-400 font-mono leading-relaxed m-0">{{ feature.code }}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="max-w-5xl mx-auto px-6 py-8 text-center">
      <p class="text-xs text-slate-400">JavaScript 持续进化中 — TC39 每年发布一个新版本</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ScrollNav from 'components/Nav/ScrollNav.vue'

const versions = ref<ESVersion[]>([])

onMounted(async () => {
  const res = await import('../JSON/Es+.json')
  versions.value = res.default as ESVersion[]
})

const emit = defineEmits(['goToByRouteName'])

const handleClick = (route: string) => {
  emit('goToByRouteName', route)
}

interface ESFeature {
  name: string
  description: string
  code: string
  id: string
  route: string
}

interface ESVersion {
  year: string
  id: string
  name: string
  features: ESFeature[]
}
</script>
