<template>
  <div class="image-formats-container">
    <div class="header">
      <h1>常见图片格式对比</h1>
      <p class="subtitle">探索不同图片格式的特性、适用场景及优缺点</p>
    </div>

    <div class="search-section">
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="搜索图片格式 (JPEG, PNG, SVG...)">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </div>
      <div class="filter-tags">
        <span v-for="tag in filterTags" :key="tag" :class="{ active: activeTag === tag }" @click="toggleTag(tag)">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="format-cards">
      <div class="format-card" v-for="format in filteredFormats" :key="format.id" :class="format.type">
        <div class="card-header">
          <div class="format-icon">
            <img :src="format.icon" alt="format icon">
          </div>
          <div class="format-name">
            <h2>{{ format.name }}</h2>
            <div class="format-meta">
              <span>{{ format.year }}</span>
              <span>{{ format.type }}</span>
            </div>
          </div>
        </div>

        <div class="card-content">
          <div class="info-row">
            <div class="info-item">
              <h3>色彩支持</h3>
              <p>{{ format.colors }}</p>
            </div>
            <div class="info-item">
              <h3>透明度</h3>
              <p>{{ format.transparency }}</p>
            </div>
            <div class="info-item">
              <h3>压缩类型</h3>
              <p>{{ format.compression }}</p>
            </div>
          </div>

          <div class="info-section">
            <h3>适用场景</h3>
            <ul>
              <li v-for="scene in format.scenes" :key="scene">{{ scene }}</li>
            </ul>
          </div>

          <div class="info-section">
            <h3>平台支持</h3>
            <div class="platforms">
              <span v-for="platform in format.platforms" :key="platform" :class="platform.toLowerCase()">
                {{ platform }}
              </span>
            </div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li v-for="pro in format.pros" :key="pro">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li v-for="con in format.cons" :key="con">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2>图片格式综合对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>格式</th>
              <th>压缩比</th>
              <th>动画支持</th>
              <th>透明度</th>
              <th>浏览器支持</th>
              <th>推荐用途</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="format in formats" :key="format.id">
              <td>{{ format.name }}</td>
              <td>
                <div class="compression-bar" :style="{ width: format.compressionLevel + '%' }"></div>
                <span>{{ format.compressionLevel }}%</span>
              </td>
              <td>
                <span v-if="format.animation" class="yes">✓</span>
                <span v-else class="no">✕</span>
              </td>
              <td>{{ format.transparencyShort }}</td>
              <td>{{ format.browserSupport }}</td>
              <td>{{ format.recommendedUse }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="conclusion">
      <h2>图片格式选择指南</h2>
      <div class="recommendations">
        <div class="recommendation">
          <div class="icon photo"></div>
          <h3>照片</h3>
          <p>使用 <strong>JPEG</strong> 或 <strong>WebP</strong> 以获得最佳压缩效果</p>
        </div>
        <div class="recommendation">
          <div class="icon graphic"></div>
          <h3>图形/图标</h3>
          <p>使用 <strong>PNG</strong> 或 <strong>SVG</strong> 保持清晰度</p>
        </div>
        <div class="recommendation">
          <div class="icon anim"></div>
          <h3>动画</h3>
          <p>使用 <strong>GIF</strong> 或 <strong>APNG</strong> 简单动画</p>
        </div>
        <div class="recommendation">
          <div class="icon web"></div>
          <h3>现代Web</h3>
          <p>优先使用 <strong>WebP</strong> 或 <strong>AVIF</strong> 以获得最佳性能</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 图片路径导入（实际项目中需要配置正确的路径）
const jpegIcon = 'path/to/jpeg-icon.svg';
const pngIcon = 'path/to/png-icon.svg';
const gifIcon = 'path/to/gif-icon.svg';
const webpIcon = 'path/to/webp-icon.svg';
const svgIcon = 'path/to/svg-icon.svg';
const avifIcon = 'path/to/avif-icon.svg';
const bmpIcon = 'path/to/bmp-icon.svg';
const tiffIcon = 'path/to/tiff-icon.svg';

const formats = ref([
  {
    id: 'jpeg',
    name: 'JPEG',
    year: '1992',
    type: '有损压缩',
    colors: '1670万色 (24位)',
    transparency: '不支持透明度',
    transparencyShort: '不支持',
    compression: '有损压缩 (DCT)',
    compressionLevel: 85,
    scenes: [
      '数码照片',
      '复杂图像',
      '网络图片',
      '照片分享'
    ],
    platforms: ['Web', '移动端', '桌面', '相机'],
    pros: [
      '高压缩比，文件体积小',
      '广泛支持，兼容性好',
      '适合照片和复杂图像',
      '可调整压缩质量'
    ],
    cons: [
      '不支持透明度',
      '压缩会产生块状伪影',
      '不支持动画',
      '不适合文本和线条图'
    ],
    icon: jpegIcon,
    animation: false,
    browserSupport: '99.9%',
    recommendedUse: '照片/复杂图像'
  },
  {
    id: 'png',
    name: 'PNG',
    year: '1996',
    type: '无损压缩',
    colors: '1600万色 (24位) + 8位透明度',
    transparency: '支持Alpha通道透明度',
    transparencyShort: 'Alpha通道',
    compression: '无损压缩 (DEFLATE)',
    compressionLevel: 40,
    scenes: [
      '带透明度的图像',
      '网页图形和图标',
      '需要无损压缩的场景',
      '屏幕截图'
    ],
    platforms: ['Web', '移动端', '桌面', '图形设计'],
    pros: [
      '支持Alpha通道透明度',
      '无损压缩，质量高',
      '适合文本和线条图',
      '渐进式加载支持'
    ],
    cons: [
      '文件体积通常比JPEG大',
      '不适合照片存储',
      '不支持动画',
      '不支持CMYK色彩空间'
    ],
    icon: pngIcon,
    animation: false,
    browserSupport: '99.9%',
    recommendedUse: '图形/透明图像'
  },
  {
    id: 'gif',
    name: 'GIF',
    year: '1987',
    type: '无损压缩',
    colors: '256色 (8位)',
    transparency: '支持单色透明度',
    transparencyShort: '单色透明',
    compression: '无损压缩 (LZW)',
    compressionLevel: 30,
    scenes: [
      '简单动画',
      '低色彩图形',
      '早期网页元素',
      '表情包'
    ],
    platforms: ['Web', '移动端', '社交媒体'],
    pros: [
      '支持简单动画',
      '广泛支持',
      '文件体积小',
      '支持透明背景'
    ],
    cons: [
      '色彩有限（仅256色）',
      '透明度只有开/关两种状态',
      '压缩效率较低',
      '不适合照片'
    ],
    icon: gifIcon,
    animation: true,
    browserSupport: '99.9%',
    recommendedUse: '简单动画'
  },
  {
    id: 'webp',
    name: 'WebP',
    year: '2010',
    type: '有损/无损',
    colors: '1670万色 (24位) + 8位透明度',
    transparency: '支持Alpha通道透明度',
    transparencyShort: 'Alpha通道',
    compression: '有损/无损 (VP8/VP8L)',
    compressionLevel: 75,
    scenes: [
      '现代网页图像',
      '替代JPEG/PNG',
      '需要高性能的Web应用',
      '移动应用'
    ],
    platforms: ['现代浏览器', '移动端', 'Web应用'],
    pros: [
      '比JPEG/PNG更优的压缩率',
      '支持透明度和动画',
      '现代格式，专为Web设计',
      '有损和无损模式'
    ],
    cons: [
      '旧浏览器支持有限',
      '编码时间较长',
      '专业软件支持不够完善',
      '不支持CMYK'
    ],
    icon: webpIcon,
    animation: true,
    browserSupport: '96%',
    recommendedUse: '现代Web图像'
  },
  {
    id: 'svg',
    name: 'SVG',
    year: '2001',
    type: '矢量图形',
    colors: '无限色彩',
    transparency: '完全支持透明度',
    transparencyShort: '完全支持',
    compression: '文本压缩 (GZIP)',
    compressionLevel: 60,
    scenes: [
      '图标和Logo',
      '可缩放图形',
      '数据可视化',
      '响应式设计元素'
    ],
    platforms: ['Web', '移动端', '桌面应用'],
    pros: [
      '无限缩放不失真',
      '文件体积小',
      '可通过CSS/JS操作',
      '支持动画和交互'
    ],
    cons: [
      '不适合复杂图像',
      '渲染性能依赖复杂度',
      '不适合照片',
      '安全考虑（可包含脚本）'
    ],
    icon: svgIcon,
    animation: true,
    browserSupport: '99%',
    recommendedUse: '图标/矢量图形'
  },
  {
    id: 'avif',
    name: 'AVIF',
    year: '2019',
    type: '有损/无损',
    colors: 'HDR宽色域',
    transparency: '支持Alpha通道',
    transparencyShort: 'Alpha通道',
    compression: '有损/无损 (AV1)',
    compressionLevel: 80,
    scenes: [
      '高质量图像',
      '现代Web应用',
      'HDR内容',
      '需要极致压缩的场景'
    ],
    platforms: ['现代浏览器', '移动端', '流媒体'],
    pros: [
      '目前最好的压缩率',
      '支持HDR和广色域',
      '支持透明度和动画',
      '开源免版税'
    ],
    cons: [
      '浏览器支持有限',
      '编码/解码复杂',
      '软件支持不完善',
      '编码时间较长'
    ],
    icon: avifIcon,
    animation: true,
    browserSupport: '85%',
    recommendedUse: '高质量图像'
  },
  {
    id: 'bmp',
    name: 'BMP',
    year: '1990',
    type: '未压缩',
    colors: '最高24位',
    transparency: '有限支持',
    transparencyShort: '有限',
    compression: '通常未压缩',
    compressionLevel: 10,
    scenes: [
      'Windows系统',
      '原始图像存储',
      '打印行业',
      '遗留系统'
    ],
    platforms: ['Windows', '桌面应用'],
    pros: [
      '简单易实现',
      '无压缩损失',
      '广泛支持',
      '每个像素精确存储'
    ],
    cons: [
      '文件体积巨大',
      '不适合Web使用',
      '功能有限',
      '不支持现代特性'
    ],
    icon: bmpIcon,
    animation: false,
    browserSupport: '99%',
    recommendedUse: '原始图像存储'
  },
  {
    id: 'tiff',
    name: 'TIFF',
    year: '1986',
    type: '有损/无损',
    colors: '最高48位',
    transparency: '支持',
    transparencyShort: '支持',
    compression: '多种可选 (LZW, ZIP, JPEG)',
    compressionLevel: 50,
    scenes: [
      '专业摄影',
      '印刷行业',
      '扫描文档',
      '存档存储'
    ],
    platforms: ['专业软件', '印刷', '桌面'],
    pros: [
      '极高的图像质量',
      '支持多种压缩方式',
      '丰富的元数据支持',
      '专业行业标准'
    ],
    cons: [
      '文件体积大',
      'Web支持有限',
      '实现复杂',
      '浏览器支持差'
    ],
    icon: tiffIcon,
    animation: false,
    browserSupport: '有限',
    recommendedUse: '专业印刷/存档'
  }
]);

const searchQuery = ref('');
const activeTag = ref('全部');
const filterTags = ['全部', '有损压缩', '无损压缩', '矢量', '动画支持', '透明支持'];

const filteredFormats = computed(() => {
  let result = formats.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(format =>
      format.name.toLowerCase().includes(query) ||
      format.type.toLowerCase().includes(query) ||
      format.scenes.some(scene => scene.toLowerCase().includes(query))
    );
  }

  if (activeTag.value !== '全部') {
    if (activeTag.value === '动画支持') {
      result = result.filter(format => format.animation);
    } else if (activeTag.value === '透明支持') {
      result = result.filter(format => format.transparency !== '不支持透明度');
    } else {
      result = result.filter(format => format.type.includes(activeTag.value));
    }
  }

  return result;
});

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? '全部' : tag;
}

