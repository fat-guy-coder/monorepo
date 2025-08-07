<template>
  <div class="image-processing-container">
    <header class="header">
      <h1>JavaScript <span class="highlight">Canvas图像处理</span> 指南</h1>
      <p class="subtitle">使用Canvas API实现图像处理效果</p>
    </header>

    <div class="content">
      <div class="intro-cards">
        <div class="intro-card">
          <i class="fas fa-image"></i>
          <h3>为什么使用Canvas?</h3>
          <p>Canvas提供直接像素级操作能力，无需服务器处理，可在浏览器中实现实时图像处理效果。</p>
        </div>
        <div class="intro-card">
          <i class="fas fa-bolt"></i>
          <h3>核心优势</h3>
          <p>高性能、无依赖、跨平台兼容，结合WebGL可实现更复杂的图像处理算法。</p>
        </div>
        <div class="intro-card">
          <i class="fas fa-cogs"></i>
          <h3>处理流程</h3>
          <p>加载图像 → 绘制到Canvas → 获取像素数据 → 应用算法 → 更新Canvas → 输出结果</p>
        </div>
      </div>

      <div class="work-area">
        <div class="image-controls">
          <div class="upload-section">
            <label class="upload-btn">
              <input type="file" accept="image/*" @change="loadImage" />
              <i class="fas fa-upload"></i> 选择图像
            </label>
            <button @click="resetImage" :disabled="!imageLoaded">
              <i class="fas fa-redo"></i> 重置图像
            </button>
          </div>

          <div class="processing-controls">
            <div class="control-group">
              <h3><i class="fas fa-sliders-h"></i> 基础处理</h3>
              <div class="controls">
                <button @click="applyGrayscale" :disabled="!imageLoaded">
                  <i class="fas fa-moon"></i> 灰度化
                </button>
                <button @click="applyInvert" :disabled="!imageLoaded">
                  <i class="fas fa-adjust"></i> 颜色反转
                </button>
                <button @click="applySepia" :disabled="!imageLoaded">
                  <i class="fas fa-sun"></i> 棕褐色调
                </button>
              </div>
            </div>

            <div class="control-group">
              <h3><i class="fas fa-window-maximize"></i> 二值化处理</h3>
              <div class="controls">
                <div class="slider-container">
                  <label>阈值: {{ threshold }}%</label>
                  <input type="range" min="0" max="100" v-model="threshold" />
                </div>
                <button @click="applyThreshold" :disabled="!imageLoaded">
                  <i class="fas fa-border-all"></i> 应用二值化
                </button>
              </div>
            </div>

            <div class="control-group">
              <h3><i class="fas fa-blur"></i> 滤镜效果</h3>
              <div class="controls">
                <button @click="applyBlur" :disabled="!imageLoaded">
                  <i class="fas fa-cloud"></i> 模糊效果
                </button>
                <button @click="applySharpen" :disabled="!imageLoaded">
                  <i class="fas fa-meteor"></i> 锐化效果
                </button>
                <button @click="applyEdgeDetection" :disabled="!imageLoaded">
                  <i class="fas fa-drafting-compass"></i> 边缘检测
                </button>
              </div>
            </div>

            <div class="control-group">
              <h3><i class="fas fa-palette"></i> 颜色调整</h3>
              <div class="controls">
                <div class="slider-container">
                  <label>亮度: {{ brightness }}%</label>
                  <input type="range" min="-100" max="100" v-model="brightness" />
                </div>
                <div class="slider-container">
                  <label>对比度: {{ contrast }}%</label>
                  <input type="range" min="-100" max="100" v-model="contrast" />
                </div>
                <button @click="applyColorAdjustment" :disabled="!imageLoaded">
                  <i class="fas fa-sync-alt"></i> 应用调整
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="canvas-container">
          <div class="canvas-wrapper">
            <canvas ref="canvas" width="500" height="400"></canvas>
            <div class="canvas-overlay" v-if="!imageLoaded">
              <i class="fas fa-image"></i>
              <p>请上传图像开始处理</p>
            </div>
          </div>
          <div class="processing-info">
            <div class="info-item">
              <span>图像尺寸:</span>
              <span>{{ imageSize }}</span>
            </div>
            <div class="info-item">
              <span>处理操作:</span>
              <span>{{ lastOperation }}</span>
            </div>
            <div class="info-item">
              <span>处理时间:</span>
              <span>{{ processingTime }} ms</span>
            </div>
          </div>
          <div class="code-container">
            <h3>代码</h3>
            <pre><code>{{ algorithms[activeAlgorithm].code }}</code></pre>
          </div>
        </div>
      </div>

      <section class="code-samples">
        <h2 class="section-title">
          <i class="fas fa-code"></i> 核心算法实现
        </h2>

        <div class="algorithm-tabs">
          <button v-for="(algo, index) in algorithms" :key="index" @click="activeAlgorithm = index"
            :class="{ active: activeAlgorithm === index }">
            {{ algo.title }}
          </button>
        </div>

        <div class="algorithm-content">
          <div class="algorithm-description">
            <h3>{{ algorithms[activeAlgorithm].title }}</h3>
            <p>{{ algorithms[activeAlgorithm].description }}</p>
            <div class="complexity">
              <span>时间复杂度: {{ algorithms[activeAlgorithm].complexity }}</span>
              <span>应用场景: {{ algorithms[activeAlgorithm].useCases }}</span>
            </div>
          </div>
          <pre><code>{{ algorithms[activeAlgorithm].code }}</code></pre>
        </div>
      </section>

      <section class="comparison">
        <h2 class="section-title">
          <i class="fas fa-columns"></i> 图像处理效果对比
        </h2>

        <div class="effects-grid">
          <div class="effect-card" v-for="(effect, index) in effects" :key="index">
            <div class="effect-preview" :style="{ backgroundImage: `url(${effect.image})` }"></div>
            <div class="effect-info">
              <h3>{{ effect.name }}</h3>
              <p>{{ effect.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">
          <i class="fas fa-lightbulb"></i> 最佳实践与优化
        </h2>

        <div class="practices">
          <div class="practice-card">
            <i class="fas fa-tachometer-alt"></i>
            <h3>性能优化</h3>
            <ul>
              <li>使用Web Workers处理大型图像</li>
              <li>避免在循环中频繁获取ImageData</li>
              <li>对于大型图像，考虑分块处理</li>
              <li>使用TypedArray优化像素操作</li>
            </ul>
          </div>

          <div class="practice-card">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>常见问题</h3>
            <ul>
              <li>跨域问题 - 确保图像源允许跨域</li>
              <li>内存泄漏 - 及时清理不再使用的ImageData</li>
              <li>性能瓶颈 - 大图像处理可能导致主线程阻塞</li>
              <li>像素格式 - 注意RGBA格式的像素数据</li>
            </ul>
          </div>

          <div class="practice-card">
            <i class="fas fa-rocket"></i>
            <h3>进阶技巧</h3>
            <ul>
              <li>结合WebGL实现GPU加速</li>
              <li>使用OffscreenCanvas在Worker中处理</li>
              <li>实现历史记录功能以便撤销操作</li>
              <li>添加实时预览优化用户体验</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 JavaScript Canvas图像处理指南 | 使用Vue 3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

// 引用示例图像
import sampleImage from '@/assets/js/imgge-processing.png';

// 图像处理状态
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const imageLoaded = ref(false);
const originalImageData = ref<ImageData | null>(null);
const imageSize = ref('0×0');
const lastOperation = ref('无');
const processingTime = ref(0);

// 处理参数
const threshold = ref(50);
const brightness = ref(0);
const contrast = ref(0);

// 当前激活的算法
const activeAlgorithm = ref(0);

// 初始化Canvas
onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    // 加载示例图像
    const img = new Image();
    img.src = sampleImage;
    img.onload = () => {
      drawImageToCanvas(img);
    };
  }
});

