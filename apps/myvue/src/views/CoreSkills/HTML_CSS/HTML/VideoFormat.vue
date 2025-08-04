<template>
  <div class="video-formats-container">
    <h1 class="main-title">前端视频格式基础介绍</h1>
    <p class="subtitle">探索各种视频格式的特点、技术与适用场景</p>

    <div class="info-box">
      <div class="info-icon">💡</div>
      <p>在现代Web开发中，选择合适的视频格式对性能、兼容性和用户体验至关重要。</p>
    </div>

    <div class="controls">
      <button v-for="(filter, index) in formatFilters" :key="index" :class="{ active: activeFilter === filter }"
        @click="activeFilter = filter">
        {{ filter }}
      </button>
    </div>

    <div class="formats-grid">
      <div v-for="(format, index) in filteredFormats" :key="index" class="format-card" :class="format.category">
        <div class="card-header">
          <div class="format-icon">{{ format.icon }}</div>
          <h2 class="format-name">{{ format.name }}</h2>
          <div class="format-extensions">{{ format.extensions.join(', ') }}</div>
        </div>

        <div class="card-content">
          <div class="tech-section">
            <h3>采用技术</h3>
            <p>{{ format.technology }}</p>
          </div>

          <div class="characteristics">
            <h3>特点</h3>
            <ul>
              <li v-for="(feature, fIndex) in format.features" :key="fIndex">
                {{ feature }}
              </li>
            </ul>
          </div>

          <div class="usage">
            <h3>使用场景</h3>
            <ul>
              <li v-for="(scene, sIndex) in format.usage" :key="sIndex">
                {{ scene }}
              </li>
            </ul>
          </div>
        </div>

        <div class="card-footer">
          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li v-for="(pro, pIndex) in format.pros" :key="pIndex">
                  <span class="check-icon">✓</span> {{ pro }}
                </li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li v-for="(con, cIndex) in format.cons" :key="cIndex">
                  <span class="cross-icon">✗</span> {{ con }}
                </li>
              </ul>
            </div>
          </div>

          <div class="compatibility">
            <h4>浏览器支持</h4>
            <div class="browser-support">
              <div v-for="(support, browser) in format.support" :key="browser" class="browser">
                <div class="browser-icon">
                  <img :src="getBrowserIcon(browser)" :alt="browser" />
                </div>
                <div class="support-level" :class="support.toLowerCase()">
                  {{ support }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="summary">
      <h3>视频格式选择指南</h3>
      <div class="recommendation">
        <p>🟢 <strong>推荐使用：</strong> 优先选择MP4(H.264)格式保证兼容性，配合WebM(VP9)提供更高压缩率</p>
        <p>🟡 <strong>考虑使用：</strong> 在需要动画或简单图形的场景中可使用GIF/APNG，但注意性能问题</p>
        <p>🔴 <strong>避免使用：</strong> AVI、FLV等老旧格式，除非有特殊兼容性需求</p>
      </div>
      <div class="best-practices">
        <h4>最佳实践：</h4>
        <ul>
          <li>使用<code>&lt;video&gt;</code>标签的多个<code>&lt;source&gt;</code>提供多种格式</li>
          <li>为不支持HTML5视频的浏览器提供fallback内容</li>
          <li>使用响应式视频技术（如srcset）适配不同设备</li>
          <li>对移动设备考虑使用更高效的编码方式</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 浏览器图标映射
const getBrowserIcon = (browser: string) => {
  const icons: Record<string, string> = {
    'Chrome': '/browser-chrome.png',
    'Firefox': '/browser-firefox.png',
    'Safari': '/browser-safari.png',
    'Edge': '/browser-edge.png',
    'Opera': '/browser-opera.png'
  };
  return icons[browser] || '/browser-generic.png';
};

// 视频格式数据
const videoFormats = ref([
  {
    id: 1,
    name: 'MP4 (H.264)',
    icon: '🎬',
    extensions: ['.mp4', '.m4v'],
    category: 'common',
    technology: 'H.264/AVC 视频编码 + AAC 音频编码',
    features: [
      '目前最广泛的视频格式',
      '高压缩率，良好画质',
      '支持硬件加速',
      '支持流媒体播放'
    ],
    usage: [
      '网站主视频内容',
      '移动设备视频',
      '直播流',
      '广告视频'
    ],
    pros: [
      '几乎全平台支持',
      '压缩效率高',
      '硬件解码支持好',
      '支持DRM内容保护'
    ],
    cons: [
      '专利授权问题',
      '不支持透明度',
      '高质量视频文件较大'
    ],
    support: {
      'Chrome': '全面',
      'Firefox': '全面',
      'Safari': '全面',
      'Edge': '全面',
      'Opera': '全面'
    }
  },
  {
    id: 2,
    name: 'WebM (VP9)',
    icon: '🌐',
    extensions: ['.webm'],
    category: 'common',
    technology: 'VP8/VP9 视频编码 + Vorbis/Opus 音频编码',
    features: [
      '开源免版税格式',
      '专为Web设计',
      '支持高质量压缩',
      '支持透明度(alpha通道)'
    ],
    usage: [
      'HTML5视频',
      '需要透明背景的视频',
      '需要高压缩率的场景',
      '开源项目'
    ],
    pros: [
      '免版税',
      '压缩率优于H.264',
      '支持透明度',
      'HTML5原生支持'
    ],
    cons: [
      'Safari支持有限',
      '硬件解码支持不足',
      '编码速度较慢',
      '编辑软件支持少'
    ],
    support: {
      'Chrome': '全面',
      'Firefox': '全面',
      'Safari': '部分',
      'Edge': '全面',
      'Opera': '全面'
    }
  },
  {
    id: 3,
    name: 'Ogg/Theora',
    icon: '🆓',
    extensions: ['.ogv', '.ogg'],
    category: 'common',
    technology: 'Theora 视频编码 + Vorbis 音频编码',
    features: [
      '完全开源免版税',
      '容器格式灵活',
      '较早的HTML5支持'
    ],
    usage: [
      '开源项目',
      '需要免版税的场景',
      '老旧浏览器兼容'
    ],
    pros: [
      '完全开源免版税',
      'HTML5原生支持',
      '支持流式传输'
    ],
    cons: [
      '压缩效率较低',
      '浏览器支持减少',
      '画质不如H.264/VP9',
      '硬件支持有限'
    ],
    support: {
      'Chrome': '全面',
      'Firefox': '全面',
      'Safari': '不支持',
      'Edge': '全面',
      'Opera': '全面'
    }
  },
  {
    id: 4,
    name: 'GIF',
    icon: '🔄',
    extensions: ['.gif'],
    category: 'animation',
    technology: 'LZW无损压缩',
    features: [
      '支持动画',
      '透明度支持',
      '无音频',
      '广泛兼容'
    ],
    usage: [
      '简单动画',
      '小型动图',
      '表情包',
      '老式浏览器支持'
    ],
    pros: [
      '全平台支持',
      '实现简单',
      '不需要视频解码器',
      '支持透明度'
    ],
    cons: [
      '仅支持256色',
      '文件体积大',
      '不支持音频',
      '性能消耗大'
    ],
    support: {
      'Chrome': '全面',
      'Firefox': '全面',
      'Safari': '全面',
      'Edge': '全面',
      'Opera': '全面'
    }
  },
  {
    id: 5,
    name: 'AVI',
    icon: '📼',
    extensions: ['.avi'],
    category: 'legacy',
    technology: '多种视频编码器',
    features: [
      '较老的容器格式',
      '支持多种编解码器',
      '无压缩或低压缩',
      '大文件尺寸'
    ],
    usage: [
      '本地视频存储',
      '视频编辑中间格式',
      '老旧系统兼容'
    ],
    pros: [
      '简单易用',
      '编辑软件广泛支持',
      '无压缩保留质量'
    ],
    cons: [
      '文件体积大',
      '不支持流媒体',
      '现代浏览器支持有限',
      '无现代视频特性'
    ],
    support: {
      'Chrome': '部分',
      'Firefox': '部分',
      'Safari': '部分',
      'Edge': '部分',
      'Opera': '部分'
    }
  },
  {
    id: 6,
    name: 'MOV',
    icon: '🍎',
    extensions: ['.mov', '.qt'],
    category: 'legacy',
    technology: 'Apple QuickTime技术',
    features: [
      'Apple开发的多媒体格式',
      '支持多种编码',
      '高质量保存',
      '支持高级特性'
    ],
    usage: [
      'Apple生态系统',
      '专业视频编辑',
      '高质量视频存储'
    ],
    pros: [
      '高质量视频',
      '支持alpha通道',
      '专业功能丰富',
      '编辑软件支持好'
    ],
    cons: [
      '浏览器支持有限',
      '文件体积大',
      '需要QuickTime插件',
      '非苹果平台兼容性差'
    ],
    support: {
      'Chrome': '部分',
      'Firefox': '部分',
      'Safari': '全面',
      'Edge': '部分',
      'Opera': '部分'
    }
  }
]);

const formatFilters = ref(['全部', '常用格式', '动画格式', '传统格式']);
const activeFilter = ref('全部');

const filteredFormats = computed(() => {
  if (activeFilter.value === '全部') return videoFormats.value;

  const categoryMap: Record<string, string> = {
    '常用格式': 'common',
    '动画格式': 'animation',
    '传统格式': 'legacy'
  };

  const category = categoryMap[activeFilter.value];
  return videoFormats.value.filter(format => format.category === category);
});
</script>

<style lang="less" scoped>
.video-formats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

.main-title {
  text-align: center;
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #111827;
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  text-shadow: none;
}

.subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  font-weight: 400;
}

