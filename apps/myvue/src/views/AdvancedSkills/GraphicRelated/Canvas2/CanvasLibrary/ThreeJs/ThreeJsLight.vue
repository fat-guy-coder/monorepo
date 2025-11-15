<template>
  <div class="lighting-container">
    <header class="page-header">
      <h1 class="title">Three.js 光照系统</h1>
      <p class="subtitle">掌握3D场景光影艺术的奥秘</p>
    </header>

    <main class="content">
      <!-- 光照概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">光照系统概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                光照是3D场景中最重要的视觉元素之一，它决定了物体的外观、材质表现和场景氛围。
              </p>
              <div class="lighting-basics">
                <h3>光照基础概念</h3>
                <div class="concept-grid">
                  <div class="concept-item">
                    <div class="concept-icon">💡</div>
                    <div class="concept-text">
                      <h4>光源类型</h4>
                      <p>不同光源模拟不同的现实光照情况</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">🎨</div>
                    <div class="concept-text">
                      <h4>材质交互</h4>
                      <p>材质属性决定对光照的响应方式</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">🌓</div>
                    <div class="concept-text">
                      <h4>阴影系统</h4>
                      <p>光线被物体遮挡产生的阴影效果</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">⚡</div>
                    <div class="concept-text">
                      <h4>性能优化</h4>
                      <p>合理使用光照以平衡效果和性能</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础光照类型 -->
      <section class="basic-lights-section">
        <div class="card">
          <h2 class="card-title">基础光照类型</h2>
          <div class="card-content">
            <div class="lights-grid">
              <!-- 环境光 -->
              <div class="light-card">
                <div class="light-header">
                  <h3 class="light-name">环境光 (AmbientLight)</h3>
                  <span class="light-tag basic">基础</span>
                </div>
                <div class="light-content">
                  <div class="light-preview ambient-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="light-info">
                    <h4>描述</h4>
                    <p>均匀照亮场景中的所有物体，没有方向性，模拟全局环境光照</p>
                    <h4>特性</h4>
                    <ul>
                      <li>无方向性光照</li>
                      <li>不会产生阴影</li>
                      <li>性能开销最小</li>
                      <li>通常与其他光源配合使用</li>
                    </ul>
                    <div class="light-properties">
                      <div class="property">
                        <span class="property-name">color</span>
                        <span class="property-desc">光的颜色</span>
                      </div>
                      <div class="property">
                        <span class="property-name">intensity</span>
                        <span class="property-desc">光照强度 (默认1.0)</span>
                      </div>
                    </div>
                  </div>
                  <div class="light-code">
                    <pre><code>// 创建环境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);

// 或者使用十六进制字符串
const softAmbient = new THREE.AmbientLight('#ffffff', 0.3);</code></pre>
                  </div>
                </div>
              </div>

              <!-- 方向光 -->
              <div class="light-card">
                <div class="light-header">
                  <h3 class="light-name">方向光 (DirectionalLight)</h3>
                  <span class="light-tag standard">标准</span>
                </div>
                <div class="light-content">
                  <div class="light-preview directional-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="light-info">
                    <h4>描述</h4>
                    <p>模拟无限远处的平行光源，如太阳光，所有光线平行照射</p>
                    <h4>特性</h4>
                    <ul>
                      <li>平行光线</li>
                      <li>支持阴影投射</li>
                      <li>有明确的方向性</li>
                      <li>计算成本中等</li>
                    </ul>
                    <div class="light-properties">
                      <div class="property">
                        <span class="property-name">position</span>
                        <span class="property-desc">光源位置</span>
                      </div>
                      <div class="property">
                        <span class="property-name">target</span>
                        <span class="property-desc">光照目标点</span>
                      </div>
                      <div class="property">
                        <span class="property-name">shadow</span>
                        <span class="property-desc">阴影配置</span>
                      </div>
                    </div>
                  </div>
                  <div class="light-code">
                    <pre><code>// 创建方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.target.position.set(0, 0, 0);

// 启用阴影
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

