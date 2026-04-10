<template>
  <div class="scene-container">
    <header class="page-header">
      <h1 class="title">Three.js 场景系统</h1>
      <p class="subtitle">构建3D世界的核心容器</p>
    </header>

    <main class="content">
      <!-- 概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">场景概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                场景(Scene)是Three.js中所有3D对象的容器，它定义了3D世界的空间结构、环境设置和渲染上下文。
              </p>
              <div class="scene-basics">
                <h3>场景核心概念</h3>
                <div class="concept-grid">
                  <div class="concept-item">
                    <div class="concept-icon">🌍</div>
                    <div class="concept-text">
                      <h4>3D空间容器</h4>
                      <p>容纳所有3D对象、光源和相机的虚拟空间</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">🎭</div>
                    <div class="concept-text">
                      <h4>场景图结构</h4>
                      <p>树状层级结构管理对象关系和变换</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">💡</div>
                    <div class="concept-text">
                      <h4>环境设置</h4>
                      <p>定义背景、雾效、环境光照等全局设置</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">⚡</div>
                    <div class="concept-text">
                      <h4>渲染上下文</h4>
                      <p>为渲染器提供完整的3D世界描述</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础场景 -->
      <section class="basic-scene-section">
        <div class="card">
          <h2 class="card-title">基础场景创建</h2>
          <div class="card-content">
            <div class="creation-steps">
              <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>创建场景实例</h4>
                  <p>初始化一个空的3D场景</p>
                  <div class="code-block">
                    <pre><code>import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();</code></pre>
                  </div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>设置场景属性</h4>
                  <p>配置背景、雾效等场景属性</p>
                  <div class="code-block">
                    <pre><code>// 设置背景颜色
scene.background = new THREE.Color(0x87CEEB);

// 或者设置背景贴图
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load('skybox.jpg');</code></pre>
                  </div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>添加3D对象</h4>
                  <p>将几何体、光源等对象添加到场景中</p>
                  <div class="code-block">
                    <pre><code>// 添加立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);</code></pre>
                  </div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>渲染场景</h4>
                  <p>使用渲染器将场景渲染到画布</p>
                  <div class="code-block">
                    <pre><code>// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 渲染场景
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 场景属性 -->
      <section class="properties-section">
        <div class="card">
          <h2 class="card-title">场景核心属性</h2>
          <div class="card-content">
            <div class="properties-grid">
              <div class="property-group">
                <h3>背景设置</h3>
                <div class="property-list">
                  <div class="property-item">
                    <div class="property-header">
                      <span class="property-name">background</span>
                      <span class="property-type">Color | Texture | null</span>
                    </div>
                    <p class="property-desc">设置场景背景，可以是纯色、纹理或立方体贴图</p>
                    <div class="property-examples">
                      <h5>示例：</h5>
                      <div class="code-block">
                        <pre><code>// 纯色背景
scene.background = new THREE.Color(0x87CEEB);

// 纹理背景
scene.background = textureLoader.load('sky.jpg');

// 立方体贴图背景
scene.background = new THREE.CubeTextureLoader()
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="property-group">
                <h3>环境设置</h3>
                <div class="property-list">
                  <div class="property-item">
                    <div class="property-header">
                      <span class="property-name">environment</span>
                      <span class="property-type">Texture | null</span>
                    </div>
                    <p class="property-desc">设置场景环境贴图，影响所有PBR材质的反射</p>
                    <div class="property-examples">
                      <h5>示例：</h5>
                      <div class="code-block">
                        <pre><code>// 设置环境贴图
const envMap = new THREE.TextureLoader().load('environment.hdr');
envMap.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = envMap;</code></pre>
                      </div>
                    </div>
                  </div>
                  <div class="property-item">
                    <div class="property-header">
                      <span class="property-name">fog</span>
                      <span class="property-type">Fog | FogExp2 | null</span>
                    </div>
                    <p class="property-desc">设置场景雾效，创建深度感和大气效果</p>
                    <div class="property-examples">
                      <h5>示例：</h5>
                      <div class="code-block">
                        <pre><code>// 线性雾效