.info-box {
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}

.info-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.info-box p {
  margin: 0;
  color: #1e40af;
  font-weight: 500;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.controls button {
  padding: 0.6rem 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 50px;
  background: #fff;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: none;
}

.controls button:hover {
  background: #f3f4f6;
  transform: none;
}

.controls button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  box-shadow: none;
}

.formats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.format-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  transition: none;
}

.format-card:hover {
  transform: none;
  box-shadow: none;
}

.card-header {
  color: #111827;
  padding: 1.5rem;
  background: none;
}

.format-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.format-name {
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.format-extensions {
  opacity: 0.8;
  font-weight: 500;
}

.card-content {
  padding: 1.5rem;
}

.card-content h3 {
  color: #111827;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-bottom: none;
  padding-bottom: 0;
}

.tech-section,
.characteristics,
.usage {
  margin-bottom: 1.5rem;
}

.characteristics ul,
.usage ul {
  padding-left: 1.2rem;
  margin: 0.5rem 0 0;
  list-style-type: disc;
}

.characteristics li,
.usage li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.card-footer {
  padding: 1.5rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.pros-cons h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #111827;
  font-weight: 600;
}

.pros-cons ul {
  padding-left: 0;
  margin: 0.5rem 0;
  list-style: none;
}

.pros-cons ul li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
}

