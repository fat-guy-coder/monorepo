<template>
  <div class="gitlab-cicd-container">
    <header class="header">
      <h1>GitLab CI/CD 配置流程介绍</h1>
      <p>全面掌握现代持续集成与持续部署的配置方法</p>
    </header>

    <div class="content-wrapper">
      <section class="section">
        <h2 class="section-title">什么是 GitLab CI/CD？</h2>
        <div class="section-content">
          <p>
            GitLab CI/CD 是一个内置于 GitLab
            的强大工具，用于实现持续集成（CI）、持续交付（CD）和持续部署（CD）。它允许您在代码更改时自动构建、测试和部署应用程序。
          </p>

          <div class="benefits">
            <div class="benefit-card">
              <div class="benefit-icon ci"></div>
              <h3>持续集成</h3>
              <p>频繁合并代码变更并自动验证</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon cd"></div>
              <h3>持续交付</h3>
              <p>自动化部署到各种环境</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon auto"></div>
              <h3>自动化测试</h3>
              <p>自动运行单元测试、集成测试等</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">核心概念</h2>
        <div class="section-content">
          <div class="concepts">
            <div class="concept">
              <h3>.gitlab-ci.yml</h3>
              <p>YAML 配置文件，定义 CI/CD 流水线</p>
            </div>
            <div class="concept">
              <h3>Runner</h3>
              <p>执行 CI/CD 作业的代理程序</p>
            </div>
            <div class="concept">
              <h3>Pipeline</h3>
              <p>一系列按顺序执行的阶段和作业</p>
            </div>
            <div class="concept">
              <h3>Stage</h3>
              <p>流水线中的逻辑分组（构建、测试、部署等）</p>
            </div>
            <div class="concept">
              <h3>Job</h3>
              <p>流水线中的最小执行单元</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">基础配置流程</h2>
        <div class="section-content">
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div>
                <h3>在项目根目录创建 .gitlab-ci.yml 文件</h3>
                <p>这是 GitLab CI/CD 的核心配置文件</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div>
                <h3>配置 Runner</h3>
                <p>为项目设置 CI/CD 执行环境</p>
                <div class="cli">
                  <code>gitlab-runner register</code>
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div>
                <h3>定义流水线结构</h3>
                <p>配置 stages 和 job 的基本结构</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div>
                <h3>配置各个阶段的作业</h3>
                <p>为每个 stage 编写具体的 job 脚本</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div>
                <h3>设置环境变量</h3>
                <p>在 Settings > CI/CD > Variables 中配置敏感信息</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">6</div>
              <div>
                <h3>推送代码触发流水线</h3>
                <p>提交代码到仓库查看流水线执行情况</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">.gitlab-ci.yml 文件结构介绍</h2>
        <div class="section-content">
          <pre class="code-block"><code># 定义流水线阶段
stages:
  - build
  - test
  - deploy

# 定义全局变量
variables:
  PROJECT_NAME: "my-app"
  DOCKER_IMAGE: "registry.example.com/$PROJECT_NAME:$CI_COMMIT_REF_SLUG"

# 定义缓存策略
cache:
  key: "$CI_COMMIT_REF_SLUG"
  paths:
    - node_modules/
    - vendor/

# 构建阶段
build-job:
  stage: build
  image: node:16
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
    - develop

# 测试阶段
test-unit:
  stage: test
  image: node:16
  script:
    - npm run test:unit

test-integration:
  stage: test
  image: node:16
  script:
    - npm run test:integration
  needs:
    - build-job

# 部署到开发环境
deploy-dev:
  stage: deploy
  image: docker:20
  services:
    - docker:dind
  script:
    - echo "Deploying to development environment"
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
    - kubectl apply -f k8s/dev
  environment:
    name: dev
    url: https://dev.example.com
  only:
    - develop