scene.add(directionalLight);
scene.add(directionalLight.target);</code></pre>
                  </div>
                </div>
              </div>

              <!-- 点光源 -->
              <div class="light-card">
                <div class="light-header">
                  <h3 class="light-name">点光源 (PointLight)</h3>
                  <span class="light-tag standard">标准</span>
                </div>
                <div class="light-content">
                  <div class="light-preview point-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="light-info">
                    <h4>描述</h4>
                    <p>从一个点向所有方向均匀发射光线，模拟灯泡、蜡烛等点状光源</p>
                    <h4>特性</h4>
                    <ul>
                      <li>全向发光</li>
                      <li>支持衰减</li>
                      <li>支持阴影</li>
                      <li>计算成本较高</li>
                    </ul>
                    <div class="light-properties">
                      <div class="property">
                        <span class="property-name">distance</span>
                        <span class="property-desc">光照距离 (0=无限)</span>
                      </div>
                      <div class="property">
                        <span class="property-name">decay</span>
                        <span class="property-desc">衰减系数</span>
                      </div>
                      <div class="property">
                        <span class="property-name">power</span>
                        <span class="property-desc">光功率 (流明)</span>
                      </div>
                    </div>
                  </div>
                  <div class="light-code">
                    <pre><code>// 创建点光源
const pointLight = new THREE.PointLight(0xff4000, 1, 100);
pointLight.position.set(0, 5, 0);

// 配置衰减
pointLight.distance = 50;
pointLight.decay = 2;

// 启用阴影
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

scene.add(pointLight);</code></pre>
                  </div>
                </div>
              </div>

              <!-- 聚光灯 -->
              <div class="light-card">
                <div class="light-header">
                  <h3 class="light-name">聚光灯 (SpotLight)</h3>
                  <span class="light-tag advanced">高级</span>
                </div>
                <div class="light-content">
                  <div class="light-preview spot-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="light-info">
                    <h4>描述</h4>
                    <p>从一点朝特定方向发射锥形光束，模拟手电筒、舞台灯光等</p>
                    <h4>特性</h4>
                    <ul>
                      <li>锥形光束</li>
                      <li>有内外锥角</li>
                      <li>支持衰减和半影</li>
                      <li>计算成本最高</li>
                    </ul>
                    <div class="light-properties">
                      <div class="property">
                        <span class="property-name">angle</span>
                        <span class="property-desc">光束角度 (弧度)</span>
                      </div>
                      <div class="property">
                        <span class="property-name">penumbra</span>
                        <span class="property-desc">半影系数</span>
                      </div>
                      <div class="property">
                        <span class="property-name">target</span>
                        <span class="property-desc">光照目标</span>
                      </div>
                    </div>
                  </div>
                  <div class="light-code">
                    <pre><code>// 创建聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 10, 0);
spotLight.target.position.set(0, 0, 0);

// 配置光束属性
spotLight.angle = Math.PI / 6; // 30度
spotLight.penumbra = 0.1;      // 柔和边缘
spotLight.distance = 50;
spotLight.decay = 2;

// 启用阴影
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

scene.add(spotLight);
scene.add(spotLight.target);</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级光照类型 -->
      <section class="advanced-lights-section">
        <div class="card">
          <h2 class="card-title">高级光照类型</h2>
          <div class="card-content">
            <div class="lights-grid">
              <!-- 半球光 -->
              <div class="light-card">
                <div class="light-header">
                  <h3 class="light-name">半球光 (HemisphereLight)</h3>
                  <span class="light-tag advanced">高级</span>
                </div>
                <div class="light-content">
                  <div class="light-preview hemisphere-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="light-info">
                    <h4>描述</h4>
                    <p>模拟室外环境，天空和地面有不同的颜色，创建更自然的户外光照</p>
                    <h4>特性</h4>
                    <ul>
                      <li>天空和地面双色</li>
                      <li>模拟室外环境</li>
                      <li>不会产生阴影</li>
                      <li>性能开销低</li>
                    </ul>
                    <div class="light-properties">
                      <div class="property">
                        <span class="property-name">skyColor</span>
                        <span class="property-desc">天空颜色</span>
                      </div>
                      <div class="property">
                        <span class="property-name">groundColor</span>
                        <span class="property-desc">地面颜色</span>
                      </div>
                    </div>
                  </div>
                  <div class="light-code">
                    <pre><code>// 创建半球光
const hemisphereLight = new THREE.HemisphereLight(
  0x87CEEB, // 天空颜色 (天蓝色)
  0x8B4513, // 地面颜色 (棕色)
  0.6       // 强度
);

// 或者使用更现代的配置
const outdoorLight = new THREE.HemisphereLight(
  '#87CEEB', // 天空
  '#3D9970', // 地面
  0.8
);