// 模拟图片加载
onMounted(() => {
  // 在实际项目中，这里会加载真实的图标
  console.log('组件已挂载，图片格式数据加载完成');
});
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@success-color: #4cc9f0;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.image-formats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto;
  }
}

.search-section {
  margin-bottom: 2rem;

  .search-box {
    position: relative;
    max-width: 500px;
    margin: 0 auto 1.5rem;

    input {
      width: 100%;
      padding: 0.8rem 1rem 0.8rem 3rem;
      border: 1px solid @border-color;
      border-radius: 50px;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 0 0 3px fade(@primary-color, 20%);
      }
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      fill: @text-light;
    }
  }

  .filter-tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      padding: 0.4rem 1rem;
      background-color: @light-bg;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: darken(@light-bg, 3%);
      }

      &.active {
        background-color: @primary-color;
        color: white;
        font-weight: 500;
      }
    }
  }
}

.format-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.format-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  border-top: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  &.jpeg {
    border-color: #f72585;
  }

  &.png {
    border-color: #4cc9f0;
  }

  &.gif {
    border-color: #ff9e00;
  }

  &.webp {
    border-color: #3a0ca3;
  }

  &.svg {
    border-color: #4361ee;
  }

  &.avif {
    border-color: #7209b7;
  }

  &.bmp {
    border-color: #6c757d;
  }

  &.tiff {
    border-color: #2b9348;
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background-color: fade(@light-bg, 50%);
  border-bottom: 1px solid @border-color;

  .format-icon {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    img {
      width: 30px;
      height: 30px;
    }
  }

  .format-name {
    h2 {
      font-size: 1.4rem;
      margin: 0 0 0.2rem;
      color: @text-dark;
    }

    .format-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: @text-light;

      span {
        padding: 0.2rem 0.5rem;
        background-color: @light-bg;
        border-radius: 4px;
      }
    }
  }
}

