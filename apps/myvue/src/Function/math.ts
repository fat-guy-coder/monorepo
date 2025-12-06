export const random = (size: number,floor:'floor' | 'ceil' = 'floor') => {
  return Math[floor](Math.random() * size)
}

/**
 * 生成一个随机数字数组
 * @param n 数组的长度
 * @param options.unique 是否唯一，默认为 false
 * @param options.max 随机数的最大值（不包含），默认为 n
 */
export const size = (n: number, options: { unique?: boolean; max?: number } = {}) => {
  const { unique = false, max = n } = options;

  if (unique && n > max) {
    throw new Error('当需要唯一值时，数组长度 n 不能大于随机数最大值 max');
  }

  if (!unique) {
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * max));
    }
    return arr;
  } else {
    const set = new Set<number>();
    while (set.size < n) {
      set.add(Math.floor(Math.random() * max));
    }
    return Array.from(set);
  }
};