scene.fog = new THREE.Fog(0xcccccc, 10, 50);

// 指数雾效
scene.fog = new THREE.FogExp2(0xcccccc, 0.1);</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="property-group">
                <h3>高级属性</h3>
                <div class="property-list">
                  <div class="property-item">
                    <div class="property-header">
                      <span class="property-name">overrideMaterial</span>
                      <span class="property-type">Material | null</span>
                    </div>
                    <p class="property-desc">强制场景中所有物体使用相同材质，用于特殊效果</p>
                    <div class="property-examples">
                      <h5>示例：</h5>
                      <div class="code-block">
                        <pre><code>// 所有物体使用线框材质
scene.overrideMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0xffffff
});</code></pre>
                      </div>
                    </div>
                  </div>
                  <div class="property-item">
                    <div class="property-header">
                      <span class="property-name">autoUpdate</span>
                      <span class="property-type">boolean</span>
                    </div>
                    <p class="property-desc">自动更新场景矩阵和层级结构，通常保持为true</p>
                    <div class="property-examples">
                      <h5>示例：</h5>
                      <div class="code-block">
                        <pre><code>// 手动控制场景更新（高级用法）
scene.autoUpdate = false;
// 需要时手动更新
scene.updateMatrixWorld(true);</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 场景图结构 -->
      <section class="scene-graph-section">
        <div class="card">
          <h2 class="card-title">场景图结构</h2>
          <div class="card-content">
            <div class="graph-explanation">
              <p>Three.js使用场景图(Scene Graph)来管理3D对象的层级关系，这是一个树状结构：</p>

              <div class="graph-visualization">
                <div class="graph-node main-node">
                  <div class="node-content">
                    <span class="node-icon">🌍</span>
                    <span class="node-label">Scene</span>
                  </div>
                  <div class="node-children">
                    <div class="graph-node child-node">
                      <div class="node-content">
                        <span class="node-icon">📦</span>
                        <span class="node-label">Group</span>
                      </div>
                      <div class="node-children">
                        <div class="graph-node leaf-node">
                          <div class="node-content">
                            <span class="node-icon">◻️</span>
                            <span class="node-label">Mesh</span>
                          </div>
                        </div>
                        <div class="graph-node leaf-node">
                          <div class="node-content">
                            <span class="node-icon">💡</span>
                            <span class="node-label">Light</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="graph-node child-node">
                      <div class="node-content">
                        <span class="node-icon">📷</span>
                        <span class="node-label">Camera</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="graph-code">
                <h3>场景图操作代码</h3>
                <div class="code-block">
                  <pre><code>// 创建场景图结构
const scene = new THREE.Scene();

// 创建组
const group = new THREE.Group();
group.name = 'mainGroup';

// 添加网格到组
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.name = 'greenCube';
group.add(cube);

// 添加光源到组
const light = new THREE.PointLight(0xffffff, 1, 100);
light.name = 'pointLight';
group.add(light);

// 将组添加到场景
scene.add(group);

// 添加相机到场景
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.name = 'mainCamera';
scene.add(camera);

// 遍历场景图
scene.traverse((object) => {
  console.log(object.name, object.type);
});

// 查找特定对象
const foundCube = scene.getObjectByName('greenCube');</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 场景管理 -->
      <section class="management-section">
        <div class="card">
          <h2 class="card-title">场景管理与操作</h2>
          <div class="card-content">
            <div class="management-grid">
              <div class="management-item">
                <h3>对象操作</h3>
                <div class="management-content">
                  <div class="code-block">
                    <pre><code>// 添加对象
scene.add(mesh);
scene.add(light);
scene.add(camera);

// 移除对象
scene.remove(mesh);

// 检查对象是否存在
scene.has(mesh); // true/false

// 清空场景
scene.clear();

// 获取子对象数量
scene.children.length;</code></pre>
                  </div>
                </div>
              </div>

              <div class="management-item">
                <h3>遍历与查找</h3>
                <div class="management-content">
                  <div class="code-block">
                    <pre><code>// 遍历所有对象
scene.traverse((object) => {
  console.log(object.name);
});

