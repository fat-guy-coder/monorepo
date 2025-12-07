export const random = (size: number, floor: 'floor' | 'ceil' = 'floor') => {
  return Math[floor](Math.random() * size)
}

/**
 * 生成一个随机数字数组
 * @param n 数组的长度
 * @param options.unique 是否唯一，默认为 false
 * @param options.max 随机数的最大值（不包含），默认为 n
 */
export const size = (n: number, options: { unique?: boolean; max?: number } = {}) => {
  const { unique = false, max = n } = options

  if (unique && n > max) {
    throw new Error('当需要唯一值时，数组长度 n 不能大于随机数最大值 max')
  }

  if (!unique) {
    const arr: number[] = []
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * max))
    }
    return arr
  } else {
    const set = new Set<number>()
    while (set.size < n) {
      set.add(Math.floor(Math.random() * max))
    }
    return Array.from(set)
  }
}


/**
 * 随机选择一个元素
 * @param arr 数组
 * @param exclude 排除的元素
 * @param toKey 将元素转换为字符串
 * @returns 随机选择的元素
 */
export const randPick = <T>(arr: T[], exclude: Set<string>, toKey: (v: T) => string): T => {
  const filtered = arr.filter((v) => !exclude.has(toKey(v)))
  const result = filtered.length > 0 ? filtered[random(filtered.length)] : arr[0]
  exclude.add(toKey(result))
  return result as T
}
