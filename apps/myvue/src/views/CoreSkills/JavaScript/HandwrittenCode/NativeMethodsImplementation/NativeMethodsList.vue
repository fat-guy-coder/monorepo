<template>
  <div class="native-methods-container">
    <header class="guide-header">
      <h1>JavaScript 原生方法实现指南</h1>
      <p>深入理解 JavaScript 核心原理，掌握手写原生方法的能力</p>
    </header>

    <div class="content-wrapper">
      <!-- 导航 -->
      <nav class="navigation">
        <ul>
          <li v-for="section in sections" :key="section.id" @click="scrollToSection(section.id)">
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="content">
        <!-- 介绍部分 -->
        <section id="introduction" class="guide-section">
          <h2>为什么要手写原生方法？</h2>
          <div class="intro-content">
            <div class="intro-card">
              <div class="intro-icon">🧠</div>
              <h3>深入理解原理</h3>
              <p>通过实现过程理解 JavaScript 核心工作机制</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">💡</div>
              <h3>提升编程能力</h3>
              <p>锻炼解决复杂问题的思维和编码能力</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🔧</div>
              <h3>面试必备技能</h3>
              <p>前端面试中常见的手写代码题目</p>
            </div>
          </div>
        </section>

        <!-- 数组方法 -->
        <section id="array-methods" class="guide-section">
          <h2>
            数组方法实现
            <a class="goto-link" @click="goToByRouteName('AchieveArrayMethods')">跳转</a>
          </h2>

          <div class="method-grid">
            <!-- map -->
            <div class="method-card">
              <h3>Array.prototype.map</h3>
              <p class="method-desc">
                创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查回调函数是否为函数类型</li>
                  <li>创建新数组存放结果</li>
                  <li>遍历数组，对每个元素执行回调</li>
                  <li>将回调结果放入新数组</li>
                  <li>返回新数组</li>
                </ul>
              </div>
              <pre class="code-block">
Array.prototype.myMap = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(fn(this[i], i, this));
  }
  return result;
};</pre
              >
            </div>

            <!-- filter -->
            <div class="method-card">
              <h3>Array.prototype.filter</h3>
              <p class="method-desc">创建一个新数组，其包含通过所提供函数实现的测试的所有元素</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查回调函数是否为函数类型</li>
                  <li>创建新数组存放结果</li>
                  <li>遍历数组，对每个元素执行回调</li>
                  <li>若回调返回真值，将元素放入新数组</li>
                  <li>返回新数组</li>
                </ul>
              </div>
              <pre class="code-block">
Array.prototype.myFilter = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};</pre
              >
            </div>

            <!-- reduce -->
            <div class="method-card">
              <h3>Array.prototype.reduce</h3>
              <p class="method-desc">
                对数组中的每个元素执行一个由您提供的reducer函数，将其结果汇总为单个返回值
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查回调函数是否为函数类型</li>
                  <li>处理初始值是否存在</li>
                  <li>遍历数组，执行reducer函数</li>
                  <li>更新累加器值</li>
                  <li>返回最终结果</li>
                </ul>
              </div>
              <pre class="code-block">
Array.prototype.myReduce = function(fn, initialValue) {
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function');
  }

  let accumulator = initialValue === undefined ? this[0] : initialValue;
  let startIndex = initialValue === undefined ? 1 : 0;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = fn(accumulator, this[i], i, this);
  }
  return accumulator;
};</pre
              >
            </div>

            <!-- forEach -->
            <div class="method-card">
              <h3>Array.prototype.forEach</h3>
              <p class="method-desc">对数组的每个元素执行一次给定的函数</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查回调函数是否为函数类型</li>
                  <li>遍历数组，对每个元素执行回调</li>
                  <li>无返回值</li>
                </ul>
              </div>
              <pre class="code-block">
Array.prototype.myForEach = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
};</pre
              >
            </div>

            <!-- find -->
            <div class="method-card">
              <h3>Array.prototype.find</h3>
              <p class="method-desc">返回数组中满足提供的测试函数的第一个元素的值</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查回调函数是否为函数类型</li>
                  <li>遍历数组，对每个元素执行回调</li>
                  <li>若回调返回真值，返回该元素</li>
                  <li>若未找到，返回 undefined</li>
                </ul>
              </div>
              <pre class="code-block">
