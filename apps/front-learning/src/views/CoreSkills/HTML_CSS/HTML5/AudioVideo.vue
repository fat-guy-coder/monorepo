<template>
  <div class="media-container">
    <!-- HTML5 多媒体技术文档 -->
    <article class="media-guide">
      <h1 class="guide-title">HTML5 音视频</h1>
      <section class="chapter">
        <h2 class="chapter-title gradient-text">核心元素</h2>
        <div class="card-box">
          <div class="tech-card">
            <h3>📻 Audio 元素</h3>
            <pre class="code-block"><code>&lt;audio controls src="audio.mp3"&gt;&lt;/audio&gt;</code></pre>
            <div class="tech-props">
              <span class="prop-tag">支持格式</span>
              <span class="format-tag audio">MP3</span>
              <span class="format-tag audio">AAC</span>
              <span class="format-tag audio">WAV</span>
              <span class="format-tag audio">OGG</span>
            </div>
          </div>

          <div class="tech-card">
            <h3>📹 Video 元素</h3>
            <pre
              class="code-block"><code>&lt;video controls width="640"&gt;&lt;source src="video.mp4" type="video/mp4"&gt;&lt;/video&gt;</code></pre>
            <div class="tech-props">
              <span class="prop-tag">支持格式</span>
              <span class="format-tag video">MP4</span>
              <span class="format-tag video">WebM</span>
              <span class="format-tag video">Ogg</span>
              <span class="format-tag video">HLS</span>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
code {
  color: #000;
}

.media-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 1.5rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
}

.guide-title {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.05em;
}

.chapter {
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);

  &-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #eee;
  }
}

.card-box {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.tech-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.8rem;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #34495e;
    margin-bottom: 1rem;
  }
}

.format-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin: 0.3rem;

  &.audio {
    background: #4caf5055;
    color: #2e7d32;
  }

  &.video {
    background: #2196f355;
    color: #1565c0;
  }
}

.type-list {
  list-style: none;
  padding: 0;

  li {
    padding: 0.8rem;
    margin: 0.5rem 0;
    background: #f8f9fa;
    border-radius: 6px;
    display: flex;
    align-items: center;
  }
}

.type-badge {
  display: inline-block;
  width: 80px;
  text-align: center;
  padding: 0.3rem 0;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 1rem;

  &.music {
    background: #ffb74d55;
    color: #ef6c00;
  }

  &.voice {
    background: #81c78455;
    color: #2e7d32;
  }

  &.effect {
    background: #64b5f655;
    color: #1976d2;
  }

  &.normal {
    background: #7986cb55;
    color: #303f9f;
  }

  &.live {
    background: #e5737355;
    color: #c62828;
  }

  &.animation {
    background: #ba68c855;
    color: #7b1fa2;
  }
}

.highlight-code {
  background: #2d2d2d;
  color: #ccc;
  padding: 1.5rem;
  border-radius: 0.8rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
}

.gradient-text {
  background: linear-gradient(45deg, #2196f3, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .media-container {
    padding: 1rem;
  }

  .guide-title {
    font-size: 2rem;
  }
}
</style>
