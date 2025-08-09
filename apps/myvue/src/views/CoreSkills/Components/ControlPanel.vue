<template>
  <!-- 控制区域 -->
  <div class="controls-container" :style="{ height: showBrowser ? '330px' : '20px' }" :class="{ expandControlsContainer: expand }" ref="ContainerRef">
    <button @click="toggleExpand" class="version-btn expand-btn">
      {{ expand ? '收起' : '展开' }}
    </button>
    <div class="controls" :class="{ expandControls: !expand }">
      <div class="search-box">
        <input type="text" v-model="searchTerm" placeholder="搜索知识点..." class="search-input" />
        <span class="search-icon">🔍</span>
      </div>

      <div class="browser-container" v-if="browsers && showBrowser">
        <div class="version-btn-title">浏览器支持:</div>
        <div
          v-for="(item, index) in browsers"
          :class="{ browserActive: browserVersion?.b === item.b }"
          :key="index"
          class="browser-item"
          @click="toggleBrowserVersion('', 0)"
        >
          <component :is="getBrowserSupportIcon(item.b)" class="browser-icon"></component
          >{{ item.name }}
          <div class="browser-version">
            <div
              v-for="version in item.version"
              :key="version"
              @click.stop="toggleBrowserVersion(item.b, version)"
              class="browser-version-item"
            >
              {{ version }}
            </div>
          </div>
        </div>
      </div>

      <div class="version-filter" v-if="versions">
        <!-- <button
          class="version-btn"
          @click="multipleSelect"
          :class="{
            active: multiple,
          }"
        >
          多选
        </button> -->
        <button
          class="version-btn"
          @click="selectedAll"
          :class="{
            active: selectedVersions === '' && selectedTypes === '' && browserVersion?.b === '',
          }"
        >
          全部
        </button>
        <div class="version-btn-title">版本:</div>

        <button
          v-for="(version, index) in versions"
          :key="index"
          @click="toggleVersion(version)"
          :class="{ active: selectedVersions?.includes(version) }"
          class="version-btn"
        >
          {{ version }}
        </button>
      </div>
      <div class="version-filter" v-if="types">
        <div class="version-btn-title">类型:</div>
        <button
          v-for="(type, index) in types"
          :key="index"
          @click="toggleType(type)"
          :class="{ active: selectedTypes?.includes(type) }"
          class="version-btn"
        >
          {{ type }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { c, f, s, e, ie, o, ios, android, node } from '../Components/Brower'
import list from '../JavaScript/JSON/browsers.json'

interface Browser {
  b: string
  name: string
  version: number[]
}

const multiple = ref(false)

const multipleSelect = () => {
  multiple.value = !multiple.value
}

const searchTerm = defineModel<string>('searchTerm')

const selectedVersions = defineModel<string>('selectedVersions')

const toggleVersion = (version: string | undefined) => {
  if (selectedVersions.value === version) {
    selectedVersions.value = ''
  } else {
    selectedVersions.value = version
  }
}

const selectedTypes = defineModel<string>('selectedTypes')

const toggleType = (type: string | undefined) => {
  if (selectedTypes.value === type) {
    selectedTypes.value = ''
  } else {
    selectedTypes.value = type
  }
}

const browserVersion = defineModel<{ b: string; v: number }>('browserVersion')

const browsers = ref<Browser[]>([])

const { browserList, showBrowser } = defineProps<{
  browserList?: Array<Browser>
  versions?: Array<string>
  types?: Array<string>
  showBrowser?: boolean
}>()

const ContainerRef = ref<HTMLDivElement>()

onMounted(() => {
  if (browserList) {
    browsers.value = browserList as unknown as Browser[]
  } else {
    browsers.value = list
  }
  if (!showBrowser) {
    // ContainerRef.value?.style.height = '20px'
  }
})

const expand = ref(true)

const toggleExpand = () => {
  expand.value = !expand.value
}

const selectedAll = () => {
  selectedVersions.value = ''
  selectedTypes.value = ''
  browserVersion.value = { b: '', v: 0 }
}

const toggleBrowserVersion = (b: string, v: number) => {
  browserVersion.value = { b, v }
}

const getBrowserSupportIcon = (type: string) => {
  switch (type) {
    case 'c':
      return c
    case 'f':
      return f
    case 's':
      return s
    case 'e':
      return e
    case 'ie':
      return ie
    case 'o':
      return o
    case 'ios':
      return ios
    case 'android':
      return android
    case 'node':
      return node
    default:
      return null
  }
}
</script>
<style scoped lang="less">
@border-color: #e9ecef;
@primary-color: #4361ee;

.browser-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
  gap: 10px;

  .browser-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    cursor: pointer;
    color: #666;
    transition: all 0.5s;

    .browser-icon {
      width: 50px;
      height: 50px;
    }
    &:hover {
      .browser-version {
        transform: scale(1, 1);
      }
    }

    .browser-version {
      transform: scale(0);
      overflow: hidden;
      transition: transform 0.2s ease-in-out;
      transform-origin: top;
      position: absolute;
      width: 100px;
      top: 0;
      left: 50px;
      z-index: 100;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;
      .browser-version-item {
        padding: 2px 5px;
        border-radius: 5px;
        background: #f0f0f0;
        font-size: 0.85rem;
        color: #666;
        &:hover {
          background: #e0e0e0;
          transform: scale(1.2) translate(5px, -5px);
        }
      }
    }
  }
}

.browserActive {
  background: @primary-color;
  color: white !important;
  border-radius: 10px;
  opacity: 0.8;
}

.controls {
  margin-bottom: 30px;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 12px;
  will-change: opacity, height, width;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  z-index: 100;
  height: 330px;
  width: 100%;
  opacity: 1;
  transform-origin: top right;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  opacity: 1;
  transition:
    height 0.3s,
    width 0.3s,
    opacity 0.3s;

  .search-box {
    position: relative;
    flex: 1;
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 1rem;

    .search-input {
      width: 100%;
      padding: 12px 15px 12px 40px;
      border: 1px solid @border-color;
      border-radius: 30px;
      font-size: 1rem;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 2px 8px rgba(67, 97, 238, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }
  }

  .version-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 10px 0;

    .version-btn-title {
      font-size: 0.9rem;
      color: #777;
      margin-right: 8px;
      line-height: 50px;
    }
  }
}

.controls-container {
  display: flex;
  flex-direction: row-reverse;
  position: sticky;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  height: 0px;
  width: 100%;
  opacity: 1;
  .expand-btn {
    position: absolute;
    top: 0px;
    right: 0;
    z-index: 200;
  }
}

.expandControlsContainer {
  height: 330px;
  width: 100%;
}

.expandControls {
  width: 63px;
  height: 38px;
  opacity: 0.5;
  overflow: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.version-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid @border-color;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: @primary-color;
    color: white;
    border-color: @primary-color;
    font-weight: 500;
  }
}
</style>