scene.add(hemisphereLight);</code></pre>
                  </div>
                </div>
              </div>

              <!-- 区域光 -->
              <div class="light-card">
                <div class="light-header">
                  <h3 class="light-name">区域光 (RectAreaLight)</h3>
                  <span class="light-tag pbr">PBR</span>
                </div>
                <div class="light-content">
                  <div class="light-preview rectarea-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="light-info">
                    <h4>描述</h4>
                    <p>模拟矩形区域发射的光线，如灯箱、窗户等，提供柔和的面光源效果</p>
                    <h4>特性</h4>
                    <ul>
                      <li>面光源</li>
                      <li>柔和阴影</li>
                      <li>需要PBR材质</li>
                      <li>计算成本高</li>
                    </ul>
                    <div class="light-properties">
                      <div class="property">
                        <span class="property-name">width</span>
                        <span class="property-desc">光源宽度</span>
                      </div>
                      <div class="property">
                        <span class="property-name">height</span>
                        <span class="property-desc">光源高度</span>
                      </div>
                    </div>
                  </div>
                  <div class="light-code">
                    <pre><code>// 创建区域光
const rectAreaLight = new THREE.RectAreaLight(
  0xffffff, // 颜色
  2,        // 强度
  5,        // 宽度
  5         // 高度
);

rectAreaLight.position.set(0, 5, 0);
rectAreaLight.lookAt(0, 0, 0);

// 注意：需要MeshStandardMaterial或MeshPhysicalMaterial
scene.add(rectAreaLight);</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 阴影系统 -->
      <section class="shadows-section">
        <div class="card">
          <h2 class="card-title">阴影系统</h2>
          <div class="card-content">
            <div class="shadows-content">
              <div class="shadow-basics">
                <h3>阴影基础</h3>
                <p>Three.js使用阴影映射技术实现实时阴影，需要配置光源和物体。</p>

                <div class="shadow-config">
                  <h4>阴影配置步骤</h4>
                  <div class="config-steps">
                    <div class="step">
                      <div class="step-number">1</div>
                      <div class="step-content">
                        <h5>启用渲染器阴影</h5>
                        <p>告诉渲染器支持阴影</p>
                        <div class="code-block">
                          <pre><code>renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;</code></pre>
                        </div>
                      </div>
                    </div>
                    <div class="step">
                      <div class="step-number">2</div>
                      <div class="step-content">
                        <h5>配置光源阴影</h5>
                        <p>启用光源投射阴影并配置阴影参数</p>
                        <div class="code-block">
                          <pre><code>light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;</code></pre>
                        </div>
                      </div>
                    </div>
                    <div class="step">
                      <div class="step-number">3</div>
                      <div class="step-content">
                        <h5>配置物体阴影</h5>
                        <p>设置物体投射和接收阴影</p>
                        <div class="code-block">
                          <pre><code>object.castShadow = true;    // 投射阴影
object.receiveShadow = true; // 接收阴影</code></pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="shadow-types">
                <h3>阴影映射类型</h3>
                <div class="shadow-types-grid">
                  <div class="shadow-type">
                    <h4>BasicShadowMap</h4>
                    <p>基础阴影映射，性能最好但质量最低</p>
                    <code>THREE.BasicShadowMap</code>
                  </div>
                  <div class="shadow-type">
                    <h4>PCFShadowMap</h4>
                    <p>百分比渐近滤波，边缘更平滑</p>
                    <code>THREE.PCFShadowMap</code>
                  </div>
                  <div class="shadow-type">
                    <h4>PCFSoftShadowMap</h4>
                    <p>软阴影，视觉效果最好</p>
                    <code>THREE.PCFSoftShadowMap</code>
                  </div>
                  <div class="shadow-type">
                    <h4>VSMShadowMap</h4>
                    <p>方差阴影映射，适合大面积光源</p>
                    <code>THREE.VSMShadowMap</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 光照组合与技巧 -->
      <section class="lighting-techniques-section">
        <div class="card">
          <h2 class="card-title">光照组合与技巧</h2>
          <div class="card-content">
            <div class="techniques-content">
              <div class="technique-examples">
                <h3>常见光照组合</h3>
                <div class="examples-grid">
                  <div class="technique-example">
                    <h4>三点照明法</h4>
                    <p>经典的三点照明设置，适合角色和产品展示</p>
                    <div class="code-block">
                      <pre><code>// 主光 (Key Light)
const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 5);
keyLight.castShadow = true;

// 补光 (Fill Light)
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 3, 2);

// 轮廓光 (Back Light)
const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, 5, -5);

scene.add(keyLight, fillLight, backLight);</code></pre>
                    </div>
                  </div>

                  <div class="technique-example">
                    <h4>室内照明</h4>
                    <p>模拟室内环境的多光源组合</p>
                    <div class="code-block">
                      <pre><code>// 环境光 - 基础照明
const ambient = new THREE.AmbientLight(0x404040, 0.3);

// 顶部主灯
const ceilingLight = new THREE.PointLight(0xffffff, 0.8, 10);
ceilingLight.position.set(0, 4, 0);
ceilingLight.castShadow = true;

