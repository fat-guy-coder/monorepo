<template>
  <div class="canvas-save-restore-container">
    <div class="header">
      <h1>Canvas save() 和 restore() 方法基础介绍</h1>
      <p class="subtitle">掌握Canvas状态管理的核心技术</p>
    </div>

    <div class="content">
      <section class="concept-section">
        <h2><span class="icon">📚</span> 基本概念</h2>
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">💾</div>
            <h3>save() 方法</h3>
            <p>保存当前Canvas的完整状态到状态栈中</p>
            <div class="concept-detail">
              <p>Canvas的状态包括：</p>
              <ul>
                <li>变换矩阵（平移、旋转、缩放）</li>
                <li>裁剪区域</li>
                <li>图形属性（fillStyle, strokeStyle等）</li>
                <li>全局属性（globalAlpha, globalCompositeOperation）</li>
              </ul>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">↩️</div>
            <h3>restore() 方法</h3>
            <p>从状态栈中恢复最近保存的Canvas状态</p>
            <div class="concept-detail">
              <p>状态恢复过程：</p>
              <ul>
                <li>从栈顶弹出保存的状态</li>
                <li>恢复所有保存的属性</li>
                <li>不影响栈中其他保存的状态</li>
                <li>遵循后进先出（LIFO）原则</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="stack-section">
        <h2><span class="icon">🗂️</span> Canvas 状态栈原理</h2>
        <div class="stack-visualization">
          <div class="stack-diagram">
            <div class="stack-label">Canvas 状态栈</div>
            <div class="stack-items">
              <div class="stack-item">状态 3 <span class="stack-pointer">← 当前状态</span></div>
              <div class="stack-item">状态 2</div>
              <div class="stack-item">状态 1</div>
              <div class="stack-item">初始状态</div>
            </div>
          </div>

          <div class="stack-operations">
            <div class="operation">
              <div class="operation-icon">⬇️</div>
              <div class="operation-content">
                <h3>save() 操作</h3>
                <p>将当前状态压入栈顶</p>
                <pre class="inline-code">ctx.save(); // 保存当前状态</pre>
              </div>
            </div>

            <div class="operation">
              <div class="operation-icon">⬆️</div>
              <div class="operation-content">
                <h3>restore() 操作</h3>
                <p>从栈顶弹出状态并恢复</p>
                <pre class="inline-code">ctx.restore(); // 恢复之前保存的状态</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <h2><span class="icon">🛠️</span> 使用方法</h2>

        <div class="code-examples">
          <div class="code-example">
            <h3>基本使用模式</h3>
            <pre class="code-block">// 保存当前状态
ctx.save();

// 修改Canvas状态
ctx.fillStyle = 'red';
ctx.translate(100, 100);
ctx.rotate(Math.PI / 4);

// 绘制操作
ctx.fillRect(0, 0, 50, 50);

// 恢复之前保存的状态
ctx.restore();

// 继续使用原始状态绘制
ctx.fillRect(50, 50, 50, 50);</pre>
          </div>

          <div class="code-example">
            <h3>嵌套使用模式</h3>
            <pre class="code-block">// 初始状态
ctx.fillStyle = 'blue';

// 第一层保存
ctx.save();
ctx.fillStyle = 'red';
ctx.translate(50, 50);

// 绘制红色方块
ctx.fillRect(0, 0, 50, 50);

// 第二层保存
ctx.save();
ctx.fillStyle = 'green';
ctx.rotate(Math.PI / 6);

// 绘制绿色旋转方块
ctx.fillRect(0, 0, 50, 50);

// 恢复第二层状态 (回到红色状态)
ctx.restore();

// 绘制另一个红色方块
ctx.fillRect(100, 0, 50, 50);

// 恢复第一层状态 (回到蓝色状态)
ctx.restore();

// 绘制蓝色方块
ctx.fillRect(0, 100, 50, 50);</pre>
          </div>
        </div>
      </section>

      <section class="scenarios-section">
        <h2><span class="icon">🚀</span> 使用场景</h2>
        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🔄</div>
              <h3>临时变换</h3>
            </div>
            <div class="scenario-content">
              <p>在需要临时改变Canvas状态（如平移、旋转）进行绘制后，恢复原始状态</p>
              <pre class="inline-code">// 保存状态
ctx.save();

// 临时变换
ctx.translate(x, y);
ctx.rotate(angle);

// 绘制
drawObject();

