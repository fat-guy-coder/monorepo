/**
 * 防抖函数
 * @param func 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let timer: any = null; // 初始化为 null
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param func 要执行的函数
 * @param limit 限制时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle(func: (...args: any[]) => void, limit: number): (...args: any[]) => void {
  let lastFunc: any = null; // 初始化为 null
  let lastRan: number | null = null; // 初始化为 null
  return function (this: unknown, ...args: any[]) {
    const context = this;
    if (lastRan === null) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc!);
      lastFunc = setTimeout(function () {
        if (Date.now() - (lastRan as number) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - (lastRan as number)));
    }
  };
}