const list = ref([
  {
    name: "灰度化",
    image: "https://picsum.photos/200/150?random=1",
    description: "移除颜色信息，保留亮度信息，简化图像处理流程",
    code: `
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // 灰度公式: 0.299*R + 0.587*G + 0.114*B
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      data[i] = gray;         // R
      data[i + 1] = gray;     // G
      data[i + 2] = gray;     // B
    }
    `,
    function: () => {
      processImage((imageData) => {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // 灰度公式: 0.299*R + 0.587*G + 0.114*B
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;

          data[i] = gray;         // R
          data[i + 1] = gray;     // G
          data[i + 2] = gray;     // B
        }
      });
      lastOperation.value = '灰度化';
    }
  },
  {
    name: "二值化",
    image: "https://picsum.photos/200/150?random=2",
    description: "将图像简化为黑白两色，便于文字识别和形状分析"
  },

])

// 绘制图像到Canvas
const drawImageToCanvas = (img: HTMLImageElement) => {
  if (!canvas.value || !ctx.value) return;

  // 调整Canvas尺寸以适应图像
  const maxWidth = 500;
  const maxHeight = 400;
  let width = img.width;
  let height = img.height;

  if (width > maxWidth) {
    height = (maxWidth / width) * height;
    width = maxWidth;
  }

  if (height > maxHeight) {
    width = (maxHeight / height) * width;
    height = maxHeight;
  }

  canvas.value.width = width;
  canvas.value.height = height;

  // 绘制图像
  ctx.value.clearRect(0, 0, width, height);
  ctx.value.drawImage(img, 0, 0, width, height);

  // 保存原始图像数据
  originalImageData.value = ctx.value.getImageData(0, 0, width, height);
  imageLoaded.value = true;
  imageSize.value = `${width}×${height}`;
  lastOperation.value = '原始图像';
  processingTime.value = 0;
};