// 恢复状态
ctx.restore();</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🎨</div>
              <h3>样式隔离</h3>
            </div>
            <div class="scenario-content">
              <p>为特定元素设置不同的样式而不影响后续绘制</p>
              <pre class="inline-code">// 绘制蓝色元素
ctx.fillStyle = 'blue';
drawShape();

// 保存状态
ctx.save();

// 为红色元素设置样式
ctx.fillStyle = 'red';
ctx.globalAlpha = 0.7;
drawSpecialShape();

// 恢复状态（回到蓝色样式）
ctx.restore();

// 继续绘制蓝色元素
drawAnotherShape();</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">✂️</div>
              <h3>裁剪区域</h3>
            </div>
            <div class="scenario-content">
              <p>创建临时裁剪区域进行绘制，然后恢复原始画布</p>
              <pre class="inline-code">// 保存状态
ctx.save();

// 创建圆形裁剪区域
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.clip();

// 在裁剪区域内绘制
drawContent();

// 恢复状态（移除裁剪区域）
ctx.restore();

// 继续在全画布上绘制
drawUnclippedContent();</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🧩</div>
              <h3>复杂图形组合</h3>
            </div>
            <div class="scenario-content">
              <p>管理复杂图形中不同部分的独立变换和样式</p>
              <pre class="inline-code">function drawWheel() {
  ctx.save();
  // 轮子变换
  ctx.translate(wheelX, wheelY);
  drawWheelBase();

  // 轮辐
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((Math.PI / 4) * i);
    drawSpoke();
    ctx.restore();
  }

  ctx.restore();
}

function drawCar() {
  drawBody();
  drawWheel(); // 左前轮
  // ... 其他轮子
}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2><span class="icon">💡</span> 最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <h3>平衡调用</h3>
            <p>确保每个 <code>save()</code> 都有对应的 <code>restore()</code></p>
            <pre class="inline-code">ctx.save();
// 绘制操作...
ctx.restore(); // 必须成对出现</pre>
          </div>

          <div class="practice-card">
            <h3>避免深层嵌套</h3>
            <p>限制嵌套深度，通常不超过3-4层</p>
            <pre class="inline-code">// 不易维护的深层嵌套
ctx.save();
// ...
  ctx.save();
  // ...
    ctx.save();
    // ... 深层嵌套
    ctx.restore();
  ctx.restore();
ctx.restore();</pre>
          </div>

          <div class="practice-card">
            <h3>状态管理</h3>
            <p>在函数内部使用 <code>save/restore</code> 隔离状态</p>
            <pre class="inline-code">function drawIcon(x, y) {
  ctx.save();
  ctx.translate(x, y);
  // 绘制图标...
  ctx.restore();
}</pre>
          </div>

          <div class="practice-card">
            <h3>性能优化</h3>
            <p>避免在动画循环中频繁调用 <code>save/restore</code></p>
            <pre class="inline-code">// 优化前（每帧保存/恢复）
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  // 变换和绘制...
  ctx.restore();

  requestAnimationFrame(animate);
}

// 优化后（只保存一次）
ctx.save(); // 在循环外保存初始状态

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.restore(); // 恢复到初始状态
  ctx.save();    // 为下一帧保存

  // 变换和绘制...

  requestAnimationFrame(animate);
}</pre>
          </div>
        </div>
      </section>

      <section class="advanced-section">
        <h2><span class="icon">🚀</span> 高级应用</h2>
        <div class="advanced-grid">
          <div class="advanced-card">
            <h3>状态快照</h3>
            <p>保存当前状态作为"检查点"，稍后恢复</p>
            <pre class="inline-code">// 创建快照
ctx.save(); // 快照1

// 绘制场景A
drawSceneA();

ctx.save(); // 快照2

// 绘制场景B
drawSceneB();

// 恢复到场景A
ctx.restore(); // 回到快照2
drawSceneA(); // 在场景B上绘制场景A

// 恢复到原始状态
ctx.restore(); // 回到快照1</pre>
          </div>

          <div class="advanced-card">
            <h3>组合操作</h3>
            <p>结合 <code>save/restore</code> 和 <code>globalCompositeOperation</code></p>
            <pre class="inline-code">// 正常绘制背景
drawBackground();

ctx.save();
// 设置叠加模式
ctx.globalCompositeOperation = 'multiply';
ctx.globalAlpha = 0.5;

// 绘制叠加效果
drawOverlay();

// 恢复原始合成模式
ctx.restore();

