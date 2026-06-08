<template>
  <LearningPath
    title="游戏制作学习路线图"
    description="从创意到上线 · 独立游戏开发者的完整旅程"
    :tags="[{ label: '🎨 设计', color: 'pink' },{ label: '🔧 Godot', color: 'blue' },{ label: '📜 脚本', color: 'green' },{ label: '🖼️ 美术', color: 'purple' },{ label: '🚀 发布', color: 'orange' }]"
    :phases="phases"
    footerText="预计全部完成需 8-14 个月 · 创意驱动 · 最小可行产品优先"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 1, icon: '🎨', title: '游戏设计基础', period: '4-6 周',
    desc: '好的创意比好的代码重要十倍。学习游戏设计核心理论、核心循环设计和竞品分析方法。',
    color: 'bg-pink-500',
    practice: '📌 实战：深度体验 10+ 款卡牌/独立游戏，为每款写出核心循环 + 付费设计分析',
    modules: [
      { name: 'game-1-a', label: '设计理论', topics: [
        { name: 'game-1-a-1-core-loop', label: '核心循环与心流理论' },
        { name: 'game-1-a-2-mechanics', label: '机制/动态/美学(MDA)' },
        { name: 'game-1-a-3-balance', label: '数值平衡基础' },
      ]},
      { name: 'game-1-b', label: '设计文档', topics: [
        { name: 'game-1-b-1-gdd', label: '一页纸设计文档(GDD)' },
        { name: 'game-1-b-2-target', label: '目标用户画像' },
        { name: 'game-1-b-3-monetization', label: '商业模式设计' },
      ]},
      { name: 'game-1-c', label: '竞品分析', topics: [
        { name: 'game-1-c-1-market', label: 'Steam 卡牌游戏市场分析' },
        { name: 'game-1-c-2-review', label: '差评原因归类与避坑' },
        { name: 'game-1-c-3-diff', label: '差异化定位策略' },
      ]},
    ]
  },
  {
    id: 2, icon: '🔧', title: 'Godot 引擎入门', period: '6-8 周',
    desc: '掌握 Godot 引擎核心概念——节点、场景、信号。能用 GDScript 写出可运行的原型。',
    color: 'bg-blue-500',
    practice: '📌 实战：用 Godot 复刻一个经典小游戏（Flappy Bird / 打砖块），含得分和 Game Over',
    modules: [
      { name: 'game-2-a', label: '引擎基础', topics: [
        { name: 'game-2-a-1-install', label: 'Godot 安装与项目结构' },
        { name: 'game-2-a-2-node', label: '节点系统与场景树' },
        { name: 'game-2-a-3-signal', label: '信号机制与解耦' },
      ]},
      { name: 'game-2-b', label: '2D 基础', topics: [
        { name: 'game-2-b-1-sprite', label: 'Sprite/AnimatedSprite' },
        { name: 'game-2-b-2-physics', label: '物理引擎与碰撞检测' },
        { name: 'game-2-b-3-input', label: '输入处理(键盘/鼠标/触屏)' },
      ]},
      { name: 'game-2-c', label: 'UI 系统', topics: [
        { name: 'game-2-c-1-control', label: 'Control 节点体系' },
        { name: 'game-2-c-2-theme', label: 'Theme 主题定制' },
        { name: 'game-2-c-3-responsive', label: '自适应布局与锚点' },
      ]},
    ]
  },
  {
    id: 3, icon: '📜', title: 'GDScript 编程', period: '4-6 周',
    desc: '用 GDScript 实现游戏逻辑。从变量到状态机，写出可维护的游戏代码。',
    color: 'bg-green-500',
    practice: '📌 实战：实现一个回合制战斗系统（HP/MP/技能/状态效果）',
    modules: [
      { name: 'game-3-a', label: '语言基础', topics: [
        { name: 'game-3-a-1-syntax', label: '语法：变量/函数/类' },
        { name: 'game-3-a-2-signals-code', label: '信号连接与自定义信号' },
        { name: 'game-3-a-3-resources', label: 'Resource 资源管理' },
      ]},
      { name: 'game-3-b', label: '游戏逻辑模式', topics: [
        { name: 'game-3-b-1-fsm', label: '有限状态机(FSM)' },
        { name: 'game-3-b-2-command', label: '命令模式与回放' },
        { name: 'game-3-b-3-object-pool', label: '对象池优化' },
      ]},
      { name: 'game-3-c', label: '数据与存档', topics: [
        { name: 'game-3-c-1-save', label: '存档系统设计' },
        { name: 'game-3-c-2-config', label: '配置表导入(CSV/JSON)' },
      ]},
    ]
  },
  {
    id: 4, icon: '🎯', title: '2D 游戏实战', period: '6-8 周',
    desc: '从零做一个可玩的游戏原型。重点：核心玩法可玩性验证，不追求画面完美。',
    color: 'bg-amber-500',
    practice: '📌 实战：开发卡牌对战游戏 MVP（卡牌效果/回合制/胜负判定/极简 UI）',
    modules: [
      { name: 'game-4-a', label: '卡牌系统', topics: [
        { name: 'game-4-a-1-card-data', label: '卡牌数据结构设计' },
        { name: 'game-4-a-2-card-ui', label: '手牌/牌堆/弃牌堆 UI' },
        { name: 'game-4-a-3-effects', label: '卡牌效果系统（buff/debuff）' },
      ]},
      { name: 'game-4-b', label: '战斗系统', topics: [
        { name: 'game-4-b-1-turn', label: '回合管理与优先级' },
        { name: 'game-4-b-2-ai', label: '基础 AI 对手' },
        { name: 'game-4-b-3-anims', label: '战斗动画与 Tween' },
      ]},
      { name: 'game-4-c', label: '原型测试', topics: [
        { name: 'game-4-c-1-playtest', label: '找 10 人试玩记录反应' },
        { name: 'game-4-c-2-iterate', label: '根据反馈快速迭代' },
        { name: 'game-4-c-3-scope', label: '控制范围：删减 > 增加' },
      ]},
    ]
  },
  {
    id: 5, icon: '🖼️', title: '美术与动画', period: '4-6 周',
    desc: '独立开发者必备的美术素养。学会用 AI 辅助 + 免费素材 + 简单建模快速出效果。',
    color: 'bg-purple-500',
    practice: '📌 实战：为你游戏中的 5+ 张卡牌和 UI 界面完成美术素材制作',
    modules: [
      { name: 'game-5-a', label: '2D 美术', topics: [
        { name: 'game-5-a-1-color', label: '色彩理论与配色' },
        { name: 'game-5-a-2-pixel', label: '像素画基础' },
        { name: 'game-5-a-3-ai-art', label: 'AI 美术工具（Midjourney/SD）' },
      ]},
      { name: 'game-5-b', label: '动画', topics: [
        { name: 'game-5-b-1-tween', label: 'Tween 补间动画深入' },
        { name: 'game-5-b-2-animation', label: 'AnimationPlayer 帧动画' },
        { name: 'game-5-b-3-particle', label: '粒子效果（Particles2D）' },
      ]},
      { name: 'game-5-c', label: '3D 入门', topics: [
        { name: 'game-5-c-1-modeling', label: 'Blender 基础建模' },
        { name: 'game-5-c-2-godot-3d', label: 'Godot 3D 场景搭建' },
      ]},
    ]
  },
  {
    id: 6, icon: '🎵', title: '音频与 UI 打磨', period: '3-4 周',
    desc: '音效和 UI 的细节决定游戏品质感。学会用免费资源 + 简单工具营造沉浸体验。',
    color: 'bg-indigo-500',
    practice: '📌 实战：为游戏添加背景音乐、卡牌音效、UI 点击反馈音效',
    modules: [
      { name: 'game-6-a', label: '音频', topics: [
        { name: 'game-6-a-1-sfx', label: '音效资源获取与处理' },
        { name: 'game-6-a-2-audio-player', label: 'AudioStreamPlayer 使用' },
        { name: 'game-6-a-3-bgm', label: '背景音乐管理（循环/淡入淡出）' },
      ]},
      { name: 'game-6-b', label: 'UI 打磨', topics: [
        { name: 'game-6-b-1-feedback', label: '交互反馈（震动/闪烁/音效）' },
        { name: 'game-6-b-2-transition', label: '场景切换动效' },
        { name: 'game-6-b-3-juice', label: '"Juice" 游戏感提升技巧' },
      ]},
    ]
  },
  {
    id: 7, icon: '🚀', title: '发布与运营', period: '4-6 周',
    desc: '从开发到上线的最后冲刺。学会 Steam 发布流程、社区运营和数据分析。',
    color: 'bg-orange-500',
    practice: '📌 实战：创建 Steam 商店页面（宣传片 + 截图 + 描述），制定定价与首发策略',
    modules: [
      { name: 'game-7-a', label: 'Steam 发布', topics: [
        { name: 'game-7-a-1-steamworks', label: 'Steamworks 后台配置' },
        { name: 'game-7-a-2-store', label: '商店页面优化（截图/描述/标签）' },
        { name: 'game-7-a-3-trailer', label: '宣传片制作要点' },
      ]},
      { name: 'game-7-b', label: '运营策略', topics: [
        { name: 'game-7-b-1-pricing', label: '定价策略与首周折扣' },
        { name: 'game-7-b-2-community', label: '社区运营与 Wishlist' },
        { name: 'game-7-b-3-analytics', label: '数据分析与留存优化' },
      ]},
      { name: 'game-7-c', label: '复盘与迭代', topics: [
        { name: 'game-7-c-1-postmortem', label: '项目复盘文档模板' },
        { name: 'game-7-c-2-next', label: '下一个产品的方向决策' },
        { name: 'game-7-c-3-portfolio', label: '独立开发者个人品牌建设' },
      ]},
    ]
  },
]
</script>