// 加载用户图像
const loadImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target?.result as string;
    img.onload = () => {
      drawImageToCanvas(img);
    };
  };

  reader.readAsDataURL(file);
};

// 重置图像
const resetImage = () => {
  if (!canvas.value || !ctx.value || !originalImageData.value) return;

  ctx.value.putImageData(originalImageData.value, 0, 0);
  lastOperation.value = '重置图像';
  processingTime.value = 0;
};

// 图像处理辅助函数
const processImage = (processor: (data: ImageData) => void) => {
  if (!canvas.value || !ctx.value) return;

  const startTime = performance.now();
  const imageData = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height);

  // 处理图像
  processor(imageData);

  // 绘制处理后的图像
  ctx.value.putImageData(imageData, 0, 0);

  // 更新处理信息
  processingTime.value = Math.round(performance.now() - startTime);
};

// 灰度化处理
const applyGrayscale = () => {
  processImage((imageData) => {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // 灰度公式: 0.299*R + 0.587*G + 0.114*B
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      data[i] = gray;         // R
      data[i + 1] = gray;     // G
      data[i + 2] = gray;     // B
    }
  });

  lastOperation.value = '灰度化';
};

// 颜色反转
const applyInvert = () => {
  processImage((imageData) => {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];         // R
      data[i + 1] = 255 - data[i + 1]; // G
      data[i + 2] = 255 - data[i + 2]; // B
    }
  });

  lastOperation.value = '颜色反转';
};

// 棕褐色调
const applySepia = () => {
  processImage((imageData) => {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));     // R
      data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)); // G
      data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)); // B
    }
  });

  lastOperation.value = '棕褐色调';
};