// 遍历可见对象
scene.traverseVisible((object) => {
  if (object.isMesh) {
    object.material.color.set(0xff0000);
  }
});

// 按名称查找
const camera = scene.getObjectByName('mainCamera');

// 按类型查找
const lights = [];
scene.traverse((object) => {
  if (object.isLight) {
    lights.push(object);
  }
});

// 按属性查找
const redObjects = [];
scene.traverse((object) => {
  if (object.material && object.material.color.getHex() === 0xff0000) {
    redObjects.push(object);
  }
});</code></pre>
                  </div>
                </div>
              </div>

              <div class="management-item">
                <h3>场景序列化</h3>
                <div class="management-content">
                  <div class="code-block">
                    <pre><code>// 转换为JSON
const sceneData = scene.toJSON();

// 从JSON恢复场景
const loader = new THREE.ObjectLoader();
const newScene = loader.parse(sceneData);

// 克隆场景
const clonedScene = scene.clone();

// 复制场景
const copiedScene = new THREE.Scene();
THREE.Object3D.prototype.copy.call(copiedScene, scene, true);</code></pre>
                  </div>
                </div>
              </div>

              <div class="management-item">
                <h3>性能优化</h3>
                <div class="management-content">
                  <div class="code-block">
                    <pre><code>// 禁用自动更新（高级用法）
scene.autoUpdate = false;

// 手动更新
function updateScene() {
  scene.updateMatrixWorld(true);
}

// 按需更新对象
const objectsToUpdate = [];
scene.traverse((object) => {
  if (object.userData.needsUpdate) {
    objectsToUpdate.push(object);
  }
});

// 批量处理
objectsToUpdate.forEach(obj => obj.updateMatrix());</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级场景技术 -->
      <section class="advanced-section">
        <div class="card">
          <h2 class="card-title">高级场景技术</h2>
          <div class="card-content">
            <div class="advanced-grid">
              <div class="advanced-item">
                <h3>多场景管理</h3>
                <div class="advanced-content">
                  <p>在单个应用中管理多个场景，用于UI切换、关卡系统等</p>
                  <div class="code-block">
                    <pre><code>class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.currentScene = null;
  }

  addScene(name, scene) {
    this.scenes.set(name, scene);
  }

  switchToScene(name) {
    if (this.scenes.has(name)) {
      this.currentScene = this.scenes.get(name);
    }
  }

  getCurrentScene() {
    return this.currentScene;
  }

  render(renderer, camera) {
    if (this.currentScene) {
      renderer.render(this.currentScene, camera);
    }
  }
}

// 使用示例
const sceneManager = new SceneManager();
const mainScene = new THREE.Scene();
const uiScene = new THREE.Scene();

sceneManager.addScene('main', mainScene);
sceneManager.addScene('ui', uiScene);
sceneManager.switchToScene('main');</code></pre>
                  </div>
                </div>
              </div>

              <div class="advanced-item">
                <h3>场景分层渲染</h3>
                <div class="advanced-content">
                  <p>将场景分为不同层级分别渲染，用于后期处理、UI叠加等</p>
                  <div class="code-block">
                    <pre><code>// 创建多个渲染目标
const mainRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const uiRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

