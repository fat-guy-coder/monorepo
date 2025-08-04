<template>
  <div class="design-patterns-container">
    <header class="header">
      <h1>软件设计模式概览</h1>
      <p class="subtitle">23种经典设计模式分类与常用性排序</p>
    </header>

    <div class="pattern-categories">
      <div class="category" v-for="category in categories" :key="category.type">
        <div class="category-header" :style="{ backgroundColor: category.color }">
          <h2>{{ category.title }}</h2>
          <p class="category-desc">{{ category.desc }}</p>
          <span class="category-count">{{ getPatternsByCategory(category.type).length }} 种模式</span>
        </div>

        <div class="pattern-list">
          <div v-for="(pattern, index) in getPatternsByCategory(category.type)" :key="pattern.name" class="pattern-card"
            :class="{
              'top-pattern': index < 3,
              'common-pattern': index >= 3 && index < 6
            }">
            <div class="pattern-rank">{{ index + 1 }}</div>
            <h3 class="pattern-name">{{ pattern.name }}</h3>
            <div class="pattern-alias" v-if="pattern.alias">别名: {{ pattern.alias }}</div>
            <p class="pattern-desc">{{ pattern.desc }}</p>
            <div class="pattern-frequency">
              常用度:
              <span class="stars">
                <span v-for="i in pattern.frequency" :key="i">★</span>
              </span>
              ({{ getFrequencyText(pattern.frequency) }})
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>设计模式是软件设计中常见问题的典型解决方案，掌握它们能提高代码的可维护性和可扩展性</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 设计模式接口定义
interface DesignPattern {
  name: string;
  alias?: string;
  desc: string;
  type: 'creational' | 'structural' | 'behavioral';
  frequency: number; // 1-5 表示常用程度
}