Array.prototype.myFind = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};</pre
              >
            </div>

            <!-- some -->
            <div class="method-card">
              <h3>Array.prototype.some</h3>
              <p class="method-desc">测试数组中是否至少有一个元素通过了由提供的函数实现的测试</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查回调函数是否为函数类型</li>
                  <li>遍历数组，对每个元素执行回调</li>
                  <li>若回调返回真值，返回 true</li>
                  <li>若未找到，返回 false</li>
                </ul>
              </div>
              <pre class="code-block">
Array.prototype.mySome = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return true;
    }
  }
  return false;
};</pre
              >
            </div>

            <!-- flat -->
            <div class="method-card">
              <h3>Array.prototype.flat</h3>
              <p class="method-desc">
                按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>处理默认深度为1</li>
                  <li>递归展平数组</li>
                  <li>检查元素是否为数组且深度未达到</li>
                  <li>递归展平子数组</li>
                </ul>
              </div>
              <pre class="code-block">
Array.prototype.myFlat = function(depth = 1) {
  const result = [];

  const flatten = (arr, currentDepth) => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth > 0) {
        flatten(item, currentDepth - 1);
      } else {
        result.push(item);
      }
    }
  };

  flatten(this, depth);
  return result;
};</pre
              >
            </div>

            <!-- unique -->
            <div class="method-card">
              <h3>
                数组去重 <a class="goto-link" @click="goToByRouteName('Deduplication')">跳转</a>
              </h3>
              <p class="method-desc">创建一个新数组，包含原数组中所有不重复的元素</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>使用Set数据结构（ES6）</li>
                  <li>使用对象属性唯一性</li>
                  <li>使用filter和indexOf</li>
                </ul>
              </div>
              <pre class="code-block">
// 方法1: 使用Set
function unique1(arr) {
  return [...new Set(arr)];
}

// 方法2: 使用对象
function unique2(arr) {
  const map = {};
  return arr.filter(item =>
    map[typeof item + item] ? false : (map[typeof item + item] = true)
  );
}

// 方法3: 使用filter
function unique3(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}</pre
              >
            </div>
          </div>
        </section>

        <!-- 函数方法 -->
        <section id="function-methods" class="guide-section">
          <h2>
            函数方法实现
            <a class="goto-link" @click="goToByRouteName('CallAndApplyAndBind')">跳转</a>
          </h2>

          <div class="method-grid">
            <!-- bind -->
            <div class="method-card">
              <h3>Function.prototype.bind</h3>
              <p class="method-desc">
                创建一个新的函数，在bind()被调用时，这个新函数的this被指定为bind()的第一个参数，其余参数将作为新函数的参数
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>保存原函数</li>
                  <li>获取预置参数</li>
                  <li>返回新函数</li>
                  <li>在新函数中合并参数并调用原函数</li>
                  <li>处理 new 操作符情况</li>
                </ul>
              </div>
              <pre class="code-block">
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  const self = this;

  const boundFunction = function(...innerArgs) {
    // 判断是否通过 new 调用
    const isNewCall = this instanceof boundFunction;
    return self.apply(
      isNewCall ? this : context,
      args.concat(innerArgs)
    );
  };

  // 维护原型关系
  if (this.prototype) {
    boundFunction.prototype = Object.create(this.prototype);
  }

  return boundFunction;
};</pre
              >
            </div>

            <!-- call -->
            <div class="method-card">
              <h3>Function.prototype.call</h3>
              <p class="method-desc">
                使用一个指定的this值和单独给出的一个或多个参数来调用一个函数
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查调用者是否为函数</li>
                  <li>创建唯一键避免属性覆盖</li>
                  <li>将函数作为上下文对象的方法</li>
                  <li>调用该方法并传入参数</li>
                  <li>删除临时方法</li>
                  <li>返回结果</li>
                </ul>
              </div>
              <pre class="code-block">
Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myCall must be called on a function');
  }

  context = context || window;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};</pre
              >
            </div>

            <!-- apply -->
            <div class="method-card">
              <h3>Function.prototype.apply</h3>
              <p class="method-desc">
                调用一个具有给定this值的函数，以及以一个数组（或类数组对象）提供的参数
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>与call类似，但参数为数组</li>
                  <li>检查参数是否为数组或类数组</li>
                  <li>处理无参数情况</li>
                </ul>
              </div>
              <pre class="code-block">