// 分层渲染
function renderLayers() {
  // 渲染主场景
  renderer.setRenderTarget(mainRenderTarget);
  renderer.render(mainScene, mainCamera);

  // 渲染UI场景
  renderer.setRenderTarget(uiRenderTarget);
  renderer.render(uiScene, uiCamera);

  // 回到默认帧缓冲区
  renderer.setRenderTarget(null);

  // 合成最终图像（伪代码）
  // composeLayers(mainRenderTarget.texture, uiRenderTarget.texture);
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="advanced-item">
                <h3>动态场景加载</h3>
                <div class="advanced-content">
                  <p>动态加载和卸载场景内容，优化内存使用</p>
                  <div class="code-block">
                    <pre><code>class DynamicScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.loadedSections = new Map();
  }

  async loadSection(sectionId, url) {
    if (this.loadedSections.has(sectionId)) {
      return; // 已经加载
    }

    const loader = new THREE.ObjectLoader();
    try {
      const sceneData = await fetch(url).then(r => r.json());
      const section = loader.parse(sceneData);
      this.scene.add(section);
      this.loadedSections.set(sectionId, section);
    } catch (error) {
      console.error(`Failed to load section ${sectionId}:`, error);
    }
  }

  unloadSection(sectionId) {
    if (this.loadedSections.has(sectionId)) {
      const section = this.loadedSections.get(sectionId);
      this.scene.remove(section);
      // 释放资源
      section.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.loadedSections.delete(sectionId);
    }
  }
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="advanced-item">
                <h3>场景状态管理</h3>
                <div class="advanced-content">
                  <p>保存和恢复场景状态，实现撤销/重做功能</p>
                  <div class="code-block">
                    <pre><code>class SceneStateManager {
  constructor(scene) {
    this.scene = scene;
    this.history = [];
    this.currentStateIndex = -1;
  }

  saveState() {
    const state = this.serializeScene();
    // 移除当前状态之后的所有状态（如果有重做后新建操作）
    this.history = this.history.slice(0, this.currentStateIndex + 1);
    this.history.push(state);
    this.currentStateIndex++;

    // 限制历史记录长度
    if (this.history.length > 50) {
      this.history.shift();
      this.currentStateIndex--;
    }
  }

  serializeScene() {
    const state = {
      children: []
    };

    this.scene.children.forEach(child => {
      state.children.push(this.serializeObject(child));
    });

    return state;
  }

  serializeObject(object) {
    return {
      uuid: object.uuid,
      type: object.type,
      name: object.name,
      position: object.position.toArray(),
      rotation: object.rotation.toArray(),
      scale: object.scale.toArray(),
      userData: JSON.parse(JSON.stringify(object.userData)),
      children: object.children.map(child => this.serializeObject(child))
    };
  }

  undo() {
    if (this.currentStateIndex > 0) {
      this.currentStateIndex--;
      this.restoreState(this.history[this.currentStateIndex]);
    }
  }

  redo() {
    if (this.currentStateIndex < this.history.length - 1) {
      this.currentStateIndex++;
      this.restoreState(this.history[this.currentStateIndex]);
    }
  }

  restoreState(state) {
    this.scene.clear();

    state.children.forEach(childData => {
      const child = this.deserializeObject(childData);
      this.scene.add(child);
    });
  }

  deserializeObject(data) {
    let object;

    switch (data.type) {
      case 'Mesh':
        const geometry = new THREE.BoxGeometry(1, 1, 1); // 简化示例
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        object = new THREE.Mesh(geometry, material);
        break;
      // 处理其他类型...
      default:
        object = new THREE.Object3D();
    }

    object.uuid = data.uuid;
    object.name = data.name;
    object.position.fromArray(data.position);
    object.rotation.fromArray(data.rotation);
    object.scale.fromArray(data.scale);
    object.userData = data.userData;

    data.children.forEach(childData => {
      const child = this.deserializeObject(childData);
      object.add(child);
    });

    return object;
  }
}</code></pre>
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
          <h2 class="card-title">完整场景示例</h2>
          <div class="card-content">
            <div class="example-content">
              <div class="code-example">
                <h3>完整的3D场景搭建</h3>
                <pre><code>import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class CompleteSceneExample {
  constructor() {
    this.init();
    this.createScene();
    this.addObjects();
    this.setupControls();
    this.animate();
  }

  init() {
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);
  }

  createScene() {
    // 创建主场景
    this.scene = new THREE.Scene();

    // 设置场景背景
    this.scene.background = new THREE.Color(0x87CEEB);

    // 设置环境贴图
    const envTexture = new THREE.TextureLoader().load('environment.jpg');
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.environment = envTexture;

    // 添加雾效
    this.scene.fog = new THREE.Fog(0x87CEEB, 10, 50);
  }

  addObjects() {
    // 创建地面
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x7CFC00,
      roughness: 0.8,
      metalness: 0.2
    });
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    // 创建立方体组
    this.cubeGroup = new THREE.Group();
    this.cubeGroup.name = 'cubeGroup';

    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        0.5,
        (Math.random() - 0.5) * 10
      );
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.name = `cube_${i}`;
      this.cubeGroup.add(cube);
    }

    this.scene.add(this.cubeGroup);

    // 添加光源
    this.setupLighting();
  }

  setupLighting() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    // 方向光
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(10, 10, 5);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(this.directionalLight);

    // 点光源
    this.pointLight = new THREE.PointLight(0xff4000, 1, 100);
    this.pointLight.position.set(0, 3, 0);
    this.pointLight.castShadow = true;
    this.scene.add(this.pointLight);
  }

  setupControls() {
    // 轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // 窗口大小调整
    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // 更新控制器
    this.controls.update();

    // 动画效果
    const time = Date.now() * 0.001;

    // 旋转立方体组
    this.cubeGroup.rotation.y = time * 0.5;

    // 点光源动画
    this.pointLight.position.x = Math.sin(time) * 3;
    this.pointLight.position.z = Math.cos(time) * 3;

    // 渲染场景
    this.renderer.render(this.scene, this.camera);
  }

  // 场景管理方法
  addNewCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      (Math.random() - 0.5) * 8,
      0.5,
      (Math.random() - 0.5) * 8
    );
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.name = `cube_${Date.now()}`;
    this.cubeGroup.add(cube);
  }

  removeAllCubes() {
    const cubes = [];
    this.cubeGroup.traverse((child) => {
      if (child.isMesh && child.name.startsWith('cube_')) {
        cubes.push(child);
      }
    });

    cubes.forEach(cube => this.cubeGroup.remove(cube));
  }

  exportScene() {
    return this.scene.toJSON();
  }
}