# 部署到生产环境
deploy-prod:
  stage: deploy
  image: docker:20
  services:
    - docker:dind
  script:
    - echo "Deploying to production environment"
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
    - kubectl apply -f k8s/prod
  environment:
    name: prod
    url: https://example.com
  when: manual
  only:
    - main</code></pre>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">关键配置介绍</h2>
        <div class="section-content">
          <div class="config-details">
            <div class="config-card">
              <h3>Stages</h3>
              <p>定义流水线的执行阶段（顺序执行）</p>
              <pre><code>stages:
  - build
  - test
  - deploy</code></pre>
            </div>
            <div class="config-card">
              <h3>Variables</h3>
              <p>设置全局变量，可在所有作业中使用</p>
              <pre><code>variables:
  APP_NAME: "my-app"
  DEPLOY_ENV: "production"</code></pre>
            </div>
            <div class="config-card">
              <h3>Cache</h3>
              <p>缓存依赖项加速后续作业执行</p>
              <pre><code>cache:
  key: $CI_COMMIT_REF_SLUG
  paths:
    - node_modules/
    - vendor/</code></pre>
            </div>
            <div class="config-card">
              <h3>Artifacts</h3>
              <p>保存作业输出供后续阶段使用</p>
              <pre><code>artifacts:
  paths:
    - dist/
    - reports/
  expire_in: 1 week</code></pre>
            </div>
            <div class="config-card">
              <h3>Environment</h3>
              <p>定义部署环境及其相关属性</p>
              <pre><code>environment:
  name: production
  url: https://example.com</code></pre>
            </div>
            <div class="config-card">
              <h3>Rules</h3>
              <p>条件控制作业执行时机</p>
              <pre><code>rules:
  - if: '$CI_COMMIT_BRANCH == "main"'
    when: manual
  - if: '$CI_COMMIT_BRANCH == "develop"'
    when: always</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">高级配置技巧</h2>
        <div class="section-content">
          <div class="advanced-tips">
            <div class="tip">
              <div class="tip-icon include"></div>
              <div>
                <h3>使用 include 复用配置</h3>
                <pre><code>include:
  - local: '/templates/.gitlab-ci-test.yml'
  - project: 'my-group/my-project'
    file: '/templates/.gitlab-ci-build.yml'</code></pre>
              </div>
            </div>
            <div class="tip">
              <div class="tip-icon template"></div>
              <div>
                <h3>作业模板与继承</h3>
                <pre><code>.docker-build:
  script:
    - docker build -t $IMAGE_TAG .
    - docker push $IMAGE_TAG

build-app:
  extends: .docker-build
  variables:
    IMAGE_TAG: $CI_REGISTRY_IMAGE/app</code></pre>
              </div>
            </div>
            <div class="tip">
              <div class="tip-icon parallel"></div>
              <div>
                <h3>并行矩阵测试</h3>
                <pre><code>test:
  stage: test
  script: ./run-tests.sh
  parallel:
    matrix:
      - PROVIDER: aws
        STACK: [mono, distributed]
      - PROVIDER: gcp
        STACK: [mono]</code></pre>
              </div>
            </div>
            <div class="tip">
              <div class="tip-icon child"></div>
              <div>
                <h3>父子流水线</h3>
                <pre><code>microservice_a:
  trigger:
    include: microservice_a/.gitlab-ci.yml
    strategy: depend