// 二值化处理
const applyThreshold = () => {
  const thresholdValue = (threshold.value / 100) * 255;

  processImage((imageData) => {
    const data = imageData.data;

    // 先转换为灰度
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      // 应用阈值
      const value = gray > thresholdValue ? 255 : 0;

      data[i] = value;         // R
      data[i + 1] = value;     // G
      data[i + 2] = value;     // B
    }
  });

  lastOperation.value = `二值化 (阈值:${threshold.value}%)`;
};

// 应用颜色调整
const applyColorAdjustment = () => {
  const brightnessValue = brightness.value;
  const contrastValue = contrast.value;

  processImage((imageData) => {
    const data = imageData.data;
    const factor = (259 * (contrastValue + 255)) / (255 * (259 - contrastValue));

    for (let i = 0; i < data.length; i += 4) {
      // 调整亮度
      data[i] = clamp(data[i] + brightnessValue * 2.55);
      data[i + 1] = clamp(data[i + 1] + brightnessValue * 2.55);
      data[i + 2] = clamp(data[i + 2] + brightnessValue * 2.55);

      // 调整对比度
      data[i] = clamp(factor * (data[i] - 128) + 128);
      data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128);
      data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128);
    }
  });

  lastOperation.value = `颜色调整 (亮度:${brightness.value}%, 对比度:${contrast.value}%)`;
};

// 模糊效果
const applyBlur = () => {
  processImage((imageData) => {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const output = new Uint8ClampedArray(data);

    // 简单3x3均值模糊
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;

          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += data[idx];
            }
          }

          const idx = (y * width + x) * 4 + c;
          output[idx] = sum / 9;
        }
      }
    }

    imageData.data.set(output);
  });

  lastOperation.value = '模糊效果';
};

// 锐化效果
const applySharpen = () => {
  processImage((imageData) => {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const output = new Uint8ClampedArray(data);

    // 简单3x3锐化卷积核
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;

          // 应用锐化核
          sum += data[((y - 1) * width + (x - 1)) * 4 + c] * 0;
          sum += data[((y - 1) * width + x) * 4 + c] * -1;
          sum += data[((y - 1) * width + (x + 1)) * 4 + c] * 0;

          sum += data[(y * width + (x - 1)) * 4 + c] * -1;
          sum += data[(y * width + x) * 4 + c] * 5;
          sum += data[(y * width + (x + 1)) * 4 + c] * -1;

          sum += data[((y + 1) * width + (x - 1)) * 4 + c] * 0;
          sum += data[((y + 1) * width + x) * 4 + c] * -1;
          sum += data[((y + 1) * width + (x + 1)) * 4 + c] * 0;

          const idx = (y * width + x) * 4 + c;
          output[idx] = clamp(sum);
        }
      }
    }

    imageData.data.set(output);
  });

  lastOperation.value = '锐化效果';
};

// 边缘检测
const applyEdgeDetection = () => {
  processImage((imageData) => {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const output = new Uint8ClampedArray(data.length);

    // Sobel算子边缘检测
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        // 计算x方向梯度
        let gx = 0;
        gx += data[((y - 1) * width + (x - 1)) * 4] * -1;
        gx += data[((y - 1) * width + (x + 1)) * 4] * 1;
        gx += data[(y * width + (x - 1)) * 4] * -2;
        gx += data[(y * width + (x + 1)) * 4] * 2;
        gx += data[((y + 1) * width + (x - 1)) * 4] * -1;
        gx += data[((y + 1) * width + (x + 1)) * 4] * 1;

        // 计算y方向梯度
        let gy = 0;
        gy += data[((y - 1) * width + (x - 1)) * 4] * -1;
        gy += data[((y - 1) * width + x) * 4] * -2;
        gy += data[((y - 1) * width + (x + 1)) * 4] * -1;
        gy += data[((y + 1) * width + (x - 1)) * 4] * 1;
        gy += data[((y + 1) * width + x) * 4] * 2;
        gy += data[((y + 1) * width + (x + 1)) * 4] * 1;

        // 计算梯度幅值
        const magnitude = Math.min(255, Math.sqrt(gx * gx + gy * gy));

        const idx = (y * width + x) * 4;
        output[idx] = magnitude;     // R
        output[idx + 1] = magnitude; // G
        output[idx + 2] = magnitude; // B
        output[idx + 3] = 255;       // Alpha
      }
    }

    imageData.data.set(output);
  });

  lastOperation.value = '边缘检测';
};

