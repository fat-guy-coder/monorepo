<template>
  <div class="jenkins-container">
    <header class="header">
      <h1>Jenkins 持续集成与交付解决方案</h1>
      <p>全面掌握 Jenkins 配置与管理的最佳实践</p>
    </header>

    <div class="content-wrapper">
      <section class="section">
        <h2 class="section-title">什么是 Jenkins？</h2>
        <div class="section-content">
          <div class="intro">
            <div class="intro-text">
              <p>
                Jenkins
                是一个开源的自动化服务器，用于实现持续集成（CI）和持续交付（CD）。它通过自动化构建、测试和部署流程，帮助开发团队提高效率。
              </p>
              <p>
                Jenkins 拥有强大的插件生态系统，支持几乎所有开发、测试和部署工具，是目前最流行的
                CI/CD 解决方案之一。
              </p>
            </div>
            <div class="intro-image">
              <div class="jenkins-architecture">
                <div class="source">源代码库</div>
                <div class="arrow">→</div>
                <div class="jenkins">Jenkins</div>
                <div class="arrow">→</div>
                <div class="stages">
                  <div>构建</div>
                  <div>测试</div>
                  <div>部署</div>
                </div>
                <div class="arrow">→</div>
                <div class="target">生产环境</div>
              </div>
            </div>
          </div>

          <div class="features">
            <div class="feature-card">
              <div class="feature-icon open-source"></div>
              <h3>开源免费</h3>
              <p>完全免费使用，社区支持强大</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon plugins"></div>
              <h3>插件丰富</h3>
              <p>1800+插件支持各种工具集成</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon pipeline"></div>
              <h3>流水线支持</h3>
              <p>强大的Pipeline as Code功能</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon distributed"></div>
              <h3>分布式构建</h3>
              <p>支持跨多台机器分发构建任务</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Jenkins 安装与初始配置</h2>
        <div class="section-content">
          <div class="installation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div>
                <h3>安装 Jenkins</h3>
                <p>根据操作系统选择安装方式：</p>
                <div class="code-block">
                  <pre><code># Ubuntu/Debian
sudo apt update
sudo apt install openjdk-11-jdk
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins

# CentOS/RHEL
sudo yum install java-11-openjdk-devel
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum install jenkins</code></pre>
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div>
                <h3>启动 Jenkins 服务</h3>
                <div class="code-block">
                  <pre><code># 启动服务
sudo systemctl start jenkins

# 设置开机启动
sudo systemctl enable jenkins

# 检查状态
sudo systemctl status jenkins</code></pre>
                </div>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div>
                <h3>完成初始设置</h3>
                <ol>
                  <li>访问 http://localhost:8080</li>
                  <li>从 /var/lib/jenkins/secrets/initialAdminPassword 获取管理员密码</li>
                  <li>选择安装推荐的插件</li>
                  <li>创建管理员账户</li>
                  <li>配置实例 URL</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">创建第一个 Jenkins Job</h2>
        <div class="section-content">
          <div class="job-creation">
            <div class="job-step">
              <h3>1. 新建Item</h3>
              <p>在 Jenkins 首页点击 "新建Item"</p>
            </div>
            <div class="job-step">
              <h3>2. 选择Job类型</h3>
              <div class="job-types">
                <div class="type">自由风格项目</div>
                <div class="type active">流水线</div>
                <div class="type">多配置项目</div>
                <div class="type">文件夹</div>
              </div>
            </div>
            <div class="job-step">
              <h3>3. 配置源代码管理</h3>
              <div class="source-control">
                <div class="scm-option git">
                  <div class="icon"></div>
                  <h4>Git</h4>
                  <pre><code>Repository URL: https://github.com/user/repo.git