microservice_b:
  trigger:
    include: microservice_b/.gitlab-ci.yml
    strategy: depend</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">部署策略</h2>
        <div class="section-content">
          <div class="deployment-strategies">
            <div class="strategy">
              <h3>蓝绿部署</h3>
              <div class="strategy-diagram">
                <div class="blue">生产环境 (v1)</div>
                <div class="arrow"></div>
                <div class="green">生产环境 (v2)</div>
                <div class="switch">切换流量</div>
              </div>
              <p>同时运行新旧版本，逐步切换流量</p>
            </div>
            <div class="strategy">
              <h3>金丝雀发布</h3>
              <div class="strategy-diagram">
                <div class="prod">生产环境 (v1)</div>
                <div class="canary">金丝雀 (v2)</div>
                <div class="traffic">
                  <div class="v1-traffic">95%</div>
                  <div class="v2-traffic">5%</div>
                </div>
              </div>
              <p>向一小部分用户发布新版本进行测试</p>
            </div>
            <div class="strategy">
              <h3>滚动更新</h3>
              <div class="strategy-diagram">
                <div class="instances">
                  <div class="instance v1">v1</div>
                  <div class="instance v1">v1</div>
                  <div class="instance v1">v1</div>
                </div>
                <div class="arrow"></div>
                <div class="instances">
                  <div class="instance v2">v2</div>
                  <div class="instance v1">v1</div>
                  <div class="instance v1">v1</div>
                </div>
                <div class="arrow"></div>
                <div class="instances">
                  <div class="instance v2">v2</div>
                  <div class="instance v2">v2</div>
                  <div class="instance v1">v1</div>
                </div>
              </div>
              <p>逐步替换实例，实现零停机部署</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">最佳实践</h2>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice">
              <div class="practice-icon small"></div>
              <h3>小而快的作业</h3>
              <p>每个作业只做一件事并快速完成</p>
            </div>
            <div class="practice">
              <div class="practice-icon cache"></div>
              <h3>合理使用缓存</h3>
              <p>缓存依赖项但避免过度缓存</p>
            </div>
            <div class="practice">
              <div class="practice-icon artifact"></div>
              <h3>有效使用制品</h3>
              <p>仅传递必要的文件到后续阶段</p>
            </div>
            <div class="practice">
              <div class="practice-icon env"></div>
              <h3>环境变量管理</h3>
              <p>敏感信息存储在 CI/CD 变量中</p>
            </div>
            <div class="practice">
              <div class="practice-icon docker"></div>
              <h3>使用 Docker 镜像</h3>
              <p>创建自定义镜像加速作业执行</p>
            </div>
            <div class="practice">
              <div class="practice-icon notification"></div>
              <h3>设置通知</h3>
              <p>配置失败流水线的通知机制</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">调试与优化</h2>
        <div class="section-content">
          <div class="debugging-tips">
            <div class="tip">
              <h3>本地调试</h3>
              <p>使用 GitLab Runner 在本地执行作业：</p>
              <div class="cli">
                <code>gitlab-runner exec docker build-job</code>
              </div>
            </div>
            <div class="tip">
              <h3>流水线可视化</h3>
              <p>通过 GitLab UI 查看流水线执行图，识别瓶颈</p>
            </div>
            <div class="tip">
              <h3>缓存优化</h3>
              <p>使用不同的缓存键策略提高缓存命中率</p>
              <pre><code>cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>通过合理配置 GitLab CI/CD，您可以显著提升团队开发效率，实现自动化构建、测试和部署。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要太多逻辑，主要是展示信息
</script>

<style lang="less" scoped>
@primary-color: #e24329;
@secondary-color: #6c4f3d;
@background-color: #fcfcfc;
@border-color: #e9ecef;
@text-color: #2d333b;
@light-text: #6e7781;
@code-bg: #f8f9fa;
@success-color: #3fb950;
@warning-color: #d4a72c;
@danger-color: #cf222e;
@info-color: #1a7f37;

.gitlab-cicd-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: @text-color;
  background-color: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}

.header {
  text-align: center;
  padding: 35px 0;
  border-bottom: 1px solid @border-color;
  margin-bottom: 30px;
  background: linear-gradient(to right, #fcf4f2, #f5fcfa);

  h1 {
    color: @primary-color;
    margin: 0;
    font-size: 2.4rem;
    letter-spacing: -0.5px;
  }

  p {
    color: @light-text;
    font-size: 1.2rem;
    margin-top: 12px;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.section {
  background: @background-color;
  border-radius: 10px;
  padding: 28px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.02);
  border: 1px solid @border-color;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
    transform: translateY(-3px);
  }
}

.section-title {
  color: @primary-color;
  border-bottom: 2px solid lighten(@primary-color, 30%);
  padding-bottom: 14px;
  margin-top: 0;
  margin-bottom: 22px;
  font-size: 1.6rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 3px;
    background: @primary-color;
    border-radius: 3px;
  }
}

.section-content {
  line-height: 1.65;
  color: @text-color;

  p {
    margin: 15px 0;
    color: @light-text;
  }
}

.benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.benefit-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  .benefit-icon {
    width: 70px;
    height: 70px;
    margin: 0 auto 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.ci {
      background: linear-gradient(135deg, #ffdfdb, #ffcbc4);
    }
    &.cd {
      background: linear-gradient(135deg, #d3f3e0, #b6e8cf);
    }
    &.auto {
      background: linear-gradient(135deg, #d6e7ff, #c0d8ff);
    }

    &::before {
      content: '';
      width: 35px;
      height: 35px;
      background: currentColor;
      border-radius: 8px;
    }
  }

  h3 {
    margin: 0 0 10px 0;
    color: @text-color;
    font-size: 1.2rem;
  }
}

.concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.concept {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid @border-color;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: @primary-color;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
  }

  h3 {
    margin: 0 0 10px 0;
    color: @primary-color;
  }

  p {
    margin: 0;
    font-size: 0.92rem;
    color: @light-text;
  }
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.step {
  display: flex;
  gap: 15px;
  padding: 22px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border-left: 4px solid @primary-color;

  .step-number {
    width: 36px;
    height: 36px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1rem;
    flex-shrink: 0;
    margin-top: 3px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: @text-color;
    font-size: 1.15rem;
  }

  p {
    margin: 0 0 10px 0;
    color: @light-text;
  }
}

.cli {
  background: #2d333b;
  color: #f0f6fc;
  border-radius: 6px;
  padding: 10px 15px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  margin-top: 10px;
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid @border-color;
  margin: 15px 0;

  pre {
    margin: 0;
    padding: 22px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.92rem;
      line-height: 1.5;
      color: #2d333b;
    }
  }
}

.config-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.config-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid @border-color;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.03);

  h3 {
    margin: 0 0 15px 0;
    color: @primary-color;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: @light-text;
    font-size: 0.95rem;
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 12px;
    overflow-x: auto;
    margin: 0;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.85rem;
    }
  }
}

.advanced-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.tip {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 15px;
  align-items: flex-start;

  .tip-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 5px;

    &.include {
      background: linear-gradient(135deg, #ffedea, #ffd5ce);
    }
    &.template {
      background: linear-gradient(135deg, #e0f7ff, #c0edff);
    }
    &.parallel {
      background: linear-gradient(135deg, #fff8e6, #ffefcc);
    }
    &.child {
      background: linear-gradient(135deg, #e6f7e6, #d0f0d0);
    }

    &::before {
      content: '';
      width: 25px;
      height: 25px;
      background: currentColor;
      border-radius: 5px;
    }
  }

  h3 {
    margin: 0 0 12px 0;
    color: @text-color;
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 12px;
    overflow-x: auto;
    margin: 0;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.85rem;
    }
  }
}

.deployment-strategies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.strategy {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);

  h3 {
    color: @primary-color;
    margin-top: 0;
    text-align: center;
  }

  p {
    text-align: center;
    margin-bottom: 0;
  }
}

.strategy-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;

  .instances {
    display: flex;
    gap: 5px;
  }

  .instance {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;

    &.v1 {
      background: #4285f4;
    }
    &.v2 {
      background: #34a853;
    }
  }

  .blue,
  .green {
    padding: 15px;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    width: 120px;
    text-align: center;
  }

  .blue {
    background: #4285f4;
  }
  .green {
    background: #34a853;
  }

  .prod {
    padding: 15px;
    border-radius: 8px;
    background: #4285f4;
    color: white;
    font-weight: bold;
    width: 150px;
    text-align: center;
  }

  .canary {
    padding: 15px;
    border-radius: 8px;
    background: #34a853;
    color: white;
    font-weight: bold;
    width: 150px;
    text-align: center;
  }

  .traffic {
    display: flex;
    width: 100%;
    height: 30px;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 10px;
  }

  .v1-traffic {
    background: #4285f4;
    height: 100%;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }

  .v2-traffic {
    background: #34a853;
    height: 100%;
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }

  .arrow {
    width: 30px;
    height: 3px;
    background: #ccc;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      right: -6px;
      top: -4px;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid #ccc;
    }

    &::after {
      right: auto;
      left: -6px;
      border-left: none;
      border-right: 8px solid #ccc;
    }
  }

  .switch {
    background: #fbbc05;
    padding: 10px;
    border-radius: 6px;
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
    color: white;
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.practice {
  text-align: center;
  padding: 20px 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  .practice-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.small {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    }
    &.cache {
      background: linear-gradient(135deg, #fff8e1, #ffecb3);
    }
    &.artifact {
      background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    }
    &.env {
      background: linear-gradient(135deg, #f3e5f5, #e1bee7);
    }
    &.docker {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    }
    &.notification {
      background: linear-gradient(135deg, #ffecb3, #ffe082);
    }

    &::before {
      content: '';
      width: 30px;
      height: 30px;
      background: currentColor;
      border-radius: 6px;
    }
  }

  h3 {
    margin: 0 0 10px 0;
    color: @text-color;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @light-text;
  }
}

.debugging-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .tip {
    background: white;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @primary-color;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    pre {
      background: @code-bg;
      border-radius: 6px;
      padding: 12px;
      overflow-x: auto;
      margin: 15px 0 0 0;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.85rem;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0 15px;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1.1rem;
}
</style>
