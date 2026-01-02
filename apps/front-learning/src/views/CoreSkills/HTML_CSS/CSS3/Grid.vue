<template>
  <div class="grid-container">
    <h1 class="main-title">CSS Grid 交互指南</h1>

    <h2> Grid布局是一种强大的CSS布局系统，允许开发者创建复杂的网页布局。通过定义行和列，开发者可以精确控制元素的排列和对齐，使得网页设计更加灵活和响应式。</h2>

    <section class="trigger-section">
      <h3>触发条件</h3>
      <p>
        当一个元素的display属性设置为grid时，该元素就变成了一个网格容器，其子元素将成为网格项目。
      </p>
      <pre><code>.container {
  display: grid;
}</code></pre>
      <h3>关于display: inline-grid;</h3>
      <p>
        默认情况下，网格容器是块级元素，但可以通过设置display: inline-grid来将其变成行内元素。
      </p>
      <pre><code>.container {
  display: inline-grid;
}</code></pre>
    </section>

    <!-- 演示区域 -->
    <div class="demo-grid" :style="{
      gridTemplateColumns: gridOptions.templateColumns,
      gridTemplateRows: gridOptions.templateRows,
      justifyContent: gridOptions.justifyContent,
      alignItems: gridOptions.alignItems,
      gap: `${gridOptions.gap}px`,
    }">
      <div v-for="(item, index) in gridItems" :key="index" class="grid-item" :style="index === selectedItem ? {
        gridColumn: gridItems[selectedItem].gridColumn,
        gridRow: gridItems[selectedItem].gridRow,
        alignSelf: gridItems[selectedItem].alignSelf,
        backgroundColor: itemColors[index],
      } : {
        gridColumn: item.gridColumn,
        gridRow: item.gridRow,
        alignSelf: item.alignSelf,
        backgroundColor: itemColors[index],
      }">
        <div class="item-label">
          <span>项目 {{ index + 1 }}</span>
          <div v-if="item.gridColumn !== 'auto'">列: {{ item.gridColumn }}</div>
          <div v-if="item.gridRow !== 'auto'">行: {{ item.gridRow }}</div>
        </div>
      </div>
    </div>

    <!-- 代码展示 -->
    <div class="code-preview">
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: {{ gridOptions.templateColumns }};
  grid-template-rows: {{ gridOptions.templateRows }};
  gap: {{ gridOptions.gap }}px;
  justify-content: {{ gridOptions.justifyContent }};
  align-items: {{ gridOptions.alignItems }};
}

.grid-item:nth-child({{ selectedItem + 1 }}) {
  grid-column: {{ gridItems[selectedItem].gridColumn }};
  grid-row: {{ gridItems[selectedItem].gridRow }};
  align-self: {{ gridItems[selectedItem].alignSelf }};
}