.check-icon,
.cross-icon {
  margin-right: 0.5rem;
  flex-shrink: 0;
  font-weight: bold;
  position: static;
}

.pros .check-icon {
  color: #16a34a;
}

.cons .cross-icon {
  color: #dc2626;
}

.compatibility h4 {
  margin-top: 0;
  font-size: 1.1rem;
  color: #111827;
  font-weight: 600;
  margin-bottom: 1rem;
}

.browser-support {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}

.browser {
  text-align: center;
}

.browser-icon {
  width: 32px;
  height: 32px;
  margin: 0 auto 0.5rem;
  background: none;
  border-radius: 0;
  box-shadow: none;
}

.browser-icon img {
  width: 100%;
  height: 100%;
}

.support-level {
  font-size: 0.8rem;
  font-weight: 600;
}

.support-level.全面 {
  color: #16a34a;
}

.support-level.部分 {
  color: #f59e0b;
}

.support-level.不支持 {
  color: #dc2626;
}

.summary {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.summary h3 {
  margin-top: 0;
  color: #111827;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.recommendation {
  background: #f0fdf4;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #bbf7d0;
}

.recommendation p {
  margin: 0.5rem 0;
  font-weight: 500;
  color: #14532d;
}

.best-practices h4 {
  color: #111827;
  margin-bottom: 0.8rem;
}

.best-practices ul {
  padding-left: 1.5rem;
  margin: 0;
}

.best-practices li {
  margin-bottom: 0.7rem;
  line-height: 1.6;
}

.best-practices code {
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

@media (max-width: 768px) {
  .video-formats-container {
    padding: 1rem;
  }

  .formats-grid {
    grid-template-columns: 1fr;
  }

  .controls {
    flex-wrap: wrap;
  }

  .format-card .card-footer .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