.card-content {
  padding: 1.5rem;

  .info-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;

    .info-item {
      background: @light-bg;
      border-radius: 8px;
      padding: 0.8rem;
      text-align: center;

      h3 {
        font-size: 0.9rem;
        margin: 0 0 0.3rem;
        color: @text-light;
      }

      p {
        margin: 0;
        font-weight: 500;
      }
    }
  }

  .info-section {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1rem;
      margin: 0 0 0.8rem;
      color: @primary-color;
      display: flex;
      align-items: center;

      &::after {
        content: '';
        flex-grow: 1;
        height: 1px;
        background: @border-color;
        margin-left: 0.75rem;
      }
    }

    ul {
      padding-left: 1.25rem;
      margin: 0;

      li {
        margin-bottom: 0.4rem;
        font-size: 0.95rem;
        position: relative;
        padding-left: 1rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: @primary-color;
        }
      }
    }

    .platforms {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      span {
        padding: 0.3rem 0.8rem;
        background-color: @light-bg;
        border-radius: 4px;
        font-size: 0.85rem;

        &.web {
          background-color: fade(@primary-color, 10%);
        }

        &.移动端 {
          background-color: fade(@accent-color, 10%);
        }

        &.桌面 {
          background-color: fade(@success-color, 10%);
        }
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
    margin-top: 1rem;

    .pros,
    .cons {
      padding: 1rem;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        font-size: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid @border-color;
      }
    }

    .pros {
      background-color: fade(#2ec4b6, 8%);

      h3 {
        color: #2ec4b6;
      }

      li::before {
        content: '✓';
        color: #2ec4b6;
        margin-right: 0.5rem;
        font-weight: bold;
      }
    }

    .cons {
      background-color: fade(#e71d36, 8%);

      h3 {
        color: #e71d36;
      }

      li::before {
        content: '✕';
        color: #e71d36;
        margin-right: 0.5rem;
        font-weight: bold;
      }
    }

    ul {
      padding-left: 1.5rem;
      margin: 0.5rem 0 0;

      li {
        margin-bottom: 0.6rem;
      }
    }
  }
}

.comparison-section {
  margin: 3rem 0;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-bottom: 1.8rem;
  }

  .comparison-table {
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: @card-shadow;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;

      th,
      td {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid @border-color;
      }

      thead {
        background: linear-gradient(to bottom, #f1f3f9, #e2e7f5);

        th {
          font-weight: 600;
          color: @primary-color;
        }
      }

      tbody tr {
        &:nth-child(even) {
          background-color: @light-bg;
        }

        &:hover {
          background-color: darken(@light-bg, 2%);
        }
      }

      .compression-bar {
        height: 8px;
        background: linear-gradient(to right, #4cc9f0, @primary-color);
        border-radius: 4px;
        margin-bottom: 0.3rem;
      }

      .yes {
        color: #2ec4b6;
        font-weight: bold;
        font-size: 1.2rem;
      }

      .no {
        color: #e71d36;
        font-weight: bold;
      }
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 2rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .recommendations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;

    .recommendation {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;

      .icon {
        width: 70px;
        height: 70px;
        margin: 0 auto 1rem;
        border-radius: 50%;
        background-color: @light-bg;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;

        &.photo::after {
          content: '📷';
        }

        &.graphic::after {
          content: '🎨';
        }

        &.anim::after {
          content: '🎬';
        }

        &.web::after {
          content: '🌐';
        }
      }

      h3 {
        margin: 0 0 0.8rem;
        color: @text-dark;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;

        strong {
          color: @primary-color;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .image-formats-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .format-cards {
    grid-template-columns: 1fr;
  }

  .info-row {
    grid-template-columns: 1fr !important;
    gap: 0.8rem !important;
  }

  .pros-cons {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .card-content {
    padding: 1.2rem !important;
  }
}
</style>