Function.prototype.myApply = function(context, argsArray) {
  if (typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function');
  }

  context = context || window;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  let result;
  if (argsArray && typeof argsArray === 'object' && 'length' in argsArray) {
    result = context[fnSymbol](...argsArray);
  } else {
    result = context[fnSymbol]();
  }

  delete context[fnSymbol];
  return result;
};</pre
              >
            </div>
          </div>
        </section>

        <!-- 对象方法 -->
        <section id="object-methods" class="guide-section">
          <h2>对象方法实现</h2>

          <div class="method-grid">
            <!-- create -->
            <div class="method-card">
              <h3>Object.create</h3>
              <p class="method-desc">创建一个新对象，使用现有的对象来提供新创建的对象的__proto__</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>创建新函数作为中介</li>
                  <li>设置中介函数的prototype为proto</li>
                  <li>使用new创建新对象</li>
                  <li>处理null原型情况</li>
                </ul>
              </div>
              <pre class="code-block">
Object.myCreate = function(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'null') {
    throw new TypeError('Object prototype may only be an Object or null');
  }

  function F() {}
  F.prototype = proto;
  const obj = new F();

  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }

  if (proto === null) {
    obj.__proto__ = null;
  }

  return obj;
};</pre
              >
            </div>

            <!-- assign -->
            <div class="method-card">
              <h3>Object.assign</h3>
              <p class="method-desc">
                将所有可枚举属性的值从一个或多个源对象分配到目标对象，返回目标对象
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>检查目标对象是否有效</li>
                  <li>遍历源对象</li>
                  <li>复制可枚举属性</li>
                  <li>处理Symbol属性</li>
                </ul>
              </div>
              <pre class="code-block">
Object.myAssign = function(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to = Object(target);

  for (const source of sources) {
    if (source !== null && source !== undefined) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          to[key] = source[key];
        }
      }

      // 复制Symbol属性
      const symbols = Object.getOwnPropertySymbols(source);
      for (const sym of symbols) {
        to[sym] = source[sym];
      }
    }
  }

  return to;
};</pre
              >
            </div>

            <!-- is -->
            <div class="method-card">
              <h3>Object.is</h3>
              <p class="method-desc">判断两个值是否为同一个值</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>处理NaN相等情况</li>
                  <li>处理+0和-0不相等情况</li>
                  <li>其他情况使用严格相等</li>
                </ul>
              </div>
              <pre class="code-block">
Object.myIs = function(a, b) {
  // 处理 NaN 的情况
  if (a !== a && b !== b) return true;

  // 处理 +0 和 -0 的情况
  if (a === 0 && b === 0) {
    return 1 / a === 1 / b;
  }

  // 其他情况
  return a === b;
};</pre
              >
            </div>
          </div>
        </section>

        <!-- 其他核心方法 -->
        <section id="other-methods" class="guide-section">
          <h2>其他核心方法实现</h2>

          <div class="method-grid">
            <!-- new -->
            <div class="method-card">
              <h3>
                new 操作符 <a class="goto-link" @click="goToByRouteName('AchieveNew')">跳转</a>
              </h3>
              <p class="method-desc">
                创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>创建新对象</li>
                  <li>设置原型链</li>
                  <li>绑定this并执行构造函数</li>
                  <li>处理返回值</li>
                </ul>
              </div>
              <pre class="code-block">
function myNew(constructor, ...args) {
  // 1. 创建新对象，并链接到构造函数的prototype
  const obj = Object.create(constructor.prototype);

  // 2. 绑定this并执行构造函数
  const result = constructor.apply(obj, args);

  // 3. 如果构造函数返回对象则返回该对象，否则返回新对象
  return result instanceof Object ? result : obj;
}</pre
              >
            </div>

            <!-- instanceof -->
            <div class="method-card">
              <h3>
                instanceof
                <a class="goto-link" @click="goToByRouteName('AchieveInstanceof')">跳转</a>
              </h3>
              <p class="method-desc">检测构造函数的prototype属性是否出现在某个实例对象的原型链上</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>获取对象的原型</li>
                  <li>获取构造函数的prototype</li>
                  <li>遍历原型链进行比较</li>
                </ul>
              </div>
              <pre class="code-block">