// 台灯
const lampLight = new THREE.SpotLight(0xffebb3, 0.6);
lampLight.position.set(3, 2, 3);
lampLight.angle = Math.PI / 4;
lampLight.penumbra = 0.2;

scene.add(ambient, ceilingLight, lampLight);</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div class="performance-tips">
                <h3>性能优化技巧</h3>
                <div class="tips-grid">
                  <div class="tip">
                    <div class="tip-icon">📏</div>
                    <div class="tip-content">
                      <h4>合理使用阴影</h4>
                      <p>只为必要的光源启用阴影，使用合适的阴影贴图分辨率</p>
                    </div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">💡</div>
                    <div class="tip-content">
                      <h4>光源数量控制</h4>
                      <p>限制场景中的动态光源数量，优先使用环境光和方向光</p>
                    </div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">🎯</div>
                    <div class="tip-content">
                      <h4>衰减设置</h4>
                      <p>为点光源和聚光灯设置合理的衰减距离，减少计算范围</p>
                    </div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">⚡</div>
                    <div class="tip-content">
                      <h4>光照贴图</h4>
                      <p>对静态场景使用光照贴图预计算光照，减少实时计算</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 完整示例 -->
      <section class="complete-example-section">
        <div class="card">
          <h2 class="card-title">完整光照示例</h2>
          <div class="card-content">
            <div class="example-content">
              <div class="code-example">
                <h3>完整的场景光照设置</h3>
                <pre><code>import * as THREE from 'three';

class LightingExample {
  constructor() {
    this.scene = new THREE.Scene();
    this.setupLighting();
  }

  setupLighting() {
    // 1. 环境光 - 基础全局照明
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(this.ambientLight);

    // 2. 方向光 - 主光源 (模拟太阳)
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
    this.sunLight.position.set(50, 50, 50);
    this.sunLight.castShadow = true;

    // 阴影配置
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 500;
    this.sunLight.shadow.camera.left = -50;
    this.sunLight.shadow.camera.right = 50;
    this.sunLight.shadow.camera.top = 50;
    this.sunLight.shadow.camera.bottom = -50;

    this.scene.add(this.sunLight);

    // 3. 半球光 - 环境反射
    this.hemisphereLight = new THREE.HemisphereLight(
      0x87CEEB, // 天空颜色
      0x8B4513, // 地面颜色
      0.6       // 强度
    );
    this.scene.add(this.hemisphereLight);

    // 4. 点光源 - 局部照明
    this.pointLight = new THREE.PointLight(0xff4000, 0.8, 100);
    this.pointLight.position.set(10, 5, 10);
    this.pointLight.castShadow = true;
    this.pointLight.shadow.mapSize.width = 1024;
    this.pointLight.shadow.mapSize.height = 1024;
    this.scene.add(this.pointLight);

    // 5. 聚光灯 - 重点照明
    this.spotLight = new THREE.SpotLight(0xffffff, 0.5);
    this.spotLight.position.set(-10, 10, -10);
    this.spotLight.angle = Math.PI / 6;
    this.spotLight.penumbra = 0.1;
    this.spotLight.decay = 2;
    this.spotLight.distance = 100;
    this.spotLight.castShadow = true;
    this.spotLight.target.position.set(0, 0, 0);
    this.scene.add(this.spotLight);
    this.scene.add(this.spotLight.target);
  }

  // 动画更新光照
  updateLighting(time) {
    // 太阳光动画
    this.sunLight.position.x = Math.cos(time) * 50;
    this.sunLight.position.z = Math.sin(time) * 50;

    // 点光源脉冲效果
    this.pointLight.intensity = 0.5 + Math.sin(time * 2) * 0.3;

    // 聚光灯颜色变化
    const hue = (time * 0.1) % 1;
    this.spotLight.color.setHSL(hue, 0.8, 0.8);
  }

  // 调试辅助
  addLightHelpers() {
    // 方向光辅助
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      this.sunLight, 5, 0xff0000
    );
    this.scene.add(directionalLightHelper);

    // 点光源辅助
    const pointLightHelper = new THREE.PointLightHelper(
      this.pointLight, 1, 0x00ff00
    );
    this.scene.add(pointLightHelper);

    // 聚光灯辅助
    const spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
    this.scene.add(spotLightHelper);
  }

  // 配置渲染器
  setupRenderer(renderer) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true; // 物理正确光照
  }
}

// 使用示例
const lightingExample = new LightingExample();