// 辅助函数：限制值在0-255范围内
const clamp = (value: number): number => {
  return Math.min(255, Math.max(0, value));
};

// 算法示例
const algorithms = [
  {
    title: "灰度化",
    description: "将彩色图像转换为灰度图像，通过加权平均计算像素的亮度值。",
    complexity: "O(n)，其中n为像素数量",
    useCases: "图像预处理、降低计算复杂度",
    code: `function applyGrayscale(imageData) {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // 使用亮度加权公式: 0.299*R + 0.587*G + 0.114*B
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;

    data[i] = gray;     // R
    data[i + 1] = gray; // G
    data[i + 2] = gray; // B
  }
}`
  },
  {
    title: "二值化",
    description: "将灰度图像转换为只有黑白两种颜色的图像，基于阈值决定像素值。",
    complexity: "O(n)，其中n为像素数量",
    useCases: "OCR预处理、图像分割、简化图像信息",
    code: `function applyThreshold(imageData, threshold) {
  const data = imageData.data;
  const thresholdValue = threshold * 255;

  for (let i = 0; i < data.length; i += 4) {
    // 计算灰度值
    const gray = 0.299 * data[i] +
                0.587 * data[i + 1] +
                0.114 * data[i + 2];

    // 应用阈值
    const value = gray > thresholdValue ? 255 : 0;

    data[i] = value;     // R
    data[i + 1] = value; // G
    data[i + 2] = value; // B
  }
}`
  },
  {
    title: "Sobel边缘检测",
    description: "使用Sobel算子检测图像中的边缘，通过计算像素梯度幅值来识别边界。",
    complexity: "O(n)，其中n为像素数量",
    useCases: "计算机视觉、特征提取、图像分析",
    code: `function applyEdgeDetection(imageData) {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const output = new Uint8ClampedArray(data.length);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      // 计算x方向梯度
      let gx = 0;
      gx += data[((y-1)*width + (x-1))*4] * -1;
      gx += data[((y-1)*width + (x+1))*4] * 1;
      // ... 省略完整算子

      // 计算y方向梯度
      let gy = 0;
      gy += data[((y-1)*width + (x-1))*4] * -1;
      gy += data[((y-1)*width + x)*4] * -2;
      // ... 省略完整算子

      // 计算梯度幅值
      const magnitude = Math.min(255, Math.sqrt(gx*gx + gy*gy));

      const idx = (y * width + x) * 4;
      output[idx] = magnitude;     // R
      output[idx + 1] = magnitude; // G
      output[idx + 2] = magnitude; // B
    }
  }

  imageData.data.set(output);
}`
  }
];

// 效果示例
const effects = [
  {
    name: "灰度化",
    image: "https://picsum.photos/200/150?random=1",
    description: "移除颜色信息，保留亮度信息，简化图像处理流程"
  },
  {
    name: "二值化",
    image: "https://picsum.photos/200/150?random=2",
    description: "将图像简化为黑白两色，便于文字识别和形状分析"
  },
  {
    name: "颜色反转",
    image: "https://picsum.photos/200/150?random=3",
    description: "创建负片效果，增强图像细节的可视性"
  },
  {
    name: "棕褐色调",
    image: "https://picsum.photos/200/150?random=4",
    description: "应用复古色调，常用于老照片效果处理"
  },
  {
    name: "边缘检测",
    image: "https://picsum.photos/200/150?random=5",
    description: "识别图像中的边界和轮廓，计算机视觉的基础"
  },
  {
    name: "模糊效果",
    image: "https://picsum.photos/200/150?random=6",
    description: "减少图像细节和噪声，创建景深效果或保护隐私"
  }
];
</script>