</code></pre>
    </div>

    <div class="controls-section">
      <!-- 容器属性控制 -->
      <div class="control-group">
        <h2 class="control-title">容器属性</h2>
        <div class="control-item">
          <h3>grid-template-columns</h3>
          <button v-for="col in columnPresets" :key="col.value" @click="gridOptions.templateColumns = col.value"
            :class="{ active: gridOptions.templateColumns === col.value }">
            {{ col.label }}
          </button>
        </div>

        <div class="control-item">
          <h3>grid-template-rows</h3>
          <button v-for="row in rowPresets" :key="row.value" @click="gridOptions.templateRows = row.value"
            :class="{ active: gridOptions.templateRows === row.value }">
            {{ row.label }}
          </button>
        </div>

        <div class="control-item">
          <h3>对齐方式</h3>
          <button v-for="align in alignPresets" :key="align.value"
            @click="updateGridOption(align.type as 'justifyContent' | 'alignItems', align.value)" :class="{
              active: gridOptions[align.type as 'justifyContent' | 'alignItems'] === align.value,
            }">
            {{ align.label }}
          </button>
        </div>

        <div class="control-item">
          <h3>间距 (gap)</h3>
          <div class="slider-container">
            <input type="range" min="0" max="40" v-model="gridOptions.gap" class="gap-slider" />
            <span>{{ gridOptions.gap }}px</span>
          </div>
          <h4>gap其实是row-gap和column-gap的缩写</h4>
          <pre class="code-preview"><code>.container {
gap: 10px;//行间距和列间距
row-gap: 20px;//行间距
column-gap: 30px;//列间距
}</code></pre>
        </div>
      </div>

      <!-- 子项属性控制 -->
      <div class="control-group">
        <h2 class="control-title">子项属性</h2>
        <div class="item-selector">
          <button v-for="(_, index) in gridItems" :key="index" @click="selectedItem = index"
            :class="{ active: selectedItem === index }">
            项目 {{ index + 1 }}
          </button>
        </div>

        <div class="control-item">
          <h3>grid-column</h3>
          <button v-for="col in columnSpanPresets" :key="col.value"
            :class="{ active: gridItems[selectedItem].gridColumn === col.value }"
            @click="updateItemProperty('gridColumn', col.value)">
            {{ col.label }}
          </button>
        </div>

        <div class="control-item">
          <h3>grid-row</h3>
          <button v-for="row in rowSpanPresets" :key="row.value"
            :class="{ active: gridItems[selectedItem].gridRow === row.value }"
            @click="updateItemProperty('gridRow', row.value)">
            {{ row.label }}
          </button>
        </div>

        <div class="control-item">
          <h3>对齐覆盖</h3>
          <button v-for="align in selfAlignPresets" :key="align.value"
            :class="{ active: gridItems[selectedItem].alignSelf === align.value }"
            @click="updateItemProperty('alignSelf', align.value)">
            {{ align.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Repeat and fr Section -->
    <div class="grid-introduction">
      <h2>repeat、fr关键字、auto关键字</h2>
      <p>
        CSS Grid 布局中的 <code>repeat()</code> 函数允许开发者以更简洁的方式定义列或行的重复模式。例如，<code>repeat(3, 1fr)</code> 表示创建三列，每列占据相等的可用空间。
      </p>
      <div>
        <h2>repeat的参数</h2>
        <p>
          repeat的参数可以是一个数字，也可以是一个范围，也可以是auto-fill或者auto-fit。
        </p>
        <p>
          数字：
        <pre class="code-preview"><code>repeat(3, 1fr)</code></pre> 表示创建三列，每列占据相等的可用空间。
        </p>
        <p>
          范围：
        <pre class="code-preview"><code>repeat(minmax(auto, 2), minmax(100px, 1fr))</code></pre>
        表示创建两列或者自动，每列的宽度在100px到1fr之间。
        </p>
        <p><b>auto-fill</b>:有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充</p>
        <p>
          自动填充：
        <pre class="code-preview"><code>repeat(auto-fill, 1fr)</code></pre> 表示根据容器宽度自动填充列，每列占据相等的可用空间。<b>如果有剩余空间的话，auto-fill 会创建额外的空列</b>
        </p>
        <p><b>auto-fit</b>:auto-fit和auto-fill类似，但是不同的是 auto-fit <b>以最后一个 Gird 项目结束 Gird 容器，不管是否还有额外的空间存在</b></p>
        <p>
          自动填充：
        <pre class="code-preview"><code>repeat(auto-fit, 1fr)</code></pre> 表示根据容器宽度自动填充列，每列占据相等的可用空间。如果有剩余空间的话，auto-fit 会压缩列的宽度。
        </p>
        <p><b>minmax(min, max)</b>表示一个范围，min表示最小值，max表示最大值。</p>
        <pre class="code-preview"><code>grid-template-columns: repeat(minmax(auto-fill, 3), minmax(100px, 1fr));</code></pre>
        <p>
          表示创建三列或者自动，每列的宽度在100px到1fr之间。如果容器宽度小于100px，则每列的宽度为100px，如果容器宽度大于1fr，则每列的宽度为1fr。
        </p>
      </div>
      <div>
        <h2>
          fr 是一个单位，表示可用空间的比例。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
        </h2>
        <pre class="code-preview"><code>.container {
 grid-template-columns: 1fr 2fr 3fr;//表示三列，第一列占据1份，第二列占据2份，第三列占据3份
}
        </code></pre>
      </div>
      <div>
        <h2>auto关键字</h2>
        <p>
          auto关键字表示自动填充，如果一列的宽度为auto，就表示这列的宽度为内容宽度。
        </p>
        <pre
          class="code-preview"><code>grid-template-columns: 1fr auto 200px;//表示三列，第一列占据1份，第二列占据内容宽度，第三列占据200px</code></pre>
      </div>
    </div>
  <div class="subgrid-section" style="margin-top:2rem;">
    <h2>子网格（Subgrid）</h2>
    <p>
      <b>子网格（subgrid）</b> 是 CSS Grid 布局中的一个高级特性，允许嵌套的网格项（子元素）继承父网格的行或列轨道，实现更复杂且一致的布局。通过 subgrid，可以让多层嵌套的网格在对齐和尺寸上保持一致，非常适合需要多级对齐的场景。
    </p>
    <h3>作用</h3>
    <ul>
      <li>让子元素的网格轨道与父网格保持一致，实现多层级的精准对齐。</li>
      <li>简化嵌套网格的布局代码，提升可维护性。</li>
      <li>适用于新闻列表、卡片布局等需要多层对齐的复杂页面。</li>
    </ul>
    <h3>用法示例</h3>
    <pre class="code-preview"><code>
.parent-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px;
}

.child-grid {
  display: grid;
  grid-template-columns: subgrid;
  /* 继承父网格的列轨道 */
  grid-column: 1 / -1;
}
    </code></pre>
    <h3>适用场景</h3>
    <ul>
      <li>多级卡片、新闻列表等需要子元素与父元素严格对齐的布局。</li>
      <li>表格型页面，子表格需要与主表格列宽一致。</li>
      <li>响应式复杂布局，减少重复定义网格轨道。</li>
    </ul>
    <div style="background:#f8f9fa;padding:1rem;border-radius:8px;margin-top:1rem;">
      <b>注意：</b> subgrid 目前在部分浏览器（如 Firefox）支持较好，Chrome 也已逐步支持，实际开发中请注意兼容性。
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
interface GridItem {
  gridColumn: string
  gridRow: string
  alignSelf: string
}

const gridOptions = reactive<{
  templateColumns: string
  templateRows: string
  justifyContent: string
  alignItems: string
  gap: number
}>({
  templateColumns: 'repeat(3, 1fr)',
  templateRows: 'repeat(2, 100px)',
  justifyContent: 'start',
  alignItems: 'stretch',
  gap: 10,
})

const gridItems = reactive<GridItem[]>(
  Array(6).fill({
    gridColumn: 'auto',
    gridRow: 'auto',
    alignSelf: 'auto',
  }),
)

const selectedItem = ref(0)
const itemColors = ['#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#e74c3c', '#1abc9c']

const columnPresets = [
  { label: '3等分', value: 'repeat(3, 1fr)' },
  { label: '固定+自适应', value: '200px auto 1fr' },
  { label: '混合尺寸', value: '100px 1fr 2fr' },
]

const rowPresets = [
  { label: '2等分', value: 'repeat(2, 100px)' },
  { label: '自动高度', value: 'auto' },
  { label: '混合高度', value: '50px 1fr' },
]

const alignPresets = [
  { type: 'justifyContent', label: '左对齐', value: 'start' },
  { type: 'justifyContent', label: '居中', value: 'center' },
  { type: 'justifyContent', label: '右对齐', value: 'end' },
  { type: 'alignItems', label: '顶部对齐', value: 'start' },
  { type: 'alignItems', label: '垂直居中', value: 'center' },
  { type: 'alignItems', label: '底部对齐', value: 'end' },
]

const columnSpanPresets = [
  { label: '1列', value: 'auto' },
  { label: '跨2列', value: 'span 2' },
  { label: '指定列', value: '1 / 3' },
]

const rowSpanPresets = [
  { label: '1行', value: 'auto' },
  { label: '跨2行', value: 'span 2' },
  { label: '指定行', value: '1 / 3' },
]

const selfAlignPresets = [
  { label: '默认', value: 'auto' },
  { label: '顶部', value: 'start' },
  { label: '居中', value: 'center' },
]

const updateGridOption = (type: 'justifyContent' | 'alignItems', value: string) => {
  gridOptions[type] = value
}

const updateItemProperty = (prop: keyof GridItem, value: string) => {
  gridItems[selectedItem.value][prop] = value
}
</script>

<style scoped>
.trigger-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.grid-introduction {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.sub-grid-introduction {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.grid-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', system-ui;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  position: relative;
}


.controls-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.control-group {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.control-title {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2em;
}

.control-item {
  margin-bottom: 1.5rem;
}

.control-item h3 {
  color: #7f8c8d;
  margin: 0 0 0.5rem;
  font-size: 0.9em;
}

button {
  padding: 0.6rem 1rem;
  margin: 0.2rem;
  border: 2px solid #3498db;
  border-radius: 6px;
  background: white;
  color: #3498db;
  cursor: pointer;
  transition: all 0.2s ease;
}

button.active {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(52, 152, 219, 0.3);
}

.item-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-grid {
  min-height: 500px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  border: 2px dashed #bdc3c7;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
}

.grid-item {
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.item-label {
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border-radius: 4px;
  color: #2c3e50;
  text-align: center;
  font-size: 0.9em;
}

.code-preview {
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 12px;
  font-family: Monaco, monospace;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}

.gap-slider {
  width: 200px;
  margin-right: 1rem;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