Credentials: Add Jenkins credentials
Branches: */main</code></pre>
                </div>
                <div class="scm-option svn">
                  <div class="icon"></div>
                  <h4>Subversion</h4>
                </div>
              </div>
            </div>
            <div class="job-step">
              <h3>4. 配置构建触发器</h3>
              <div class="triggers">
                <div class="trigger">
                  <input type="checkbox" checked />
                  <label>GitHub hook trigger for GITScm polling</label>
                </div>
                <div class="trigger">
                  <input type="checkbox" />
                  <label>Poll SCM</label>
                  <div class="schedule">H/5 * * * *</div>
                </div>
                <div class="trigger">
                  <input type="checkbox" />
                  <label>定时构建</label>
                  <div class="schedule">H 2 * * *</div>
                </div>
              </div>
            </div>
            <div class="job-step">
              <h3>5. 配置构建步骤</h3>
              <div class="build-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div>执行Shell</div>
                  <pre><code>npm install
npm run build</code></pre>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div>执行Windows批处理命令</div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div>调用顶层Maven目标</div>
                </div>
              </div>
            </div>
            <div class="job-step">
              <h3>6. 配置构建后操作</h3>
              <div class="post-build">
                <div class="action">
                  <input type="checkbox" checked />
                  <label>归档成品</label>
                  <input type="text" value="dist/**" />
                </div>
                <div class="action">
                  <input type="checkbox" />
                  <label>发送邮件通知</label>
                </div>
                <div class="action">
                  <input type="checkbox" />
                  <label>部署到容器</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Pipeline as Code</h2>
        <div class="section-content">
          <div class="pipeline-details">
            <div class="pipeline-intro">
              <p>
                Jenkins Pipeline 提供了一套可扩展的工具，用于通过代码定义整个构建、测试和部署流程。
              </p>
              <p>Pipeline 脚本使用 Groovy DSL 编写，可以存储在 Jenkinsfile 中并提交到源代码库。</p>
            </div>

            <div class="pipeline-example">
              <h3>Jenkinsfile 示例</h3>
              <div class="code-block">
                <pre><code>pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'mvn clean package'
        archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
      }
    }
    stage('Test') {
      steps {
        sh 'mvn test'
        junit 'target/surefire-reports/*.xml'
      }
      post {
        always {
          emailext body: 'Test results attached',
                  subject: 'Test Report',
                  to: 'team@example.com',
                  attachmentsPattern: 'target/surefire-reports/*.xml'
        }
      }
    }
    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        sh 'kubectl apply -f k8s/deployment.yaml'
      }
    }
  }
  post {
    success {
      slackSend channel: '#dev-team',
                color: 'good',
                message: "Build succeeded: ${env.BUILD_URL}"
    }
    failure {
      slackSend channel: '#dev-team',
                color: 'danger',
                message: "Build failed: ${env.BUILD_URL}"
    }
  }
}</code></pre>
              </div>
            </div>

            <div class="pipeline-benefits">
              <h3>Pipeline 优势</h3>
              <div class="benefits-grid">
                <div class="benefit">
                  <div class="icon version-control"></div>
                  <h4>版本控制</h4>
                  <p>Jenkinsfile 可存储在源代码库中</p>
                </div>
                <div class="benefit">
                  <div class="icon reusable"></div>
                  <h4>可复用性</h4>
                  <p>共享库支持代码复用</p>
                </div>
                <div class="benefit">
                  <div class="icon visualization"></div>
                  <h4>可视化</h4>
                  <p>Pipeline 可视化展示构建流程</p>
                </div>
                <div class="benefit">
                  <div class="icon complex"></div>
                  <h4>复杂流程</h4>
                  <p>支持并行、条件等复杂流程</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">插件管理与常用插件</h2>
        <div class="section-content">
          <div class="plugins">
            <div class="plugin-management">
              <h3>插件安装方法</h3>
              <ol>
                <li>进入 Jenkins 管理 > 插件管理</li>
                <li>在"可用插件"标签页搜索需要的插件</li>
                <li>勾选插件并点击"立即安装"</li>
                <li>安装完成后重启 Jenkins</li>
              </ol>
            </div>

            <div class="essential-plugins">
              <h3>必备插件列表</h3>
              <div class="plugin-grid">
                <div class="plugin">
                  <h4>Blue Ocean</h4>
                  <p>现代化的 Pipeline 可视化界面</p>
                </div>
                <div class="plugin">
                  <h4>Git Plugin</h4>
                  <p>支持 Git 版本控制系统</p>
                </div>
                <div class="plugin">
                  <h4>Docker Plugin</h4>
                  <p>与 Docker 容器集成</p>
                </div>
                <div class="plugin">
                  <h4>Kubernetes</h4>
                  <p>在 Kubernetes 上运行动态代理</p>
                </div>
                <div class="plugin">
                  <h4>Credentials Binding</h4>
                  <p>安全地管理凭据</p>
                </div>
                <div class="plugin">
                  <h4>Pipeline Utility Steps</h4>
                  <p>提供额外的 Pipeline 步骤</p>
                </div>
                <div class="plugin">
                  <h4>Email Extension</h4>
                  <p>高级邮件通知功能</p>
                </div>
                <div class="plugin">
                  <h4>SonarQube Scanner</h4>
                  <p>集成代码质量分析</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">分布式构建与节点管理</h2>
        <div class="section-content">
          <div class="distributed-builds">
            <div class="architecture">
              <div class="jenkins-master">
                <div class="title">Jenkins Master</div>
                <div class="responsibilities">
                  <div>Web UI</div>
                  <div>构建配置</div>
                  <div>调度任务</div>
                </div>
              </div>
              <div class="agents">
                <div class="agent">
                  <div class="title">Linux Agent</div>
                  <div class="details">4 CPU, 16GB RAM</div>
                </div>
                <div class="agent">
                  <div class="title">Windows Agent</div>
                  <div class="details">8 CPU, 32GB RAM</div>
                </div>
                <div class="agent">
                  <div class="title">Docker Agent</div>
                  <div class="details">动态创建容器</div>
                </div>
              </div>
            </div>

            <div class="agent-config">
              <h3>配置代理节点</h3>
              <ol>
                <li>进入 Jenkins 管理 > 节点管理</li>
                <li>点击"新建节点"</li>
                <li>配置节点名称和类型（永久/临时）</li>
                <li>设置远程工作目录</li>
                <li>
                  配置启动方式：
                  <ul>
                    <li>SSH：提供主机和凭据</li>
                    <li>JNLP：下载代理程序手动启动</li>
                  </ul>
                </li>
                <li>添加标签（如：linux, docker）</li>
                <li>在 Pipeline 中指定标签：<code>agent { label 'docker' }</code></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">安全性与权限管理</h2>
        <div class="section-content">
          <div class="security">
            <div class="security-methods">
              <h3>安全配置方法</h3>
              <div class="method">
                <h4>认证方式</h4>
                <ul>
                  <li>Jenkins 自有数据库</li>
                  <li>LDAP/Active Directory</li>
                  <li>GitHub/GitLab OAuth</li>
                  <li>SAML/OpenID Connect</li>
                </ul>
              </div>
              <div class="method">
                <h4>授权策略</h4>
                <ul>
                  <li>登录用户可以做任何事</li>
                  <li>基于角色的权限策略</li>
                  <li>矩阵授权策略（细粒度控制）</li>
                </ul>
              </div>
            </div>

            <div class="credentials">
              <h3>凭据管理</h3>
              <p>Jenkins 提供安全的凭据存储，支持多种凭据类型：</p>
              <div class="cred-types">
                <div class="cred-type">
                  <div class="icon"></div>
                  <h4>用户名密码</h4>
                </div>
                <div class="cred-type">
                  <div class="icon"></div>
                  <h4>SSH 密钥</h4>
                </div>
                <div class="cred-type">
                  <div class="icon"></div>
                  <h4>Secret 文本</h4>
                </div>
                <div class="cred-type">
                  <div class="icon"></div>
                  <h4>证书文件</h4>
                </div>
              </div>
              <p>在 Pipeline 中使用凭据：</p>
              <pre><code>withCredentials([usernamePassword(
  credentialsId: 'aws-credentials',
  usernameVariable: 'AWS_ACCESS_KEY_ID',
  passwordVariable: 'AWS_SECRET_ACCESS_KEY'
)]) {
  sh 'aws s3 cp build/libs/*.jar s3://my-bucket/'
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Jenkins 最佳实践</h2>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice">
              <div class="number">1</div>
              <div>
                <h3>使用 Pipeline as Code</h3>
                <p>将构建配置存储在 Jenkinsfile 中，实现配置即代码</p>
              </div>
            </div>
            <div class="practice">
              <div class="number">2</div>
              <div>
                <h3>保持 Jenkins Master 轻量</h3>
                <p>仅安装必要插件，构建任务分发到代理节点执行</p>
              </div>
            </div>
            <div class="practice">
              <div class="number">3</div>
              <div>
                <h3>定期备份配置</h3>
                <p>使用 ThinBackup 插件定期备份 JENKINS_HOME</p>
              </div>
            </div>
            <div class="practice">
              <div class="number">4</div>
              <div>
                <h3>使用声明式 Pipeline</h3>
                <p>相比脚本式 Pipeline 更易读和维护</p>
              </div>
            </div>
            <div class="practice">
              <div class="number">5</div>
              <div>
                <h3>限制并发构建数量</h3>
                <p>避免资源耗尽导致系统不稳定</p>
              </div>
            </div>
            <div class="practice">
              <div class="number">6</div>
              <div>
                <h3>定期清理构建历史</h3>
                <p>配置作业保留策略，避免占用过多磁盘空间</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>
        Jenkins 是一个强大而灵活的 CI/CD 工具，通过合理配置和管理，可以显著提升软件交付效率和质量。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要太多逻辑，主要是展示信息
</script>

<style lang="less" scoped>
@primary-color: #d33833;
@secondary-color: #4a4a4a;
@background-color: #f8f9fa;
@border-color: #e0e0e0;
@text-color: #333;
@light-text: #666;
@code-bg: #f5f7fa;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;
@info-color: #3498db;

.jenkins-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.header {
  text-align: center;
  padding: 35px 0;
  border-bottom: 1px solid @border-color;
  margin-bottom: 30px;
  background: linear-gradient(to right, #fcf4f4, #f5f8ff);

  h1 {
    color: @primary-color;
    margin: 0;
    font-size: 2.4rem;
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
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
}

.section-title {
  color: @primary-color;
  border-bottom: 2px solid lighten(@primary-color, 25%);
  padding-bottom: 12px;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 1.6rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 50px;
    height: 3px;
    background: @primary-color;
    border-radius: 3px;
  }
}

.section-content {
  line-height: 1.6;
  color: @text-color;

  p {
    margin: 15px 0;
    color: @light-text;
  }
}

.intro {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;

  .intro-text {
    flex: 1;
  }

  .intro-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.jenkins-architecture {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  > div {
    padding: 12px 20px;
    border-radius: 6px;
    font-weight: bold;
    text-align: center;
  }

  .source,
  .target {
    background: lighten(@info-color, 40%);
    color: darken(@info-color, 20%);
    border: 1px solid lighten(@info-color, 20%);
  }

  .jenkins {
    background: lighten(@primary-color, 40%);
    color: darken(@primary-color, 20%);
    border: 1px solid lighten(@primary-color, 20%);
  }

  .stages {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: lighten(@success-color, 40%);
    border: 1px solid lighten(@success-color, 20%);

    > div {
      padding: 8px;
      background: white;
      border-radius: 4px;
    }
  }

  .arrow {
    font-weight: bold;
    color: @light-text;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }

  .feature-icon {
    width: 70px;
    height: 70px;
    margin: 0 auto 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.open-source {
      background: linear-gradient(135deg, #ffdfdb, #ffcbc4);
    }
    &.plugins {
      background: linear-gradient(135deg, #d6e7ff, #c0d8ff);
    }
    &.pipeline {
      background: linear-gradient(135deg, #d3f3e0, #b6e8cf);
    }
    &.distributed {
      background: linear-gradient(135deg, #fbe9e7, #ffccbc);
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
  }
}

.installation-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.step {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
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
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 3px;
  }

  h3 {
    margin: 0 0 12px 0;
    color: @text-color;
  }

  ol,
  ul {
    margin: 15px 0;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  overflow: hidden;
  margin: 15px 0;

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2d333b;
    }
  }
}

.job-creation {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.job-step {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @primary-color;
    border-bottom: 1px solid @border-color;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
}

.job-types {
  display: flex;
  gap: 15px;

  .type {
    padding: 10px 20px;
    border: 1px solid @border-color;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: @primary-color;
    }

    &.active {
      background: lighten(@primary-color, 40%);
      border-color: @primary-color;
      color: darken(@primary-color, 15%);
      font-weight: bold;
    }
  }
}

.source-control {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.scm-option {
  padding: 15px;
  border: 1px solid @border-color;
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: @primary-color;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .icon {
    width: 50px;
    height: 50px;
    margin: 0 auto 15px;
    border-radius: 50%;

    &.git {
      background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
    }
    &.svn {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    }
  }

  pre {
    background: @code-bg;
    padding: 10px;
    border-radius: 6px;
    text-align: left;
    margin-top: 10px;
    font-size: 0.9rem;
  }
}

.triggers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border: 1px solid @border-color;
  border-radius: 6px;

  .schedule {
    margin-left: auto;
    background: @code-bg;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9rem;
  }
}

.build-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.build-steps .step {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 15px;
  border-left: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);

  .step-number {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }

  pre {
    background: @code-bg;
    padding: 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-top: 10px;
  }
}

.post-build {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.action {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border: 1px solid @border-color;
  border-radius: 6px;

  input[type='text'] {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid @border-color;
    border-radius: 4px;
  }
}

.pipeline-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.pipeline-intro {
  background: lighten(@primary-color, 45%);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid @primary-color;
}

.pipeline-example {
  margin: 20px 0;
}

.pipeline-benefits {
  margin-top: 30px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.benefit {
  text-align: center;
  padding: 20px 15px;

  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
    border-radius: 50%;

    &.version-control {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    }
    &.reusable {
      background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    }
    &.visualization {
      background: linear-gradient(135deg, #f3e5f5, #e1bee7);
    }
    &.complex {
      background: linear-gradient(135deg, #fff8e1, #ffecb3);
    }
  }

  h4 {
    margin: 0 0 8px 0;
  }
}

.plugins {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.plugin-management {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.essential-plugins {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.plugin {
  padding: 15px;
  border: 1px solid @border-color;
  border-radius: 6px;

  h4 {
    margin: 0 0 8px 0;
    color: @primary-color;
  }
}

.distributed-builds {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.architecture {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.jenkins-master {
  background: lighten(@primary-color, 45%);
  border-radius: 8px;
  padding: 20px;
  text-align: center;

  .title {
    font-weight: bold;
    margin-bottom: 15px;
    color: @primary-color;
  }

  .responsibilities > div {
    background: white;
    padding: 8px;
    margin: 8px 0;
    border-radius: 4px;
  }
}

.agents {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.agent {
  background: lighten(@info-color, 40%);
  border-radius: 8px;
  padding: 15px;
  text-align: center;

  .title {
    font-weight: bold;
    margin-bottom: 10px;
    color: @info-color;
  }

  .details {
    font-size: 0.9rem;
  }
}

.agent-config {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  ol {
    padding-left: 20px;

    li {
      margin-bottom: 15px;
    }
  }

  code {
    background: @code-bg;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
}

.security {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.security-methods {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  .method {
    margin-bottom: 25px;

    h4 {
      color: @primary-color;
      border-bottom: 1px solid @border-color;
      padding-bottom: 8px;
      margin-bottom: 15px;
    }
  }
}

.credentials {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.cred-types {
  display: flex;
  gap: 15px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.cred-type {
  padding: 15px;
  border: 1px solid @border-color;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;

  .icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.practice {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @primary-color;

  .number {
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
    margin: 0 0 10px 0;
    color: @text-color;
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
