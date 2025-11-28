<template>
  <div class="view-container" :class="{
    'view-container--list': currentMode === 'list',
    'view-container--waterfall': currentMode === 'waterfall',
    'view-container--mixed': currentMode === 'mixed',
  }" :style="styleVars">
    <!-- 头部：标题区 -->
    <header class="page-header">
      <div class="header-inner">
        <h1 class="page-title">核心技能模板页</h1>
        <p class="page-subtitle">以主题变量驱动的卡片式信息布局</p>
        <p class="page-note">
          建议：本模板用于承载知识点/功能模块的分区展示。通过主题变量实现深浅/冷暖主题的无缝切换；布局优先采用栅格，在移动端保持优秀可读性与触达性。
        </p>
      </div>
    </header>

    <!-- 列表模式和混合模式：导航 -->
    <Nav v-if="currentMode === 'list'" :list="categoryList" show-child />
    <Nav v-if="currentMode === 'mixed'" :list="mixedNavList" show-child />
    <!-- 模式切换 Tabs -->
    <NavTagCard :items="modeTabs.map(t => ({ id: t.value, title: t.label }))" size="medium" variant="gradient"
      :background-colors="['#1677ff', '#69b1ff']" rounded="md"
      :direction="(componentsConfig.navTagCard?.direction as any) || 'horizontal'"
      :enable-scroll="componentsConfig.navTagCard?.mode === 'scroll'" v-model:active-id="currentMode">
      <!-- 普通模式 -->
      <template #normal>
        <!-- 普通模式 -->
        <section>
          <!-- 内容区：栅格 + 卡片组合 -->
          <div class="grid layout">
            <!-- 大卡片：概览/引导 -->
            <Card class="card-large" :hoverable="true" :bordered="true">
              <template #title>
                <div class="card-title">概览 · 今日学习计划</div>
              </template>
              <template #body>
                <div class="plan-list">
                  <div v-for="item in planList" :key="item.id" :id="item.id" class="plan-item">
                    <span class="plan-time">{{ item.time }}</span>
                    <div class="plan-content">
                      <div class="plan-name">{{ item.name }}</div>
                      <div class="plan-desc">{{ item.desc }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>

            <!-- 小卡片：分块内容 -->
            <Card v-for="card in smallCards" :key="card.id" :id="card.id" class="card-small" :hoverable="true">
              <template #title>
                <div class="card-title">{{ card.title }}</div>
              </template>
              <template #body>
                <ul class="bullet-list">
                  <li v-for="(line, i) in card.items" :key="i">{{ line }}</li>
                </ul>
              </template>
            </Card>

            <!-- 大卡片：示例代码/知识点 -->
            <Card class="card-large" :hoverable="true">
              <template #title>
                <div class="card-title">示例 · 类型系统要点</div>
              </template>
              <template #body>
                <Code :code="`// TypeScript 基础类型
let age: number = 18
let username: string = 'cascade'
let isOk: boolean = true

// 接口与类型别名
interface User { id: number; name: string }
type ID = User['id']

// 内置工具类型
type ReadonlyUser = Readonly<User>`" language="ts" title="类型系统示例" />
              </template>
            </Card>

            <!-- 小卡片：清单/待办 -->
            <Card class="card-small" :hoverable="true">
              <template #title>
                <div class="card-title">清单 · 待复习</div>
              </template>
              <template #body>
                <div class="todo-list">
                  <label v-for="todo in todos" :key="todo.id" :id="todo.id" class="todo-item">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }">{{ todo.text }}</span>
                  </label>
                </div>
              </template>
            </Card>

            <!-- 小卡片：链接/导航 -->
            <Card class="card-small" :hoverable="true">
              <template #title>
                <div class="card-title">导航 · 相关阅读</div>
              </template>
              <template #body>
                <nav class="link-list">
                  <Link v-for="link in links" :key="link.id" :id="link.id" :href="link.href" :text="link.label"
                    size="small" variant="solid" animation="lift" target="_blank" />
                </nav>
              </template>
            </Card>
          </div>
        </section>
      </template>
      <!-- 列表模式 -->
      <template #list>
        <div>
          <section v-for="category in categoryList" :key="category.id" :id="category.id" class="category-section">
            <h2 class="category-title">{{ category.name }}</h2>
            <!-- 多列网格布局（类似 BasicType.vue） -->
            <div v-if="currentConfig.layoutType === 'multi-column'" class="type-grid-container">
              <div v-for="(item, index) in category.children" :key="item.id" :id="item.id" class="type-grid-item">
                <div class="tip-header">
                  <span class="tip-index">#{{ index + 1 }}</span>
                  <h3>{{ item.name }}</h3>
                </div>
                <p v-if="'description' in item && item.description" class="tip-desc">{{ item.description }}</p>
                <div v-if="item.type === 'plan' && Array.isArray(item.data)" class="plan-list">
                  <div v-for="plan in item.data as Array<{ id: string; time: string; name: string; desc: string }>"
                    :key="plan.id" :id="plan.id" class="plan-item">
                    <span class="plan-time">{{ plan.time }}</span>
                    <div class="plan-content">
                      <div class="plan-name">{{ plan.name }}</div>
                      <div class="plan-desc">{{ plan.desc }}</div>
                    </div>
                  </div>
                </div>
                <ul v-if="item.type === 'list' && Array.isArray(item.data)" class="bullet-list">
                  <li v-for="(line, i) in item.data as string[]" :key="i">{{ line }}</li>
                </ul>
                <Code v-if="item.type === 'code' && typeof item.data === 'string'" :code="item.data" language="ts"
                  :hidden-toolbar="false" />
                <div v-if="item.type === 'todo' && Array.isArray(item.data)" class="todo-list">
                  <label v-for="todo in item.data as Array<{ id: string; text: string; done: boolean }>" :key="todo.id"
                    :id="todo.id" class="todo-item">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }">{{ todo.text }}</span>
                  </label>
                </div>
                <nav v-if="item.type === 'links' && Array.isArray(item.data)" class="link-list">
                  <Link v-for="link in item.data as Array<{ id: string; label: string; href: string }>" :key="link.id"
                    :id="link.id" size="small" />
                </nav>
                <div v-if="item.type === 'tags' && Array.isArray(item.data)" class="chip-list">
                  <Link v-for="tag in item.data as Array<{ id: string; label: string; href: string }>" :key="tag.id"
                    :id="tag.id" :href="tag.href" :text="tag.label" size="small" />
                </div>
                <div v-if="item.type === 'progress' && Array.isArray(item.data)" class="progress-list">
                  <div v-for="p in item.data as Array<{ id: string; label: string; value: number }>" :key="p.id"
                    :id="p.id" class="progress-item">
                    <div class="progress-meta">
                      <span class="name">{{ p.label }}</span>
                      <span class="val">{{ p.value }}%</span>
                    </div>
                    <div class="progress">
                      <div class="bar" :style="{ '--val': p.value + '%' }"></div>
                    </div>
                  </div>
                </div>
                <ul v-if="item.type === 'tips' && Array.isArray(item.data)" class="tip-list">
                  <li v-for="tip in item.data as Array<{ id: string; text: string }>" :key="tip.id" :id="tip.id">{{
                    tip.text
                  }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 传统网格布局 -->
            <div v-else class="tips-grid">
              <div v-for="(item, index) in category.children" :key="item.id" :id="item.id" class="tip-card">
                <div class="tip-header">
                  <span class="tip-index">#{{ index + 1 }}</span>
                  <h3>{{ item.name }}</h3>
                </div>
                <p v-if="'description' in item && item.description" class="tip-desc">{{ item.description }}</p>
                <div v-if="item.type === 'plan' && Array.isArray(item.data)" class="plan-list">
                  <div v-for="plan in item.data as Array<{ id: string; time: string; name: string; desc: string }>"
                    :key="plan.id" :id="plan.id" class="plan-item">
                    <span class="plan-time">{{ plan.time }}</span>
                    <div class="plan-content">
                      <div class="plan-name">{{ plan.name }}</div>
                      <div class="plan-desc">{{ plan.desc }}</div>
                    </div>
                  </div>
                </div>
                <ul v-if="item.type === 'list' && Array.isArray(item.data)" class="bullet-list">
                  <li v-for="(line, i) in item.data as string[]" :key="i">{{ line }}</li>
                </ul>
                <Code v-if="item.type === 'code' && typeof item.data === 'string'" :code="item.data" language="ts"
                  :hidden-toolbar="false" />
                <div v-if="item.type === 'todo' && Array.isArray(item.data)" class="todo-list">
                  <label v-for="todo in item.data as Array<{ id: string; text: string; done: boolean }>" :key="todo.id"
                    :id="todo.id" class="todo-item">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }">{{ todo.text }}</span>
                  </label>
                </div>
                <nav v-if="item.type === 'links' && Array.isArray(item.data)" class="link-list">
                  <Link v-for="link in item.data as Array<{ id: string; label: string; href: string }>" :key="link.id"
                    :id="link.id" :text="link.label" size="small" />
                </nav>
                <div v-if="item.type === 'tags' && Array.isArray(item.data)" class="chip-list">
                  <Link v-for="tag in item.data as Array<{ id: string; label: string; href: string }>" :key="tag.id"
                    :id="tag.id" :text="tag.label" size="small" />
                </div>
                <div v-if="item.type === 'progress' && Array.isArray(item.data)" class="progress-list">
                  <div v-for="p in item.data as Array<{ id: string; label: string; value: number }>" :key="p.id"
                    :id="p.id" class="progress-item">
                    <div class="progress-meta">
                      <span class="name">{{ p.label }}</span>
                      <span class="val">{{ p.value }}%</span>
                    </div>
                    <div class="progress">
                      <div class="bar" :style="{ '--val': p.value + '%' }"></div>
                    </div>
                  </div>
                </div>
                <ul v-if="item.type === 'tips' && Array.isArray(item.data)" class="tip-list">
                  <li v-for="tip in item.data as Array<{ id: string; text: string }>" :key="tip.id" :id="tip.id">{{
                    tip.text
                  }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </template>
      <!-- 瀑布模式 -->
      <template #waterfall>
        <main class="waterfall-content">
          <!-- 两列布局（类似 EnumAndTuple.vue） -->
          <div v-if="currentConfig.layoutType === 'two-column'" class="waterfall-columns-layout">
            <section v-for="chapter in waterfallChapters" :key="chapter.id" :id="chapter.id"
              class="waterfall-column-section">
              <h2 class="waterfall-section-title">{{ chapter.title }}</h2>
              <div class="waterfall-section-body">
                <!-- 学习计划章节 -->
                <div v-if="chapter.type === 'plan' && Array.isArray(chapter.data)" class="waterfall-plan-list">
                  <div v-for="item in chapter.data as Array<{ id: string; time: string; name: string; desc: string }>"
                    :key="item.id" :id="item.id" class="waterfall-plan-item">
                    <div class="plan-time-badge">{{ item.time }}</div>
                    <div class="plan-content-wrapper">
                      <h3 class="plan-name-title">{{ item.name }}</h3>
                      <p class="plan-desc-text">{{ item.desc }}</p>
                    </div>
                  </div>
                </div>

                <!-- 要点列表章节 -->
                <div v-if="chapter.type === 'points' && Array.isArray(chapter.data)" class="waterfall-points-grid">
                  <div v-for="point in chapter.data as Array<{ id: string; title: string; items: string[] }>"
                    :key="point.id" :id="point.id" class="waterfall-point-card">
                    <div class="point-header">
                      <span class="point-icon">📌</span>
                      <h3 class="point-title">{{ point.title }}</h3>
                    </div>
                    <ul class="point-items">
                      <li v-for="(item, i) in point.items" :key="i">{{ item }}</li>
                    </ul>
                  </div>
                </div>

                <!-- 代码示例章节 -->
                <div v-if="chapter.type === 'code' && typeof chapter.data === 'string'">
                  <Code :code="chapter.data" language="ts" :hidden-toolbar="false" />
                </div>

                <!-- 待办清单章节 -->
                <div v-if="chapter.type === 'todo' && Array.isArray(chapter.data)" class="waterfall-todo-grid">
                  <label v-for="todo in chapter.data as Array<{ id: string; text: string; done: boolean }>"
                    :key="todo.id" :id="todo.id" class="waterfall-todo-item">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }">{{ todo.text }}</span>
                  </label>
                </div>

                <!-- 相关链接章节 -->
                <div v-if="chapter.type === 'links' && Array.isArray(chapter.data)" class="waterfall-links-grid">
                  <Link v-for="link in chapter.data as Array<{ id: string; label: string; href: string }>"
                    :key="link.id" :id="link.id" :href="link.href" :text="link.label" icon="🔗" size="medium"
                    variant="solid" animation="lift" target="_blank" />
                </div>

                <!-- 快速导航章节 -->
                <div v-if="chapter.type === 'tags' && Array.isArray(chapter.data)" class="waterfall-tags-container">
                  <Link v-for="tag in chapter.data as Array<{ id: string; label: string; href: string }>" :key="tag.id"
                    :id="tag.id" :href="tag.href" :text="tag.label" size="medium" variant="gradient"
                    :gradient-colors="['#1677ff', '#69b1ff']" rounded="pill" animation="glow" target="_blank" />
                </div>

                <!-- 学习进度章节 -->
                <div v-if="chapter.type === 'progress' && Array.isArray(chapter.data)"
                  class="waterfall-progress-container">
                  <div v-for="p in chapter.data as Array<{ id: string; label: string; value: number }>" :key="p.id"
                    :id="p.id" class="waterfall-progress-item">
                    <div class="progress-header">
                      <span class="progress-label">{{ p.label }}</span>
                      <span class="progress-value">{{ p.value }}%</span>
                    </div>
                    <div class="progress-bar-wrapper">
                      <div class="progress-bar-fill" :style="{ width: p.value + '%' }"></div>
                    </div>
                  </div>
                </div>

                <!-- 温馨提示章节 -->
                <div v-if="chapter.type === 'tips' && Array.isArray(chapter.data)" class="waterfall-tips-list">
                  <div v-for="tip in chapter.data as Array<{ id: string; text: string }>" :key="tip.id" :id="tip.id"
                    class="waterfall-tip-item">
                    <span class="tip-icon">💡</span>
                    <p>{{ tip.text }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <!-- 传统单列布局 -->
          <template v-else>
            <section v-for="chapter in waterfallChapters" :key="chapter.id" :id="chapter.id" class="waterfall-section">
              <h2 class="waterfall-section-title">{{ chapter.title }}</h2>
              <div class="waterfall-section-body">
                <!-- 学习计划章节 -->
                <div v-if="chapter.type === 'plan' && Array.isArray(chapter.data)" class="waterfall-plan-list">
                  <div v-for="item in chapter.data as Array<{ id: string; time: string; name: string; desc: string }>"
                    :key="item.id" :id="item.id" class="waterfall-plan-item">
                    <div class="plan-time-badge">{{ item.time }}</div>
                    <div class="plan-content-wrapper">
                      <h3 class="plan-name-title">{{ item.name }}</h3>
                      <p class="plan-desc-text">{{ item.desc }}</p>
                    </div>
                  </div>
                </div>

                <!-- 要点列表章节 -->
                <div v-if="chapter.type === 'points' && Array.isArray(chapter.data)" class="waterfall-points-grid">
                  <div v-for="point in chapter.data as Array<{ id: string; title: string; items: string[] }>"
                    :key="point.id" :id="point.id" class="waterfall-point-card">
                    <div class="point-header">
                      <span class="point-icon">📌</span>
                      <h3 class="point-title">{{ point.title }}</h3>
                    </div>
                    <ul class="point-items">
                      <li v-for="(item, i) in point.items" :key="i">{{ item }}</li>
                    </ul>
                  </div>
                </div>

                <!-- 代码示例章节 -->
                <div v-if="chapter.type === 'code' && typeof chapter.data === 'string'">
                  <Code :code="chapter.data" language="ts" :hidden-toolbar="false" />
                </div>

                <!-- 待办清单章节 -->
                <div v-if="chapter.type === 'todo' && Array.isArray(chapter.data)" class="waterfall-todo-grid">
                  <label v-for="todo in chapter.data as Array<{ id: string; text: string; done: boolean }>"
                    :key="todo.id" :id="todo.id" class="waterfall-todo-item">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }">{{ todo.text }}</span>
                  </label>
                </div>

                <!-- 相关链接章节 -->
                <div v-if="chapter.type === 'links' && Array.isArray(chapter.data)" class="waterfall-links-grid">
                  <Link v-for="link in chapter.data as Array<{ id: string; label: string; href: string }>"
                    :key="link.id" :id="link.id" :href="link.href" :text="link.label" icon="🔗" size="medium"
                    variant="solid" animation="lift" target="_blank" />
                </div>

                <!-- 快速导航章节 -->
                <div v-if="chapter.type === 'tags' && Array.isArray(chapter.data)" class="waterfall-tags-container">
                  <Link v-for="tag in chapter.data as Array<{ id: string; label: string; href: string }>" :key="tag.id"
                    :id="tag.id" :href="tag.href" :text="tag.label" size="medium" variant="gradient"
                    :gradient-colors="['#1677ff', '#69b1ff']" rounded="pill" animation="glow" target="_blank" />
                </div>

                <!-- 学习进度章节 -->
                <div v-if="chapter.type === 'progress' && Array.isArray(chapter.data)"
                  class="waterfall-progress-container">
                  <div v-for="p in chapter.data as Array<{ id: string; label: string; value: number }>" :key="p.id"
                    :id="p.id" class="waterfall-progress-item">
                    <div class="progress-header">
                      <span class="progress-label">{{ p.label }}</span>
                      <span class="progress-value">{{ p.value }}%</span>
                    </div>
                    <div class="progress-bar-wrapper">
                      <div class="progress-bar-fill" :style="{ width: p.value + '%' }"></div>
                    </div>
                  </div>
                </div>

                <!-- 温馨提示章节 -->
                <div v-if="chapter.type === 'tips' && Array.isArray(chapter.data)" class="waterfall-tips-list">
                  <div v-for="tip in chapter.data as Array<{ id: string; text: string }>" :key="tip.id" :id="tip.id"
                    class="waterfall-tip-item">
                    <span class="tip-icon">💡</span>
                    <p>{{ tip.text }}</p>
                  </div>
                </div>
              </div>
            </section>
          </template>
        </main>
      </template>
      <!-- 混合模式 -->
      <template #mixed>
        <div class="mixed-content">
          <!-- 第一部分：Card风格 - 学习计划 -->
          <section class="mixed-section mixed-section--card" id="mixed-learning-plan">
            <div class="grid layout">
              <Card class="card-large" :hoverable="true" :bordered="true">
                <template #title>
                  <div class="card-title">📅 概览 · 今日学习计划</div>
                </template>
                <template #body>
                  <div class="plan-list">
                    <div v-for="item in planList" :key="item.id" :id="item.id" class="plan-item">
                      <span class="plan-time">{{ item.time }}</span>
                      <div class="plan-content">
                        <div class="plan-name">{{ item.name }}</div>
                        <div class="plan-desc">{{ item.desc }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </Card>

              <Card v-for="card in smallCards" :key="card.id" :id="card.id" class="card-small" :hoverable="true">
                <template #title>
                  <div class="card-title">{{ card.title }}</div>
                </template>
                <template #body>
                  <ul class="bullet-list">
                    <li v-for="(line, i) in card.items" :key="i">{{ line }}</li>
                  </ul>
                </template>
              </Card>
            </div>
          </section>

          <!-- 第二部分：Waterfall风格 - 代码示例章节 -->
          <section class="mixed-section mixed-section--waterfall" id="mixed-code-examples">
            <div class="waterfall-section">
              <h2 class="waterfall-section-title">💻 代码示例</h2>
              <div class="waterfall-section-body">
                <Code :code="`// TypeScript 基础类型
      let age: number = 18
      let username: string = 'cascade'
      let isOk: boolean = true
      
      // 接口与类型别名
      interface User { id: number; name: string }
      type ID = User['id']
      
      // 内置工具类型
      type ReadonlyUser = Readonly<User>`" language="ts" :hidden-toolbar="false" />
              </div>
            </div>
          </section>

          <!-- 第三部分：List风格 - 分类网格 -->
          <section class="mixed-section mixed-section--list" id="mixed-todo-list">
            <div class="category-section">
              <h2 class="category-title">✅ 待办清单</h2>
              <div class="tips-grid">
                <div class="tip-card">
                  <div class="tip-header">
                    <span class="tip-index">✓</span>
                    <h3>待复习</h3>
                  </div>
                  <div class="todo-list">
                    <label v-for="todo in todos" :key="todo.id" :id="todo.id" class="todo-item">
                      <input type="checkbox" v-model="todo.done" />
                      <span :class="{ done: todo.done }">{{ todo.text }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 第四部分：Card风格 - 链接和标签 -->
          <section class="mixed-section mixed-section--card" id="mixed-links-nav">
            <div class="grid layout">
              <Card class="card-small" :hoverable="true">
                <template #title>
                  <div class="card-title">🔗 相关阅读</div>
                </template>
                <template #body>
                  <nav class="link-list">
                    <Link v-for="link in links" :key="link.id" :id="link.id" :href="link.href" :text="link.label"
                      size="small" variant="solid" animation="lift" target="_blank" />
                  </nav>
                </template>
              </Card>

              <Card class="card-small" :hoverable="true">
                <template #title>
                  <div class="card-title">🚀 快速导航</div>
                </template>
                <template #body>
                  <NavTagCard :items="tags.map(t => ({ id: t.id, title: t.label }))" size="medium" variant="gradient"
                    :background-colors="['#1677ff', '#69b1ff']" rounded="md"
                    :animation="(componentsConfig.navTagCard?.animation as any) || 'lift'"
                    :direction="(componentsConfig.navTagCard?.direction as any) || 'horizontal'"
                    :enable-scroll="componentsConfig.navTagCard?.mode === 'scroll'" />
                </template>
              </Card>
            </div>
          </section>

          <!-- 第五部分：Waterfall风格 - 进度和提示 -->
          <section class="mixed-section mixed-section--waterfall" id="mixed-progress-tips">
            <div class="waterfall-section">
              <h2 class="waterfall-section-title">📊 学习进度</h2>
              <div class="waterfall-section-body">
                <div class="waterfall-progress-container">
                  <div v-for="p in progresses" :key="p.id" :id="p.id" class="waterfall-progress-item">
                    <div class="progress-header">
                      <span class="progress-label">{{ p.label }}</span>
                      <span class="progress-value">{{ p.value }}%</span>
                    </div>
                    <div class="progress-bar-wrapper">
                      <div class="progress-bar-fill" :style="{ width: p.value + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="waterfall-section">
              <h2 class="waterfall-section-title">💡 温馨提示</h2>
              <div class="waterfall-section-body">
                <div class="waterfall-tips-list">
                  <div v-for="tip in tips" :key="tip.id" :id="tip.id" class="waterfall-tip-item">
                    <span class="tip-icon">💡</span>
                    <p>{{ tip.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 第六部分：List风格 - 要点总结 -->
          <section class="mixed-section mixed-section--list" id="mixed-key-points">
            <div class="category-section">
              <h2 class="category-title">📚 要点总结</h2>
              <div class="tips-grid">
                <div v-for="(card, idx) in smallCards" :key="card.id" :id="card.id" class="tip-card">
                  <div class="tip-header">
                    <span class="tip-index">#{{ idx + 1 }}</span>
                    <h3>{{ card.title }}</h3>
                  </div>
                  <ul class="bullet-list">
                    <li v-for="(line, i) in card.items" :key="i">{{ line }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>
    </NavTagCard>

    <!-- Section：彩色标签 / 快速导航 -->
    <section class="section-wrap">
      <Card class="section-card" :hoverable="true">
        <template #title>
          <div class="section-title">专题 · 快速导航</div>
        </template>
        <template #body>
          <NavTagCard :items="tags.map(t => ({ id: t.id, title: t.label }))" size="medium" variant="gradient"
            :background-colors="['#1677ff', '#69b1ff']" rounded="md"
            :direction="(componentsConfig.navTagCard?.direction as any) || 'horizontal'"
            :enable-scroll="componentsConfig.navTagCard?.mode === 'scroll'">
            <template #[i.id] v-for="i in tags">
              <Card class="section-card" :hoverable="true">
                <template #title>
                  <div class="section-title">{{ i.label }}</div>
                </template>
                <template #body>
                  <ul class="tip-list">
                    <li v-for="tip in tips" :key="tip.id" :id="tip.id">{{ tip.text }}</li>
                  </ul>
                </template>
              </Card>
            </template>
          </NavTagCard>
        </template>
      </Card>
    </section>
    <!-- Section：学习进度 / 可视化条 -->
    <section class="section-wrap">
      <Card class="section-card" :hoverable="true">
        <template #title>
          <div class="section-title">进度 · 可视化</div>
        </template>
        <template #body>
          <div class="progress-list">
            <div v-for="p in progresses" :key="p.id" :id="p.id" class="progress-item">
              <div class="progress-meta">
                <span class="name">{{ p.label }}</span>
                <span class="val">{{ p.value }}%</span>
              </div>
              <div class="progress">
                <div class="bar" :style="{ '--val': p.value + '%' }"></div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Section：Tips / 温馨提示 -->
    <section class="section-wrap">
      <Card class="section-card" :hoverable="true">
        <template #title>
          <div class="section-title">Tips · 温馨提示</div>
        </template>
        <template #body>
          <ul class="tip-list">
            <li v-for="tip in tips" :key="tip.id" :id="tip.id">{{ tip.text }}</li>
          </ul>
        </template>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/Card/index.vue'
import Nav from '@/components/Nav/ScrollNav.vue'
import Link from '@/components/Link/index.vue'
import NavTagCard from '@/components/Nav/NavTagCard.vue'
import Code from '@/components/Code/index.vue'
import templateConfig from './Template.json'
// import { useLanguage } from '@/language'

// const { t } = useLanguage()

interface TemplateConfig {
  components?: {
    card?: {
      borderRadius: string
      shadow: string
      hoverShadow: string
      hoverTransform: string
    }
    navTagCard?: {
      mode: string
      direction: string
      animation: string
      transition?: string
    }
    link?: {
      size: string
      variant: string
      animation: string
      rounded: string
    }
    section?: {
      borderRadius: string
      padding: string
      shadow: string
      hoverShadow: string
      hoverTransform: string
    }
  }
  spacing?: {
    list: string
    card: string
    link: string
    section?: string
  }
  normal?: {
    grid?: {
      columns: string
      gap: string
    }
  }
  list?: {
    layout?: string
    layoutType?: string
    grid?: {
      columns: string
      gap: string
      minColumnWidth?: string
    }
    category?: {
      columns: string
      gap: string
    }
  }
  waterfall?: {
    layout?: string
    layoutType?: string
    grid?: {
      columns: string
      gap: string
    }
  }
  mixed?: {
    layout?: string
    grid?: {
      columns: string
      gap: string
    }
  }
}

const props = withDefaults(
  defineProps<{
    mode?: 'normal' | 'list' | 'waterfall' | 'mixed'
  }>(),
  {
    mode: 'mixed',
  }
)

// 生成随机ID
const generateId = () => `id-${Math.random().toString(36).substr(2, 9)}`

// 模式切换
type ModeType = 'normal' | 'list' | 'waterfall' | 'mixed'
const currentMode = ref<ModeType>(props.mode)
const modeTabs: Array<{ label: string; value: ModeType }> = [
  { label: '普通模式', value: 'normal' },
  { label: '列表模式', value: 'list' },
  { label: '瀑布模式', value: 'waterfall' },
  { label: '混合模式', value: 'mixed' },
]

// 获取公用组件配置
const componentsConfig = computed(() => {
  return ((templateConfig as TemplateConfig).components || {}) as {
    card?: {
      borderRadius: string
      shadow: string
      hoverShadow: string
      hoverTransform: string
    }
    navTagCard?: {
      mode: string
      direction: string
      animation: string
      transition?: string
    }
    link?: {
      size: string
      variant: string
      animation: string
      rounded: string
    }
    section?: {
      borderRadius: string
      padding: string
      shadow: string
      hoverShadow: string
      hoverTransform: string
    }
  }
})

// 获取公用间距配置
const spacingConfig = computed(() => {
  return ((templateConfig as TemplateConfig).spacing || {}) as {
    list: string
    card: string
    link: string
    section?: string
  }
})

// 获取当前模式的配置
const currentConfig = computed(() => {
  const config = (templateConfig as TemplateConfig)[currentMode.value]
  return (config || (templateConfig as TemplateConfig).normal || {}) as {
    layout?: string
    layoutType?: string
    grid?: {
      columns: string
      gap: string
      minColumnWidth?: string
    }
    category?: {
      columns: string
      gap: string
    }
  }
})

// 计算样式变量
const styleVars = computed(() => {
  const modeConfig = currentConfig.value
  const components = componentsConfig.value
  const spacing = spacingConfig.value

  return {
    '--grid-columns': modeConfig.grid?.columns || 'repeat(auto-fit, minmax(300px, 1fr))',
    '--grid-gap': modeConfig.grid?.gap || 'var(--gap-xl)',
    '--category-columns': modeConfig.category?.columns || modeConfig.grid?.columns || 'repeat(auto-fill, minmax(300px, 1fr))',
    '--category-gap': modeConfig.category?.gap || modeConfig.grid?.gap || 'var(--gap-xl)',
    '--card-border-radius': components.card?.borderRadius || 'var(--element-border-radius)',
    '--card-shadow': components.card?.shadow || '0 2px 8px rgba(0, 0, 0, 0.06)',
    '--card-hover-shadow': components.card?.hoverShadow || '0 4px 16px rgba(0, 0, 0, 0.1)',
    '--card-hover-transform': components.card?.hoverTransform || 'translateY(-2px)',
    '--section-border-radius': components.section?.borderRadius || '16px',
    '--section-padding': components.section?.padding || 'var(--padding-3xl)',
    '--section-shadow': components.section?.shadow || '0 4px 20px rgba(0, 0, 0, 0.08)',
    '--section-hover-shadow': components.section?.hoverShadow || '0 8px 30px rgba(0, 0, 0, 0.12)',
    '--section-hover-transform': components.section?.hoverTransform || 'translateY(-2px)',
    '--spacing-list': spacing.list || 'var(--gap-lg)',
    '--spacing-card': spacing.card || 'var(--gap-xl)',
    '--spacing-link': spacing.link || 'var(--gap-sm)',
    '--spacing-section': spacing.section || 'var(--margin-4xl)',
  }
})

// 伪造数据（添加 id）
const planList = ref([
  { id: generateId(), time: '09:00', name: 'TypeScript · 基础类型', desc: 'number/string/boolean/array/tuple 等' },
  { id: generateId(), time: '10:30', name: 'TypeScript · 接口与类型', desc: 'interface vs type, 交叉/联合、索引类型' },
  { id: generateId(), time: '14:00', name: 'TS · 内置工具类型', desc: 'Partial/Required/Pick/Record/Readonly 等' },
  { id: generateId(), time: '16:00', name: 'JavaScript · 基础', desc: '变量、作用域、闭包、原型' }
])

const smallCards = ref([
  {
    id: generateId(),
    title: '要点 · BasicType',
    items: ['基本类型与字面量类型', '数组与元组', '枚举/联合/交叉', '类型断言与类型守卫']
  },
  {
    id: generateId(),
    title: '要点 · Interface & Type',
    items: ['接口扩展与合并', '类型别名与泛型', '索引签名', '可选/只读属性']
  },
  {
    id: generateId(),
    title: '要点 · Built-in Tools',
    items: ['Partial / Required', 'Pick / Omit / Record', 'Readonly / Mutable', 'ReturnType / Parameters']
  }
])

const todos = ref([
  { id: generateId(), text: '复习：interface 与 type 区别', done: false },
  { id: generateId(), text: '巩固：泛型约束 extends 的使用', done: true },
  { id: generateId(), text: '掌握：Record 与映射类型', done: false }
])

const links = ref([
  { id: generateId(), label: 'TS 基础类型', href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  { id: generateId(), label: '接口 vs 类型别名', href: 'https://www.typescriptlang.org/docs/handbook/2/objects.html' },
  { id: generateId(), label: '内置工具类型', href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html' },
  { id: generateId(), label: 'JS 是什么', href: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript' }
])

const tags = ref([
  { id: generateId(), label: '基础类型', href: '#' },
  { id: generateId(), label: '接口与类型', href: '#' },
  { id: generateId(), label: '工具类型', href: '#' },
  { id: generateId(), label: '泛型', href: '#' },
  { id: generateId(), label: '类型守卫', href: '#' },
  { id: generateId(), label: 'JS 基础', href: '#' }
])

const progresses = ref([
  { id: generateId(), label: 'TypeScript 基础', value: 70 },
  { id: generateId(), label: '接口与类型', value: 55 },
  { id: generateId(), label: '内置工具类型', value: 40 },
  { id: generateId(), label: 'JavaScript 基础', value: 80 }
])

const tips = ref([
  { id: generateId(), text: '分段学习，每段 25-40 分钟高效专注' },
  { id: generateId(), text: '在实际项目中寻找类型系统的落点' },
  { id: generateId(), text: '注意与 antd token/主题变量保持一致' },
  { id: generateId(), text: '记录问题与知识点，形成个人索引' }
])

// 瀑布模式：章节数据
const waterfallChapters = computed(() => {
  return [
    {
      id: 'learning-plan',
      title: '📅 今日学习计划',
      type: 'plan',
      data: planList.value,
    },
    {
      id: 'key-points',
      title: '📚 要点总结',
      type: 'points',
      data: smallCards.value,
    },
    {
      id: 'code-examples',
      title: '💻 代码示例',
      type: 'code',
      data: `// TypeScript 基础类型
let age: number = 18
let username: string = 'cascade'
let isOk: boolean = true

// 接口与类型别名
interface User { id: number; name: string }
type ID = User['id']

// 内置工具类型
type ReadonlyUser = Readonly<User>`,
    },
    {
      id: 'todo-list',
      title: '✅ 待办清单',
      type: 'todo',
      data: todos.value,
    },
    {
      id: 'related-links',
      title: '🔗 相关阅读',
      type: 'links',
      data: links.value,
    },
    {
      id: 'quick-nav',
      title: '🚀 快速导航',
      type: 'tags',
      data: tags.value,
    },
    {
      id: 'progress',
      title: '📊 学习进度',
      type: 'progress',
      data: progresses.value,
    },
    {
      id: 'tips',
      title: '💡 温馨提示',
      type: 'tips',
      data: tips.value,
    },
  ]
})

// 列表模式：分类数据
const categoryList = computed(() => {
  return [
    {
      id: 'learning-plan',
      name: '今日学习计划',
      children: [
        {
          id: 'plan-overview',
          name: '概览 · 今日学习计划',
          type: 'plan',
          data: planList.value,
        },
      ],
    },
    {
      id: 'key-points',
      name: '要点总结',
      children: smallCards.value.map((card) => ({
        id: card.id,
        name: card.title,
        type: 'list',
        data: card.items,
      })),
    },
    {
      id: 'code-examples',
      name: '代码示例',
      children: [
        {
          id: 'example-types',
          name: '示例 · 类型系统要点',
          type: 'code',
          data: `// TypeScript 基础类型
let age: number = 18
let username: string = 'cascade'
let isOk: boolean = true

// 接口与类型别名
interface User { id: number; name: string }
type ID = User['id']

// 内置工具类型
type ReadonlyUser = Readonly<User>`,
        },
      ],
    },
    {
      id: 'todo-list',
      name: '待办清单',
      children: [
        {
          id: 'todo-review',
          name: '清单 · 待复习',
          type: 'todo',
          data: todos.value,
        },
      ],
    },
    {
      id: 'related-links',
      name: '相关阅读',
      children: [
        {
          id: 'links-nav',
          name: '导航 · 相关阅读',
          type: 'links',
          data: links.value,
        },
      ],
    },
    {
      id: 'quick-nav',
      name: '快速导航',
      children: [
        {
          id: 'tags-nav',
          name: '专题 · 快速导航',
          type: 'tags',
          data: tags.value,
        },
      ],
    },
    {
      id: 'progress',
      name: '学习进度',
      children: [
        {
          id: 'progress-visual',
          name: '进度 · 可视化',
          type: 'progress',
          data: progresses.value,
        },
      ],
    },
    {
      id: 'tips',
      name: '温馨提示',
      children: [
        {
          id: 'tips-notice',
          name: 'Tips · 温馨提示',
          type: 'tips',
          data: tips.value,
        },
      ],
    },
  ]
})

// 混合模式：导航数据（为 mixed 模式生成导航列表）
const mixedNavList = computed(() => {
  return [
    {
      id: 'mixed-learning-plan',
      name: '学习计划',
    },
    {
      id: 'mixed-code-examples',
      name: '代码示例',
    },
    {
      id: 'mixed-todo-list',
      name: '待办清单',
    },
    {
      id: 'mixed-links-nav',
      name: '链接导航',
    },
    {
      id: 'mixed-progress-tips',
      name: '进度提示',
    },
    {
      id: 'mixed-key-points',
      name: '要点总结',
    },
  ]
})
</script>

<style lang="less">
.view-container {
  &--list {
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--padding-2xl);
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--color-text);
  }
}

// 模式切换 Tabs
.mode-tabs {
  display: flex;
  gap: var(--gap-sm);
  padding: var(--padding-lg) var(--padding-2xl);
  background: var(--color-bg-container);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 1;
  backdrop-filter: blur(8px);
  background: var(--color-bg-container);
}

.mode-tab {
  all: unset;
  cursor: pointer;
  padding: var(--padding-sm) var(--padding-lg);
  border-radius: var(--element-border-radius);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    color: var(--color-text);
    background: var(--color-fill);
  }

  &.is-active {
    color: var(--color-primary);
    background: var(--color-fill);
    border-color: var(--color-primary);
    font-weight: 600;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

// 列表模式样式
.category-section {
  margin: var(--margin-4xl) 0;
}

.category-title {
  color: var(--color-primary);
  font-size: 1.8rem;
  margin-bottom: var(--margin-xl);
  padding-bottom: var(--padding-sm);
  border-bottom: 2px solid var(--color-border);
}

.tips-grid {
  display: grid;
  grid-template-columns: var(--category-columns, repeat(auto-fit, minmax(400px, 1fr)));
  gap: var(--category-gap, var(--gap-xl));
}

// 多列网格布局（类似 BasicType.vue）
.type-grid-container {
  display: grid;
  grid-template-columns: var(--grid-columns, repeat(auto-fill, minmax(300px, 1fr)));
  gap: var(--grid-gap, var(--gap-xl));
}

.type-grid-item {
  background: var(--color-bg-container);
  border-radius: var(--card-border-radius, 12px);
  padding: var(--padding-xl);
  box-shadow: var(--card-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.05));
  transition: all 0.3s ease;
  color: var(--color-text);

  &:hover {
    transform: var(--card-hover-transform, translateY(-3px));
    box-shadow: var(--card-hover-shadow, 0 8px 20px rgba(0, 0, 0, 0.12));
  }
}

.tip-card {
  background: var(--color-bg-container);
  border-radius: 12px;
  padding: var(--padding-xl);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  color: var(--color-text);

  &:hover {
    transform: translateY(-3px);
  }
}

.tip-header {
  display: flex;
  align-items: center;
  gap: var(--gap-lg);
  margin-bottom: var(--margin-lg);
}

.tip-index {
  background: var(--color-primary);
  color: var(--color-text-light-solid);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.tip-desc {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--margin-lg);
}

.code-example {
  background: #1e293b;
  color: #f8fafc;
  padding: var(--padding-lg);
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  margin-top: var(--margin-lg);
  overflow-x: auto;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-lg);
}

.plan-item {
  display: flex;
  gap: var(--gap-lg);
  align-items: flex-start;
}

.plan-time {
  font-weight: bold;
  color: var(--color-primary);
  min-width: 60px;
}

.plan-content {
  flex: 1;
}

.plan-name {
  font-weight: 500;
  margin-bottom: var(--margin-xs);
}

.plan-desc {
  font-size: 0.9em;
  color: var(--color-text-secondary);
}

.bullet-list {
  list-style: disc;
  padding-left: var(--padding-xl);
  margin: 0;

  li {
    margin-bottom: var(--margin-sm);
    line-height: 1.6;
    color: var(--color-text);
  }
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.todo-item {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  cursor: pointer;

  span.done {
    text-decoration: line-through;
    color: var(--color-text-tertiary);
  }
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);

  a {
    color: var(--color-link);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: var(--color-link-hover);
    }
  }
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-sm);
}

.chip {
  display: inline-block;
  padding: var(--padding-sm) var(--padding-lg);
  background: var(--color-fill);
  border-radius: 20px;
  color: var(--color-text);
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: var(--color-primary);
    color: var(--color-text-light-solid);
  }
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-lg);
}

.progress-item {
  .progress-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--margin-sm);
    font-size: 0.9em;
  }

  .progress {
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar {
    height: 100%;
    background: #42b983;
    width: var(--val);
    transition: width 0.3s;
  }
}

.tip-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: var(--padding-sm) 0;
    border-bottom: 1px solid var(--color-border);
    line-height: 1.6;
    color: var(--color-text);

    &:last-child {
      border-bottom: none;
    }
  }
}

@media (max-width: 768px) {
  .category-title {
    font-size: 1.5rem;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }
}

// 瀑布模式样式
.view-container--waterfall {
  min-height: 100vh;
  background: var(--color-bg-layout);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: var(--color-text);
  line-height: 1.6;
}

.waterfall-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--padding-2xl);
}

// 两列布局（类似 EnumAndTuple.vue）
.waterfall-columns-layout {
  display: grid;
  grid-template-columns: var(--grid-columns, 1fr 1fr);
  gap: var(--grid-gap, var(--gap-2xl));
  margin-bottom: var(--spacing-section, var(--margin-4xl));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.waterfall-column-section {
  background: var(--color-bg-container);
  border-radius: var(--section-border-radius, 16px);
  padding: var(--section-padding, var(--padding-3xl));
  box-shadow: var(--section-shadow, 0 4px 20px rgba(0, 0, 0, 0.08));
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  color: var(--color-text);

  &:hover {
    box-shadow: var(--section-hover-shadow, 0 8px 30px rgba(0, 0, 0, 0.12));
    transform: var(--section-hover-transform, translateY(-2px));
  }
}

.waterfall-section {
  margin-bottom: var(--margin-4xl);
  background: var(--color-bg-container);
  border-radius: 16px;
  padding: var(--padding-3xl);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  color: var(--color-text);

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
}

.waterfall-section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--margin-2xl);
  color: var(--color-text);
  position: relative;
  padding-bottom: var(--padding-lg);
  border-bottom: 2px solid var(--color-border);

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 4px;
    background: var(--color-primary);
    border-radius: 2px;
  }
}

.waterfall-section-body {
  margin-top: var(--margin-xl);
}

// 学习计划样式
.waterfall-plan-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xl);
}

.waterfall-plan-item {
  display: flex;
  gap: var(--gap-xl);
  padding: var(--padding-xl);
  background: var(--color-fill);
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-fill-secondary);
    transform: translateX(5px);
  }
}

.plan-time-badge {
  min-width: 80px;
  height: 80px;
  background: var(--color-primary);
  color: var(--color-text-light-solid);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.plan-content-wrapper {
  flex: 1;
}

.plan-name-title {
  margin: 0 0 var(--margin-sm) 0;
  color: var(--color-text);
  font-size: 1.2rem;
  font-weight: 600;
}

.plan-desc-text {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

// 要点网格样式
.waterfall-points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap-xl);
}

.waterfall-point-card {
  padding: var(--padding-xl);
  background: var(--color-fill);
  border-radius: 12px;
  border-left: 4px solid var(--color-success);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.point-header {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  margin-bottom: var(--margin-lg);
}

.point-icon {
  font-size: 1.5rem;
}

.point-title {
  margin: 0;
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 600;
}

.point-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);

  li {
    padding: var(--padding-sm) 0;
    color: var(--color-text-secondary);
    line-height: 1.6;
    position: relative;
    padding-left: var(--padding-xl);

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--color-success);
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}

// 代码块样式
.waterfall-code-block {
  background: #1a1b26;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  pre {
    margin: 0;
    padding: var(--padding-xl);
    overflow-x: auto;
    max-height: 500px;
    overflow-y: auto;
  }

  code {
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #98c379;
  }
}

// 待办清单样式
.waterfall-todo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--gap-lg);
}

.waterfall-todo-item {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--padding-lg);
  background: var(--color-fill);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-fill-secondary);
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  span {
    color: var(--color-text);
    line-height: 1.5;

    &.done {
      text-decoration: line-through;
      color: var(--color-text-tertiary);
    }
  }
}

// 链接网格样式
.waterfall-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--gap-lg);
}

.waterfall-link-card {
  display: flex;
  align-items: center;
  gap: var(--gap-lg);
  padding: var(--padding-xl) var(--padding-md);
  background: var(--color-fill);
  border-radius: 12px;
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: var(--color-bg-container);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  .link-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .link-label {
    font-weight: 500;
    color: var(--color-text-secondary);
  }
}

// 标签容器样式
.waterfall-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-lg);
}

.waterfall-tag-chip {
  display: inline-block;
  padding: var(--gap-md) var(--padding-xl);
  background: var(--color-primary);
  color: var(--color-text-light-solid);
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    opacity: 0.9;
  }
}

// 进度条样式
.waterfall-progress-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xl);
}

.waterfall-progress-item {
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--gap-md);
  }

  .progress-label {
    font-weight: 600;
    color: var(--color-text);
    font-size: 1rem;
  }

  .progress-value {
    font-weight: 700;
    color: var(--color-primary);
    font-size: 1.1rem;
  }

  .progress-bar-wrapper {
    height: 12px;
    background: var(--color-fill);
    border-radius: 6px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 6px;
    transition: width 0.5s ease;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }
}

// 温馨提示样式
.waterfall-tips-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-lg);
}

.waterfall-tip-item {
  display: flex;
  gap: var(--gap-lg);
  padding: var(--padding-xl) var(--padding-md);
  background: var(--color-fill);
  border-radius: 12px;
  border-left: 4px solid var(--color-warning);
  transition: all 0.3s ease;

  .tip-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    color: var(--color-text);
    line-height: 1.6;
    font-weight: 500;
  }

  &:hover {
    background: var(--color-fill-secondary);
    border-left-color: var(--color-primary);
  }
}

// 瀑布模式响应式
@media (max-width: 768px) {
  .waterfall-content {
    padding: var(--padding-lg);
  }

  .waterfall-section {
    padding: var(--padding-xl);
  }

  .waterfall-section-title {
    font-size: 1.5rem;
  }

  .waterfall-plan-item {
    flex-direction: column;
    text-align: center;
  }

  .plan-time-badge {
    width: 100%;
    min-width: auto;
  }

  .waterfall-points-grid,
  .waterfall-todo-grid,
  .waterfall-links-grid {
    grid-template-columns: 1fr;
  }
}

// 混合模式样式
.view-container--mixed {
  min-height: 100vh;
  background: var(--color-bg-layout);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: var(--color-text);
  line-height: 1.6;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--padding-2xl);
}

.mixed-content {
  display: flex;
  flex-direction: column;
  gap: var(--gap-3xl);
}

.mixed-section {
  &--card {
    .grid.layout {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--gap-xl);
    }

    .card-large {
      grid-column: span 2;

      @media (max-width: 768px) {
        grid-column: span 1;
      }
    }

  }

  &--waterfall {
    display: flex;
    flex-direction: column;
    gap: var(--gap-2xl);

    .waterfall-section {
      margin-bottom: 0;
    }
  }

  &--list {
    .category-section {
      margin: 0;
      background: var(--color-bg-container);
      border-radius: 16px;
      padding: var(--padding-2xl);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      color: var(--color-text);

      &:hover {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
      }
    }

    .category-title {
      color: var(--color-primary);
      font-size: 1.8rem;
      margin-bottom: var(--margin-xl);
      padding-bottom: var(--padding-sm);
      border-bottom: 2px solid var(--color-border);
    }

    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--gap-xl);
    }

    .tip-card {
      background: var(--color-fill);
      border-radius: 12px;
      padding: var(--padding-xl);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-left: 4px solid var(--color-primary);
      color: var(--color-text);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background: var(--color-bg-container);
      }
    }

    .tip-header {
      display: flex;
      align-items: center;
      gap: var(--gap-lg);
      margin-bottom: var(--margin-lg);
    }

    .tip-index {
      background: #42b983;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }
  }
}

// 混合模式响应式
@media (max-width: 768px) {
  .mixed-content {
    gap: var(--gap-2xl);
  }

  .mixed-section {
    &--card .grid.layout {
      grid-template-columns: 1fr;
    }

    &--list .tips-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