// 继续正常绘制
drawForeground();</pre>
          </div>

          <div class="advanced-card">
            <h3>动画状态管理</h3>
            <p>管理复杂动画中的多个变换状态</p>
            <pre class="inline-code">function drawAnimatedRobot() {
  // 保存基础状态
  ctx.save();

  // 身体动画
  ctx.translate(bodyX, bodyY);
  drawBody();

  // 头部
  ctx.save();
  ctx.translate(0, -50);
  ctx.rotate(headRotation);
  drawHead();
  ctx.restore();

  // 手臂
  drawArm('left', leftArmAngle);
  drawArm('right', rightArmAngle);

  // 恢复基础状态
  ctx.restore();
}

function drawArm(side, angle) {
  ctx.save();
  ctx.translate(side === 'left' ? -30 : 30, 0);
  ctx.rotate(angle);
  drawArmShape();
  ctx.restore();
}</pre>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Canvas 状态管理 | save() 和 restore() 方法基础介绍</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示，无逻辑代码
</script>

<style lang="less" scoped>



.canvas-save-restore-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.07);
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3498db, #9b59b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.15rem;
      color: #7f8c8d;
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }

  section {
    margin-bottom: 3.5rem;

    h2 {
      font-size: 1.7rem;
      color: #3498db;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid #e0f7fa;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4rem;
      }
    }
  }

  .concept-section {
    .concept-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      .concept-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        text-align: center;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(52, 152, 219, 0.1);
        }

        .concept-icon {
          font-size: 2.5rem;
          margin-bottom: 1.2rem;
        }

        h3 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.05rem;
          color: #4a5568;
          margin-bottom: 1.5rem;
        }

        .concept-detail {
          text-align: left;

          p {
            font-weight: 500;
            margin-bottom: 0.8rem;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.6rem;
              color: #4a5568;
              font-size: 0.97rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .stack-section {
    .stack-visualization {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      .stack-diagram {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        .stack-label {
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #3498db;
        }

        .stack-items {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: 0.8rem;

          .stack-item {
            background: white;
            border: 1px solid #cbd5e0;
            border-radius: 8px;
            padding: 1rem;
            width: 80%;
            text-align: center;
            position: relative;
            transition: all 0.3s ease;

            &:first-child {
              background: #e3f2fd;
              border-color: #3498db;
              box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);

              .stack-pointer {
                position: absolute;
                right: -120px;
                top: 50%;
                transform: translateY(-50%);
                color: #3498db;
                font-weight: 500;
                font-size: 0.9rem;
              }
            }
          }
        }
      }

      .stack-operations {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .operation {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;

          .operation-icon {
            font-size: 2.5rem;
            margin-right: 1.5rem;
          }

          .operation-content {
            h3 {
              font-size: 1.3rem;
              color: #2c3e50;
              margin-top: 0;
              margin-bottom: 0.8rem;
            }

            p {
              color: #4a5568;
              font-size: 0.95rem;
              margin-bottom: 0.8rem;
            }

            .inline-code {
              background: #2d3748;
              color: #e2e8f0;
              border-radius: 6px;
              padding: 0.8rem;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              overflow-x: auto;
              display: block;
            }
          }
        }
      }
    }
  }

  .usage-section {
    .code-examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.8rem;

      .code-example {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .code-block {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 8px;
          padding: 1.2rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          overflow-x: auto;
          line-height: 1.6;
        }
      }
    }
  }

  .scenarios-section {
    .scenarios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.8rem;

      .scenario-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        .scenario-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .scenario-icon {
            font-size: 1.8rem;
            margin-right: 0.8rem;
          }

          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0;
          }
        }

        .scenario-content {
          p {
            color: #4a5568;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
          }

          .inline-code {
            background: #2d3748;
            color: #e2e8f0;
            border-radius: 6px;
            padding: 1rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            display: block;
          }
        }
      }
    }
  }

  .best-practices,
  .advanced-section {

    .practices-grid,
    .advanced-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.8rem;

      .practice-card,
      .advanced-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
          margin-bottom: 0.8rem;
        }

        .inline-code {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 6px;
          padding: 1rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
          display: block;
          margin-top: 0.8rem;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
    color: #718096;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;

    .header {
      h1 {
        font-size: 1.9rem;
      }
    }

    .content {
      padding: 1.8rem;
    }

    section {
      margin-bottom: 2.5rem;
    }

    .concept-grid,
    .stack-visualization,
    .code-examples,
    .scenarios-grid,
    .practices-grid,
    .advanced-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }

    .stack-item .stack-pointer {
      display: none;
    }
  }
}
</style>