function myInstanceof(obj, constructor) {
  // 基本类型直接返回false
  if (obj === null || typeof obj !== 'object') return false;

  let proto = Object.getPrototypeOf(obj);
  const prototype = constructor.prototype;

  while (proto !== null) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}</pre
              >
            </div>

            <!-- 深拷贝 -->
            <div class="method-card">
              <h3>深拷贝 <a class="goto-link" @click="goToByRouteName('DeepCopy')">跳转</a></h3>
              <p class="method-desc">创建一个新对象，完全复制原对象的所有属性（包括嵌套对象）</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>处理基本数据类型</li>
                  <li>处理数组和对象</li>
                  <li>处理循环引用</li>
                  <li>处理特殊对象（Date、RegExp等）</li>
                  <li>使用WeakMap解决循环引用</li>
                </ul>
              </div>
              <pre class="code-block">
function deepClone(target, map = new WeakMap()) {
  // 基本数据类型直接返回
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // 处理循环引用
  if (map.has(target)) {
    return map.get(target);
  }

  // 处理特殊对象
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  // 处理数组和对象
  const cloneTarget = Array.isArray(target) ? [] : {};
  map.set(target, cloneTarget);

  // 递归拷贝所有属性
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone(target[key], map);
    }
  }

  // 处理Symbol属性
  const symbols = Object.getOwnPropertySymbols(target);
  for (const sym of symbols) {
    cloneTarget[sym] = deepClone(target[sym], map);
  }

  return cloneTarget;
}</pre
              >
            </div>

            <!-- Promise -->
            <div class="method-card">
              <h3>
                Promise (简化版)
                <a class="goto-link" @click="goToByRouteName('PromiseImplementation')">跳转</a>
              </h3>
              <p class="method-desc">表示一个异步操作的最终完成（或失败）及其结果值</p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>定义三种状态</li>
                  <li>实现then方法链式调用</li>
                  <li>处理异步操作</li>
                  <li>实现resolve和reject</li>
                  <li>处理链式调用中的值传递</li>
                </ul>
              </div>
              <pre class="code-block">
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  constructor(executor) {
    this.state = MyPromise.PENDING;
    this.value = null;
    this.callbacks = [];

    const resolve = value => {
      if (this.state !== MyPromise.PENDING) return;
      this.state = MyPromise.FULFILLED;
      this.value = value;
      this.callbacks.forEach(cb => this.handle(cb));
    };

    const reject = reason => {
      if (this.state !== MyPromise.PENDING) return;
      this.state = MyPromise.REJECTED;
      this.value = reason;
      this.callbacks.forEach(cb => this.handle(cb));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  handle(callback) {
    if (this.state === MyPromise.PENDING) {
      this.callbacks.push(callback);
      return;
    }

    const cb = this.state === MyPromise.FULFILLED
      ? callback.onFulfilled
      : callback.onRejected;

    if (!cb) {
      const handler = this.state === MyPromise.FULFILLED
        ? callback.resolve
        : callback.reject;
      handler(this.value);
      return;
    }

    try {
      const result = cb(this.value);
      callback.resolve(result);
    } catch (error) {
      callback.reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.handle({
        onFulfilled: typeof onFulfilled === 'function' ? onFulfilled : null,
        onRejected: typeof onRejected === 'function' ? onRejected : null,
        resolve,
        reject
      });
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}</pre
              >
            </div>

            <!-- 防抖 -->
            <div class="method-card">
              <h3>
                防抖 (debounce)
                <a class="goto-link" @click="goToByRouteName('DebounceThrottle')">跳转</a>
              </h3>
              <p class="method-desc">
                在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>使用定时器延迟执行</li>
                  <li>每次调用清除前一个定时器</li>
                  <li>支持立即执行选项</li>
                  <li>返回结果处理</li>
                </ul>
              </div>
              <pre class="code-block">
function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoked = false;
  let result;

  const debounced = function(...args) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate && !isInvoked) {
      result = fn.apply(context, args);
      isInvoked = true;
    }

    timer = setTimeout(() => {
      if (!immediate) {
        result = fn.apply(context, args);
      }
      timer = null;
      isInvoked = false;
    }, delay);

    return result;
  };

  // 取消功能
  debounced.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      isInvoked = false;
    }
  };

  return debounced;
}</pre
              >
            </div>

            <!-- 节流 -->
            <div class="method-card">
              <h3>
                节流 (throttle)
                <a class="goto-link" @click="goToByRouteName('DebounceThrottle')">跳转</a>
              </h3>
              <p class="method-desc">
                规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
              </p>
              <div class="implementation">
                <h4>实现思路</h4>
                <ul>
                  <li>使用时间戳或定时器</li>
                  <li>记录上次执行时间</li>
                  <li>支持立即执行和尾部执行选项</li>
                </ul>
              </div>
              <pre class="code-block">