<style lang="less" scoped>



.image-processing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .intro-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .intro-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      i {
        font-size: 2.5rem;
        color: #3498db;
        margin-bottom: 1.2rem;
      }

      h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #4a5568;
        line-height: 1.7;
      }
    }
  }

  .work-area {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .image-controls {
      .upload-section {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        label.upload-btn {
          display: block;
          background: #3498db;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 1rem;
          transition: background 0.3s;

          &:hover {
            background: #2980b9;
          }

          input[type="file"] {
            display: none;
          }
        }

        button {
          width: 100%;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;

          &:hover:not(:disabled) {
            background: #e2e8f0;
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }

      .processing-controls {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .control-group {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f1f5f9;

          &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #2c3e50;
            display: flex;
            align-items: center;

            i {
              margin-right: 0.5rem;
              color: #3498db;
            }
          }

          .controls {
            button {
              display: block;
              width: 100%;
              text-align: left;
              padding: 0.8rem;
              margin-bottom: 0.8rem;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
              cursor: pointer;
              transition: all 0.2s;

              i {
                margin-right: 0.5rem;
                width: 20px;
                text-align: center;
              }

              &:hover:not(:disabled) {
                background: #edf2f7;
                border-color: #cbd5e0;
              }

              &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }
            }

            .slider-container {
              margin-bottom: 1rem;

              label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                color: #4a5568;
              }

              input[type="range"] {
                width: 100%;
              }
            }
          }
        }
      }
    }

    .canvas-container {
      .canvas-wrapper {
        position: relative;
        background: white;
        border-radius: 12px;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        margin-bottom: 1rem;

        canvas {
          display: block;
          max-width: 100%;
          border-radius: 8px;
          background: #f1f5f9;
        }

        .canvas-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(241, 245, 249, 0.8);
          color: #a0aec0;
          border-radius: 8px;

          i {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
        }
      }

      .processing-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        background: white;
        border-radius: 12px;
        padding: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .info-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;

          span:first-child {
            color: #4a5568;
          }

          span:last-child {
            font-weight: 500;
            color: #2c3e50;
          }
        }
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #eef2f7;
    color: #2c3e50;
    display: flex;
    align-items: center;

    i {
      margin-right: 0.8rem;
      color: #3498db;
    }
  }

  .code-samples {
    margin-bottom: 3rem;

    .algorithm-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;

      button {
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 0.6rem 1.2rem;
        cursor: pointer;
        transition: all 0.2s;

        &.active,
        &:hover {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }
      }
    }

    .algorithm-content {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .algorithm-description {
        padding: 1.5rem;
        border-bottom: 1px solid #f1f5f9;

        h3 {
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .complexity {
          display: flex;
          gap: 1.5rem;
          font-size: 0.9rem;
          color: #718096;
        }
      }

      pre {
        margin: 0;
        padding: 1.5rem;
        background: #2c3e50;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          color: #e0e0e0;
          font-size: 0.95rem;
          line-height: 1.5;

          .hljs-keyword {
            color: #ff9a76;
          }

          .hljs-built_in {
            color: #82aaff;
          }

          .hljs-function {
            color: #82aaff;
          }
        }
      }
    }
  }

  .comparison {
    .effects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .effect-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .effect-preview {
          height: 180px;
          background-size: cover;
          background-position: center;
          background-color: #f1f5f9;
        }

        .effect-info {
          padding: 1.2rem;

          h3 {
            font-size: 1.2rem;
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          p {
            color: #4a5568;
            font-size: 0.9rem;
            line-height: 1.6;
            margin: 0;
          }
        }
      }
    }
  }

  .best-practices {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .practice-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        i {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            color: #4a5568;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@media (max-width: 768px) {
  .image-processing-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