// 初始化场景
const sceneExample = new CompleteSceneExample();</code></pre>
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
.scene-container {
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

.creation-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;

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

    h4 {
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

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.property-group {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
    padding-bottom: 8px;
    border-bottom: 2px solid #e9ecef;
  }
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.property-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  .property-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .property-name {
      font-family: 'Monaco', 'Consolas', monospace;
      font-weight: 600;
      color: #2c3e50;
    }

    .property-type {
      font-size: 0.8rem;
      color: #666;
      background: #e9ecef;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }

  .property-desc {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
  }

  .property-examples {
    h5 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 0.9rem;
    }
  }
}

.graph-explanation {
  p {
    margin: 0 0 24px 0;
    color: #666;
    text-align: center;
  }
}

.graph-visualization {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.graph-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &.main-node {
    .node-content {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 16px 24px;
    }
  }

  &.child-node {
    margin-top: 40px;

    .node-content {
      background: #4CAF50;
      color: white;
      padding: 12px 20px;
    }

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 50%;
      width: 2px;
      height: 20px;
      background: #ccc;
      transform: translateX(-50%);
    }
  }

  &.leaf-node {
    margin-top: 20px;

    .node-content {
      background: #2196F3;
      color: white;
      padding: 8px 16px;
    }

    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      width: 2px;
      height: 10px;
      background: #ccc;
      transform: translateX(-50%);
    }
  }
}

.node-content {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .node-icon {
    font-size: 1.2rem;
  }

  .node-label {
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.node-children {
  display: flex;
  gap: 40px;
  margin-top: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    width: calc(100% - 80px);
    height: 2px;
    background: #ccc;
    transform: translateX(-50%);
  }
}

.graph-code {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.management-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h3 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .management-content {
    .code-block {
      background: #2d3748;
    }
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.advanced-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h3 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .advanced-content {
    p {
      margin: 0 0 12px 0;
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

// 响应式设计
@media (max-width: 768px) {
  .scene-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .concept-grid,
  .properties-grid,
  .management-grid,
  .advanced-grid {
    grid-template-columns: 1fr;
  }

  .step-item {
    flex-direction: column;
    align-items: flex-start;

    .step-number {
      margin-bottom: 12px;
    }
  }

  .node-children {
    flex-direction: column;
    gap: 20px;

    &::before {
      width: 2px;
      height: calc(100% - 40px);
      top: -20px;
      left: 50%;
    }
  }
}
</style>