function throttle(fn, delay, options = {}) {
  let timer = null;
  let lastTime = 0;
  const { leading = true, trailing = true } = options;

  const throttled = function(...args) {
    const context = this;
    const now = Date.now();

    // 第一次不执行（leading为false）
    if (!lastTime && !leading) lastTime = now;

    const remaining = delay - (now - lastTime);

    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      lastTime = now;
      fn.apply(context, args);
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  };

  // 取消功能
  throttled.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      lastTime = 0;
    }
  };

  return throttled;
}</pre
              >
            </div>
          </div>
        </section>

        <!-- 总结 -->
        <section id="conclusion" class="guide-section">
          <h2>总结与建议</h2>
          <div class="conclusion-content">
            <div class="key-points">
              <h3>关键学习点</h3>
              <ul>
                <li>理解 JavaScript 核心原理和运行机制</li>
                <li>掌握闭包、原型链、作用域等核心概念</li>
                <li>熟悉各种数据结构和算法应用</li>
                <li>学会处理边界情况和异常</li>
              </ul>
            </div>

            <div class="practice-tips">
              <h3>练习建议</h3>
              <ul>
                <li>从简单方法开始，逐步挑战更复杂的实现</li>
                <li>编写测试用例验证实现的正确性</li>
                <li>比较自己的实现与原生方法的差异</li>
                <li>尝试优化实现的性能</li>
                <li>阅读 JavaScript 引擎源码（如V8）加深理解</li>
              </ul>
            </div>

            <div class="final-note">
              <p>
                手写原生方法是深入理解 JavaScript 的绝佳途径。通过实现这些核心功能，
                你不仅能提升编程能力，还能在前端面试中脱颖而出。 不断练习和思考，你会对 JavaScript
                有更深层次的认识！
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['goToByRouteName'])

const goToByRouteName = (routeName: string) => {
  emit('goToByRouteName', routeName)
}

// 导航部分
const sections = ref([
  { id: 'introduction', title: '介绍' },
  { id: 'array-methods', title: '数组方法' },
  { id: 'function-methods', title: '函数方法' },
  { id: 'object-methods', title: '对象方法' },
  { id: 'other-methods', title: '其他方法' },
  { id: 'conclusion', title: '总结' },
])

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped lang="less">
@primary-color: #4a7bf7;
@secondary-color: #6c5ce7;
@text-color: #2d3436;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@code-bg: #2d3436;
@code-color: #f1f2f6;

.goto-link {
  color: @primary-color;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 10px;
}

.native-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.guide-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.content-wrapper {
  display: flex;
  gap: 2rem;
}

.navigation {
  flex: 0 0 200px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

.content {
  flex: 1;
}

.guide-section {
  margin-bottom: 3rem;

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@secondary-color, 40%);
  }
}

.intro-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.intro-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .intro-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0 1rem;
    color: @primary-color;
  }
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.method-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin-top: 0;
    color: @primary-color;
    border-bottom: 1px solid @border-color;
    padding-bottom: 0.5rem;
  }
}

.method-desc {
  color: lighten(@text-color, 20%);
  font-size: 0.95rem;
  margin: 0.5rem 0 1rem;
  min-height: 3rem;
}

.implementation {
  background: lighten(@light-bg, 1%);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;

  h4 {
    margin-top: 0;
    color: @secondary-color;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0.5rem 0;

    li {
      margin-bottom: 0.3rem;
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
}

.code-block {
  display: block;
  background: @code-bg;
  color: @code-color;
  border-radius: 6px;
  padding: 1.2rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 1rem 0 0;
  line-height: 1.5;
  border-left: 3px solid @primary-color;
}

.conclusion-content {
  background: lighten(@light-bg, 1%);
  border-radius: 8px;
  padding: 1.5rem;

  .key-points,
  .practice-tips {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      margin-top: 0;
      color: @primary-color;
      border-bottom: 1px solid @border-color;
      padding-bottom: 0.5rem;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .final-note {
    background: lighten(@primary-color, 48%);
    border-left: 4px solid @primary-color;
    border-radius: 0 8px 8px 0;
    padding: 1.5rem;
    margin-top: 1.5rem;

    p {
      margin: 0;
      line-height: 1.6;
    }
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
  }

  .method-grid {
    grid-template-columns: 1fr;
  }
}
</style>