// 设计模式数据
const designPatterns = ref<DesignPattern[]>([
  // 创建型模式 (5种)
  { name: '工厂方法模式', alias: '虚构造器', desc: '定义一个创建对象的接口，但让子类决定实例化哪个类', type: 'creational', frequency: 5 },
  { name: '抽象工厂模式', desc: '提供一个创建一系列相关或相互依赖对象的接口', type: 'creational', frequency: 4 },
  { name: '单例模式', desc: '保证一个类只有一个实例，并提供全局访问点', type: 'creational', frequency: 5 },
  { name: '建造者模式', alias: '生成器', desc: '将一个复杂对象的构建与其表示分离，使同样的构建过程可以创建不同的表示', type: 'creational', frequency: 3 },
  { name: '原型模式', desc: '用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象', type: 'creational', frequency: 2 },

  // 结构型模式 (7种)
  { name: '适配器模式', alias: '包装器', desc: '将一个类的接口转换成客户希望的另一个接口', type: 'structural', frequency: 5 },
  { name: '装饰器模式', alias: '包装', desc: '动态地给一个对象添加一些额外的职责', type: 'structural', frequency: 4 },
  { name: '代理模式', desc: '为其他对象提供一种代理以控制对这个对象的访问', type: 'structural', frequency: 4 },
  { name: '外观模式', alias: '门面', desc: '为子系统中的一组接口提供一个一致的界面', type: 'structural', frequency: 4 },
  { name: '桥接模式', desc: '将抽象部分与它的实现部分分离，使它们都可以独立地变化', type: 'structural', frequency: 3 },
  { name: '组合模式', desc: '将对象组合成树形结构以表示"部分-整体"的层次结构', type: 'structural', frequency: 3 },
  { name: '享元模式', desc: '运用共享技术有效地支持大量细粒度的对象', type: 'structural', frequency: 2 },

  // 行为型模式 (11种)
  { name: '观察者模式', alias: '发布-订阅', desc: '定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知', type: 'behavioral', frequency: 5 },
  { name: '策略模式', desc: '定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换', type: 'behavioral', frequency: 5 },
  { name: '命令模式', desc: '将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化', type: 'behavioral', frequency: 4 },
  { name: '状态模式', desc: '允许一个对象在其内部状态改变时改变它的行为', type: 'behavioral', frequency: 4 },
  { name: '责任链模式', desc: '为解除请求的发送者和接收者之间耦合，而使多个对象都有机会处理这个请求', type: 'behavioral', frequency: 3 },
  { name: '模板方法模式', desc: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中', type: 'behavioral', frequency: 4 },
  { name: '迭代器模式', desc: '提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示', type: 'behavioral', frequency: 4 },
  { name: '中介者模式', desc: '用一个中介对象来封装一系列的对象交互', type: 'behavioral', frequency: 3 },
  { name: '备忘录模式', alias: '快照', desc: '在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态', type: 'behavioral', frequency: 2 },
  { name: '访问者模式', desc: '表示一个作用于某对象结构中的各元素的操作', type: 'behavioral', frequency: 2 },
  { name: '解释器模式', desc: '给定一个语言，定义它的文法的一种表示，并定义一个解释器', type: 'behavioral', frequency: 1 },
]);

// 分类数据
const categories = ref([
  { type: 'creational', title: '创建型模式', color: '#4caf50', desc: '创建型模式关注对象的创建过程，强调对象的实例化方式' },
  { type: 'structural', title: '结构型模式', color: '#2196f3', desc: '结构型模式关注对象的结构和组合，强调对象的组织方式' },
  { type: 'behavioral', title: '行为型模式', color: '#ff9800', desc: '行为型模式关注对象的行为和交互，强调对象的职责分配' }
]);

// 按分类获取模式并按常用度排序
const getPatternsByCategory = (type: string) => {
  return [...designPatterns.value]
    .filter(pattern => pattern.type === type)
    .sort((a, b) => b.frequency - a.frequency);
};

// 获取常用度文本描述
const getFrequencyText = (frequency: number) => {
  const texts = ['极少使用', '较少使用', '一般使用', '经常使用', '最常用'];
  return texts[frequency - 1] || '';
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

.design-patterns-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 8px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.1rem;
      color: #7f8c8d;
      margin-top: 0;
    }
  }

  .pattern-categories {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .category {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .category-header {
        padding: 18px 24px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .category-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
      }
    }

    .pattern-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
      padding: 24px;

      .pattern-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        position: relative;
        border-left: 4px solid #ddd;
        transition: all 0.3s ease;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-left-color: var(--category-color);
        }

        &.top-pattern {
          border-left-color: #ff6b6b;
          background: linear-gradient(to right, #fff7f8, #ffffff);

          .pattern-rank {
            background: #ff6b6b;
            color: white;
          }
        }

        &.common-pattern {
          border-left-color: #4dabf7;

          .pattern-rank {
            background: #4dabf7;
            color: white;
          }
        }

        .pattern-rank {
          position: absolute;
          top: -12px;
          left: -12px;
          width: 32px;
          height: 32px;
          background: #adb5bd;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .pattern-name {
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 8px;
          color: #2c3e50;
        }

        .pattern-alias {
          font-size: 0.9rem;
          color: #6c757d;
          font-style: italic;
          margin-bottom: 12px;
        }

        .pattern-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: #495057;
          margin-bottom: 16px;
          min-height: 72px;
        }

        .pattern-frequency {
          font-size: 0.9rem;
          color: #6c757d;
          border-top: 1px dashed #eee;
          padding-top: 12px;
          display: flex;
          align-items: center;

          .stars {
            color: #ffc107;
            margin: 0 6px;
            font-size: 1.1rem;
            letter-spacing: 2px;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 40px;
    text-align: center;
    padding: 20px;
    font-size: 0.95rem;
    color: #6c757d;
    border-top: 1px solid #eee;
  }
}

@media (max-width: 768px) {
  .design-patterns-container {
    padding: 15px;

    .header h1 {
      font-size: 2rem;
    }

    .pattern-categories .pattern-list {
      grid-template-columns: 1fr;
      padding: 15px;
    }
  }
}
</style>