// 在动画循环中更新
function animate(time) {
  lightingExample.updateLighting(time * 0.001);
  // ... 其他动画逻辑
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加响应式数据或方法
</script>

<style lang="less" scoped>
.lighting-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf7 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px 0;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0;
    font-weight: 300;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e9ecef;
  }
}

.overview-content {
  .intro-text {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 24px;
    text-align: center;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.concept-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .concept-icon {
    font-size: 2rem;
    margin-right: 16px;
  }

  .concept-text {
    h4 {
      margin: 0 0 4px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.lights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.light-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.light-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .light-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .light-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.basic {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.standard {
      background: #e8f5e8;
      color: #2e7d32;
    }

    &.advanced {
      background: #fff3e0;
      color: #f57c00;
    }

    &.pbr {
      background: #fce4ec;
      color: #c2185b;
    }
  }
}

.light-content {
  padding: 20px;
}

.light-preview {
  height: 120px;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .preview-object {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

// 不同类型光照的预览样式
.ambient-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .preview-object {
    background:
      radial-gradient(circle at center,
        rgba(255,255,255,0.8) 0%,
        rgba(200,200,200,0.6) 50%,
        rgba(100,100,100,0.4) 100%);
  }
}

.directional-preview {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

  .preview-object {
    background:
      linear-gradient(135deg,
        rgba(255,255,255,0.9) 0%,
        rgba(255,255,255,0.7) 30%,
        rgba(200,200,200,0.5) 70%,
        rgba(100,100,100,0.3) 100%);
    transform: perspective(500px) rotateX(15deg) rotateY(15deg);
  }
}

.point-preview {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

  .preview-object {
    background:
      radial-gradient(circle at center,
        rgba(255,255,255,1) 0%,
        rgba(255,200,100,0.8) 30%,
        rgba(255,100,50,0.6) 60%,
        rgba(100,50,0,0.4) 100%);
    animation: pulse 2s ease-in-out infinite alternate;
  }
}

.spot-preview {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

  .preview-object {
    background:
      conic-gradient(from -45deg at 50% 20%,
        rgba(255,255,255,1) 0deg,
        rgba(255,255,255,0.8) 45deg,
        rgba(200,200,200,0.6) 90deg,
        rgba(100,100,100,0.4) 135deg,
        transparent 180deg);
  }
}

.hemisphere-preview {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);

  .preview-object {
    background:
      linear-gradient(to bottom,
        rgba(135, 206, 235, 0.8) 0%,
        rgba(135, 206, 235, 0.6) 30%,
        rgba(139, 69, 19, 0.6) 70%,
        rgba(139, 69, 19, 0.8) 100%);
  }
}

.rectarea-preview {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

  .preview-object {
    background:
      linear-gradient(45deg,
        rgba(255,255,255,0.9) 25%,
        rgba(255,255,255,0.7) 25%,
        rgba(255,255,255,0.7) 50%,
        rgba(255,255,255,0.5) 50%,
        rgba(255,255,255,0.5) 75%,
        rgba(255,255,255,0.3) 75%);
    background-size: 20px 20px;
    transform: perspective(500px) rotateX(15deg);
  }
}

.light-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  ul {
    margin: 0 0 12px 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
      color: #555;
      font-size: 0.9rem;
    }
  }
}

.light-properties {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 12px;
}

.property {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 4px;

  .property-name {
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    color: #d63384;
    font-weight: 600;
  }

  .property-desc {
    font-size: 0.8rem;
    color: #666;
    text-align: right;
  }
}

.light-code {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.shadows-content {
  .shadow-basics {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    p {
      margin: 0 0 24px 0;
      color: #666;
    }
  }
}

.config-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  align-items: flex-start;

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    font-weight: 600;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    h5 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0 0 12px 0;
      color: #666;
    }
  }
}

.code-block {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.shadow-types {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.shadow-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.shadow-type {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 0.9rem;
  }

  code {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    color: #d63384;
  }
}

.techniques-content {
  .technique-examples {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }
  }
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.technique-example {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.performance-tips {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tip {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .tip-icon {
    font-size: 1.5rem;
    margin-right: 16px;
  }

  .tip-content {
    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.example-content {
  .code-example {
    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }
  }
}

// 动画
@keyframes pulse {
  from {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 100, 50, 0.5);
  }
  to {
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(255, 100, 50, 0.8);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .lighting-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .concept-grid,
  .lights-grid,
  .shadow-types-grid,
  .examples-grid,
  .tips-grid {
    grid-template-columns: 1fr;
  }

  .step {
    flex-direction: column;
    align-items: flex-start;

    .step-number {
      margin-bottom: 12px;
    }
  }
}
</style>
